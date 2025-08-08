import { razorpay } from "@/lib/razorpay";
import { supabaseAdmin } from "@/lib/db/supabase";
import { sendTelegramMessage } from "@/lib/telegram";

export class PaymentManager {
	private order_id: string;
	private payment_id: string;

	constructor(order_id: string, payment_id: string) {
		this.order_id = order_id;
		this.payment_id = payment_id;
	}

	private async getDonationIntentId() {
		const order = await razorpay.orders.fetch(this.order_id);
		const id = order.receipt;
		if (!id) {
			console.error("Order does not have a valid receipt ID");
			return;
		}
		return id as string;
	}

	private async updateStatus(
		previousAllowedStatus: string[],
		status: string,
	) {
		const id = await this.getDonationIntentId();
		if (!id) {
			return;
		}
		const { error } = await supabaseAdmin
			.from("backers")
			.update({
				status,
				order_id: this.order_id,
				payment_id: this.payment_id,
			})
			.eq("id", id)
			.in("status", previousAllowedStatus);

		if (error) {
			console.error("Error updating payment details:", error.message);
			throw new Error(`Failed to mark payment as ${status}`);
		}
	}

	private async notifyDonationSuccessful(donationIntentId: string) {
		const { data, error } = await supabaseAdmin
			.from("backers")
			.select("id, name, email, amount")
			.eq("id", donationIntentId)
			.maybeSingle();

		if (error) {
			console.error(error);
			return;
		}
		if (!data) {
			console.log(
				`Data not found for donation intent ID: ${donationIntentId}`,
			);
			return;
		}

		try {
			const message =
				`<b>Someone just made a donation</b>\n\n` +
				`<b>Name:</b> ${data.name}\n` +
				`<b>Email:</b> ${data.email}\n` +
				`<b>Amount:</b> Rs. ${data.amount.toFixed(2)}\n` +
				`<b>Donation ID:</b> ${data.id}`;
			await sendTelegramMessage(message);
		} catch (error) {
			console.error(error);
			return;
		}
	}

	public async authorizePayment() {
		await this.updateStatus(["Pending", "Failed"], "Authorized");
	}

	public async failedPayment() {
		await this.updateStatus(["Pending", "Authorized"], "Failed");
	}

	public async capturePayment() {
		const id = await this.getDonationIntentId();
		if (!id) {
			return;
		}
		const { error } = await supabaseAdmin.rpc("collect_donation_payment", {
			p_backer_id: id,
			p_order_id: this.order_id,
			p_payment_id: this.payment_id,
		});

		if (error) {
			console.error(
				"Error updating backer payment details:",
				error.message,
			);
			throw new Error("Failed to update backer payment details");
		}

		await this.notifyDonationSuccessful(id);
	}
}
