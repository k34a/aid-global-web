"use server";

import { razorpay } from "@/lib/razorpay";
import {
	createDonationIntent,
	NewDonationRequest,
	newDonationRequestSchema,
	UnableToRecordDonationIntentError,
} from "@/lib/db/donation";
import { ZodError } from "zod/v4";

interface OrderCreated {
	success: true;
	order_id: string;
	donation_intent_id: string;
}

interface OrderCreationFailed {
	success: false;
	error: string;
	message: string;
}

interface NewDonationOrderArgs
	extends Omit<NewDonationRequest, "campaign_id" | "auto_allocate"> {
	campaign_id?: string;
	auto_allocate?: boolean;
}

export async function createDonationOrder(
	data: NewDonationOrderArgs,
): Promise<OrderCreated | OrderCreationFailed> {
	try {
		// Validate input
		const {
			data: donationDetails,
			success,
			error,
		} = newDonationRequestSchema.safeParse(data);

		if (!success) {
			return {
				success: false,
				message: "Invalid request data",
				error: error.issues.map((issue) => issue.message).join(", "),
			};
		}

		const donationIntentId = await createDonationIntent(donationDetails);

		// Create Razorpay order
		const order = await razorpay.orders.create({
			amount: donationDetails.amount * 100, // convert to paise
			currency: "INR",
			receipt: donationIntentId,
		});

		return {
			success: true,
			order_id: order.id,
			donation_intent_id: donationIntentId,
		};

		// Create donation intent in DB
	} catch (error) {
		console.error("Create Donation Order Error:", error);

		if (error instanceof UnableToRecordDonationIntentError) {
			return {
				success: false,
				message: error.message,
				error: error.message,
			};
		}

		return {
			success: false,
			message: "An unknown error occurred while creating donation",
			error: "Unknown error",
		};
	}
}
