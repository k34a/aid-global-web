import React from "react";
import Image from "next/image";
import { ShoppingCart, Plus, Minus, IndianRupee } from "lucide-react";
import { SUPABASE_CAMPAIGN_BASE_URL } from "@/lib/db/config";

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

interface ProductCardProps {
	product: CampaignProduct;
	slug: string;
	selectedQty: number;
	onIncrement: (id: number) => void;
	onDecrement: (id: number) => void;
	onRemove: (id: number) => void;
}

export const ProductCard = ({
	product,
	slug,
	selectedQty,
	onIncrement,
	onDecrement,
	onRemove,
}: ProductCardProps) => {
	const imageUrl = product.image
		? `${SUPABASE_CAMPAIGN_BASE_URL}/${slug}/images/${product.image.trim()}`
		: null;

	const remainingUnits = product.units_required - product.units_collected;
	const isSelected = selectedQty > 0;

	return (
		<div
			className={`bg-white p-4 rounded-lg shadow transition-all duration-200 ${
				isSelected
					? "ring-2 ring-teal-500 shadow-lg"
					: "hover:shadow-md"
			}`}
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
					<div className="absolute top-2 right-2 bg-teal-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
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
				<span className="text-lg font-bold text-teal-600 flex items-center gap-1">
					<IndianRupee size={16} />
					{product.price_per_unit}
				</span>
				<span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
					{remainingUnits} needed
				</span>
			</div>

			{isSelected ? (
				<div className="space-y-2">
					<div className="flex items-center justify-between bg-gray-50 p-2 rounded">
						<button
							onClick={() => onDecrement(product.id)}
							className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
							disabled={selectedQty <= 1}
						>
							<Minus className="text-xs" size={16} />
						</button>
						<span className="font-medium text-gray-800">
							{selectedQty}
						</span>
						<button
							onClick={() => onIncrement(product.id)}
							className="w-8 h-8 rounded-full bg-teal-600 hover:bg-teal-700 text-white flex items-center justify-center transition-colors"
							disabled={selectedQty >= remainingUnits}
						>
							<Plus className="text-xs" size={16} />
						</button>
					</div>
					<button
						onClick={() => onRemove(product.id)}
						className="w-full text-sm text-red-600 hover:text-red-700 hover:bg-red-50 py-1 rounded transition-colors"
					>
						Remove from cart
					</button>
				</div>
			) : (
				<button
					onClick={() => onIncrement(product.id)}
					className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
					disabled={remainingUnits <= 0}
				>
					<Plus className="text-sm" size={16} />
					Add to Cart
				</button>
			)}
		</div>
	);
};
