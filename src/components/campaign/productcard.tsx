"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ShoppingCart, Plus, Minus, IndianRupee } from "lucide-react";
import { getImageUrl } from "./utils";
import { CampaignProduct } from "@/lib/db/campaigns";

interface ProductCardProps {
	product: CampaignProduct;
	slug: string;
	selectedQty: number;
	onIncrement: (id: string) => void;
	onDecrement: (id: string) => void;
	onRemove: (id: string) => void;
	onSetQuantity: (id: string, quantity: number) => void;
	disabled?: boolean;
}

export const ProductCard = ({
	product,
	slug,
	selectedQty,
	onIncrement,
	onDecrement,
	onRemove,
	onSetQuantity,
	disabled = false,
}: ProductCardProps) => {
	const imageUrl = product.image ? getImageUrl(slug, product.image) : null;
	const [inputValue, setInputValue] = useState(selectedQty.toString());
	const remainingUnits = product.units_required - product.units_collected;
	const isSelected = selectedQty > 0;

	// Update input value when selectedQty changes
	useEffect(() => {
		setInputValue(selectedQty > 0 ? selectedQty.toString() : "");
	}, [selectedQty]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		// Only allow numeric input
		if (value === "" || /^\d+$/.test(value)) {
			setInputValue(value);

			// Only update quantity if we have a valid number (not empty)
			if (value !== "") {
				const numValue = parseInt(value) || 0;
				const clampedValue = Math.max(
					0,
					Math.min(numValue, remainingUnits),
				);
				onSetQuantity(product.id, clampedValue);
			}
		}
	};

	const handleInputBlur = () => {
		// When user finishes typing, update with final value
		const numValue = parseInt(inputValue) || 0;
		const clampedValue = Math.max(0, Math.min(numValue, remainingUnits));
		setInputValue(clampedValue > 0 ? clampedValue.toString() : "");
		onSetQuantity(product.id, clampedValue);
	};

	const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleInputBlur();
			e.currentTarget.blur();
		}
	};

	const isInputValid = () => {
		const numValue = parseInt(inputValue) || 0;
		return numValue >= 0 && numValue <= remainingUnits;
	};

	return (
		<div
			className={`bg-white p-4 rounded-lg shadow transition-all duration-200 ${
				isSelected
					? "ring-2 ring-blue-500 shadow-lg"
					: "hover:shadow-md"
			} ${disabled ? "opacity-50 pointer-events-none" : ""}`}
		>
			<div className="relative h-36 w-full mb-3">
				{imageUrl ? (
					<Image
						src={imageUrl}
						alt={product.title}
						fill
						className="object-cover rounded"
					/>
				) : (
					<div className="h-full flex items-center justify-center bg-gray-200 rounded">
						<ShoppingCart
							className="text-4xl text-gray-400"
							size={48}
						/>
					</div>
				)}
				{isSelected && (
					<div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
						{selectedQty}
					</div>
				)}
			</div>

			<h3 className="font-semibold text-gray-800 mb-1">
				{product.title}
			</h3>
			<p className="text-sm text-gray-600 mb-3 line-clamp-2">
				{product.description}
			</p>

			<div className="flex items-center justify-between mb-3">
				<span className="text-lg font-bold text-blue-600 flex items-center gap-1">
					<IndianRupee size={16} />
					{product.price_per_unit}
				</span>
				<span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
					{remainingUnits} needed
				</span>
			</div>

			{disabled ? (
				<div className="text-center py-4">
					<p className="text-sm text-gray-500">
						Direct donation mode active
					</p>
				</div>
			) : isSelected ? (
				<div className="space-y-2">
					<div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
						<button
							onClick={() => onDecrement(product.id)}
							className="w-8 h-8 rounded-full bg-white hover:bg-gray-100 border border-gray-300 flex items-center justify-center transition-colors shadow-sm"
						>
							<Minus
								className="text-gray-600 text-xs"
								size={16}
							/>
						</button>
						<div className="flex flex-col items-center">
							<input
								type="text"
								value={inputValue}
								onChange={handleInputChange}
								onBlur={handleInputBlur}
								onKeyPress={handleInputKeyPress}
								className={`w-20 h-9 text-center bg-white border-2 ${
									isInputValid()
										? "border-gray-300 focus:border-blue-500"
										: "border-red-400"
								} rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors`}
								title={`Max: ${remainingUnits} units`}
								placeholder="0"
							/>
							<span className="text-xs text-gray-500 mt-1 font-medium">
								Max: {remainingUnits}
							</span>
						</div>
						<button
							onClick={() => onIncrement(product.id)}
							className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors shadow-sm"
							disabled={selectedQty >= remainingUnits}
						>
							<Plus className="text-xs" size={16} />
						</button>
					</div>
					<button
						onClick={() => onRemove(product.id)}
						className="w-full text-sm text-red-600 hover:text-red-700 hover:bg-red-50 py-2 px-3 rounded-lg transition-colors font-medium border border-red-200 hover:border-red-300"
					>
						Remove from cart
					</button>
				</div>
			) : (
				<button
					onClick={() => onIncrement(product.id)}
					className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
					disabled={remainingUnits <= 0}
				>
					<Plus className="text-sm" size={16} />
					Add to Cart
				</button>
			)}
		</div>
	);
};
