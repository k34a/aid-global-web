import React, { useState } from "react";
import { IndianRupee } from "lucide-react";
import { DonateButton } from "./donate";
import { CampaignProduct } from "@/lib/db/campaigns";

interface DonationSummaryProps {
	products: CampaignProduct[];
	selectedProducts: Record<string, number>;
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
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [contact, setContact] = useState("");
	const [isAnonymous, setIsAnonymous] = useState(false);

	const isDonationValid = () => {
		if (amountInput < totalCost) return false;
		if (amountInput > totalCost && !autoAllocate) return false;
		if (!name || !email || !contact) return false;
		return true;
	};

	return (
		<div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-teal-500">
			<h3 className="text-xl font-bold text-gray-800 mb-4">
				Donation Summary
			</h3>

			{/* Selected Products */}
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

			{/* Total */}
			<div className="flex justify-between items-center py-2 border-t border-gray-200 mb-4">
				<span className="font-bold text-gray-800">Total Cost:</span>
				<span className="font-bold text-teal-600 text-lg flex items-center gap-1">
					<IndianRupee size={18} />
					{totalCost}
				</span>
			</div>

			{/* Amount Input */}
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
						className="border border-gray-300 px-3 py-2 rounded-lg w-32 text-right focus:ring-2 focus:ring-teal-500"
						min={0}
						value={amountInput}
						onChange={(e) =>
							handleAmountChange(Number(e.target.value))
						}
					/>
				</div>
			</div>

			{/* Auto Allocate */}
			{amountInput > totalCost && (
				<div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200 mb-4">
					<input
						type="checkbox"
						id="auto-allocate"
						checked={autoAllocate}
						onChange={() => setAutoAllocate(!autoAllocate)}
						className="w-4 h-4 text-teal-600 border-gray-300 rounded"
					/>
					<label
						htmlFor="auto-allocate"
						className="text-sm text-blue-800 flex items-center gap-1"
					>
						Automatically allocate extra{" "}
						<IndianRupee size={12} className="inline" />{" "}
						{amountInput - totalCost} towards other products
					</label>
				</div>
			)}

			{/* Validation Messages */}
			{amountInput < totalCost && (
				<div className="p-3 bg-red-50 rounded-lg border border-red-200 mb-4">
					<p className="text-sm text-red-800 flex items-center gap-1">
						Donation amount must be at least{" "}
						<IndianRupee size={12} className="inline" /> {totalCost}
					</p>
				</div>
			)}

			{/* User Input Section */}
			<div className="space-y-3 mb-4">
				<input
					type="text"
					placeholder="Your Name"
					className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					type="email"
					placeholder="Your Email"
					className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="tel"
					placeholder="Contact Number"
					className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500"
					value={contact}
					onChange={(e) => setContact(e.target.value)}
				/>
				<label className="flex items-center gap-2 text-sm text-gray-700">
					<input
						type="checkbox"
						checked={isAnonymous}
						onChange={() => setIsAnonymous(!isAnonymous)}
						className="w-4 h-4 border-gray-300 text-teal-600"
					/>
					Donate Anonymously
				</label>
			</div>

			<DonateButton
				name={name}
				email={email}
				contact_number={contact}
				campaign_id={campaignId}
				products={selectedProducts}
				amount={amountInput}
				is_anon={isAnonymous}
				auto_allocate={autoAllocate}
				className={`w-full py-3 px-6 rounded-lg font-medium text-lg transition-colors ${
					isDonationValid()
						? "bg-teal-600 hover:bg-teal-700 text-white"
						: "bg-gray-300 text-gray-500 cursor-not-allowed"
				}`}
				text={`Donate ${String.fromCharCode(8377)}${amountInput}`}
			/>
		</div>
	);
};
