"use client";

import { IndianRupee } from "lucide-react";
import numWords from "num-words";

interface DonorInfoProps {
	created_at: Date;
	id: string;
	name: string;
	email: string;
	contact_number: string;
	is_anon: boolean;
	amount: number;
	status: "Pending" | "Completed";
}

const DonorInfo = (props: DonorInfoProps) => {
	const formattedDate = new Date(props.created_at).toLocaleDateString(
		"en-IN",
		{
			year: "numeric",
			month: "long",
			day: "numeric",
		},
	);
	return (
		<div className="mb-8">
			<h2 className="text-lg font-semibold mb-4 border-b pb-2">
				Donation Receipt
			</h2>
			<table className="w-full text-sm border border-gray-300">
				<tbody className="[&>tr]:border-b [&>tr:last-child]:border-b-0">
					<tr>
						<td className="font-semibold p-2 w-1/3 bg-gray-50">
							Receipt ID
						</td>
						<td className="p-2">{props.id}</td>
					</tr>
					<tr>
						<td className="font-semibold p-2 bg-gray-50">Date</td>
						<td className="p-2">{formattedDate}</td>
					</tr>
					<tr>
						<td className="font-semibold p-2 bg-gray-50">
							Donor Name
						</td>
						<td className="p-2">{props.name}</td>
					</tr>

					<tr>
						<td className="font-semibold p-2 bg-gray-50">
							Donor Email
						</td>
						<td className="p-2">{props.email}</td>
					</tr>
					<tr>
						<td className="font-semibold p-2 bg-gray-50">
							Donor Contact Number
						</td>
						<td className="p-2">{props.contact_number}</td>
					</tr>
					<tr>
						<td className="font-semibold p-2 bg-gray-50">
							Is Donation Anonymous?
						</td>
						<td className="p-2">{props.is_anon ? "Yes" : "No"}</td>
					</tr>
					<tr>
						<td className="font-semibold p-2 bg-gray-50">
							Amount Donated
						</td>
						<td className="p-2 font-bold text-green-700 flex items-center gap-1">
							<IndianRupee className="w-4 h-4" />
							{props.amount}
						</td>
					</tr>
					<tr>
						<td className="font-semibold p-2 bg-gray-50">
							Amount in Words
						</td>
						<td className="p-2">
							Rupees {numWords(props.amount)} only
						</td>
					</tr>
					<tr>
						<td className="font-semibold p-2 bg-gray-50">Status</td>
						<td className="p-2">{props.status}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default DonorInfo;
