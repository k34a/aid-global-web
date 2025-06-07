import { NextRequest, NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";
import {
	createNewBacker,
	newDonationRequestSchema,
	UnableToCreateBackerError,
} from "@/lib/db/donation";
import { ZodError } from "zod/v4";
import type { CustomRequestError } from "@/lib/types";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const donationDetails = newDonationRequestSchema.parse(body);
		const backer = await createNewBacker(donationDetails);

		const order = await razorpay.orders.create({
			amount: backer.amount * 100, // paise
			currency: "INR",
			receipt: backer.id,
		});

		return NextResponse.json({
			order_id: order.id,
			backer_id: backer.id,
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

		if (error instanceof UnableToCreateBackerError) {
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
