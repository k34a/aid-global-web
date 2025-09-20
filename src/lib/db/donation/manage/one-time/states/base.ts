import { supabaseAdmin } from "@/lib/db/supabase";
import { sendTelegramMessage } from "@/lib/telegram";
import { escape } from "html-escaper";
import {
	PaymentWebhookManager,
	PaymentWebookError,
} from "@/lib/db/donation/manage/one-time/manager";

export const PaymentStatus = {
	Pending: "Pending",
	Authorized: "Authorized",
	Failed: "Failed",
	Completed: "Completed",
};

export interface PaymentState {
	context: PaymentWebhookManager;
	currentState: string;

	onAuthorized: () => Promise<void>;
	onCaptured: () => Promise<void>;
	onFailed: () => Promise<void>;
}

export class BasePaymentState implements PaymentState {
	context: PaymentWebhookManager;
	currentState: string;

	constructor(context: PaymentWebhookManager) {
		this.context = context;
		this.currentState = "Base";
	}

	private async notifyAdmins(message: string, newState: string) {
		try {
			const subData = this.context.getData();
			const text = `<u><b>${message}</b></u>
        <b>Donor Name:</b> ${escape(subData.name)} (${subData.id})
        <b>Amount:</b> ${escape(subData.amount)}
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
			.from("backers")
			.update({
				status: newStatus,
				...(otherFieldsUpdate ?? {}),
			})
			.eq("id", prevDetails.id)
			.eq("status", prevDetails.status)
			.select("id")
			.maybeSingle();

		if (error) {
			console.error("Error updating payment details:", error.message);
			throw new PaymentWebookError(
				`Failed to mark payment as ${newStatus}`,
				500,
			);
		}

		if (!data) {
			console.error(
				"Error updating payment details - no entry found, or the entry has been modified already",
			);
			throw new PaymentWebookError(
				`Failed to mark payment as ${newStatus}`,
				500,
			);
		}

		if (confirmationMessage) {
			await this.notifyAdmins(confirmationMessage, newStatus);
		}
	}

	protected async capturePayment(confirmationMessage: string | false) {
		const { error } = await supabaseAdmin.rpc("collect_donation_payment", {
			p_backer_id: this.context.getData().id,
			p_order_id: this.context.getRazorpayOrderId(),
			p_payment_id: this.context.getRazorpayPaymentId(),
		});

		if (error) {
			console.error(
				"Error updating backer payment details:",
				error.message,
			);
			throw new PaymentWebookError(
				"Failed to update backer payment details",
				500,
			);
		}

		if (confirmationMessage) {
			await this.notifyAdmins(
				confirmationMessage,
				PaymentStatus.Completed,
			);
		}
	}

	async onAuthorized(): Promise<void> {
		return;
	}

	async onCaptured(): Promise<void> {
		return;
	}

	async onFailed(): Promise<void> {
		return;
	}
}
