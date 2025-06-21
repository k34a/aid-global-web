import { DEFAULT_CAMPAIGN } from "@/config/data";
import { supabaseAdmin } from "./supabase";

import { z } from "zod/v4";
import { razorpay } from "@/lib/razorpay";
import { PostgrestError } from "@supabase/supabase-js";

const newDonationRequestSchema = z.object({
	campaign_id: z.string().default(DEFAULT_CAMPAIGN),
	products: z.record(z.string(), z.number()).optional(),
	amount: z.number().min(1, "Amount must be greater than 0"),
	email: z.email("Invalid email address"),
	contact_number: z
		.string()
		.length(10)
		.regex(/^\d{10}$/, "Must be exactly 10 digits"),
	name: z.string().min(1, "Name is required"),
	is_anon: z.boolean().default(false),
	auto_allocate: z.boolean().default(true),
	notes: z.string().optional(),
});

type NewDonationRequest = z.infer<typeof newDonationRequestSchema>;

interface Donation extends Omit<NewDonationRequest, "products"> {
	id: string;
	created_at: Date;
	order_id?: string;
	payment_id?: string;
	status?: "Pending" | "Completed";
}

class UnableToRecordDonationIntentError extends Error {
	constructor(msg: string) {
		super(msg);
		Object.setPrototypeOf(
			this,
			UnableToRecordDonationIntentError.prototype,
		);
	}
}

async function createDonationIntent(
	request: NewDonationRequest,
): Promise<string> {
	const donationProducts = request.products ?? {};

	const { data: productsData, error: productsError } = await supabaseAdmin
		.from("campaign_products")
		.select("id, price_per_unit, units_required, units_collected")
		.eq("campaign_id", request.campaign_id);

	if (productsError) {
		console.error("Error fetching products:", productsError.message);
		throw new UnableToRecordDonationIntentError(
			"Failed to fetch product details",
		);
	}

	const requestedProducts = new Set(Object.keys(donationProducts));
	const productsDataSet = new Set(
		(productsData ?? {}).map((p) => p.id as string),
	);

	if (requestedProducts.difference(productsDataSet).size > 0) {
		throw new UnableToRecordDonationIntentError(
			"Some products in the request do not exist in the campaign.",
		);
	}

	// Sort in descending order by price_per_unit
	productsData.sort((a, b) => b.price_per_unit - a.price_per_unit);

	let unallocated_funds = request.amount;
	Object.entries(request.products ?? {}).forEach(([productId, quantity]) => {
		const product = productsData.find((p) => p.id === productId);
		if (!product) {
			throw new UnableToRecordDonationIntentError(
				`Product with ID ${productId} not found.`,
			);
		}
		unallocated_funds -= product.price_per_unit * quantity;
	});

	if (request.auto_allocate) {
		productsData.forEach((product) => {
			if (unallocated_funds <= 0) {
				return;
			}
			const quantity = Math.min(
				Math.floor(unallocated_funds / product.price_per_unit), // max quantity user can afford from unallocated funds
				product.units_required - product.units_collected, // required quantity to reach product target
			);
			donationProducts[product.id] =
				(donationProducts[product.id] ?? 0) + quantity;
			unallocated_funds -= quantity * product.price_per_unit;
		});
	}

	if (unallocated_funds < 0) {
		throw new UnableToRecordDonationIntentError(
			"Total cost of products exceeds the donation amount. Please adjust your donation amount.",
		);
	}

	const { data: backer_id, error } = await supabaseAdmin.rpc(
		"record_donation_intent",
		{
			donation_data: {
				campaign_id: request.campaign_id,
				amount: request.amount,
				email: request.email,
				contact_number: request.contact_number,
				name: request.name,
				is_anon: request.is_anon,
				auto_allocate: request.auto_allocate,
				notes: request.notes,
				unallocated_amount: unallocated_funds,
				status: "Pending",
			},
			products: donationProducts,
		},
	);

	if (error) {
		console.error("Error creating a new donation intent:", error.message);
		throw new UnableToRecordDonationIntentError(
			"Failed to create your donation intent. Please try again later.",
		);
	}

	return backer_id as string;
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

class UnableToMarkPaidError extends Error {
	constructor(msg: string) {
		super(msg);
		Object.setPrototypeOf(
			this,
			UnableToRecordDonationIntentError.prototype,
		);
	}
}

async function capturePayment(orderId: string, paymentId: string) {
	const order = await razorpay.orders.fetch(orderId);
	const id = order.receipt;
	if (!id) {
		console.error("Order does not have a valid receipt ID:", order);
		throw new UnableToMarkPaidError("Invalid order ID");
	}
	const { error } = await supabaseAdmin.rpc("collect_donation_payment", {
		p_backer_id: id,
		p_order_id: orderId,
		p_payment_id: paymentId,
	});

	if (error) {
		console.error("Error updating backer payment details:", error.message);
		throw new UnableToMarkPaidError(
			"Failed to update backer payment details",
		);
	}
}

export {
	newDonationRequestSchema,
	createDonationIntent,
	UnableToRecordDonationIntentError,
	getBackerById,
	getBackerDetailsById,
	capturePayment,
};
