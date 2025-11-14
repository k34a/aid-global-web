"use client";

import { ngoDetails } from "@/config/config";

const ReceiptFooter = ({ id, oneTime }: { id: string; oneTime: boolean }) => {
	return (
		<div className="pt-4 text-sm text-gray-700">
			<p>
				<strong>{ngoDetails.name}</strong>
			</p>
			<p>
				{
					ngoDetails.contact.addresses.filter(
						(a) => a.type === "communication",
					)[0].address
				}
			</p>
			<p>
				Email: {ngoDetails.contact.email} | Phone:{" "}
				{ngoDetails.contact.nationalHelpline}
			</p>
			<p>Website: {ngoDetails.contact.website}</p>
			<p className="mt-4 text-xs text-center text-gray-500">
				To verify or reprint this receipt, visit:{" "}
				<span className="underline">{`${ngoDetails.contact.website}/receipt/${oneTime ? "donation" : "subscription"}/${id}`}</span>
			</p>
		</div>
	);
};

export default ReceiptFooter;
