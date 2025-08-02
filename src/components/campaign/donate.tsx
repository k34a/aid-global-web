"use client";

import React from "react";
import Script from "next/script";
import { ngoDetails } from "@/config/config";
import toast from "react-hot-toast";
import { createDonationOrder } from "@/app/api/server/create-order/actions";

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

interface DonateArgs {
	name: string;
	email: string;
	contact_number: string;
	campaign_id?: string;
	products?: Record<string, number>;
	amount: number;
	is_anon: boolean;
	auto_allocate?: boolean;
	notes?: string;
}

async function onDonateButtonClick(args: DonateArgs) {
	try {
		const response = await createDonationOrder(args);

		if (!response.success) {
			toast.error(response.message ?? "Failed to create donation.");
			return;
		}

		const options = {
			key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
			amount: args.amount * 100,
			currency: "INR",
			name: ngoDetails.name,
			description: ngoDetails.description,
			logo: ngoDetails.logo,
			order_id: response.order_id,
			callback_url: `${ngoDetails.contact.website}/receipt/donation/${response.donation_intent_id}`,
			prefill: {
				name: args.name,
				email: args.email,
				contact: args.contact_number,
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

interface DonateButtonProps extends DonateArgs {
	className?: string;
	text?: string;
}

const DonateButton = (props: DonateButtonProps) => {
	// We need to add proper error handling in this component
	const { text, className, ...donateArgs } = props;

	const [processing, setProcessing] = React.useState(false);

	const handleClick = async () => {
		setProcessing(true);
		await onDonateButtonClick(donateArgs);
		setProcessing(false);
	};

	return (
		<>
			<RazorpayScript />
			<button
				onClick={() => handleClick()}
				className={`bg-sky-500 text-white px-4 py-2 rounded ${className}`}
			>
				{processing ? "Processing..." : (text ?? "Donate")}
			</button>
		</>
	);
};

export { RazorpayScript, onDonateButtonClick, DonateButton };
