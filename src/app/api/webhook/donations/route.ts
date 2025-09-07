import { PaymentManager } from "@/lib/db/donation/payment-manager";
import { SubscriptionManager } from "@/lib/db/donation/subscription-manager";
import { NextRequest, NextResponse } from "next/server";
import razorpay from "razorpay";
import crypto from "crypto";

async function getRawBody(req: NextRequest): Promise<Buffer> {
	const reader = req.body?.getReader();
	if (!reader) return Buffer.from("");

	const chunks: Uint8Array[] = [];
	let done = false;

	while (!done) {
		const { value, done: readerDone } = await reader.read();
		if (value) chunks.push(value);
		done = readerDone;
	}

	return Buffer.concat(chunks);
}

export async function POST(request: NextRequest) {
	try {
		const rawBody = await getRawBody(request);

		const signature = request.headers.get("X-Razorpay-Signature") ?? "";
		const secret = process.env.RAZORPAY_WEBHOOK_SECRET!;
		const computedSignature = crypto
			.createHmac("sha256", secret)
			.update(rawBody)
			.digest("hex");

		if (signature !== computedSignature) {
			console.error("Invalid webhook signature");
			return NextResponse.json(
				{ error: "Invalid signature" },
				{ status: 400 },
			);
		}

		// Now it's safe to parse JSON
		const body = JSON.parse(rawBody.toString("utf8"));
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
						subEntity.current_start,
					);
					break;
				case "subscription.completed":
					await subManager.onCompleted(subEntity.end_at);
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
					await subManager.onCancelled(subEntity.end_at);
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
