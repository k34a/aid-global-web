import { supabaseAdmin } from "@/lib/db/supabase";
import { razorpay } from "@/lib/razorpay";
import { Subscription } from "./subscription-donation";
import { z } from "zod/v4";
import { DonationError, userInfoSchema } from "./donation";

const SubscriptionStatus = {
	Pending: "Pending",
	Authenticated: "Authenticated",
	Active: "Active",
	Complete: "Complete",
	Cancelled: "Cancelled",
	Halted: "Halted",
	Paused: "Paused",
};

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
		await this.updateStatusIf(
			[SubscriptionStatus.Pending],
			SubscriptionStatus.Authenticated,
		);
	}

	public async onActivated() {
		await this.updateStatus(SubscriptionStatus.Active);
	}

	public async onCharged(
		amount: number,
		payment_id: string,
		created_at: number,
	) {
		const { id } = await this.getUserSubscriptionStatus();
		const { error } = await supabaseAdmin
			.from("subscription_charges")
			.insert({
				created_at: new Date(created_at * 1000),
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

	public async onCompleted(timestamp: number) {
		const { id } = await this.getUserSubscriptionStatus();
		const { error } = await supabaseAdmin
			.from("subscriptions")
			.update({
				status: SubscriptionStatus.Complete,
				end_date: new Date(timestamp * 1000),
			})
			.eq("id", id);

		if (error) {
			console.error("Error updating payment details:", error.message);
			throw new Error(`Failed to mark payment as Completed`);
		}
	}

	public async onPending() {
		await this.updateStatus(SubscriptionStatus.Pending);
	}

	public async onHalted() {
		await this.updateStatusIf(
			[SubscriptionStatus.Pending],
			SubscriptionStatus.Halted,
		);
	}

	public async onCancelled(timestamp: number) {
		const { id } = await this.getUserSubscriptionStatus();
		const { error } = await supabaseAdmin
			.from("subscriptions")
			.update({
				status: SubscriptionStatus.Cancelled,
				end_date: new Date(timestamp * 1000),
			})
			.eq("id", id);

		if (error) {
			console.error("Error updating payment details:", error.message);
			throw new Error(`Failed to mark payment as Cancelled`);
		}
	}

	public async onPaused() {
		await this.updateStatus(SubscriptionStatus.Paused);
	}

	public async onResumed() {
		await this.updateStatus(SubscriptionStatus.Active);
	}

	public async cancel(pin: string) {
		const { userInfo, status } = await this.getUserSubscriptionDetails();
		if (!userInfo.contact_number.endsWith(pin)) {
			console.error("Unauthenticated request to cancel subscription");
			throw new Error("You are not authorized to perform this action");
		}

		if (
			[
				SubscriptionStatus.Cancelled,
				SubscriptionStatus.Complete,
			].includes(status)
		) {
			console.error(
				`Unable to cancel the subscription, current subscription is in '${status}' status`,
			);
			throw new Error(
				`Unable to cancel - subscription is already '${status}'`,
			);
		}
		try {
			await razorpay.subscriptions.cancel(
				this.razorpay_subscription_id,
				true,
			);
		} catch (error) {
			throw new Error("Unable to cancel your subscription");
		}
	}

	private async getUserSubscriptionDetails() {
		const { data, error } = await supabaseAdmin
			.from("subscriptions")
			.select("*")
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

		const userInfo: z.infer<typeof userInfoSchema> = {
			name: data.name,
			email: data.email,
			contact_number: data.phone,
			pan_number: data.pan_number ? data.pan_number : undefined,
			address: data.address ? data.address : undefined,
			notes: data.notes,
		};

		return {
			id: data.id as string,
			userInfo,
			plan_id: data.plan_id as string,
			status: data.status as string,
		};
	}

	public async restart(pin: string) {
		const { userInfo, plan_id, status } =
			await this.getUserSubscriptionDetails();

		if (!userInfo.contact_number.endsWith(pin)) {
			console.error("Unauthenticated request to cancel subscription");
			throw new Error("You are not authorized to perform this action");
		}

		if (
			![
				SubscriptionStatus.Cancelled,
				SubscriptionStatus.Complete,
			].includes(status)
		) {
			console.error(
				`Unable to restart the subscription, current subscription is in '${status}' status`,
			);
			throw new Error(
				"Please allow your subscription to cancel/complete before renewing it",
			);
		}
		try {
			await this.getUserSubscriptionDetails();
			const sub = new Subscription(userInfo, true);
			const newSub = await sub.create({ plan_id });
			return newSub;
		} catch (error) {
			if (error instanceof DonationError) {
				console.error(error.getError());
			}
			throw new Error("Unable to renew your subscription");
		}
	}
}
