import {
	BasePaymentState,
	PaymentState,
	PaymentStatus,
} from "@/lib/db/donation/manage/one-time/states/base";

export class AuthorizedState extends BasePaymentState implements PaymentState {
	async onCaptured(): Promise<void> {
		try {
			await this.capturePayment(
				"A donation payment has been made successfully",
			);
		} catch (e) {
			throw e;
		}
	}

	async onFailed(): Promise<void> {
		try {
			await this.updateStatus(
				PaymentStatus.Failed,
				"A donation has failed, please ask donor to retry",
				{
					order_id: this.context.getRazorpayOrderId(),
					payment_id: this.context.getRazorpayPaymentId(),
				},
			);
		} catch (e) {
			throw e;
		}
	}
}
