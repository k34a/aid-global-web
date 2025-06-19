import CampaignCard from "./campaigncard";
import { getAllCampaigns } from "@/lib/db/campaigns";

export default async function CampaignList() {
	const campaigns = await getAllCampaigns();

	// Debug: Log campaigns data
	console.log("All campaigns from database:", campaigns);

	// If no campaigns found, show a message
	if (!campaigns || campaigns.length === 0) {
		return (
			<div className="text-center py-10">
				<p className="text-gray-500">
					No campaigns available at the moment.
				</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{campaigns.map((campaign) => (
				<CampaignCard key={campaign.id} campaign={campaign} />
			))}
		</div>
	);
}
