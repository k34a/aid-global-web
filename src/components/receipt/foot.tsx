"use client";

import { ngoDetails } from "@/config/config";

const ReceiptFooter = ({ id }: { id: string }) => {
	return (
		<div className="pt-4 text-sm text-gray-700">
			<p>
				<strong>{ngoDetails.name}</strong>
			</p>
			<p>{ngoDetails.contact.address}</p>
			<p>
				Email: {ngoDetails.contact.email} | Phone:{" "}
				{ngoDetails.contact.phone}
			</p>
			<p>Website: {ngoDetails.contact.website}</p>
			<p className="mt-4 text-xs text-center text-gray-500">
				To verify or reprint this receipt, visit:{" "}
				<span className="underline">{`${ngoDetails.contact.website}/donation/${id}`}</span>
			</p>
		</div>
	);
};

export default ReceiptFooter;
