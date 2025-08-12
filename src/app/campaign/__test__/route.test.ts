/**
 * @jest-environment node
 */

import type { NextRequest } from "next/server";

jest.mock("@/lib/db/campaigns", () => ({
	listCampaigns: jest.fn(),
}));

import { GET } from "../route";
import { listCampaigns } from "@/lib/db/campaigns";

const listCampaignsMock = listCampaigns as jest.MockedFunction<
	typeof listCampaigns
>;

const makeReq = (query = ""): NextRequest =>
	({
		url: `http://localhost:3000/campaign${query}`,
	}) as unknown as NextRequest;

describe("GET /campaign", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("returns 400 on invalid query (page < 1)", async () => {
		const res = await GET(makeReq("?page=0"));
		expect(res.status).toBe(400);
		const body = await res.json();
		expect(body.error).toBe("Invalid query parameters");
		expect(Array.isArray(body.issues)).toBe(true);
		expect(body.issues.length).toBeGreaterThan(0);
	});

	test("applies defaults and calls listCampaigns with default params", async () => {
		listCampaignsMock.mockResolvedValueOnce({ items: [], total: 0 });

		const res = await GET(makeReq());
		expect(res.status).toBe(200);
		const body = await res.json();

		// Response defaults
		expect(body.page).toBe(1);
		expect(body.pageSize).toBe(12);
		expect(body.sortBy).toBe("created_at");
		expect(body.sortOrder).toBe("desc");

		// Called with parsed defaults
		expect(listCampaignsMock).toHaveBeenCalledTimes(1);
		expect(listCampaignsMock).toHaveBeenCalledWith({
			page: 1,
			pageSize: 12,
			search: undefined,
			activeOnly: true,
			minAmount: undefined,
			maxAmount: undefined,
			minCollection: undefined,
			maxCollection: undefined,
			minBackers: undefined,
			maxBackers: undefined,
			sortBy: "created_at",
			sortOrder: "desc",
		});
	});

	test("coerces and respects valid query params and computes pagination flags", async () => {
		listCampaignsMock.mockResolvedValueOnce({
			items: [{ id: "1" }],
			total: 26,
		} as any);

		const res = await GET(
			makeReq(
				"?page=2&pageSize=5&sortBy=amount&sortOrder=asc&activeOnly=no&minAmount=10&maxAmount=20",
			),
		);
		expect(res.status).toBe(200);
		const body = await res.json();

		expect(body.page).toBe(2);
		expect(body.pageSize).toBe(5);
		expect(body.sortBy).toBe("amount");
		expect(body.sortOrder).toBe("asc");
		expect(body.hasPrevPage).toBe(true);
		expect(body.hasNextPage).toBe(true);
		expect(body.filters.activeOnly).toBe(false);
		expect(body.filters.minAmount).toBe(10);
		expect(body.filters.maxAmount).toBe(20);

		expect(listCampaignsMock).toHaveBeenCalledWith(
			expect.objectContaining({
				page: 2,
				pageSize: 5,
				sortBy: "amount",
				sortOrder: "asc",
				activeOnly: false,
				minAmount: 10,
				maxAmount: 20,
			}),
		);
	});

	test("returns 500 on unexpected internal error", async () => {
		listCampaignsMock.mockRejectedValueOnce(new Error("boom"));

		const res = await GET(makeReq());
		expect(res.status).toBe(500);
		const body = await res.json();
		expect(body.error).toBe("Failed to load campaigns");
	});
});
