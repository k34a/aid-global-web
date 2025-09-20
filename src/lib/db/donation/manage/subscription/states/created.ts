import {
	BaseSubscriptionState,
	SubscriptionState,
	SubscriptionStatus,
} from "./base";

export class CreatedState
	extends BaseSubscriptionState
	implements SubscriptionState
{
	async onActivated(): Promise<void> {
		await this.updateStatus(
			SubscriptionStatus.Active,
			"A subscription has been activated",
		);
	}

	async onCharged(
		amount: number,
		payment_id: string,
		created_at: number,
	): Promise<void> {
		await this.saveCharge(amount, payment_id, created_at);
		await this.updateStatus(
			SubscriptionStatus.Active,
			`Subscriber charged successfully on ${new Date(created_at * 1000).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}`,
		);
	}

	async onCompleted(timestamp: number): Promise<void> {
		await this.updateStatus(
			SubscriptionStatus.Completed,
			`A donor's subscription has ended. You may want to reach out and ask if they'd like to renew.`,
			{ end_date: new Date(timestamp * 1000) },
		);
	}

	async onHalted(): Promise<void> {
		await this.updateStatus(
			SubscriptionStatus.Halted,
			"Subscription halted after multiple failed attempts. Customer must retry payment or update card to reactivate.",
		);
	}

	async onCancelled(timestamp: number): Promise<void> {
		await this.updateStatus(
			SubscriptionStatus.Cancelled,
			"A donor has cancelled their subscription. Consider reaching out to understand why.",
			{ end_date: new Date(timestamp * 1000) },
		);
	}

	async onPaused(): Promise<void> {
		await this.updateStatus(
			SubscriptionStatus.Paused,
			"A donor's subscription has been paused. You may want to follow up.",
		);
	}

	async cancel(pin: string): Promise<void> {
		await this.cancelSubscription(pin);
	}
}
