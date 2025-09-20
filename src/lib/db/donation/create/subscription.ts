import { z } from "zod/v4";
import {
	DonationCreationSuccessResponse,
	RecurringDonation,
	userInfoSchema,
} from "@/lib/db/donation/create/base";
import { razorpay } from "@/lib/razorpay";
import { supabaseAdmin } from "../../supabase";

export const subscriptionDetailsSchema = z.object({
	plan_id: z.uuid(),
});

interface CreationResponse {
	donation_intent_id: string;
	razorpay_subscription_id: string;
}

export class Subscription extends RecurringDonation<
	typeof subscriptionDetailsSchema
> {
	constructor(userInfo: z.infer<typeof userInfoSchema>, is_anon: boolean) {
		super(userInfo, is_anon, subscriptionDetailsSchema);
	}

	public async create(
		subscriptionDetails: z.infer<typeof subscriptionDetailsSchema>,
	) {
		const details = this.validateDonationDetails(subscriptionDetails);

		const { razorpay_plan_id, total_count } =
			await this.get_razorpay_plan_details(details.plan_id);

		const sub = await razorpay.subscriptions.create({
			plan_id: razorpay_plan_id,
			total_count: total_count,
		});
		const donation_intent_id = await this.record_intent(
			details.plan_id,
			sub.id,
		);

		const response: DonationCreationSuccessResponse<CreationResponse> = {
			success: true,
			data: {
				razorpay_subscription_id: sub.id,
				donation_intent_id,
			},
		};

		return response;
	}

	public static async restart(razorpay_subscription_id: string, pin: string) {
		const { data, error } = await supabaseAdmin
			.from("subscriptions")
			.select("*, subscription_plans(*)")
			.eq("razorpay_subscription_id", razorpay_subscription_id)
			.maybeSingle();

		if (error) {
			console.error("Error fetching subscription:", error);
			throw new Error("Error fetching subscription details");
		}

		if (!data) {
			console.error(
				"No subscription found for Razorpay ID:",
				razorpay_subscription_id,
			);
			throw new Error("No subscription found with this ID");
		}

		if (!data.phone.endsWith(pin)) {
			console.error("Unauthorized to restart this subscription");
			throw new Error(
				"You are not authorized to start this subscription",
			);
		}

		const sub = new Subscription(
			{
				email: data.email,
				contact_number: data.phone,
				name: data.name,
				pan_number: data.pan_number,
				address: data.address,
			},
			false,
		);
		return sub.create({ plan_id: data.subscription_plans[0].id });
	}
}
