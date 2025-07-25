import CampaignCard from "./campaigncard";
import Link from "next/link";
import { getCampaigns } from "@/lib/db/campaigns";
import { CircleDotDashed, ArrowRight, ChevronDown } from "lucide-react";

export default async function CampaignList() {
	const campaigns = await getCampaigns(null);

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
		<div className="min-h-screen pt-6 sm:pt-8 md:pt-10 pb-2 sm:pb-3 md:pb-4 px-2 sm:px-4 md:px-6">
			<div className="flex flex-col sm:flex-row sm:justify-between mx-2 sm:mx-4 md:mx-8 lg:mx-10 gap-2 sm:gap-0">
				<h2 className="text-base sm:text-lg font-bold flex items-center gap-2">
					<CircleDotDashed className="text-sky-600 h-5 w-5 sm:h-6 sm:w-6 font-bold" />
					Active Campaigns
				</h2>
				<Link
					href="/campaign"
					className="text-sky-600 font-medium text-sm sm:text-md hover-underline flex items-center gap-1"
				>
					View All <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
				</Link>
			</div>
			<div className="flex flex-row justify-center">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 y-6 sm:my-8 md:my-10 mx-2 sm:mx-4 md:mx-10 lg:mx-10 px-2 sm:px-4 md:px-8 lg:px-10">
					{campaigns.slice(0, 3).map((campaign) => (
						<div
							key={campaign.id}
							className="w-full max-w-xs flex-shrink-0 bg-white rounded-2xl shadow-lg flex flex-col border-2 border-transparent z-10"
						>
							<CampaignCard campaign={campaign} />
						</div>
					))}
				</div>
			</div>
			<div className="flex justify-center mt-6 block lg:hidden">
				<Link
					href="/campaign"
					className="flex items-center bg-orange-600 text-white font-semibold px-2 py-2 rounded-full shadow-lg hover:bg-orange-700 transition text-base"
				>
					View More <ChevronDown className="w-7 h-7 py-1" />
				</Link>
			</div>
		</div>
	);
}
