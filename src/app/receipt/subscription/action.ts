"use server";

import { getSubscriptionDetailsById } from "@/lib/db/donation";

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
