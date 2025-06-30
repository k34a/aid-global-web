import { getCampaignBySlug } from "@/lib/db/campaigns";
import { notFound } from "next/navigation";
import CampaignTabs from "@/components/dashboard/campaigns/campaign-tabs";

type PageProps = {
	params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
	const { slug } = await params;
	const campaign = await getCampaignBySlug(slug);

	if (!campaign) {
		return notFound();
	}

	return (
		<main className="max-w-7xl mx-auto p-6">
			<div className="mb-6">
				<h1 className="text-3xl font-bold text-gray-900">
					{campaign.title}
				</h1>
				<p className="text-gray-600 mt-2">
					Manage campaign details and view analytics
				</p>
			</div>

			<CampaignTabs campaign={campaign} />
		</main>
	);
}
