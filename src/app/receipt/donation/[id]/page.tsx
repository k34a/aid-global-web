import { doesBackerExist } from "@/lib/db/donation";
import DonationReceipt from "@/components/receipt";

type PageProps = {
	params: Promise<{ id: string }>;
};

export default async function DonationStatusPage({ params }: PageProps) {
	const donation = await doesBackerExist((await params).id);

	if (!donation) {
		return (
			<div className="max-w-2xl mx-auto p-6 text-center">
				<h1 className="text-2xl font-bold text-red-600">
					404 - Not Found
				</h1>
				<p className="mt-2 text-gray-600">
					We couldn&apos;t find a donation with this ID.
				</p>
			</div>
		);
	}

	return <DonationReceipt id={(await params).id} />;
}
