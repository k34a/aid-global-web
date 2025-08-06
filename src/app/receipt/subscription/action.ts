"use server";

import { getSubscriptionDetailsById } from "@/lib/db/donation";
import { SubscriptionManager } from "@/lib/db/donation/subscription-manager";

export const getSubscriptionDetails = async (id: string, pin: string) => {
	const donation = await getSubscriptionDetailsById(id);

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
		const manager = new SubscriptionManager(razorpay_subscription_id);
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
		const manager = new SubscriptionManager(razorpay_subscription_id);
		const data = await manager.restart(pin);
		return data;
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
