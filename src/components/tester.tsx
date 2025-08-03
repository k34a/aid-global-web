"use client";

import {
	onCampaignDonateButtonClick,
	onDonateButtonClick,
	onSubscriptionButtonClick,
	RazorpayScript,
} from "./donate";

const TestComponent = () => {
	return (
		<div className="w-full min-h-screen flex items-center justify-center">
			<RazorpayScript />
			<div>
				<button
					className="text-xl p-6 rounded-xl bg-green-500"
					onClick={() =>
						onSubscriptionButtonClick({
							userInfo: {
								name: "Test name",
								email: "test@emails.com",
								contact_number: "9810133559",
							},
							is_anon: false,
							subscription_details: {
								plan_id: "29c7e0b7-7edf-4db5-95e2-977793672cee",
							},
						})
					}
				>
					Donate!!!
				</button>
			</div>
		</div>
	);
};

export default TestComponent;
