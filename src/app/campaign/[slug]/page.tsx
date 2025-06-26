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

	const initialDonors = await getBackersForCampaign(campaign.id, 5, 0);

	return (
		<div className="min-h-screen bg-gray-100">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
				<CampaignBanner
					slug={slug}
					bannerImage={campaign.banner_image}
					title={campaign.title}
					description={campaign.description}
					collection={campaign.collection}
					amount={campaign.amount}
				/>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<div className="lg:col-span-2 space-y-8">
						<CampaignDescription markdown={markdown} />
					</div>

					<div className="space-y-8">
						<CampaignSidebar
							backers={campaign.backers}
							goal={campaign.amount}
							currentAmount={campaign.collection}
						/>
						<DonorList
							campaignId={campaign.id}
							initialDonors={initialDonors || []}
						/>
					</div>
				</div>

				<CampaignProducts
					products={campaign.campaign_products || []}
					slug={slug}
					campaignId={campaign.id}
				/>
			</div>
		</div>
	);
}
