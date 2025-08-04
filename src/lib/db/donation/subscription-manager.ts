import { supabaseAdmin } from "@/lib/db/supabase";

export class SubscriptionManager {
	private razorpay_subscription_id: string;

	constructor(razorpay_subscription_id: string) {
		this.razorpay_subscription_id = razorpay_subscription_id;
	}

	private async getUserSubscriptionStatus() {
		const { data, error } = await supabaseAdmin
			.from("subscriptions")
			.select("id, status")
			.eq("razorpay_subscription_id", this.razorpay_subscription_id)
			.maybeSingle();

		if (error) {
			console.error("Unable to find subscription in DB");
			throw new Error("Unable to find subscription in DB");
		}

		if (!data) {
			console.error("Subscription not found in DB");
			throw new Error("Subscription not found in DB");
		}

		return { id: data.id as string, status: data.status as string };
	}

	private async updateStatusIf(
		previousAllowedStatus: string[],
		status: string,
	) {
		const { id } = await this.getUserSubscriptionStatus();
		const { error } = await supabaseAdmin
			.from("subscriptions")
			.update({
				status,
			})
			.eq("id", id)
			.in("status", previousAllowedStatus);

		if (error) {
			console.error("Error updating payment details:", error.message);
			throw new Error(`Failed to mark payment as ${status}`);
		}
	}

	private async updateStatus(status: string) {
		const { id } = await this.getUserSubscriptionStatus();
		const { error } = await supabaseAdmin
			.from("subscriptions")
			.update({
				status,
			})
			.eq("id", id);

		if (error) {
			console.error("Error updating payment details:", error.message);
			throw new Error(`Failed to mark payment as ${status}`);
		}
	}

	public async onAuthenticated() {
		await this.updateStatusIf(["Pending"], "Authenticated");
	}

	public async onActivated() {
		await this.updateStatus("Active");
	}

	public async onCharged(amount: number, payment_id: string) {
		const { id } = await this.getUserSubscriptionStatus();
		const { error } = await supabaseAdmin
			.from("subscription_charges")
			.insert({
				subscription_id: id,
				razorpay_payment_id: payment_id,
				amount,
			});
		if (error) {
			console.error(
				"Error recording subscription charges:",
				error.message,
			);
			throw new Error("Failed to record subscription charges");
		}
		await this.onActivated();
	}

	public async onCompleted() {
		await this.updateStatus("Completed");
	}

	public async onPending() {
		await this.updateStatus("Pending");
	}

	public async onHalted() {
		await this.updateStatusIf(["Pending"], "Halted");
	}

	public async onCancelled() {
		await this.updateStatus("Cancelled");
	}

	public async onPaused() {
		await this.updateStatus("Paused");
	}

	public async onResumed() {
		await this.updateStatus("Resumed");
	}
}
