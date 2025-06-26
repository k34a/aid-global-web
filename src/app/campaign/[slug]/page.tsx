import { Metadata } from "next";
import { notFound } from "next/navigation";

import { fetchCampaignMarkdown } from "@/lib/db/fetchmarkdown";
import { getCampaignBySlug, getBackersForCampaign } from "@/lib/db/campaigns";

import CampaignBanner from "@/components/campaign/campaignbanner";
import CampaignDescription from "@/components/campaign/campaigndescription";
import CampaignSidebar from "@/components/campaign/campaignsidebar";
import CampaignProducts from "@/components/campaign/campaignproducts";
import DonorList from "@/components/campaign/donorlist";

export const metadata: Metadata = {
	title: "Campaign Details",
	description: "View campaign details and donate to make a difference",
};

type PageProps = {
	params: Promise<{ slug: string }>;
};

export default async function CampaignDetailPage({ params }: PageProps) {
	const { slug } = await params;
	const campaign = await getCampaignBySlug(slug);
	if (!campaign) return notFound();

	const markdown =
		(await fetchCampaignMarkdown(slug)) || "No description available.";

	// Fetch top 5 donors for display on the page
	const initialDonors = await getBackersForCampaign(campaign.id, 5, 0);

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
			{/* Decorative background elements */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
				<div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
				<div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
			</div>

			<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
				{/* Enhanced banner with backdrop blur */}
				<div className="relative">
					<CampaignBanner
						slug={slug}
						bannerImage={campaign.banner_image}
						title={campaign.title}
						description={campaign.description}
						collection={campaign.collection}
						amount={campaign.amount}
					/>
				</div>

				{/* Main content grid with enhanced styling */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Left column - Description */}
					<div className="lg:col-span-2 space-y-8">
						<div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-xl p-8">
							<CampaignDescription markdown={markdown} />
						</div>
					</div>

					{/* Right column - Sidebar and Donors */}
					<div className="space-y-8">
						{/* Campaign sidebar with enhanced styling */}
						<div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-xl p-6">
							<CampaignSidebar
								backers={campaign.backers}
								goal={campaign.amount}
								currentAmount={campaign.collection}
							/>
						</div>

						{/* Donor list - now with initial data */}
						<DonorList
							campaignId={campaign.id}
							initialDonors={initialDonors || []}
						/>
					</div>
				</div>

				{/* Products section with enhanced styling */}
				<div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50 shadow-xl p-8">
					<CampaignProducts
						products={campaign.campaign_products || []}
						slug={slug}
						campaignId={campaign.id}
					/>
				</div>
			</div>
		</div>
	);
}
