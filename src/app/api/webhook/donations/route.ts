import { PaymentManager } from "@/lib/db/donation/payment-manager";
import { SubscriptionManager } from "@/lib/db/donation/subscription-manager";
import { NextRequest, NextResponse } from "next/server";
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

		const event = body.event as string;
		console.log("Received razropay event: ", event);

		if (event.startsWith("payment")) {
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

			const paymentManager = new PaymentManager(orderId, paymentId);

			switch (event) {
				case "payment.authorized":
					await paymentManager.authorizePayment();
					break;
				case "payment.captured":
					await paymentManager.capturePayment();
					break;
				case "payment.failed":
					await paymentManager.failedPayment();
			}
		}

		if (event.startsWith("subscription")) {
			const subEntity = body.payload.subscription.entity;
			const { id: subId } = subEntity;

			if (!subId) {
				console.error(
					"Missing required fields in payment entity:",
					subEntity,
				);
				return NextResponse.json(
					{
						error: "Missing required fields in payment entity",
						success: false,
					},
					{ status: 400 },
				);
			}

			const subManager = new SubscriptionManager(subId);

			switch (event) {
				case "subscription.authenticated":
					await subManager.onAuthenticated();
					break;
				case "subscription.activated":
					await subManager.onActivated();
					break;
				case "subscription.charged":
					const paymentEntity = body.payload.payment.entity;
					await subManager.onCharged(
						paymentEntity.amount,
						paymentEntity.id,
					);
					break;
				case "subscription.completed":
					await subManager.onCompleted();
					break;
				case "subscription.pending":
					await subManager.onPending();
					break;
				case "subscription.halted":
					await subManager.onHalted();
					break;
				case "subscription.paused":
					await subManager.onPaused();
					break;
				case "subscription.resumed":
					await subManager.onResumed();
					break;
				case "subscription.cancelled":
					await subManager.onCancelled();
					break;
			}
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
