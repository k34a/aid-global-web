"use client";

import { Button, Group, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import toast from "react-hot-toast";
import { cancelSubscription } from "@/app/receipt/subscription/action";
import { useRouter } from "next/navigation";

type Props = {
	pin: string;
	razorpay_subscription_id: string;
};

export default function CancelSubscriptionModal({
	pin,
	razorpay_subscription_id,
}: Props) {
	const [opened, { open, close }] = useDisclosure(false);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleConfirmCancel = async () => {
		setLoading(true);
		try {
			const result = await cancelSubscription(
				razorpay_subscription_id,
				pin,
			);
			if (result && result.error) {
				toast.error(result.error.message);
			} else {
				toast.success(
					"Subscription cancellation requested. The status will update on your receipt at the end of the current billing cycle.",
					{ duration: 5000 },
				);
				router.refresh();
				close();
			}
		} catch (error) {
			console.error(error);
			toast.error("Unable to cancel your subscription.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<p className="text-slate-500">
				If you&apos;ve already requested to cancel your subscription,
				please wait until the end of your current billing cycle for the
				updated status to appear on your receipt.
			</p>

			<Button color="red" onClick={open}>
				Cancel Subscription
			</Button>

			<Modal
				opened={opened}
				onClose={close}
				title="Cancel Subscription"
				centered
			>
				<Text mb="md">
					Are you sure you want to cancel your subscription? This
					action cannot be undone.
				</Text>

				<Group justify="flex-end">
					<Button
						variant="outline"
						color="red"
						onClick={handleConfirmCancel}
						loading={loading}
					>
						Yes, Cancel It
					</Button>
					<Button variant="filled" onClick={close}>
						No, don&apos;t cancel
					</Button>
				</Group>
			</Modal>
		</>
	);
}
