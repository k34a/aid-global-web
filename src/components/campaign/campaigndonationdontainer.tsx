"use client";

import CampaignBanner from "./campaignbanner";
import CampaignProducts from "./campaignproducts";

interface CampaignDonationContainerProps {
	slug: string;
	bannerImage: string;
	title: string;
	description?: string;
	collection?: number;
	amount?: number;
	products: any[];
	campaign_id: string;
}

export default function CampaignDonationContainer({
	slug,
	bannerImage,
	title,
	description,
	collection,
	amount,
	products,
	campaign_id,
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
				campaignId={campaign_id}
			/>
		</>
	);
}
