import {
	BaseSubscriptionState,
	SubscriptionState,
	SubscriptionStatus,
} from "./base";

export class ActiveState
	extends BaseSubscriptionState
	implements SubscriptionState
{
	async onCharged(
		amount: number,
		payment_id: string,
		created_at: number,
	): Promise<void> {
		await this.saveCharge(amount, payment_id, created_at);
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
			"Subscription halted after multiple failed attempts. Donor must manually retry payment or update card to reactivate.",
		);
	}

	async onPaused(): Promise<void> {
		await this.updateStatus(
			SubscriptionStatus.Paused,
			"A donor's subscription has been paused. You may want to follow up.",
		);
	}

	async onCancelled(timestamp: number): Promise<void> {
		await this.updateStatus(
			SubscriptionStatus.Cancelled,
			"A donor has cancelled their subscription. Consider reaching out to understand why.",
			{ end_date: new Date(timestamp * 1000) },
		);
	}

	async cancel(pin: string): Promise<void> {
		await this.cancelSubscription(pin);
	}
}
