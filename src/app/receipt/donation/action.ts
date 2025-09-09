"use server";

import Donors from "@/lib/db/backers/donors";

export const getDonationDetails = async (id: string, pin: string) => {
	const donation = await Donors.getDetailsById(id);

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
