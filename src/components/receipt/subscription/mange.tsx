"use client";

import { Group, Text } from "@mantine/core";
import CancelSubscriptionModal from "./cancel";
import RestartSubscriptionModal from "./renew";
import { userInfoSchema } from "@/lib/db/donation/donation";
import { z } from "zod/v4";

type Props = {
	pin: string;
	razorpay_subscription_id: string;
	current_status: string;
	userInfo: z.infer<typeof userInfoSchema>;
};

export default function ManageSubscription(props: Props) {
	return (
		<div className="mt-6 border-t pt-4">
			<Text fw={500} mb="sm">
				Manage Your Donation Subscription
			</Text>
			<Group>
				{!["Complete", "Cancelled"].includes(props.current_status) ? (
					<CancelSubscriptionModal
						pin={props.pin}
						razorpay_subscription_id={
							props.razorpay_subscription_id
						}
					/>
				) : (
					<RestartSubscriptionModal
						userInfo={props.userInfo}
						pin={props.pin}
						razorpay_subscription_id={
							props.razorpay_subscription_id
						}
					/>
				)}
			</Group>
		</div>
	);
}
