import { DEFAULT_CAMPAIGN } from "@/config/data";
import { supabaseAdmin } from "./supabase";

import { z } from "zod/v4";
import { razorpay } from "../razorpay";

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
});

type NewDonationRequest = z.infer<typeof newDonationRequestSchema>;

interface Donation extends NewDonationRequest {
	id: string;
	created_at: Date;
	order_id?: string;
	payment_id?: string;
	status?: "Pending" | "Completed" | "Failed" | "Cancelled";
}

class UnableToCreateBackerError extends Error {
	constructor(msg: string) {
		super(msg);
		Object.setPrototypeOf(this, UnableToCreateBackerError.prototype);
	}
}

async function createNewBacker(request: NewDonationRequest): Promise<Donation> {
	const { data, error } = await supabaseAdmin
		.from("backers")
		.insert(request)
		.select();

	if (error) {
		console.error("Error creating a new backer:", error.message);
		throw new UnableToCreateBackerError("Failed to create a new backer");
	}

	return data[0] as Donation;
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

async function getBackerDetailsById(id: string) {
	const { data: donation, error } = await supabaseAdmin
		.from("backers")
		.select(
			"*, campaigns(*), products:products", // aliasing for clarity
		)
		.eq("id", id)
		.single();

	if (error) {
		console.error("Error fetching donation details:", error.message);
		return null;
	}

	const productsData: Record<string, { title: string }> = {};

	if (donation.products) {
		const productIds = Object.keys(donation.products);
		if (productIds.length) {
			const { data: productDetails } = await supabaseAdmin
				.from("campaign_products")
				.select("id, title")
				.in("id", productIds);

			productDetails?.forEach((p) => {
				productsData[p.id] = { title: p.title };
			});
		}
	}

	return {
		...donation,
		campaign: donation.campaigns ?? null,
		productTitles: productsData,
	};
}

class UnableToMarkPaidError extends Error {
	constructor(msg: string) {
		super(msg);
		Object.setPrototypeOf(this, UnableToCreateBackerError.prototype);
	}
}

async function markPaymentDetailsCaptured(orderId: string, paymentId: string) {
	const order = await razorpay.orders.fetch(orderId);
	const id = order.receipt;
	if (!id) {
		console.error("Order does not have a valid receipt ID:", order);
		throw new UnableToMarkPaidError("Invalid order ID");
	}
	const { data, error } = await supabaseAdmin
		.from("backers")
		.update({
			order_id: orderId,
			payment_id: paymentId,
			status: "Completed",
		})
		.eq("id", id)
		.select()
		.single();

	if (error) {
		console.error("Error updating backer payment details:", error.message);
		throw new UnableToMarkPaidError(
			"Failed to update backer payment details",
		);
	}

	return data as Donation;
}

export {
	newDonationRequestSchema,
	createNewBacker,
	UnableToCreateBackerError,
	getBackerById,
	getBackerDetailsById,
	markPaymentDetailsCaptured,
};
