"use client";

import React from "react";
import { IndianRupee } from "lucide-react";
import {
	onCampaignDonateButtonClick,
	RazorpayScript,
} from "@/components/donate";
import { CampaignProduct } from "@/lib/db/campaigns";
import { Button } from "@mantine/core";
// Removed: import { DonationDetailsModal } from "./donationdetailsmodal";

interface DonationSummaryProps {
	products: CampaignProduct[];
	selectedProducts: Record<string, number>;
	totalCost: number;
	amountInput: number;
	autoAllocate: boolean;
	setAutoAllocate: (value: boolean) => void;
	handleAmountChange: (value: number) => void;
	campaignId: string;
	isDirectDonation?: boolean;
	onOpenDonationModal: (
		isDirect: boolean,
		amount: number,
		productSelections: Record<string, number>,
		autoAlloc: boolean,
	) => void;
}

export const DonationSummary = ({
	products,
	selectedProducts,
	totalCost,
	amountInput,
	autoAllocate,
	setAutoAllocate,
	handleAmountChange,
	campaignId,
	isDirectDonation = false,
	onOpenDonationModal,
}: DonationSummaryProps) => {
	const isDonationValid = () => {
		if (isDirectDonation) {
			return amountInput > 0;
		} else {
			return (
				amountInput >= totalCost &&
				(amountInput > totalCost ? autoAllocate : true)
			);
		}
	};

	return (
		<div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-sky-500">
			<RazorpayScript />
			<h3 className="text-xl font-bold text-gray-800 mb-4">
				{isDirectDonation
					? "Direct Donation Summary"
					: "Donation Summary"}
			</h3>

			{/* Selected Products - Only show if not direct donation */}
			{!isDirectDonation && (
				<div className="space-y-2 mb-4">
					{products
						.filter((product) => selectedProducts[product.id])
						.map((product) => (
							<div
								key={product.id}
								className="flex justify-between items-center py-2 border-b border-gray-100"
							>
								<div className="flex items-center gap-3">
									<span className="text-sm font-medium text-gray-800">
										{product.title}
									</span>
									<span className="text-xs text-gray-500">
										&times; {selectedProducts[product.id]}
									</span>
								</div>
								<span className="text-sm font-medium text-gray-800 flex items-center gap-1">
									<IndianRupee size={14} />
									{product.price_per_unit *
										selectedProducts[product.id]}
								</span>
							</div>
						))}
				</div>
			)}

			{/* Total - Show different text for direct donation */}
			<div className="flex justify-between items-center py-2 border-t border-gray-200 mb-4">
				<span className="font-bold text-gray-800">
					{isDirectDonation ? "Donation Amount:" : "Total Cost:"}
				</span>
				<span className="font-bold text-sky-600 text-lg flex items-center gap-1">
					<IndianRupee size={18} />
					{totalCost}
				</span>
			</div>

			{/* Amount Input - Only show for product-based donations */}
			{!isDirectDonation && (
				<div className="flex justify-between items-center mb-4">
					<label
						htmlFor="amount"
						className="text-sm font-medium text-gray-700"
					>
						Donation Amount
					</label>
					<div className="flex items-center gap-2">
						<span className="text-xs text-gray-500 flex items-center gap-1">
							Min: <IndianRupee size={12} className="inline" />{" "}
							{totalCost}
						</span>
						<input
							type="number"
							id="amount"
							className="border border-gray-300 px-3 py-2 rounded-lg w-32 text-right focus:ring-2 focus:ring-sky-500"
							min={0}
							value={amountInput}
							onChange={(e) =>
								handleAmountChange(Number(e.target.value))
							}
						/>
					</div>
				</div>
			)}

			{/* Auto Allocate - Only show for product-based donations with extra amount */}
			{!isDirectDonation && amountInput > totalCost && (
				<div className="flex items-center gap-3 p-3 bg-sky-50 rounded-lg border border-sky-200 mb-4">
					<input
						type="checkbox"
						id="auto-allocate"
						checked={autoAllocate}
						onChange={() => setAutoAllocate(!autoAllocate)}
						className="w-4 h-4 text-sky-600 border-gray-300 rounded"
					/>
					<label
						htmlFor="auto-allocate"
						className="text-sm text-sky-800 flex items-center gap-1"
					>
						Automatically allocate extra{" "}
						<IndianRupee size={12} className="inline" />{" "}
						{amountInput - totalCost} towards other products
					</label>
				</div>
			)}

			{/* Direct Donation Info */}
			{isDirectDonation && (
				<div className="p-3 bg-sky-50 rounded-lg border border-sky-200 mb-4">
					<p className="text-sm text-sky-800">
						Your donation will be automatically allocated to
						products that need funding the most.
					</p>
				</div>
			)}

			{/* Validation Messages */}
			{!isDirectDonation && amountInput < totalCost && (
				<div className="p-3 bg-red-50 rounded-lg border border-red-200 mb-4">
					<p className="text-sm text-red-800 flex items-center gap-1">
						Donation amount must be at least{" "}
						<IndianRupee size={12} className="inline" /> {totalCost}
					</p>
				</div>
			)}

			{isDirectDonation && amountInput <= 0 && (
				<div className="p-3 bg-red-50 rounded-lg border border-red-200 mb-4">
					<p className="text-sm text-red-800">
						Please enter a donation amount greater than 0.
					</p>
				</div>
			)}

			<Button
				onClick={() =>
					onOpenDonationModal(
						isDirectDonation,
						isDirectDonation ? amountInput : amountInput,
						isDirectDonation ? {} : selectedProducts,
						isDirectDonation ? true : autoAllocate,
					)
				}
				disabled={!isDonationValid()}
				className={`w-full py-3 px-6 rounded-lg font-medium text-lg transition-colors ${
					isDonationValid()
						? "bg-sky-600 hover:bg-sky-700 text-white"
						: "bg-gray-300 text-gray-500 cursor-not-allowed"
				}`}
			>
				Donate &#8377;{amountInput}
			</Button>
		</div>
	);
};
