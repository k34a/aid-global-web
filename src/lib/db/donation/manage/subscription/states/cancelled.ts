import {
	BaseSubscriptionState,
	SubscriptionState,
	SubscriptionStatus,
} from "./base";

export class CancelledState
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
}
