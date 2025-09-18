import { z } from "zod/v4";
import {
	StaticDonation,
	DonationCreationSuccessResponse,
	userInfoSchema,
} from "@/lib/db/donation/create/base";
import { DEFAULT_CAMPAIGN } from "@/config/data";

export const otherDonationDetailsSchema = z.object({
	amount: z.number().min(1, "Amount must be greater than 0"),
});

interface CreationResponse {
	donation_intent_id: string;
	razorpay_order_id: string;
}

export class OtherDonation extends StaticDonation<
	typeof otherDonationDetailsSchema
> {
	constructor(userInfo: z.infer<typeof userInfoSchema>, is_anon: boolean) {
		super(userInfo, is_anon, otherDonationDetailsSchema);
	}

	public async create(
		donationDetails: z.infer<typeof otherDonationDetailsSchema>,
	) {
		const details = this.validateDonationDetails(donationDetails);

		const backer_id = await this.record_donation_intent({
			campaign_id: DEFAULT_CAMPAIGN,
			amount: details.amount,
			auto_allocate: false,
			unallocated_amount: 0,
			selectedProducts: {},
		});

		const order = await this.create_razorpay(details.amount, backer_id);

		const response: DonationCreationSuccessResponse<CreationResponse> = {
			success: true,
			data: {
				donation_intent_id: backer_id,
				razorpay_order_id: order.id,
			},
		};

		return response;
	}
}
