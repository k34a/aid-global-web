import React from "react";
import { IndianRupee } from "lucide-react";
import { DonateButton } from "./donate";

interface CampaignProduct {
	id: number;
	campaign_id: number;
	title: string;
	description: string;
	price_per_unit: number;
	image?: string;
	units_required: number;
	units_collected: number;
}

interface DonationSummaryProps {
	products: CampaignProduct[];
	selectedProducts: Record<number, number>;
	totalCost: number;
	amountInput: number;
	autoAllocate: boolean;
	setAutoAllocate: (value: boolean) => void;
	handleAmountChange: (value: number) => void;
	campaignId: string;
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
}: DonationSummaryProps) => {
	const isDonationValid = () => {
		if (amountInput < totalCost) return false;
		if (amountInput > totalCost && !autoAllocate) return false;
		return true;
	};

	return (
		<div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-teal-500">
			<h3 className="text-xl font-bold text-gray-800 mb-4">
				Donation Summary
			</h3>

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
									× {selectedProducts[product.id]}
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

			<div className="space-y-4">
				<div className="flex justify-between items-center py-2 border-t border-gray-200">
					<span className="font-bold text-gray-800">Total Cost:</span>
					<span className="font-bold text-teal-600 text-lg flex items-center gap-1">
						<IndianRupee size={18} />
						{totalCost}
					</span>
				</div>

				<div className="flex justify-between items-center">
					<label
						htmlFor="amount"
						className="text-sm font-medium text-gray-700"
					>
						Donation Amount
					</label>
					<div className="flex items-center gap-2">
						<span className="text-xs text-gray-500">
							Min: ₹{totalCost}
						</span>
						<input
							type="number"
							id="amount"
							className="border border-gray-300 px-3 py-2 rounded-lg w-32 text-right focus:ring-2 focus:ring-teal-500 focus:border-transparent"
							min={0}
							value={amountInput}
							onChange={(e) =>
								handleAmountChange(Number(e.target.value))
							}
						/>
					</div>
				</div>

				{amountInput > totalCost && (
					<div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
						<input
							type="checkbox"
							id="auto-allocate"
							checked={autoAllocate}
							onChange={() => setAutoAllocate(!autoAllocate)}
							className="w-4 h-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
						/>
						<label
							htmlFor="auto-allocate"
							className="text-sm text-blue-800"
						>
							Allocate extra ₹{amountInput - totalCost} towards
							selected products
						</label>
					</div>
				)}

				{amountInput < totalCost && (
					<div className="p-3 bg-red-50 rounded-lg border border-red-200">
						<p className="text-sm text-red-800">
							Donation amount must be at least ₹{totalCost}
						</p>
					</div>
				)}

				{amountInput > totalCost && !autoAllocate && (
					<div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
						<p className="text-sm text-yellow-800">
							Please check the allocation checkbox to donate more
							than the product cost
						</p>
					</div>
				)}

				<DonateButton
					name="John Doe"
					email="john@example.com"
					contact_number="9876543210"
					campaign_id={campaignId}
					products={selectedProducts}
					amount={amountInput}
					is_anon={false}
					auto_allocate={autoAllocate}
					className={`w-full py-3 px-6 rounded-lg font-medium text-lg transition-colors ${
						isDonationValid()
							? "bg-teal-600 hover:bg-teal-700 text-white"
							: "bg-gray-300 text-gray-500 cursor-not-allowed"
					}`}
					text={`Donate ₹${amountInput}`}
				/>
			</div>
		</div>
	);
};
