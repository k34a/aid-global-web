import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAuth } from "@/lib/auth/admin";
import { checkCampaignSlugExists } from "@/lib/db/checkcampaignslug";
import { CampaignCreateSchema } from "@/lib/validators/campaign";
import { createCampaign } from "@/lib/db/createcampaign";
export async function POST(request: NextRequest) {
	try {
		const isAuthenticated = await verifyAdminAuth();
		if (!isAuthenticated) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 },
			);
		}

		const rawBody = await request.json();
		const parsed = CampaignCreateSchema.safeParse(rawBody);

		if (!parsed.success) {
			const errors = parsed.error.flatten().fieldErrors;
			return NextResponse.json(
				{ error: "Validation failed", errors },
				{ status: 400 },
			);
		}

		const body = parsed.data;
		const existingCampaign = await checkCampaignSlugExists(body.slug);

		if (existingCampaign) {
			return NextResponse.json(
				{
					error: "Campaign with this slug already exists",
					existingCampaign,
				},
				{ status: 409 },
			);
		}

		const campaign = await createCampaign(body);
		return NextResponse.json(
			{
				message: "Campaign created successfully",
				campaign: {
					id: campaign.id,
					slug: campaign.slug,
				},
			},
			{ status: 201 },
		);
	} catch (error) {
		console.error("Error in campaign creation API:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
