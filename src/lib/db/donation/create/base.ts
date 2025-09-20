import { razorpay } from "@/lib/razorpay";
import { z } from "zod/v4";
import { supabaseAdmin } from "@/lib/db/supabase";
import { SubscriptionStatus } from "@/lib/db/donation/manage/subscription/states";

const userInfoSchema = z.object({
	email: z.email("Invalid email address"),
	contact_number: z
		.string()
		.length(10, "Phone number should be exactly 10 digits")
		.regex(/^\d{10}$/, "Phone number should be exactly 10 digits"),
	name: z.string().min(1, "Name is required"),
	pan_number: z
		.string()
		.regex(
			new RegExp(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/),
			"Invalid PAN number",
		)
		.optional(),
	address: z
		.string()
		.min(10, "Please provide your complete address")
		.optional(),
	notes: z.string().optional(),
});

interface DonationCreationSuccessResponse<T> {
	success: true;
	data: T;
}

interface DonationCreationErrorResponse {
	success: false;
	error: {
		title: string;
		message: string;
	};
}

class DonationError extends Error {
	private title: string;
	constructor(title: string, msg: string) {
		super(msg);
		this.title = title;
		Object.setPrototypeOf(this, DonationError.prototype);
	}

	public getError() {
		return {
			success: false,
			error: {
				title: this.title,
				message: this.message,
			},
		} as DonationCreationErrorResponse;
	}
}

abstract class Donation<T extends z.ZodType> {
	protected userInfo: z.infer<typeof userInfoSchema>;
	protected is_anon: boolean;
	protected donationValidationSchema: T;

	constructor(
		userInfo: z.infer<typeof userInfoSchema>,
		is_anon: boolean,
		donationValidationSchema: T,
	) {
		this.userInfo = userInfo;
		this.is_anon = is_anon;
		this.donationValidationSchema = donationValidationSchema;
		this.validateUserInfo();
	}

	private validateUserInfo(): z.infer<typeof userInfoSchema> {
		const { data, success, error } = userInfoSchema.safeParse(
			this.userInfo,
		);
		if (!success) {
			console.error(error.issues);
			throw new DonationError(
				"Invalid user information",
				error.issues.map((issue) => issue.message)[0],
			);
		}
		return data;
	}

	protected validateDonationDetails(details: unknown): z.infer<T> {
		const { data, success, error } =
			this.donationValidationSchema.safeParse(details);
		if (!success) {
			throw new DonationError(
				"Invalid request data",
				error.issues.map((issue) => issue.message)[0],
			);
		}
		return data;
	}
}

abstract class StaticDonation<T extends z.ZodType> extends Donation<T> {
	constructor(
		userInfo: z.infer<typeof userInfoSchema>,
		is_anon: boolean,
		donationValidationSchema: T,
	) {
		super(userInfo, is_anon, donationValidationSchema);
	}

	protected async record_donation_intent(details: {
		campaign_id: string;
		amount: number;
		auto_allocate: boolean;
		unallocated_amount: number;
		selectedProducts: Record<string, number>;
	}) {
		const { data, error } = await supabaseAdmin.rpc(
			"record_donation_intent",
			{
				donation_data: {
					campaign_id: details.campaign_id,
					amount: details.amount,
					email: this.userInfo.email,
					contact_number: this.userInfo.contact_number,
					name: this.userInfo.name,
					is_anon: this.is_anon,
					auto_allocate: details.auto_allocate,
					notes: this.userInfo.notes,
					unallocated_amount: details.unallocated_amount,
					status: "Pending",
					pan_number: this.userInfo.pan_number,
					address: this.userInfo.address,
				},
				products: details.selectedProducts,
			},
		);

		if (error) {
			console.error(
				"Error creating a new donation intent:",
				error.message,
			);
			throw new DonationError(
				"Something went wrong",
				"Failed to create your donation request. Please try again later.",
			);
		}

		return data as string;
	}

	protected async create_razorpay(
		amount_in_rupee: number,
		backer_id: string,
	) {
		const order = await razorpay.orders.create({
			amount: amount_in_rupee * 100, // convert to paise
			currency: "INR",
			receipt: backer_id,
		});
		return order;
	}
}

abstract class RecurringDonation<T extends z.ZodType> extends Donation<T> {
	constructor(
		userInfo: z.infer<typeof userInfoSchema>,
		is_anon: boolean,
		donationValidationSchema: T,
	) {
		super(userInfo, is_anon, donationValidationSchema);
	}

	protected async get_razorpay_plan_details(sub_plan_id: string) {
		const { data, error } = await supabaseAdmin
			.from("subscription_plans")
			.select("razorpay_plan_id, total_count")
			.eq("id", sub_plan_id)
			.maybeSingle();
		if (error) {
			console.log(error);
			throw new DonationError(
				"Encountered an error",
				"Couldn't create your subscription",
			);
		}

		if (!data) {
			throw new DonationError(
				"Encountered an error",
				"Subscription plan not found",
			);
		}

		return {
			razorpay_plan_id: data.razorpay_plan_id as string,
			total_count: data.total_count as number,
		};
	}

	protected async record_intent(plan_id: string, sub_id: string) {
		const { data, error } = await supabaseAdmin
			.from("subscriptions")
			.insert({
				name: this.userInfo.name,
				email: this.userInfo.email,
				phone: this.userInfo.contact_number,
				pan_number: this.userInfo.pan_number,
				address: this.userInfo.address,
				plan_id,
				status: SubscriptionStatus.Created,
				razorpay_subscription_id: sub_id,
			})
			.select();

		if (error) {
			throw new DonationError(
				"Encountered an error",
				"Couldn't create your subscription. Please try again",
			);
		}

		return data[0].id as string;
	}

	protected async create_razorpay(
		amount_in_rupee: number,
		backer_id: string,
	) {
		const order = await razorpay.orders.create({
			amount: amount_in_rupee * 100, // convert to paise
			currency: "INR",
			receipt: backer_id,
		});
		return order;
	}
}

export { StaticDonation, DonationError, RecurringDonation, userInfoSchema };

export type { DonationCreationSuccessResponse, DonationCreationErrorResponse };
