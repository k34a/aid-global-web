"use client";

import {
	calculateProgress,
	formatCurrency,
	formatDate,
	getInitials,
} from "@/lib/utils/analytics";

import {
	Users,
	IndianRupee,
	TrendingUp,
	Calendar,
	BarChart3,
	PieChart,
	Mail,
	Phone,
} from "lucide-react";

import { CampaignDetails, BackerDetailsForCampaign } from "@/lib/db/campaigns";

interface ExtendedBackerDetails extends BackerDetailsForCampaign {
	email?: string | null;
	contact_number?: string | null;
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

export function AnalyticsContent({
	campaign,
	analytics,
}: {
	campaign: CampaignDetails;
	analytics: AnalyticsData | null;
}) {
	return (
		<div className="space-y-6">
			{/* Key Metrics */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{/* Total Raised */}
				<div className="bg-white rounded-lg shadow-sm border p-6">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600">
								Total Raised
							</p>
							<p className="text-2xl font-bold text-gray-900">
								{formatCurrency(campaign.collection)}
							</p>
						</div>
						<div className="p-3 bg-green-100 rounded-full">
							<IndianRupee className="w-6 h-6 text-green-600" />
						</div>
					</div>
					<div className="mt-4">
						<div className="flex items-center justify-between text-sm">
							<span className="text-gray-600">Progress</span>
							<span className="font-medium text-gray-900">
								{calculateProgress(
									campaign.collection,
									campaign.amount,
								).toFixed(1)}
								%
							</span>
						</div>
						<div className="mt-2 w-full bg-gray-200 rounded-full h-2">
							<div
								className="bg-green-600 h-2 rounded-full transition-all duration-300"
								style={{
									width: `${Math.min(
										calculateProgress(
											campaign.collection,
											campaign.amount,
										),
										100,
									)}%`,
								}}
							/>
						</div>
					</div>
				</div>

				{/* Total Donors */}
				<div className="bg-white rounded-lg shadow-sm border p-6">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600">
								Total Donors
							</p>
							<p className="text-2xl font-bold text-gray-900">
								{campaign.backers}
							</p>
						</div>
						<div className="p-3 bg-blue-100 rounded-full">
							<Users className="w-6 h-6 text-blue-600" />
						</div>
					</div>
					<div className="mt-4">
						<p className="text-sm text-gray-600">
							Target: {formatCurrency(campaign.amount)}
						</p>
					</div>
				</div>

				{/* Average Donation */}
				<div className="bg-white rounded-lg shadow-sm border p-6">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600">
								Avg. Donation
							</p>
							<p className="text-2xl font-bold text-gray-900">
								{campaign.backers > 0
									? formatCurrency(
											campaign.collection /
												campaign.backers,
										)
									: formatCurrency(0)}
							</p>
						</div>
						<div className="p-3 bg-purple-100 rounded-full">
							<TrendingUp className="w-6 h-6 text-purple-600" />
						</div>
					</div>
					<div className="mt-4">
						<p className="text-sm text-gray-600">Per donor</p>
					</div>
				</div>

				{/* Days Left */}
				<div className="bg-white rounded-lg shadow-sm border p-6">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600">
								Days Left
							</p>
							<p className="text-2xl font-bold text-gray-900">
								{campaign.ended_at
									? Math.max(
											0,
											Math.ceil(
												(new Date(
													campaign.ended_at,
												).getTime() -
													new Date().getTime()) /
													(1000 * 60 * 60 * 24),
											),
										)
									: "∞"}
							</p>
						</div>
						<div className="p-3 bg-orange-100 rounded-full">
							<Calendar className="w-6 h-6 text-orange-600" />
						</div>
					</div>
					<div className="mt-4">
						<p className="text-sm text-gray-600">
							{campaign.ended_at
								? "Until end date"
								: "No end date"}
						</p>
					</div>
				</div>
			</div>

			{/* Recent Donations */}
			<div className="bg-white rounded-lg shadow-sm border">
				<div className="p-6 border-b border-gray-200">
					<h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
						<BarChart3 className="w-5 h-5" />
						Recent Donations
					</h3>
				</div>
				<div className="p-6">
					{analytics?.recentDonations?.length ? (
						<div className="space-y-4">
							{analytics.recentDonations
								.slice(0, 5)
								.map((donation) => (
									<div
										key={donation.id}
										className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
									>
										<div className="flex items-center gap-4">
											<div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
												<span className="text-sm font-medium text-blue-600">
													{getInitials(donation.name)}
												</span>
											</div>
											<div>
												<p className="font-medium text-gray-900">
													{donation.is_anon
														? "Anonymous"
														: donation.name ||
															"Unknown"}
												</p>
												{!donation.is_anon &&
													donation.email && (
														<div className="flex items-center gap-1 text-sm text-gray-600">
															<Mail className="w-3 h-3" />
															<span>
																{donation.email}
															</span>
														</div>
													)}
												{!donation.is_anon &&
													donation.contact_number && (
														<div className="flex items-center gap-1 text-sm text-gray-600">
															<Phone className="w-3 h-3" />
															<span>
																{
																	donation.contact_number
																}
															</span>
														</div>
													)}
												<p className="text-sm text-gray-600">
													{formatDate(
														donation.created_at.toString(),
													)}
												</p>
											</div>
										</div>
										<div className="text-right">
											<p className="font-semibold text-gray-900">
												{formatCurrency(
													donation.amount,
												)}
											</p>
										</div>
									</div>
								))}
						</div>
					) : (
						<div className="text-center py-8">
							<p className="text-gray-500">No donations yet</p>
						</div>
					)}
				</div>
			</div>

			{/* Product Summary */}
			<div className="bg-white rounded-lg shadow-sm border">
				<div className="p-6 border-b border-gray-200">
					<h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
						<PieChart className="w-5 h-5" />
						Products Summary
					</h3>
				</div>
				<div className="p-6">
					{campaign.campaign_products?.length ? (
						<div className="space-y-4">
							{campaign.campaign_products.map((product) => {
								const progress =
									product.units_required > 0
										? (product.units_collected /
												product.units_required) *
											100
										: 0;

								return (
									<div
										key={product.id}
										className="border rounded-lg p-4"
									>
										<div className="flex items-center justify-between mb-2">
											<h4 className="font-medium text-gray-900">
												{product.title}
											</h4>
											<span className="text-sm text-gray-600">
												{product.units_collected}/
												{product.units_required} units
											</span>
										</div>
										<div className="w-full bg-gray-200 rounded-full h-2 mb-2">
											<div
												className="bg-blue-600 h-2 rounded-full transition-all duration-300"
												style={{
													width: `${Math.min(progress, 100)}%`,
												}}
											/>
										</div>
										<div className="flex justify-between text-sm text-gray-600">
											<span className="flex items-center gap-1">
												<IndianRupee className="w-3 h-3" />
												{product.price_per_unit} per
												unit
											</span>
											<span>
												{progress.toFixed(1)}% complete
											</span>
										</div>
									</div>
								);
							})}
						</div>
					) : (
						<div className="text-center py-8">
							<p className="text-gray-500">
								No products added to this campaign
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
