import AllCampaignsGrid from "@/components/dashboard/campaigns/all-campaigns-grid";
import { getCampaigns } from "@/lib/db/campaigns";

const Page = async () => {
	const campaigns = await getCampaigns(null);

	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-2xl font-bold">All Campaigns</h1>
			<AllCampaignsGrid
				data={campaigns.map((campaign) => ({ ...campaign }))}
			/>
		</div>
	);
};

export default Page;
