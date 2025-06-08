import { NextRequest, NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";
import {
	createDonationIntent,
	newDonationRequestSchema,
	UnableToRecordDonationIntentError,
} from "@/lib/db/donation";
import { ZodError } from "zod/v4";
import type { CustomRequestError } from "@/lib/types";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const donationDetails = newDonationRequestSchema.parse(body);
		const donationIntentId = await createDonationIntent(donationDetails);

		const order = await razorpay.orders.create({
			amount: donationDetails.amount * 100, // paise
			currency: "INR",
			receipt: donationIntentId,
		});

		return NextResponse.json({
			order_id: order.id,
			donation_intent_id: donationIntentId,
		});
	} catch (error) {
		console.error(error);
		const errorDetails: CustomRequestError = {
			message: "Error creating donation",
			error: "Unknown error",
			status: 500,
		};

		if (error instanceof ZodError) {
			errorDetails.message = "Invalid request data";
			errorDetails.error = error.issues;
			errorDetails.status = 400;
		}

		if (error instanceof UnableToRecordDonationIntentError) {
			errorDetails.message = error.message;
			errorDetails.error = error.message;
			errorDetails.status = 409;
		}
		return NextResponse.json(
			{
				success: false,
				message: errorDetails.message,
				error: errorDetails.error,
			},
			{ status: errorDetails.status },
		);
	}
}
