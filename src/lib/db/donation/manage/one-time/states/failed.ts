import { PaymentWebhookManager } from "@/lib/db/donation/manage/one-time/manager";
import {
	BasePaymentState,
	PaymentState,
	PaymentStatus,
} from "@/lib/db/donation/manage/one-time/states/base";

export class FailedState extends BasePaymentState implements PaymentState {
	constructor(context: PaymentWebhookManager) {
		super(context);
		this.currentState = PaymentStatus.Failed;
	}
}
