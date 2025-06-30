"use client";

import { useState } from "react";
import { CampaignDetails } from "@/lib/db/campaigns";
import CampaignEditForm from "./campaign-edit-form";
import CampaignAnalytics from "./campaign-analytics";
import { Edit, BarChart3 } from "lucide-react";

interface CampaignTabsProps {
	campaign: CampaignDetails;
}

export default function CampaignTabs({ campaign }: CampaignTabsProps) {
	const [activeTab, setActiveTab] = useState("edit");

	const tabs = [
		{
			id: "edit",
			label: "Edit Campaign",
			icon: Edit,
		},
		{
			id: "analytics",
			label: "Analytics",
			icon: BarChart3,
		},
	];

	return (
		<div className="space-y-6">
			{/* Tab Navigation */}
			<div className="border-b border-gray-200">
				<nav className="-mb-px flex space-x-8">
					{tabs.map((tab) => {
						const Icon = tab.icon;
						return (
							<button
								key={tab.id}
								onClick={() => setActiveTab(tab.id)}
								className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
									activeTab === tab.id
										? "border-blue-500 text-blue-600"
										: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
								}`}
							>
								<Icon className="w-4 h-4" />
								{tab.label}
							</button>
						);
					})}
				</nav>
			</div>

			{/* Tab Content */}
			<div>
				{activeTab === "edit" && (
					<CampaignEditForm campaign={campaign} />
				)}
				{activeTab === "analytics" && (
					<CampaignAnalytics campaign={campaign} />
				)}
			</div>
		</div>
	);
}
