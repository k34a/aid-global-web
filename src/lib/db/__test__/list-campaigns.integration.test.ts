/**
 * @jest-environment node
 */

jest.mock("@/lib/db/supabase", () => ({
	supabaseAdmin: { from: jest.fn() },
}));

import { supabaseAdmin } from "@/lib/db/supabase";
import { listCampaigns } from "@/lib/db/campaigns";
import { DEFAULT_CAMPAIGN } from "@/config/data";

class FakeQuery {
	private original: any[];
	private notEqualsId: string | null = null;
	private searchTitle: string | null = null;
	private activeIso: string | null = null;
	private mins: Record<string, number> = {};
	private maxs: Record<string, number> = {};
	private orderBy: { field: string; ascending: boolean } | null = null;
	private start = 0;
	private end = Infinity;

	constructor(data: any[]) {
		this.original = data;
	}

	neq(field: string, value: any) {
		if (field === "id") this.notEqualsId = String(value);
		return this;
	}

	ilike(field: string, pattern: string) {
		if (field === "title") {
			const trimmed = pattern.replace(/^%|%$/g, "");
			this.searchTitle = trimmed.toLowerCase();
		}
		return this;
	}

	or(expr: string) {
		const parts = expr.split(",");
		const gt = parts.find((p) => p.includes("ended_at.gt."));
		if (gt) this.activeIso = gt.split("ended_at.gt.")[1];
		return this;
	}

	gte(field: string, value: number) {
		this.mins[field] = value;
		return this;
	}

	lte(field: string, value: number) {
		this.maxs[field] = value;
		return this;
	}

	order(field: string, opts: { ascending: boolean }) {
		this.orderBy = { field, ascending: opts.ascending };
		return this;
	}

	range(from: number, to: number) {
		this.start = from;
		this.end = to;
		return this;
	}

	then(resolve: (v: { data: any[]; error: null; count: number }) => any) {
		let data = [...this.original];

		if (this.notEqualsId) {
			data = data.filter((d) => String(d.id) !== this.notEqualsId);
		}

		if (this.searchTitle) {
			data = data.filter((d) =>
				String(d.title || "")
					.toLowerCase()
					.includes(this.searchTitle!),
			);
		}

		if (this.activeIso) {
			const iso = new Date(this.activeIso).getTime();
			data = data.filter((d) => {
				if (d.ended_at == null) return true;
				const t = new Date(d.ended_at).getTime();
				return t > iso;
			});
		}

		for (const [field, min] of Object.entries(this.mins)) {
			data = data.filter((d) => Number(d[field]) >= Number(min));
		}
		for (const [field, max] of Object.entries(this.maxs)) {
			data = data.filter((d) => Number(d[field]) <= Number(max));
		}

		if (this.orderBy) {
			const { field, ascending } = this.orderBy;
			data.sort((a, b) => {
				let av = a[field];
				let bv = b[field];
				if (field.includes("_at") || field === "ended_at") {
					av = new Date(av).getTime();
					bv = new Date(bv).getTime();
				}
				if (typeof av === "string" && typeof bv === "string") {
					return ascending
						? String(av).localeCompare(String(bv))
						: String(bv).localeCompare(String(av));
				}
				return ascending
					? Number(av) - Number(bv)
					: Number(bv) - Number(av);
			});
		}

		const total = data.length;
		const sliced = data.slice(this.start, this.end + 1);
		return resolve({ data: sliced, error: null, count: total });
	}
}

describe("listCampaigns using a fake Supabase client", () => {
	const dataset = [
		{
			id: DEFAULT_CAMPAIGN,
			title: "Default",
			amount: 0,
			collection: 0,
			backers: 0,
			created_at: "2000-01-01T00:00:00.000Z",
			ended_at: null,
		},
		{
			id: "a1",
			title: "Alpha",
			amount: 100,
			collection: 50,
			backers: 10,
			created_at: "2024-01-01T00:00:00.000Z",
			ended_at: null,
		},
		{
			id: "b1",
			title: "Beta",
			amount: 20,
			collection: 5,
			backers: 2,
			created_at: "2024-02-01T00:00:00.000Z",
			ended_at: "2999-12-31T00:00:00.000Z",
		},
		{
			id: "c1",
			title: "Gamma",
			amount: 15,
			collection: 8,
			backers: 3,
			created_at: "2023-12-01T00:00:00.000Z",
			ended_at: "1999-01-01T00:00:00.000Z",
		},
		{
			id: "d1",
			title: "Amazing abc title",
			amount: 12,
			collection: 5,
			backers: 3,
			created_at: "2024-03-01T00:00:00.000Z",
			ended_at: null,
		},
		{
			id: "d2",
			title: "abc second",
			amount: 18,
			collection: 6,
			backers: 5,
			created_at: "2024-04-01T00:00:00.000Z",
			ended_at: null,
		},
	];

	beforeEach(() => {
		jest.restoreAllMocks();
		const fromMock = (supabaseAdmin as any).from as jest.Mock;
		fromMock.mockImplementation(() => ({
			select: () => new FakeQuery(dataset),
		}));
	});

	test("defaults: activeOnly + created_at desc + full page range", async () => {
		const res = await listCampaigns({
			page: 1,
			pageSize: 12,
			activeOnly: true,
			sortBy: "created_at",
			sortOrder: "desc",
		});

		expect(res.total).toBe(4);
		expect(res.items.map((i: any) => i.id)).toEqual([
			"d2",
			"d1",
			"b1",
			"a1",
		]);
	});

	test("filters + amount asc + pagination over search results", async () => {
		const res = await listCampaigns({
			page: 2,
			pageSize: 1,
			search: "abc",
			activeOnly: false,
			minAmount: 10,
			maxAmount: 20,
			minCollection: 3,
			maxCollection: 7,
			minBackers: 2,
			maxBackers: 9,
			sortBy: "amount",
			sortOrder: "asc",
		});

		expect(res.total).toBe(2);
		expect(res.items.map((i: any) => i.id)).toEqual(["d2"]);
	});

	test("search: empty string vs undefined should behave the same (no filter)", async () => {
		const baseParams = {
			page: 1,
			pageSize: 50,
			activeOnly: true,
			sortBy: "created_at" as const,
			sortOrder: "desc" as const,
		};

		const resWithoutSearch = await listCampaigns({ ...baseParams });
		const resWithEmptySearch = await listCampaigns({
			...baseParams,
			search: "",
		});

		expect(resWithEmptySearch.total).toBe(resWithoutSearch.total);
		expect(resWithEmptySearch.items).toEqual(resWithoutSearch.items);
	});

	test("empty dataset: returns total=0 and items=[] without crashing", async () => {
		const fromMock = (supabaseAdmin as any).from as jest.Mock;
		fromMock.mockImplementationOnce(() => ({
			select: () => new FakeQuery([]),
		}));

		const res = await listCampaigns({
			page: 1,
			pageSize: 10,
			activeOnly: true,
			sortBy: "created_at",
			sortOrder: "desc",
		});

		expect(res.total).toBe(0);
		expect(res.items).toEqual([]);
	});

	test("pagination: page beyond last returns empty items, total unchanged", async () => {
		const res = await listCampaigns({
			page: 3,
			pageSize: 2,
			activeOnly: true,
			sortBy: "created_at",
			sortOrder: "desc",
		});

		expect(res.total).toBe(4);
		expect(res.items).toEqual([]);
	});

	test("pagination: exact-end slice (page=2,pageSize=2) returns last two", async () => {
		const res = await listCampaigns({
			page: 2,
			pageSize: 2,
			activeOnly: true,
			sortBy: "created_at",
			sortOrder: "desc",
		});

		expect(res.total).toBe(4);
		expect(res.items.map((i: any) => i.id)).toEqual(["b1", "a1"]);
	});

	test("pagination: pageSize 1 returns a single first item", async () => {
		const res = await listCampaigns({
			page: 1,
			pageSize: 1,
			activeOnly: true,
			sortBy: "created_at",
			sortOrder: "desc",
		});

		expect(res.total).toBe(4);
		expect(res.items.map((i: any) => i.id)).toEqual(["d2"]);
	});

	test("pagination: very large pageSize returns all active items", async () => {
		const res = await listCampaigns({
			page: 1,
			pageSize: 1000,
			activeOnly: true,
			sortBy: "created_at",
			sortOrder: "desc",
		});

		expect(res.total).toBe(4);
		expect(res.items.map((i: any) => i.id)).toEqual([
			"d2",
			"d1",
			"b1",
			"a1",
		]);
	});

	test("activeOnly with all expired campaigns returns empty results", async () => {
		const expiredOnly = [
			{
				id: "x1",
				title: "Past 1",
				amount: 10,
				collection: 1,
				backers: 1,
				created_at: "2024-01-01T00:00:00.000Z",
				ended_at: "2000-01-01T00:00:00.000Z",
			},
			{
				id: "x2",
				title: "Past 2",
				amount: 20,
				collection: 2,
				backers: 2,
				created_at: "2024-02-01T00:00:00.000Z",
				ended_at: "2000-01-02T00:00:00.000Z",
			},
		];

		const fromMock = (supabaseAdmin as any).from as jest.Mock;
		fromMock.mockImplementationOnce(() => ({
			select: () => new FakeQuery(expiredOnly),
		}));

		const res = await listCampaigns({
			page: 1,
			pageSize: 10,
			activeOnly: true,
			sortBy: "created_at",
			sortOrder: "desc",
		});

		expect(res.total).toBe(0);
		expect(res.items).toEqual([]);
	});
});
