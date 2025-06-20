"use client";

import React, { useEffect, useState, useRef } from "react";
import { ShoppingCart } from "lucide-react";
import { CartSummary } from "./cartsummary";
import { ProductCard } from "./productcard";
import { DonationSummary } from "./donationsummary";

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
			Your donation cart is empty
		</h3>
		<p className="text-gray-500">
			Select items above to start your donation
		</p>
	</div>
);

export default function CampaignProducts({
	products,
	slug,
	campaignId,
}: CampaignProductsProps) {
	const [selectedProducts, setSelectedProducts] = useState<
		Record<number, number>
	>({});
	const [amountInput, setAmountInput] = useState(0);
	const [autoAllocate, setAutoAllocate] = useState(false);
	const previousTotalCostRef = useRef(0);
	const currentAmountInputRef = useRef(0);

	const increment = (id: number) => {
		setSelectedProducts((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
	};

	const decrement = (id: number) => {
		setSelectedProducts((prev) => {
			const current = prev[id] || 0;
			if (current <= 1) {
				const { [id]: _, ...rest } = prev;
				return rest;
			}
			return { ...prev, [id]: current - 1 };
		});
	};

	const removeProduct = (id: number) => {
		setSelectedProducts((prev) => {
			const { [id]: _, ...rest } = prev;
			return rest;
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

	return (
		<div id="donation-section" className="mt-12 space-y-6">
			<h2 className="text-2xl font-bold text-gray-800 mb-4">
				Items You Can Donate
			</h2>

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
					/>
				))}
			</div>

			{selectedProductsCount > 0 && (
				<DonationSummary
					products={products}
					selectedProducts={selectedProducts}
					totalCost={totalCost}
					amountInput={amountInput}
					autoAllocate={autoAllocate}
					setAutoAllocate={setAutoAllocate}
					handleAmountChange={handleAmountChange}
					campaignId={campaignId}
				/>
			)}

			{selectedProductsCount === 0 && <EmptyState />}
		</div>
	);
}
