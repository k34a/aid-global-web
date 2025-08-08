"use client";

interface SubscriberInfoProps {
	id: string;
	name: string;
	email: string;
	phone: string;
	status: string;
	pan?: string | null;
	address?: string | null;
	start_date: Date;
	end_date?: Date | null;
}

const SubscriberInfo = ({
	id,
	name,
	email,
	phone,
	status,
	start_date,
	end_date,
	pan,
	address,
}: SubscriberInfoProps) => {
	const formattedStartDate = new Date(start_date).toLocaleDateString(
		"en-IN",
		{
			year: "numeric",
			month: "long",
			day: "numeric",
		},
	);

	const formattedEndDate = end_date
		? new Date(end_date).toLocaleDateString("en-IN", {
				year: "numeric",
				month: "long",
				day: "numeric",
			})
		: null;

	return (
		<>
			<div className="mb-8">
				<div className="flex justify-between items-center mb-4 border-b pb-2">
					<h2 className="text-lg font-semibold">Subscription Info</h2>
				</div>
				<table className="w-full text-sm border border-gray-300">
					<tbody>
						<tr>
							<td className="font-semibold p-2 bg-gray-50 w-1/3">
								Subscription ID
							</td>
							<td className="p-2">{id}</td>
						</tr>
						<tr>
							<td className="font-semibold p-2 bg-gray-50">
								Start Date
							</td>
							<td className="p-2">{formattedStartDate}</td>
						</tr>
						{formattedEndDate && (
							<tr>
								<td className="font-semibold p-2 bg-gray-50">
									End Date
								</td>
								<td className="p-2">{formattedEndDate}</td>
							</tr>
						)}
						<tr>
							<td className="font-semibold p-2 bg-gray-50">
								Subscriber Name
							</td>
							<td className="p-2">{name}</td>
						</tr>
						<tr>
							<td className="font-semibold p-2 bg-gray-50">
								Email
							</td>
							<td className="p-2">{email}</td>
						</tr>
						<tr>
							<td className="font-semibold p-2 bg-gray-50">
								Phone
							</td>
							<td className="p-2">{phone}</td>
						</tr>
						<tr>
							<td className="font-semibold p-2 bg-gray-50">
								Status
							</td>
							<td className="p-2">{status}</td>
						</tr>
						{pan && (
							<tr>
								<td className="font-semibold p-2 bg-gray-50">
									PAN Number
								</td>
								<td className="p-2">{pan}</td>
							</tr>
						)}
						{address && (
							<tr>
								<td className="font-semibold p-2 bg-gray-50">
									Address
								</td>
								<td className="p-2 whitespace-pre-wrap">
									{address}
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default SubscriberInfo;
