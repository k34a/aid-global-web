import DonationReceipt from "@/components/receipt/donation";
import Donors from "@/lib/db/backers/donors";
import { notFound } from "next/navigation";
import { z } from "zod/v4";

type PageProps = {
	params: Promise<{ id: string }>;
};

export default async function DonationStatusPage({ params }: PageProps) {
	const slugId = (await params).id;
	if (!z.uuid().safeParse(slugId).success) {
		notFound();
	}
	const donation = await Donors.doesExist(slugId);

	if (!donation) {
		notFound();
	}

	return <DonationReceipt id={(await params).id} />;
}
