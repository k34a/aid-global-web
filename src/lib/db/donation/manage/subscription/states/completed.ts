import {
	BaseSubscriptionState,
	SubscriptionState,
	SubscriptionStatus,
} from "./base";

export class CompletedState
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
}
