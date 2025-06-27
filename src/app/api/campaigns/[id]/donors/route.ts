import { NextResponse } from "next/server";
import { getBackersForCampaign } from "@/lib/db/campaigns";

export async function GET(
	req: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const resolvedParams = await params;
		const campaignId = resolvedParams.id;

		const { searchParams } = new URL(req.url);
		const limit = parseInt(searchParams.get("limit") ?? "10");
		const offset = parseInt(searchParams.get("offset") ?? "0");

		const backersDetails = await getBackersForCampaign(
			campaignId,
			limit,
			offset,
		);
		return NextResponse.json(backersDetails);
	} catch (error) {
		console.error("Error in donor route:", error);
		return NextResponse.json(
			{ error: "Something went wrong" },
			{ status: 500 },
		);
	}
}
