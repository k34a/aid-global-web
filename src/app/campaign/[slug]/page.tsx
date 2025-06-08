import { getCampaignBySlug } from "@/lib/db/campaigns";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Donation Status",
	description: "View the status of your donation and download the receipt",
	openGraph: {
		title: "Donation Status",
		description:
			"View the status of your donation and download the receipt",
	},
	twitter: {
		card: "summary_large_image",
		title: "Donation Status",
		description:
			"View the status of your donation and download the receipt",
	},
};

type PageProps = {
	params: Promise<{ slug: string }>;
};

export default async function DonationStatusPage({ params }: PageProps) {
	// const data = await getCampaignBySlug((await params).slug);
	const data = {
		id: "81263c39-4c04-460d-af9c-585937104b6f",
		title: "Camp1",
		description: "sdssd.sadsa sads sad as da",
		slug: "asa",
		amount: 10000000,
		created_at: "2025-06-08T06:14:20.545093+00:00",
		ended_at: null,
		collection: 105,
		backers: 2,
		unallocated_amount: 5,
		campaign_products: [
			{
				id: "71246dba-94fd-4d13-8fb9-4ffc733acfbd",
				image: "p1",
				title: "p1",
				campaign_id: "81263c39-4c04-460d-af9c-585937104b6f",
				description: null,
				price_per_unit: 10,
				units_required: 5000,
				units_collected: 5,
			},
			{
				id: "3f506987-646a-4544-8653-d3a90dd1a07b",
				image: "p2",
				title: "p2",
				campaign_id: "81263c39-4c04-460d-af9c-585937104b6f",
				description: null,
				price_per_unit: 25,
				units_required: 5000,
				units_collected: 2,
			},
		],
	};
	console.log(data);
	return (
		<main className="max-w-3xl mx-auto p-6 bg-white print:bg-white rounded-xl shadow print:shadow-none text-sm text-black"></main>
	);
}
