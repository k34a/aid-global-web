import { PaymentWebhookManager } from "@/lib/db/donation/manage/one-time/manager";
import {
	BasePaymentState,
	PaymentState,
	PaymentStatus,
} from "@/lib/db/donation/manage/one-time/states/base";

export class AuthorizedState extends BasePaymentState implements PaymentState {
	constructor(context: PaymentWebhookManager) {
		super(context);
		this.currentState = PaymentStatus.Authorized;
	}

	async onCaptured(): Promise<void> {
		await this.capturePayment(
			"A donation payment has been made successfully",
		);
	}

	async onFailed(): Promise<void> {
		await this.updateStatus(
			PaymentStatus.Failed,
			"A donation has failed, please ask donor to retry",
			{
				order_id: this.context.getRazorpayOrderId(),
				payment_id: this.context.getRazorpayPaymentId(),
			},
		);
	}
}
