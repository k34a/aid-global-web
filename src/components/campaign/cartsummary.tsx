import React from "react";
import { ShoppingCart, IndianRupee } from "lucide-react";

interface CartSummaryProps {
	selectedProductsCount: number;
	totalCost: number;
}

export const CartSummary = ({
	selectedProductsCount,
	totalCost,
}: CartSummaryProps) => (
	<div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-6">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<ShoppingCart className="text-teal-600" size={20} />
				<span className="font-medium text-teal-800">
					{selectedProductsCount} item
					{selectedProductsCount !== 1 ? "s" : ""} selected
				</span>
			</div>
			<div className="text-right">
				<div className="text-lg font-bold text-teal-800 flex items-center gap-1">
					<IndianRupee size={18} />
					{totalCost}
				</div>
				<div className="text-sm text-teal-600">Total cost</div>
			</div>
		</div>
	</div>
);
