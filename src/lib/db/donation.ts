import { supabaseAdmin } from "./supabase";
import { PostgrestError } from "@supabase/supabase-js";

interface Donation {
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

async function getBackerById(id: string): Promise<Donation | null> {
	const { data, error } = await supabaseAdmin
		.from("backers")
		.select("*")
		.eq("id", id)
		.single();

	if (error) {
		console.error("Error fetching backer by ID:", error.message);
		return null;
	}

	return data as Donation;
}

interface SubscriptioDetails {
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

async function getSubscriptionDetailsById(
	id: string,
): Promise<SubscriptioDetails | null> {
	const { data, error } = await supabaseAdmin
		.from("subscriptions")
		.select("*, subscription_plans(name)")
		.eq("id", id)
		.single();

	if (error) {
		console.error("Error fetching backer by ID:", error.message);
		return null;
	}

	const { data: charges, error: chargesError } = await supabaseAdmin
		.from("subscription_charges")
		.select("amount, created_at")
		.eq("subscription_id", data.id);

	if (chargesError) {
		console.error(
			"Error fetching charges for subscription ID:",
			data.id as string,
		);
		return null;
	}

	return { ...data, charges } as SubscriptioDetails;
}

interface ReceiptDetails {
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

async function doesBackerExist(id: string) {
	const { data, error } = await supabaseAdmin
		.from("backers")
		.select("id")
		.eq("id", id)
		.maybeSingle();

	if (error) {
		console.error("Error fetching donation details:", error.message);
		return false;
	}

	if (!data) {
		return false;
	}

	return true;
}

async function doesSubscriptionExist(id: string) {
	const { data, error } = await supabaseAdmin
		.from("subscriptions")
		.select("id")
		.eq("id", id)
		.maybeSingle();

	if (error) {
		console.error("Error fetching subscription details:", error.message);
		return false;
	}

	if (!data) {
		return false;
	}

	return true;
}

async function getBackerDetailsById(id: string) {
	const {
		data: donation,
		error,
	}: { data: ReceiptDetails | null; error: PostgrestError | null } =
		await supabaseAdmin
			.from("backers")
			.select(
				"*, campaigns(title, description), donated_products(quantity, campaign_products(title, price_per_unit))",
			)
			.eq("id", id)
			.single();

	if (error) {
		console.error("Error fetching donation details:", error.message);
		return null;
	}

	return donation;
}

export {
	doesBackerExist,
	getBackerById,
	getBackerDetailsById,
	getSubscriptionDetailsById,
	doesSubscriptionExist,
};

export type { ReceiptDetails, SubscriptioDetails };
