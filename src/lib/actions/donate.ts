"use server";

import {
	DonationCreationErrorResponse,
	DonationError,
	userInfoSchema,
} from "@/lib/db/donation/create/base";
import {
	campaignDetailsSchema,
	CampaignDonation,
} from "@/lib/db/donation/create/campaign";
import {
	otherDonationDetailsSchema,
	OtherDonation,
} from "@/lib/db/donation/create/other";
import { z } from "zod/v4";
import {
	Subscription,
	subscriptionDetailsSchema,
} from "@/lib/db/donation/create/subscription";

export async function createDonationIntentForCampaigns(
	userInfo: z.infer<typeof userInfoSchema>,
	is_anon: boolean,
	campaign_details: z.infer<typeof campaignDetailsSchema>,
) {
	try {
		const campaignDonation = new CampaignDonation(userInfo, is_anon);
		const data = await campaignDonation.create(campaign_details);
		return data;
	} catch (error) {
		if (error instanceof DonationError) {
			return error.getError();
		}
		return {
			success: false,
			error: {
				title: "Unexpected error occured",
				message: "Please try again later.",
			},
		} as DonationCreationErrorResponse;
	}
}

export async function createDonationIntent(
	userInfo: z.infer<typeof userInfoSchema>,
	is_anon: boolean,
	donation_details: z.infer<typeof otherDonationDetailsSchema>,
) {
	try {
		const donation = new OtherDonation(userInfo, is_anon);
		const data = await donation.create(donation_details);
		return data;
	} catch (error) {
		if (error instanceof DonationError) {
			return error.getError();
		}
		return {
			success: false,
			error: {
				title: "Unexpected error occured",
				message: "Please try again later.",
			},
		} as DonationCreationErrorResponse;
	}
}

export async function createSubscriptionIntent(
	userInfo: z.infer<typeof userInfoSchema>,
	is_anon: boolean,
	subscriptionDetails: z.infer<typeof subscriptionDetailsSchema>,
) {
	try {
		const sub = new Subscription(userInfo, is_anon);
		const data = await sub.create(subscriptionDetails);
		return data;
	} catch (error) {
		if (error instanceof DonationError) {
			return error.getError();
		}
		return {
			success: false,
			error: {
				title: "Unexpected error occured",
				message: "Please try again later.",
			},
		} as DonationCreationErrorResponse;
	}
}
