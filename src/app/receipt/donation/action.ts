"use server";

import { getBackerDetailsById } from "@/lib/db/donation";

export const getDonationDetails = async (id: string, pin: string) => {
	const donation = await getBackerDetailsById(id);

	if (!donation) {
		return null;
	}

	if (donation.contact_number.endsWith(pin)) {
		return donation;
	}

	return {
		error: "Invalid PIN. Please try again.",
	};
};
