"use client";

import { DEFAULT_CAMPAIGN } from "@/config/data";
import { IndianRupee } from "lucide-react";

interface DonationInfoProps {
	campaign_id: string;
	campaigns: {
		title: string;
		description: string;
	};
	donated_products: Array<{
		quantity: number;
		campaign_products: {
			title: string;
			price_per_unit: number;
		};
	}>;
	unallocated_amount: number;
}

const DonationInfo = (props: DonationInfoProps) => {
	const isNGOLevel = props.campaign_id === DEFAULT_CAMPAIGN;

	if (isNGOLevel) {
		return;
	}

	return (
		<>
			{props.campaigns && (
				<div className="mb-6">
					<h2 className="text-lg font-semibold mb-4 border-b pb-2">
						Campaign Details
					</h2>

					<p>
						Following are the details of the campaign you chose to
						support through your donation.
					</p>
					<table className="w-full text-sm border border-gray-300">
						<tbody className="[&>tr]:border-b [&>tr:last-child]:border-b-0">
							<tr>
								<td className="font-semibold p-2 w-1/3 bg-gray-50">
									{props.campaigns.title}
								</td>
								<td className="p-2 text-wrap">
									{props.campaigns.description}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			)}
			{/* Product Info */}
			{props.donated_products.length > 0 && (
				<div className="mb-6">
					<h2 className="text-lg font-semibold mb-4 border-b pb-2">
						Products Donated
					</h2>
					<p>
						Breakdown of the specific products and quantities you
						donated to the campaign.
					</p>
					<table className="w-full text-sm border border-gray-300">
						<thead>
							<tr>
								<th className="font-semibold p-2 bg-gray-100">
									Product
								</th>
								<th className="font-semibold p-2 bg-gray-100">
									Quantity
								</th>
								<th className="font-semibold p-2 bg-gray-100">
									Price (per unit)
								</th>
							</tr>
						</thead>
						<tbody className="[&>tr]:border-t text-center">
							{props.donated_products.map(
								(donatedProduct, index) => {
									return (
										<tr key={index}>
											<td className="p-2">
												{
													donatedProduct
														.campaign_products.title
												}
											</td>
											<td className="p-2">
												{donatedProduct.quantity} unit
												{donatedProduct.quantity > 1
													? "s"
													: ""}
											</td>
											<td className="p-2 flex items-center gap-1">
												<IndianRupee className="w-3 h-3" />
												{
													donatedProduct
														.campaign_products
														.price_per_unit
												}
											</td>
										</tr>
									);
								},
							)}
							{props.unallocated_amount > 0 && (
								<tr>
									<td className="p-2">
										Others<sup>*</sup>
									</td>
									<td className="p-2">-</td>
									<td className="p-2">
										{props.unallocated_amount}
									</td>
								</tr>
							)}
						</tbody>
					</table>
					{props.unallocated_amount > 0 && (
						<p className="mt-2 text-xs text-gray-500">
							<sup>*</sup> This includes any unallocated amount
							from your donation. This happens when the donation
							exceeds the total value of selected products, or
							when no specific products or campaigns were chosen
							during donation.
						</p>
					)}
				</div>
			)}
		</>
	);
};

export default DonationInfo;
