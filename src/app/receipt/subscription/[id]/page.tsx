import { doesSubscriptionExist } from "@/lib/db/donation";
import SubscriptionReceipt from "@/components/receipt/subscription";
import { notFound } from "next/navigation";

type PageProps = {
	params: Promise<{ id: string }>;
};

export default async function DonationStatusPage({ params }: PageProps) {
	const exist = await doesSubscriptionExist((await params).id);

	if (!exist) {
		notFound();
	}

	return <SubscriptionReceipt id={(await params).id} />;
}
