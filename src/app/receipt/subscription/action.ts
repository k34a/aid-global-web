"use server";

import Subscribers from "@/lib/db/backers/subscribers";
import { Subscription } from "@/lib/db/donation/create/subscription";
import { SubscriptionWebhookManager } from "@/lib/db/donation/manage/subscription/manager";

export const getSubscriptionDetails = async (id: string, pin: string) => {
	const donation = await Subscribers.getDetailsById(id);

	if (!donation) {
		return null;
	}

	if (donation.phone.endsWith(pin)) {
		return donation;
	}

	return {
		error: "Invalid PIN. Please try again.",
	};
};

export const cancelSubscription = async (
	razorpay_subscription_id: string,
	pin: string,
) => {
	try {
		const manager = await SubscriptionWebhookManager.init(
			razorpay_subscription_id,
		);
		await manager.cancel(pin);
	} catch (error) {
		console.error(error);
		return {
			status: false,
			error: {
				title: "Unable to cancel your subscription",
				message: (error as Error).message,
			},
		};
	}
};

export const restartSubscription = async (
	razorpay_subscription_id: string,
	pin: string,
) => {
	try {
		return await Subscription.restart(razorpay_subscription_id, pin);
	} catch (error) {
		console.error(error);
		return {
			status: false,
			error: {
				title: "Unable to restart your subscription",
				message: (error as Error).message,
			},
		};
	}
};
