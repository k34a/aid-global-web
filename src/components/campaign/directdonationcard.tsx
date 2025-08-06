"use client";

import React, { useState, useEffect } from "react";
import { Heart, IndianRupee } from "lucide-react";

interface DirectDonationCardProps {
	amount: number;
	onAmountChange: (amount: number) => void;
	isSelected: boolean;
	onToggle: () => void;
}

export const DirectDonationCard = ({
	amount,
	onAmountChange,
	isSelected,
	onToggle,
}: DirectDonationCardProps) => {
	const [inputValue, setInputValue] = useState(amount.toString());
	const [isTyping, setIsTyping] = useState(false);

	// Update input value when amount changes from parent
	useEffect(() => {
		if (!isTyping) {
			setInputValue(amount.toString());
		}
	}, [amount, isTyping]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setInputValue(value);
		setIsTyping(true);

		// Only allow numeric input
		if (value === "" || /^\d+$/.test(value)) {
			const numValue = parseInt(value) || 0;
			onAmountChange(numValue);
		}
	};

	const handleInputBlur = () => {
		setIsTyping(false);
		const numValue = parseInt(inputValue) || 0;
		setInputValue(numValue.toString());
		onAmountChange(numValue);
	};

	const handleInputFocus = () => {
		setIsTyping(true);
		// Clear the input if it's 0 when user starts typing
		if (amount === 0) {
			setInputValue("");
		}
	};

	return (
		<div
			className={`bg-white p-6 rounded-lg shadow transition-all duration-200 ${
				isSelected ? "ring-2 ring-sky-500 shadow-lg" : "hover:shadow-md"
			}`}
		>
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				{/* Left: Icon + Text */}
				<div className="flex items-center gap-3">
					<div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center">
						<Heart className="text-sky-600" size={24} />
					</div>
					<div>
						<h3 className="font-semibold text-gray-800">
							Direct Donation
						</h3>
						<p className="text-sm text-gray-600">
							Let us allocate your donation to the most needed
							items
						</p>
					</div>
				</div>

				{/* Right: Button */}
				{!isSelected && (
					<button
						onClick={onToggle}
						className="bg-sky-600 hover:bg-sky-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm"
					>
						<Heart size={16} className="mt-[1px]" />
						<span className="leading-none">Donate Any Amount</span>
					</button>
				)}
			</div>
			{isSelected && (
				<div className="mt-4 space-y-3">
					<div className="flex items-center gap-2">
						<IndianRupee className="text-gray-600" size={16} />
						<input
							type="text"
							value={inputValue}
							onChange={handleInputChange}
							onFocus={handleInputFocus}
							onBlur={handleInputBlur}
							className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
							placeholder="Enter amount"
						/>
					</div>
					<button
						onClick={onToggle}
						className="w-full text-sm text-red-600 hover:text-red-700 hover:bg-red-50 py-2 px-3 rounded-lg transition-colors font-medium border border-red-200 hover:border-red-300"
					>
						Cancel
					</button>
				</div>
			)}
		</div>
	);
};
