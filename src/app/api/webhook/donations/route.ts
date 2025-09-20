import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { escape } from "html-escaper";
import { sendTelegramMessage } from "@/lib/telegram";
import {
	SubscriptionWebhookManager,
	SubscriptionWebookError,
} from "@/lib/db/donation/manage/subscription/manager";
import {
	PaymentWebhookManager,
	PaymentWebookError,
} from "@/lib/db/donation/manage/one-time/manager";

async function notifyTelegram(title: string, payload?: any) {
	try {
		let message = `<u><b>${title}</b></u>`;
		if (payload) {
			message += `<pre>${escape(JSON.stringify(payload, null, 4)).slice(0, 3000)}</pre>`;
		}
		message += "cc: @Sakshamk34a";
		await sendTelegramMessage(message);
	} catch (err) {
		console.error("Failed to send Telegram alert:", err);
	}
}

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
			await notifyTelegram("Invalid Razorpay Webhook Signature", {
				signature,
				computedSignature,
				headers: Object.fromEntries(request.headers),
			});
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
				await notifyTelegram("Missing Payment Fields", paymentEntity);
				return NextResponse.json(
					{
						error: "Missing required fields in payment entity",
						success: false,
					},
					{ status: 400 },
				);
			}

			const paymentManager = await PaymentWebhookManager.init(
				paymentId,
				orderId,
			);

			switch (event) {
				case "payment.authorized":
					await paymentManager.onAuthorized();
					break;
				case "payment.captured":
					await paymentManager.onCaptured();
					break;
				case "payment.failed":
					await paymentManager.onFailed();
			}
		}

		if (event.startsWith("subscription")) {
			const subEntity = body.payload.subscription.entity;
			const { id: subId } = subEntity;

			if (!subId) {
				await notifyTelegram("Missing Subscription ID", subEntity);
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

			const subManager = await SubscriptionWebhookManager.init(subId);

			switch (event) {
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
				case "subscription.halted":
					await subManager.onHalted();
					break;
				case "subscription.paused":
					await subManager.onPaused();
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
		let message = "Unhandled Webhook Error";
		let status = 500;
		let stack: string | undefined = undefined;
		if (
			error instanceof SubscriptionWebookError ||
			error instanceof PaymentWebookError
		) {
			message = error.message;
			status = error.getStatus();
			stack = error.stack;
		} else if (error instanceof Error) {
			message = error.message;
			stack = error.stack;
		}
		if (status >= 300) {
			await notifyTelegram(message, {
				message,
				stack,
			});
		}
		return NextResponse.json(
			{
				error: message,
				success: false,
			},
			{ status },
		);
	}
}
