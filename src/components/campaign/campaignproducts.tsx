"use client";

import React, { useEffect, useState, useRef } from "react";
import { ShoppingCart } from "lucide-react";
import { CartSummary } from "./cartsummary";
import { ProductCard } from "./productcard";
import { DonationSummary } from "./donationsummary";
import { CampaignProduct } from "@/lib/db/campaigns";
import { DirectDonationCard } from "./directdonationcard";

interface CampaignProductsProps {
	products: CampaignProduct[];
	slug: string;
	campaignId: string;
}

// Empty State Component
const EmptyState = () => (
	<div className="text-center py-12 bg-gray-50 rounded-lg">
		<ShoppingCart
			className="text-6xl text-gray-300 mx-auto mb-4"
			size={64}
		/>
		<h3 className="text-xl font-medium text-gray-600 mb-2">
			Choose a donation method above
		</h3>
		<p className="text-gray-500">
			Select specific items or enter a direct donation amount
		</p>
	</div>
);

export default function CampaignProducts({
	products,
	slug,
	campaignId,
}: CampaignProductsProps) {
	const [selectedProducts, setSelectedProducts] = useState<
		Record<string, number>
	>({});
	const [amountInput, setAmountInput] = useState(0);
	const [autoAllocate, setAutoAllocate] = useState(true);

	const [directDonationMode, setDirectDonationMode] = useState(false);
	const [directDonationAmount, setDirectDonationAmount] = useState(0);

	const previousTotalCostRef = useRef(0);
	const currentAmountInputRef = useRef(0);

	const increment = (id: string) => {
		setSelectedProducts((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
	};

	const decrement = (id: string) => {
		setSelectedProducts((prev) => {
			const current = prev[id] || 0;
			if (current <= 1) {
				const { [id]: _, ...rest } = prev;
				return rest;
			}
			return { ...prev, [id]: current - 1 };
		});
	};

	const removeProduct = (id: string) => {
		setSelectedProducts((prev) => {
			const { [id]: _, ...rest } = prev;
			return rest;
		});
	};

	const onSetQuantity = (id: string, quantity: number) => {
		const product = products.find((p) => p.id === id);
		if (!product) return;

		const remainingUnits = product.units_required - product.units_collected;
		const validQuantity = Math.max(0, Math.min(quantity, remainingUnits));

		setSelectedProducts((prev) => {
			if (validQuantity === 0) {
				const { [id]: _, ...rest } = prev;
				return rest;
			}
			return { ...prev, [id]: validQuantity };
		});
	};

	const totalCost = products.reduce((sum, p) => {
		const qty = selectedProducts[p.id] || 0;
		return sum + qty * p.price_per_unit;
	}, 0);

	const selectedProductsCount = Object.values(selectedProducts).reduce(
		(sum, qty) => sum + qty,
		0,
	);

	useEffect(() => {
		if (previousTotalCostRef.current === 0) {
			setAmountInput(totalCost);
		} else {
			const extraAmount = Math.max(
				0,
				currentAmountInputRef.current - previousTotalCostRef.current,
			);
			setAmountInput(totalCost + extraAmount);
		}
		previousTotalCostRef.current = totalCost;
	}, [totalCost]);

	useEffect(() => {
		currentAmountInputRef.current = amountInput;
	}, [amountInput]);

	const handleAmountChange = (value: number) => {
		setAmountInput(Math.max(0, value));
	};

	// Direct donation handlers
	const handleDirectDonationToggle = () => {
		if (directDonationMode) {
			// Cancel direct donation mode
			setDirectDonationMode(false);
			setDirectDonationAmount(0);
		} else {
			setDirectDonationMode(true);
			setSelectedProducts({});
		}
	};

	const handleDirectDonationAmountChange = (amount: number) => {
		setDirectDonationAmount(Math.max(0, amount));
	};

	// Determine if we should show donation summary
	const shouldShowDonationSummary =
		selectedProductsCount > 0 ||
		(directDonationMode && directDonationAmount > 0);

	return (
		<div id="donation-section" className="mt-12 space-y-6">
			<h2 className="text-2xl font-bold text-gray-800 mb-4">
				Choose Your Donation Method
			</h2>

			{/* Direct Donation Option */}
			<div className="mb-8">
				<DirectDonationCard
					amount={directDonationAmount}
					onAmountChange={handleDirectDonationAmountChange}
					isSelected={directDonationMode}
					onToggle={handleDirectDonationToggle}
				/>
			</div>

			{/* Product Selection Section */}
			<div className="space-y-4">
				<h3 className="text-xl font-semibold text-gray-800">
					Or Select Specific Items to Donate
				</h3>

				{selectedProductsCount > 0 && (
					<CartSummary
						selectedProductsCount={selectedProductsCount}
						totalCost={totalCost}
					/>
				)}

				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
					{products.map((product) => (
						<ProductCard
							key={product.id}
							product={product}
							slug={slug}
							selectedQty={selectedProducts[product.id] || 0}
							onIncrement={increment}
							onDecrement={decrement}
							onRemove={removeProduct}
							onSetQuantity={onSetQuantity}
							disabled={directDonationMode}
						/>
					))}
				</div>
			</div>

			{shouldShowDonationSummary && (
				<DonationSummary
					products={products}
					selectedProducts={selectedProducts}
					totalCost={
						directDonationMode ? directDonationAmount : totalCost
					}
					amountInput={
						directDonationMode ? directDonationAmount : amountInput
					}
					autoAllocate={directDonationMode || autoAllocate}
					setAutoAllocate={setAutoAllocate}
					handleAmountChange={
						directDonationMode
							? handleDirectDonationAmountChange
							: handleAmountChange
					}
					campaignId={campaignId}
					isDirectDonation={directDonationMode}
				/>
			)}

			{!shouldShowDonationSummary && <EmptyState />}
		</div>
	);
}
