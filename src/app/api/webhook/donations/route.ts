import { NextRequest, NextResponse } from "next/server";
import { capturePayment } from "@/lib/db/donation";
import razorpay from "razorpay";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const signature = request.headers.get("X-Razorpay-Signature") ?? "";
		const secret = process.env.RAZORPAY_WEBHOOK_SECRET!;

		if (
			!razorpay.validateWebhookSignature(
				JSON.stringify(body),
				signature,
				secret,
			)
		) {
			console.error("Invalid signature:", signature);
			return NextResponse.json(
				{ error: "Invalid signature", success: false },
				{ status: 400 },
			);
		}

		const event = body.event;
		const paymentEntity = body.payload.payment.entity;
		const { id: paymentId, order_id: orderId } = paymentEntity;

		if (!paymentId || !orderId) {
			console.error(
				"Missing required fields in payment entity:",
				paymentEntity,
			);
			return NextResponse.json(
				{
					error: "Missing required fields in payment entity",
					success: false,
				},
				{ status: 400 },
			);
		}

		if (event === "payment.captured") {
			await capturePayment(orderId, paymentId);
		}

		return NextResponse.json(
			{ status: "success", message: "Webhook processed successfully" },
			{ status: 200 },
		);
	} catch (error) {
		console.error("Error processing webhook:", error);
		return NextResponse.json(
			{
				error: "Error processing webhook",
				success: false,
			},
			{ status: 500 },
		);
	}
}
