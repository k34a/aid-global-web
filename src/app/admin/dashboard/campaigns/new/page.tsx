import CampaignCreateForm from "@/components/dashboard/campaigns/create/campaign-create-form";

export default function NewCampaignPage() {
	return (
		<main className="max-w-4xl mx-auto p-6">
			<div className="mb-6">
				<h1 className="text-3xl font-bold text-gray-900">
					Create New Campaign
				</h1>
				<p className="text-gray-600 mt-2">
					Set up a new fundraising campaign
				</p>
			</div>

			<CampaignCreateForm />
		</main>
	);
}
