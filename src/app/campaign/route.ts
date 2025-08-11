import { NextRequest, NextResponse } from "next/server";
import { listCampaigns } from "@/lib/db/campaigns";
import { QuerySchema } from "./schema";

export async function GET(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);

		const rawParams = Object.fromEntries(searchParams.entries());

		const parsed = QuerySchema.safeParse(rawParams);
		if (!parsed.success) {
			return NextResponse.json(
				{
					error: "Invalid query parameters",
					issues: parsed.error.issues.map((issue) => ({
						path: issue.path.join("."),
						message: issue.message,
					})),
				},
				{ status: 400 },
			);
		}

		const params = parsed.data;

		const { items, total } = await listCampaigns(params);

		const totalPages = Math.max(
			1,
			Math.ceil(total / Math.max(1, params.pageSize)),
		);

		return NextResponse.json({
			items,
			total,
			page: params.page,
			pageSize: params.pageSize,
			totalPages,
			hasNextPage: params.page < totalPages,
			hasPrevPage: params.page > 1,
			sortBy: params.sortBy,
			sortOrder: params.sortOrder,
			filters: {
				search: params.search ?? null,
				activeOnly: params.activeOnly,
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
