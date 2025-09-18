import { z } from "zod/v4";
import {
	DonationCreationSuccessResponse,
	RecurringDonation,
	userInfoSchema,
} from "@/lib/db/donation/create/base";
import { razorpay } from "@/lib/razorpay";

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
}
