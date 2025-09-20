import {
	BasePaymentState,
	PaymentState,
	PaymentStatus,
} from "@/lib/db/donation/manage/one-time/states/base";

export class PendingState extends BasePaymentState implements PaymentState {
	async onAuthorized(): Promise<void> {
		try {
			await this.updateStatus(
				PaymentStatus.Authorized,
				"A donation payment has been authorized",
				{
					order_id: this.context.getRazorpayOrderId(),
					payment_id: this.context.getRazorpayPaymentId(),
				},
			);
		} catch (e) {
			throw e;
		}
	}

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
