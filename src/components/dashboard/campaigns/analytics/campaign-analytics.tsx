// campaign-analytics.tsx
"use client";

import { useState, useEffect } from "react";
import { CampaignDetails, BackerDetailsForCampaign } from "@/lib/db/campaigns";
import { AnalyticsContent } from "@/components/dashboard/campaigns/analytics/campaign-analytics-sections";

interface ExtendedBackerDetails extends BackerDetailsForCampaign {
	email?: string | null;
	contact_number?: string | null;
}

interface CampaignAnalyticsProps {
	campaign: CampaignDetails;
}

interface AnalyticsData {
	totalDonations: number;
	totalDonors: number;
	averageDonation: number;
	conversionRate: number;
	recentDonations: ExtendedBackerDetails[];
	donationTrends: Array<{
		date: string;
		amount: number;
		count: number;
	}>;
}

export default function CampaignAnalytics({
	campaign,
}: CampaignAnalyticsProps) {
	const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchAnalytics = async () => {
			try {
				setError(null);
				const response = await fetch(
					`/api/admin/campaigns/${campaign.slug}/analytics`,
				);
				if (response.ok) {
					const data = await response.json();
					setAnalytics(data);
				} else {
					setError("Failed to fetch analytics data");
				}
			} catch (error) {
				console.error("Error fetching analytics:", error);
				setError("Failed to fetch analytics data");
			} finally {
				setLoading(false);
			}
		};

		fetchAnalytics();
	}, [campaign.slug]);

	if (loading) {
		return (
			<div className="flex items-center justify-center py-12">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex items-center justify-center py-12">
				<div className="text-center">
					<p className="text-red-600 mb-2">{error}</p>
					<button
						onClick={() => window.location.reload()}
						className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
					>
						Retry
					</button>
				</div>
			</div>
		);
	}

	return <AnalyticsContent campaign={campaign} analytics={analytics} />;
}
