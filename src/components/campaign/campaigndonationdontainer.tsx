"use client";

import { CampaignProduct } from "@/lib/db/campaigns";
import CampaignBanner from "./campaignbanner";
import CampaignProducts from "./campaignproducts";

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
