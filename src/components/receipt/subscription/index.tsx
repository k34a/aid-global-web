"use client";

import { Paper } from "@mantine/core";
import ReceiptHeader from "@/components/receipt/common/head";
import ReceiptThankYou from "@/components/receipt/common/thank-you";
import SubscriberInfo from "./subscriber-info";
import SubscriptionPlanInfo from "./plan-info";
import ChargeTable from "./charge-table";
import TaxNote from "@/components/receipt/common/tax-note";
import DownloadReceipt from "@/components/receipt/common/download-receipt";
import ReceiptFooter from "@/components/receipt/common/foot";
import { useState } from "react";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import VerifyPinModal from "@/components/receipt/common/verification";
import { getSubscriptionDetails } from "@/app/receipt/subscription/action";
import type { SubscriptioDetails } from "@/lib/db/donation";
import ManageSubscription from "./mange";

type Props = {
	id: string;
};

export default function SubscriptionReceipt({ id }: Props) {
	const [subscription, setSubscription] = useState<SubscriptioDetails | null>(
		null,
	);
	const [loading, setLoading] = useState(false);
	const [modalOpen, setModalOpen] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [pin, setPin] = useState("");

	const handleVerify = async (filledPin: string) => {
		setLoading(true);
		setError(null);
		setPin(filledPin);

		const res = await getSubscriptionDetails(id, filledPin);

		if (!res) {
			toast.error("Subscription not found!");
			redirect("/");
		}

		if ("error" in res) {
			setError(res.error);
			setLoading(false);
			return;
		}

		setSubscription(res);
		setModalOpen(false);
		setLoading(false);
	};

	if (!subscription) {
		return (
			<VerifyPinModal
				opened={modalOpen}
				onSuccess={handleVerify}
				loading={loading}
				error={error}
			/>
		);
	}

	return (
		<main className="max-w-3xl mx-auto p-6 bg-white print:bg-white rounded-xl shadow print:shadow-none text-sm text-black">
			<Paper shadow="md" radius="lg" p="lg" withBorder>
				<ReceiptHeader />
				<ReceiptThankYou />
				<SubscriberInfo
					id={subscription.id}
					name={subscription.name}
					email={subscription.email}
					phone={subscription.phone}
					pan={subscription.pan}
					address={subscription.address}
					status={subscription.status}
					start_date={subscription.start_date}
					end_date={subscription.end_date}
				/>
				<SubscriptionPlanInfo
					planName={subscription.subscription_plans.name}
				/>
				<ChargeTable charges={subscription.charges} />
				<TaxNote />
				<DownloadReceipt />
				<ReceiptFooter id={subscription.id} />
				<ManageSubscription
					razorpay_subscription_id={
						subscription.razorpay_subscription_id
					}
					pin={pin}
					current_status={subscription.status}
					userInfo={{
						name: subscription.name,
						email: subscription.email,
						pan_number: subscription.pan,
						address: subscription.address,
						contact_number: subscription.phone,
						notes: "",
					}}
				/>
			</Paper>
		</main>
	);
}
