import { CampaignService } from "@/lib/db/campaigns";
import CampaignCard from "../campaign-listing/card";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { Title } from "@mantine/core";

// Determines if the "View All" button should be at bottom for a given screen size
function isViewMoreAtBottom(nTiles: number, screenSize: "sm" | "md" | "lg") {
	if (screenSize === "sm") {
		return true;
	}

	let cols = 2; // default for md
	if (screenSize === "lg") {
		cols = 3;
	}

	// If there is space for another tile in the grid row, button goes in grid
	return nTiles % cols !== 0;
}

export const CampaignShowcase = async () => {
	const campaigns = await CampaignService.list({
		page: 0,
		search: "",
		minBackers: 0,
		maxBackers: Infinity,
		sortBy: "latest",
		tags: ["featured"],
	});

	if (!campaigns || campaigns.items.length === 0) {
		return null;
	}

	const displayedCampaigns = campaigns.items.slice(0, 3);

	const viewAllButtonCircle = (
		<Link
			href="/campaigns"
			className="flex items-center justify-center w-16 h-16 bg-sky-600 hover:bg-sky-700 rounded-full text-white transition-all duration-200 shadow-md"
		>
			<IconArrowRight size={28} />
		</Link>
	);

	const viewAllButtonWithTextCircle = (
		<div className="flex flex-col items-center gap-2">
			{viewAllButtonCircle}
			<span className="text-sky-600 font-medium">View All Campaigns</span>
		</div>
	);

	// Simple inline "View All" next to title
	const viewAllButtonInline = (
		<Link
			href="/campaigns"
			className="flex items-center gap-2 text-sky-600 font-medium hover:underline"
		>
			View All Campaigns <IconArrowRight size={20} />
		</Link>
	);

	return (
		<div className="flex flex-col px-4 py-10 sm:px-10 lg:px-20">
			{/* Title + optional "View More" */}
			<div className="flex justify-between items-center mb-6">
				<Title c="sky">Explore Campaigns</Title>

				{/* lg screen: simple inline link */}
				<div className="hidden lg:flex items-center gap-2">
					{viewAllButtonInline}
				</div>

				{/* md screen with few cards, button beside title */}
				<div className="hidden sm:flex lg:hidden">
					{!isViewMoreAtBottom(displayedCampaigns.length, "md") &&
						viewAllButtonInline}
				</div>
			</div>

			{/* Grid of campaigns */}
			<div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
				{displayedCampaigns.map((c, idx) => (
					<CampaignCard campaign={c} key={idx} />
				))}

				{/* md screen with extra space: button as 4th tile */}
				{isViewMoreAtBottom(displayedCampaigns.length, "md") && (
					<div className="hidden sm:flex lg:hidden items-center justify-center">
						{viewAllButtonWithTextCircle}
					</div>
				)}
			</div>

			{/* xs screen: always below grid */}
			<div className="flex flex-col gap-2 sm:hidden justify-center mt-6">
				{viewAllButtonWithTextCircle}
			</div>
		</div>
	);
};
