import {
	BasePaymentState,
	PaymentState,
} from "@/lib/db/donation/manage/one-time/states/base";

export class CompletedState extends BasePaymentState implements PaymentState {}
