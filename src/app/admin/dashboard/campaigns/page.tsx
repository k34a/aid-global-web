import AllCampaignsGrid from "@/components/dashboard/campaigns/all-campaigns-grid";
import { getCampaigns } from "@/lib/db/campaigns";
import Link from "next/link";
import { Plus } from "lucide-react";

const Page = async () => {
	const campaigns = await getCampaigns(null);

	return (
		<div className="flex flex-col gap-4">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold">All Campaigns</h1>
				<Link
					href="/admin/dashboard/campaigns/new"
					className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
				>
					<Plus className="w-4 h-4" />
					Create New Campaign
				</Link>
			</div>
			<AllCampaignsGrid
				data={campaigns.map((campaign) => ({ ...campaign }))}
			/>
		</div>
	);
};

export default Page;
