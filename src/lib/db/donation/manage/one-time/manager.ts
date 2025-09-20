import { supabaseAdmin } from "@/lib/db/supabase";
import {
	AuthorizedState,
	PendingState,
	CompletedState,
	FailedState,
	PaymentStatus,
	type PaymentState,
} from "@/lib/db/donation/manage/one-time/states";
import { razorpay } from "@/lib/razorpay";

interface Backer {
	id: string;
	status: string;
	name: string;
	amount: string;
}

export class PaymentWebookError extends Error {
	private status: number;

	constructor(message: string, status: number) {
		super(message);
		this.name = "PaymentWebookError";
		this.status = status;
	}

	public getStatus() {
		return this.status;
	}
}

export class PaymentWebhookManager {
	private data: Backer;
	private razorpay_payment_id: string;
	private razorpay_order_id: string;
	private state: PaymentState;

	constructor(
		data: Backer,
		razorpay_payment_id: string,
		razorpay_order_id: string,
	) {
		this.data = data;
		this.razorpay_payment_id = razorpay_payment_id;
		this.razorpay_order_id = razorpay_order_id;
		this.state = this.findState(data.status);
	}

	private findState(status: string): PaymentState {
		switch (status) {
			case PaymentStatus.Pending:
				return new PendingState(this);
			case PaymentStatus.Failed:
				return new FailedState(this);
			case PaymentStatus.Authorized:
				return new AuthorizedState(this);
			case PaymentStatus.Completed:
				return new CompletedState(this);
			default:
				throw new PaymentWebookError(
					`Payment status "${status}" is invalid`,
					500,
				);
		}
	}

	public static async init(
		razorpay_payment_id: string,
		razorpay_order_id: string,
	) {
		const order = await razorpay.orders.fetch(razorpay_order_id);
		const id = order.receipt;
		if (!id) {
			console.error("Order does not have a valid receipt ID");
			throw new PaymentWebookError(
				`Razorpay order (${razorpay_order_id}) does not have a valid receipt ID`,
				200,
			);
		}
		const { data, error } = await supabaseAdmin
			.from("backers")
			.select("id, status, name, amount")
			.eq("id", id)
			.maybeSingle();

		if (error) {
			console.error("Error fetching backer details:", error);
			throw new PaymentWebookError("Error fetching backer details", 500);
		}

		if (!data) {
			console.error("Order does not have a valid receipt ID");
			throw new PaymentWebookError(
				`No backer found with ID: "${id}"`,
				200,
			);
		}

		return new PaymentWebhookManager(
			data,
			razorpay_payment_id,
			razorpay_order_id,
		);
	}

	public getData() {
		return this.data;
	}

	public getState() {
		return this.state;
	}

	public getRazorpayOrderId() {
		return this.razorpay_order_id;
	}

	public getRazorpayPaymentId() {
		return this.razorpay_payment_id;
	}

	async onAuthorized(): Promise<void> {
		this.getState().onAuthorized();
	}

	async onCaptured(): Promise<void> {
		this.getState().onCaptured();
	}

	async onFailed(): Promise<void> {
		this.getState().onFailed();
	}
}
