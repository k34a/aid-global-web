"use client";

import CampaignBanner from "./campaignbanner";
import CampaignProducts from "./campaignproducts";

interface CampaignProduct {
	id: number;
	campaign_id: number;
	title: string;
	description: string;
	price_per_unit: number;
	image?: string;
	units_required: number;
	units_collected: number;
}

interface CampaignDonationContainerProps {
	slug: string;
	bannerImage: string;
	title: string;
	description?: string;
	collection?: number;
	amount?: number;
	products: CampaignProduct[];
	campaignId: string;
}

export default function CampaignDonationContainer({
	slug,
	bannerImage,
	title,
	description,
	collection,
	amount,
	products,
	campaignId,
}: CampaignDonationContainerProps) {
	return (
		<>
			<CampaignBanner
				slug={slug}
				bannerImage={bannerImage}
				title={title}
				description={description}
				collection={collection}
				amount={amount}
			/>

			<CampaignProducts
				products={products}
				slug={slug}
				campaignId={campaignId}
			/>
		</>
	);
}
