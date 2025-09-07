import { Metadata } from "next";
import { notFound } from "next/navigation";

import CampaignDetails from "@/components/campaign/details";
import { ngoDetails } from "@/config/config";
import CampaignIntro from "@/components/campaign/intro";
import { fetchCampaignDescription } from "@/lib/db/campaigns/description";
import DonorDetailsForCampaign from "@/lib/db/campaigns/donor-details";
import { CampaignService } from "@/lib/db/campaigns";

type PageProps = {
	params: Promise<{ slug: string }>;
};

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const campaign = await CampaignService.getBySlug((await params).slug);

	if (!campaign) {
		return {
			title: "Not Found",
			description: "The campaign you're looking for does not exist.",
		};
	}

	return {
		title: campaign.title,
		description:
			campaign.description ||
			`View the details of this campaign run by ${ngoDetails.name} and donate to make a difference`,
	};
}

export default async function CampaignDetailPage({ params }: PageProps) {
	const { slug } = await params;

	const campaign = await CampaignService.getBySlug(slug);
	if (!campaign) return notFound();

	const donorDetailsFinder = new DonorDetailsForCampaign(campaign.id);

	const [description, donorDetails, donorCount] = await Promise.all([
		fetchCampaignDescription(campaign.id),
		donorDetailsFinder.getBackers(4, 0),
		donorDetailsFinder.countBackers(),
	]);

	const html = description || "No description available.";

	return (
		<div className="min-h-screen">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
				<CampaignIntro
					id={campaign.id}
					bannerImage={campaign.banner_image}
					title={campaign.title}
					description={campaign.description}
					program={campaign.program || undefined}
					beneficiary={{
						name: campaign.beneficiary?.name,
						location: campaign.beneficiary?.location,
					}}
					progress={{
						collection: campaign.collection,
						total: campaign.amount,
					}}
					backerCount={campaign.backers}
				/>

				<CampaignDetails
					{...campaign}
					htmlDetails={html}
					donorDetails={{
						...donorDetails,
						count: donorCount,
					}}
				/>
			</div>
		</div>
	);
}
