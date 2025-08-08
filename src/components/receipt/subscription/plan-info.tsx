"use client";

type Props = {
	planName: string;
};

const SubscriptionPlanInfo = ({ planName }: Props) => {
	return (
		<div className="mb-6">
			<h2 className="text-lg font-semibold mb-4 border-b pb-2">
				Subscription Plan
			</h2>
			<p>You have subscribed to the following plan:</p>
			<div className="mt-2 p-3 bg-gray-100 rounded">
				<strong>{planName}</strong>
			</div>
		</div>
	);
};

export default SubscriptionPlanInfo;
