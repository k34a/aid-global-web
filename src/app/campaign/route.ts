import { NextRequest, NextResponse } from "next/server";
import { listCampaigns } from "@/lib/db/campaigns";

const ALLOWED_SORT_BY = new Set([
	"created_at",
	"amount",
	"collection",
	"backers",
	"title",
]);

export async function GET(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);

		const page = parseInt(searchParams.get("page") || "1", 10);
		const pageSize = parseInt(searchParams.get("pageSize") || "12", 10);
		const search = searchParams.get("search") || undefined;
		const activeOnlyParam = searchParams.get("activeOnly");
		const activeOnly =
			activeOnlyParam === null
				? true
				: ["1", "true", "yes"].includes(activeOnlyParam.toLowerCase());

		const sortByParam = searchParams.get("sortBy") || undefined;
		const sortBy =
			sortByParam && ALLOWED_SORT_BY.has(sortByParam)
				? (sortByParam as any)
				: ("created_at" as const);

		const sortOrderParam = (
			searchParams.get("sortOrder") || "desc"
		).toLowerCase();
		const sortOrder =
			sortOrderParam === "asc" ? ("asc" as const) : ("desc" as const);

		const num = (key: string) => {
			const v = searchParams.get(key);
			if (v === null) return undefined;
			const n = Number(v);
			return Number.isFinite(n) ? n : undefined;
		};

		const params = {
			page,
			pageSize,
			search,
			activeOnly,
			minAmount: num("minAmount"),
			maxAmount: num("maxAmount"),
			minCollection: num("minCollection"),
			maxCollection: num("maxCollection"),
			minBackers: num("minBackers"),
			maxBackers: num("maxBackers"),
			sortBy,
			sortOrder,
		} as const;

		const { items, total } = await listCampaigns(params);

		const totalPages = Math.max(
			1,
			Math.ceil(total / Math.max(1, pageSize)),
		);

		return NextResponse.json({
			items,
			total,
			page,
			pageSize,
			totalPages,
			hasNextPage: page < totalPages,
			hasPrevPage: page > 1,
			sortBy,
			sortOrder,
			filters: {
				search: search ?? null,
				activeOnly,
				minAmount: params.minAmount ?? null,
				maxAmount: params.maxAmount ?? null,
				minCollection: params.minCollection ?? null,
				maxCollection: params.maxCollection ?? null,
				minBackers: params.minBackers ?? null,
				maxBackers: params.maxBackers ?? null,
			},
		});
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to load campaigns" },
			{ status: 500 },
		);
	}
}
