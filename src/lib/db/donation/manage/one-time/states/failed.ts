import {
	BasePaymentState,
	PaymentState,
} from "@/lib/db/donation/manage/one-time/states/base";

export class FailedState extends BasePaymentState implements PaymentState {}
