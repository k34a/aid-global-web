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
		try {
			await this.saveCharge(amount, payment_id, created_at);
		} catch (e) {
			throw e;
		}
	}

	async onCompleted(timestamp: number): Promise<void> {
		try {
			await this.updateStatus(
				SubscriptionStatus.Completed,
				`A donor's subscription has ended. You may want to reach out and ask if they'd like to renew.`,
				{ end_date: new Date(timestamp * 1000) },
			);
		} catch (e) {
			throw e;
		}
	}

	async onHalted(): Promise<void> {
		try {
			await this.updateStatus(
				SubscriptionStatus.Halted,
				"Subscription halted after multiple failed attempts. Donor must manually retry payment or update card to reactivate.",
			);
		} catch (e) {
			throw e;
		}
	}

	async onPaused(): Promise<void> {
		try {
			await this.updateStatus(
				SubscriptionStatus.Paused,
				"A donor's subscription has been paused. You may want to follow up.",
			);
		} catch (e) {
			throw e;
		}
	}

	async onCancelled(timestamp: number): Promise<void> {
		try {
			await this.updateStatus(
				SubscriptionStatus.Cancelled,
				"A donor has cancelled their subscription. Consider reaching out to understand why.",
				{ end_date: new Date(timestamp * 1000) },
			);
		} catch (e) {
			throw e;
		}
	}

	async cancel(pin: string): Promise<void> {
		try {
			await this.cancelSubscription(pin);
		} catch (e) {
			throw e;
		}
	}
}
