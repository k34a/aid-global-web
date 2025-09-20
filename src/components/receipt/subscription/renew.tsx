"use client";

import { Button, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import toast from "react-hot-toast";
import { restartSubscription } from "@/app/receipt/subscription/action";
import { callbackBaseUrl, RazorpayScript } from "@/components/donate";
import { ngoDetails } from "@/config/config";
import z from "zod/v4";
import { userInfoSchema } from "@/lib/db/donation/create/base";

type Props = {
	pin: string;
	razorpay_subscription_id: string;
	userInfo: z.infer<typeof userInfoSchema>;
};

export default function RestartSubscriptionModal({
	pin,
	razorpay_subscription_id,
	userInfo,
}: Props) {
	const [opened, { open, close }] = useDisclosure(false);
	const [loading, setLoading] = useState(false);

	const handleConfirmRestart = async () => {
		setLoading(true);
		try {
			const result = await restartSubscription(
				razorpay_subscription_id,
				pin,
			);
			if (result && "error" in result) {
				toast.error(result.error.message);
			} else {
				const options = {
					key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
					subscription_id: result.data.razorpay_subscription_id,
					name: ngoDetails.name,
					description: ngoDetails.description,
					logo: ngoDetails.logo,
					callback_url: `${callbackBaseUrl}/receipt/subscription/${result.data.donation_intent_id}`,
					prefill: {
						name: userInfo.name,
						email: userInfo.email,
						contact: userInfo.contact_number,
					},
					theme: {
						color: "#3399cc",
					},
				};

				const rzp1 = new window.Razorpay(options);
				rzp1.open();
			}
		} catch (error) {
			console.error(error);
			toast.error("Unable to restart your subscription.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<RazorpayScript />
			<Button color="green" onClick={open}>
				Renew Subscription
			</Button>
			<Modal
				opened={opened}
				onClose={close}
				title="Renew Subscription"
				centered
			>
				<Text mb="md">
					Are you sure you want to restart your subscription?
				</Text>
				<Button
					color="green"
					onClick={handleConfirmRestart}
					loading={loading}
				>
					Yes, Renew It
				</Button>
			</Modal>
		</>
	);
}
