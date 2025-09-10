export interface Donation {
	id: string;
	email: string;
	contact_number: string;
	name: string;
	pan?: string;
	address?: string;
	notes?: string;
	campaign_id: string;
	amount: number;
	auto_allocate: boolean;
	created_at: Date;
	order_id?: string;
	payment_id?: string;
	status?: "Pending" | "Completed";
}

export interface SubscriptioDetails {
	id: string;
	name: string;
	email: string;
	phone: string;
	address?: string;
	pan?: string;
	razorpay_subscription_id: string;
	status: string;
	start_date: Date;
	end_date?: Date;
	subscription_plans: {
		name: string;
	};
	charges: Array<{
		amount: number;
		created_at: Date;
	}>;
}

export interface ReceiptDetails {
	id: string;
	campaign_id: string;
	amount: number;
	email: string;
	name: string;
	is_anon: boolean;
	created_at: Date;
	contact_number: string;
	status: "Pending" | "Completed";
	notes?: string;
	unallocated_amount: number;
	campaigns: {
		title: string;
		description: string;
	};
	donated_products: Array<{
		quantity: number;
		campaign_products: {
			title: string;
			price_per_unit: number;
		};
	}>;
}
