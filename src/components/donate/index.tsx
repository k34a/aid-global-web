"use client";

import React from "react";
import Script from "next/script";
import { ngoDetails } from "@/config/config";
import toast from "react-hot-toast";
import {
	createDonationIntent,
	createDonationIntentForCampaigns,
	createSubscriptionIntent,
} from "@/lib/actions/donate";
import z from "zod/v4";
import { userInfoSchema } from "@/lib/db/donation/donation";
import { otherDonationDetailsSchema } from "@/lib/db/donation/other-donation";
import { campaignDetailsSchema } from "@/lib/db/donation/campaign-donation";
import { subscriptionDetailsSchema } from "@/lib/db/donation/subscription-donation";

export const callbackBaseUrl =
	process.env.NODE_ENV === "production"
		? ngoDetails.contact.website
		: "http://localhost:3000";

interface RazorpayInstance {
	open(): void;
	on(event: string, callback: (...args: Array<unknown>) => void): void;
	close(): void;
}

declare global {
	interface Window {
		Razorpay: new (options: unknown) => RazorpayInstance;
	}
}

function getRazorpayOptionsForDonation(
	amount: number,
	razorpay_order_id: string,
	donation_intent_id: string,
	userInfo: { name: string; email: string; contact_number: string },
) {
	return {
		key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
		amount: amount * 100,
		currency: "INR",
		name: ngoDetails.name,
		description: ngoDetails.description,
		logo: ngoDetails.logo,
		order_id: razorpay_order_id,
		callback_url: `${callbackBaseUrl}/receipt/donation/${donation_intent_id}`,
		prefill: {
			name: userInfo.name,
			email: userInfo.email,
			contact: userInfo.contact_number,
		},
		theme: {
			color: "#3399cc",
		},
	};
}

interface DonateArgs {
	userInfo: z.infer<typeof userInfoSchema>;
	is_anon: boolean;
	donation_details: z.infer<typeof otherDonationDetailsSchema>;
}

async function onDonateButtonClick(args: DonateArgs) {
	try {
		const response = await createDonationIntent(
			args.userInfo,
			args.is_anon,
			args.donation_details,
		);

		if (!response.success) {
			toast.error(response.error.message);
			return;
		}

		const options = getRazorpayOptionsForDonation(
			args.donation_details.amount,
			response.data.razorpay_order_id,
			response.data.donation_intent_id,
			{
				name: args.userInfo.name,
				email: args.userInfo.email,
				contact_number: args.userInfo.contact_number,
			},
		);

		const rzp1 = new window.Razorpay(options);
		rzp1.open();
	} catch (error) {
		console.error("Donation failed!", error);
		toast.error(
			"An unexpected error occurred while processing your donation.",
		);
	}
}

interface DonateForCampaignArgs {
	userInfo: z.infer<typeof userInfoSchema>;
	is_anon: boolean;
	campaign_details: z.infer<typeof campaignDetailsSchema>;
}

async function onCampaignDonateButtonClick(args: DonateForCampaignArgs) {
	try {
		const response = await createDonationIntentForCampaigns(
			args.userInfo,
			args.is_anon,
			args.campaign_details,
		);

		if (!response.success) {
			toast.error(response.error.message);
			return;
		}

		const options = getRazorpayOptionsForDonation(
			args.campaign_details.amount,
			response.data.razorpay_order_id,
			response.data.donation_intent_id,
			{
				name: args.userInfo.name,
				email: args.userInfo.email,
				contact_number: args.userInfo.contact_number,
			},
		);

		const rzp1 = new window.Razorpay(options);
		rzp1.open();
	} catch (error) {
		console.error("Donation failed!", error);
		toast.error(
			"An unexpected error occurred while processing your donation.",
		);
	}
}

interface SubscriptionArgs {
	userInfo: z.infer<typeof userInfoSchema>;
	is_anon: boolean;
	subscription_details: z.infer<typeof subscriptionDetailsSchema>;
}

async function onSubscriptionButtonClick(args: SubscriptionArgs) {
	try {
		const response = await createSubscriptionIntent(
			args.userInfo,
			args.is_anon,
			args.subscription_details,
		);

		if (!response.success) {
			toast.error(response.error.message);
			return;
		}

		const options = {
			key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
			subscription_id: response.data.razorpay_subscription_id,
			name: ngoDetails.name,
			description: ngoDetails.description,
			logo: ngoDetails.logo,
			callback_url: `${callbackBaseUrl}/receipt/subscription/${response.data.donation_intent_id}`,
			prefill: {
				name: args.userInfo.name,
				email: args.userInfo.email,
				contact: args.userInfo.contact_number,
			},
			theme: {
				color: "#3399cc",
			},
		};

		const rzp1 = new window.Razorpay(options);
		rzp1.open();
	} catch (error) {
		console.error("Donation failed!", error);
		toast.error(
			"An unexpected error occurred while processing your donation.",
		);
	}
}

const RazorpayScript = () => {
	return <Script src="https://checkout.razorpay.com/v1/checkout.js" />;
};

export {
	RazorpayScript,
	onDonateButtonClick,
	onCampaignDonateButtonClick,
	onSubscriptionButtonClick,
};
