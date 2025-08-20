import { doesBackerExist } from "@/lib/db/donation";
import DonationReceipt from "@/components/receipt/donation";
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
	const donation = await doesBackerExist(slugId);

	if (!donation) {
		notFound();
	}

	return <DonationReceipt id={(await params).id} />;
}
