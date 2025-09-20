import { supabaseAdmin } from "@/lib/db/supabase";
import {
	type SubscriptionState,
	SubscriptionStatus,
	ActiveState,
	CreatedState,
	CompletedState,
	HaltedState,
	PausedState,
	CancelledState,
} from "@/lib/db/donation/manage/subscription/states";

interface Subs {
	subscription_id: string;
	subscription_name: string;
	status: string;
	contact_number: string;
	subscriber_name: string;
}

export class SubscriptionWebookError extends Error {
	private status: number;

	constructor(message: string, status: number) {
		super(message);
		this.name = "SubscriptionWebookError";
		this.status = status;
	}

	public getStatus() {
		return this.status;
	}
}

export class SubscriptionManagerError extends Error {
	private status: number;

	constructor(message: string, status: number) {
		super(message);
		this.name = "SubscriptionManagerError";
		this.status = status;
	}

	public getStatus() {
		return this.status;
	}
}

export class SubscriptionWebhookManager {
	private data: Subs;
	private razorpay_subscription_id: string;
	private state: SubscriptionState;

	constructor(data: Subs, razorpay_subscription_id: string) {
		this.data = data;
		this.razorpay_subscription_id = razorpay_subscription_id;
		this.state = this.findState(data.status);
	}

	private findState(status: string) {
		switch (status) {
			case SubscriptionStatus.Created:
				return new CreatedState(this);
			case SubscriptionStatus.Active:
				return new ActiveState(this);
			case SubscriptionStatus.Completed:
				return new CompletedState(this);
			case SubscriptionStatus.Halted:
				return new HaltedState(this);
			case SubscriptionStatus.Paused:
				return new PausedState(this);
			case SubscriptionStatus.Cancelled:
				return new CancelledState(this);
			default:
				throw new SubscriptionWebookError(
					`Subscription status "${status}" is invalid`,
					500,
				);
		}
	}

	public static async init(razorpay_subscription_id: string) {
		const { data, error } = await supabaseAdmin
			.from("subscriptions")
			.select("id, status, name, phone, subscription_plans(name)")
			.eq("razorpay_subscription_id", razorpay_subscription_id)
			.maybeSingle();

		if (error) {
			console.error("Error fetching subscription:", error);
			throw new SubscriptionWebookError(
				"Error fetching subscription details",
				500,
			);
		}

		if (!data) {
			console.warn(
				"No subscription found for Razorpay ID:",
				razorpay_subscription_id,
			);
			throw new SubscriptionWebookError(
				"No subscription found with this ID",
				200,
			);
		}

		return new SubscriptionWebhookManager(
			{
				subscription_id: data.id,
				subscriber_name: data.name,
				contact_number: data.phone,
				status: data.status,
				subscription_name: (data.subscription_plans as any).name,
			},
			razorpay_subscription_id,
		);
	}

	public getData() {
		return this.data;
	}

	public getState() {
		return this.state;
	}

	public getRazorpaySubscriptionId() {
		return this.razorpay_subscription_id;
	}

	async onActivated(): Promise<void> {
		this.getState().onActivated();
	}

	async onCharged(
		amount: number,
		payment_id: string,
		created_at: number,
	): Promise<void> {
		this.getState().onCharged(amount, payment_id, created_at);
	}

	async onCompleted(timestamp: number): Promise<void> {
		this.getState().onCompleted(timestamp);
	}

	async onHalted(): Promise<void> {
		this.getState().onHalted();
	}

	async onPaused(): Promise<void> {
		this.getState().onPaused();
	}

	async onCancelled(timestamp: number): Promise<void> {
		this.getState().onCancelled(timestamp);
	}

	async cancel(pin: string): Promise<void> {
		this.getState().cancel(pin);
	}
}
