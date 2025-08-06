import { doesBackerExist } from "@/lib/db/donation";
import DonationReceipt from "@/components/receipt/donation";
import { notFound } from "next/navigation";

type PageProps = {
	params: Promise<{ id: string }>;
};

export default async function DonationStatusPage({ params }: PageProps) {
	const donation = await doesBackerExist((await params).id);

	if (!donation) {
		notFound();
	}

	return <DonationReceipt id={(await params).id} />;
}
