import { doesSubscriptionExist } from "@/lib/db/donation";
import SubscriptionReceipt from "@/components/receipt/subscription";
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
	const exist = await doesSubscriptionExist(slugId);

	if (!exist) {
		notFound();
	}

	return <SubscriptionReceipt id={(await params).id} />;
}
