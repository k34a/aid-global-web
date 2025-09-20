import {
	SubscriptionManagerError,
	SubscriptionWebhookManager,
	SubscriptionWebookError,
} from "@/lib/db/donation/manage/subscription/manager";
import { supabaseAdmin } from "@/lib/db/supabase";
import { razorpay } from "@/lib/razorpay";
import { sendTelegramMessage } from "@/lib/telegram";
import { escape } from "html-escaper";

export const SubscriptionStatus = {
	Created: "Created",
	Active: "Active",
	Completed: "Completed",
	Halted: "Halted",
	Paused: "Paused",
	Cancelled: "Cancelled",
};

export interface SubscriptionState {
	context: SubscriptionWebhookManager;

	onActivated: () => Promise<void>;
	onCharged: (
		amount: number,
		payment_id: string,
		created_at: number,
	) => Promise<void>;
	onCompleted: (timestamp: number) => Promise<void>;
	onHalted: () => Promise<void>;
	onPaused: () => Promise<void>;
	onCancelled: (timestamp: number) => Promise<void>;

	cancel: (pin: string) => Promise<void>;
}

export class BaseSubscriptionState implements SubscriptionState {
	context: SubscriptionWebhookManager;

	constructor(context: SubscriptionWebhookManager) {
		this.context = context;
	}

	private async notifyAdmins(message: string, newState: string) {
		try {
			const subData = this.context.getData();
			const text = `<u><b>${message}</b></u>
        <b>Donor Name:</b> ${escape(subData.subscriber_name)} (${subData.subscription_id})
        <b>Subscription:</b> ${escape(subData.subscription_name)}
        <b>Status:</b> ${subData.status} to ${newState}`;

			await sendTelegramMessage(text);
		} catch (error) {
			console.error(error);
		}
	}

	protected async updateStatus(
		newStatus: string,
		confirmationMessage: string | false,
		otherFieldsUpdate?: Record<string, unknown>,
	) {
		const prevDetails = this.context.getData();
		const { data, error } = await supabaseAdmin
			.from("subscriptions")
			.update({
				status: newStatus,
				...(otherFieldsUpdate ?? {}),
			})
			.eq("id", prevDetails.subscription_id)
			.eq("status", prevDetails.status)
			.select("id")
			.maybeSingle();

		if (error) {
			console.error("Error updating payment details:", error.message);
			throw new SubscriptionWebookError(
				`Failed to mark payment as ${newStatus}`,
				500,
			);
		}

		if (!data) {
			console.error(
				"Error updating subscription details - no entry found, or the entry has been modified already",
			);
			throw new SubscriptionWebookError(
				`Failed to mark subscription as ${newStatus}`,
				500,
			);
		}

		if (confirmationMessage) {
			await this.notifyAdmins(confirmationMessage, newStatus);
		}
	}

	protected async saveCharge(
		amount: number,
		payment_id: string,
		created_at: number,
	) {
		const subData = this.context.getData();
		const { error } = await supabaseAdmin
			.from("subscription_charges")
			.insert({
				created_at: new Date(created_at * 1000),
				subscription_id: subData.subscription_id,
				razorpay_payment_id: payment_id,
				amount,
			});
		if (error) {
			console.error(
				"Error recording subscription charges:",
				error.message,
			);
			throw new SubscriptionWebookError(
				"Failed to record subscription charges",
				500,
			);
		}
	}

	async onActivated(): Promise<void> {
		return;
	}

	async onCharged(
		amount: number,
		payment_id: string,
		created_at: number,
	): Promise<void> {
		return;
	}

	async onCompleted(timestamp: number): Promise<void> {
		return;
	}

	async onHalted(): Promise<void> {
		return;
	}

	async onPaused(): Promise<void> {
		return;
	}

	async onCancelled(timestamp: number): Promise<void> {
		return;
	}

	protected async cancelSubscription(pin: string): Promise<void> {
		if (this.context.getData().contact_number.endsWith(pin)) {
			console.error("Unauthenticated request to cancel subscription");
			throw new SubscriptionManagerError(
				"You are not authorized to perform this action",
				401,
			);
		}

		try {
			await razorpay.subscriptions.cancel(
				this.context.getRazorpaySubscriptionId(),
				true,
			);
		} catch (error) {
			console.error("Unable to cancel the subscription", error);
			throw new SubscriptionManagerError(
				"Unable to cancel your subscription",
				500,
			);
		}
	}

	async cancel(pin: string): Promise<void> {
		throw new SubscriptionManagerError(
			`Can not cancel your subscription: current status is '${this.context.getData().status}'`,
			400,
		);
	}
}
