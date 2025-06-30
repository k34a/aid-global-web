import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/db/supabase";
import { getAdminBackersForCampaign } from "@/lib/db/campaigns";
import { verifyAdminAuth } from "@/lib/auth/admin";

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ slug: string }> },
) {
	try {
		// Verify admin authentication
		const authResult = await verifyAdminAuth();
		if (authResult.error) {
			return NextResponse.json(
				{ error: authResult.error },
				{ status: authResult.status },
			);
		}

		const { slug } = await params;

		// Get campaign details
		const { data: campaign, error: campaignError } = await supabaseAdmin
			.from("campaigns")
			.select("*")
			.eq("slug", slug)
			.single();

		if (campaignError || !campaign) {
			return NextResponse.json(
				{ error: "Campaign not found" },
				{ status: 404 },
			);
		}

		// Get recent donations with complete donor details for admin
		const { backers: recentDonations } = await getAdminBackersForCampaign(
			campaign.id,
			10,
			0,
		);

		// Get donation trends (last 30 days)
		const thirtyDaysAgo = new Date();
		thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

		const { data: donationTrends, error: trendsError } = await supabaseAdmin
			.from("backers")
			.select("amount, created_at")
			.eq("campaign_id", campaign.id)
			.neq("payment_id", null)
			.gte("created_at", thirtyDaysAgo.toISOString())
			.order("created_at", { ascending: true });

		// Process donation trends by date
		const trendsByDate = new Map<
			string,
			{ amount: number; count: number }
		>();

		if (donationTrends) {
			donationTrends.forEach((donation) => {
				const date = new Date(donation.created_at)
					.toISOString()
					.split("T")[0];
				const existing = trendsByDate.get(date) || {
					amount: 0,
					count: 0,
				};
				trendsByDate.set(date, {
					amount: existing.amount + donation.amount,
					count: existing.count + 1,
				});
			});
		}

		const processedTrends = Array.from(trendsByDate.entries()).map(
			([date, data]) => ({
				date,
				...data,
			}),
		);

		// Calculate additional metrics
		const totalDonations = campaign.collection;
		const totalDonors = campaign.backers;
		const averageDonation =
			totalDonors > 0 ? totalDonations / totalDonors : 0;

		// Calculate conversion rate (this would need more data in a real scenario)
		// For now, we'll use a placeholder
		const conversionRate = 0; // This would be calculated based on page views vs donations

		return NextResponse.json({
			totalDonations,
			totalDonors,
			averageDonation,
			conversionRate,
			recentDonations: recentDonations || [],
			donationTrends: processedTrends,
		});
	} catch (error) {
		console.error("Error in analytics API:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
