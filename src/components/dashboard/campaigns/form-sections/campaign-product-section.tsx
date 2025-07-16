"use client";

import { useRef, useState } from "react";
import { Plus, Target, Trash2, Upload, Package } from "lucide-react";
import { IndianRupee } from "lucide-react";
import { toast } from "react-hot-toast";
import {
	CampaignProduct,
	FormDataType,
} from "@/components/dashboard/campaigns/types";
import CampaignImageUpload from "@/components/dashboard/campaigns/form-sections/campaign-image-upload";

interface CampaignProductSectionProps {
	products: CampaignProduct[];
	setProducts: React.Dispatch<React.SetStateAction<CampaignProduct[]>>;
	campaignSlug?: string;
}

export default function CampaignProductSection({
	products,
	setProducts,
	campaignSlug = "temp",
}: CampaignProductSectionProps) {
	const [newProduct, setNewProduct] = useState({
		title: "",
		description: "",
		price_per_unit: "",
		units_required: "",
	});

	const isNewProductReadyForAdd =
		newProduct.title.trim() !== "" &&
		newProduct.description.trim() !== "" &&
		parseFloat(newProduct.price_per_unit) > 0 &&
		parseFloat(newProduct.units_required) > 0;

	const addProduct = () => {
		const pricePerUnit = parseFloat(newProduct.price_per_unit) || 0;
		const unitsRequired = parseFloat(newProduct.units_required) || 0;

		if (
			!newProduct.title ||
			!newProduct.description ||
			pricePerUnit <= 0 ||
			unitsRequired <= 0
		) {
			toast.error(
				"Please fill all required product fields (Title, Description, Price, Units)",
			);
			return;
		}

		const product: CampaignProduct = {
			id: `temp-${Date.now()}`,
			campaign_id: "",
			title: newProduct.title,
			description: newProduct.description,
			price_per_unit: pricePerUnit,
			units_required: unitsRequired,
			units_collected: 0,
			image: "",
		};

		setProducts((prev) => [...prev, product]);
		setNewProduct({
			title: "",
			description: "",
			price_per_unit: "",
			units_required: "",
		});
	};

	const removeProduct = (productId: string) => {
		setProducts((prev) => prev.filter((p) => p.id !== productId));
	};

	const updateProduct = (
		productId: string,
		field: keyof CampaignProduct,
		value: any,
	) => {
		let processedValue = value;
		if (field === "price_per_unit" || field === "units_required") {
			processedValue = value === "" ? "" : parseFloat(value) || 0;
		}

		setProducts((prev) =>
			prev.map((product) =>
				product.id === productId
					? { ...product, [field]: processedValue }
					: product,
			),
		);
	};

	const handleNewProductNumberChange = (
		field: keyof typeof newProduct,
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		const value = e.target.value;
		if (value === "" || /^\d*\.?\d*$/.test(value)) {
			setNewProduct((prev) => ({ ...prev, [field]: value }));
		}
	};

	const handleProductNumberChange = (
		productId: string,
		field: keyof CampaignProduct,
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		const value = e.target.value;
		if (value === "" || /^\d*\.?\d*$/.test(value)) {
			updateProduct(productId, field, value);
		}
	};

	return (
		<div className="space-y-6">
			<h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
				<Target className="w-5 h-5" />
				Campaign Products
			</h2>

			{/* Add New Product */}
			<div className="bg-gray-50 p-4 rounded-lg space-y-4">
				<h3 className="font-medium text-gray-900">Add New Product</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					<div>
						<label
							htmlFor="newProductTitle"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Product Title *
						</label>
						<input
							id="newProductTitle"
							type="text"
							placeholder="Product Title"
							value={newProduct.title}
							onChange={(e) =>
								setNewProduct((prev) => ({
									...prev,
									title: e.target.value,
								}))
							}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<div>
						<label
							htmlFor="newProductPrice"
							className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"
						>
							<IndianRupee className="w-4 h-4" />
							Price per Unit *
						</label>
						<input
							id="newProductPrice"
							type="number"
							placeholder="100"
							value={newProduct.price_per_unit}
							onChange={(e) =>
								handleNewProductNumberChange(
									"price_per_unit",
									e,
								)
							}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
						/>
					</div>
					<div>
						<label
							htmlFor="newProductUnits"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Units Required *
						</label>
						<input
							id="newProductUnits"
							type="number"
							placeholder="50"
							value={newProduct.units_required}
							onChange={(e) =>
								handleNewProductNumberChange(
									"units_required",
									e,
								)
							}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
						/>
					</div>
					<div className="flex items-end">
						<button
							type="button"
							onClick={addProduct}
							disabled={!isNewProductReadyForAdd}
							className={`flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md ${
								!isNewProductReadyForAdd
									? "opacity-50 cursor-not-allowed"
									: "hover:bg-blue-700"
							} w-full`}
						>
							<Plus className="w-4 h-4" />
							Add Product
						</button>
					</div>
				</div>
				<div>
					<label
						htmlFor="newProductDescription"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Product Description *
					</label>
					<textarea
						id="newProductDescription"
						placeholder="Product Description"
						value={newProduct.description}
						onChange={(e) =>
							setNewProduct((prev) => ({
								...prev,
								description: e.target.value,
							}))
						}
						rows={2}
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
			</div>

			{/* Existing Products */}
			<div className="space-y-4">
				{products.length === 0 && (
					<p className="text-gray-500 text-center py-4">
						No products added yet. Use the form above to add a
						product.
					</p>
				)}
				{products.map((product) => (
					<div
						key={product.id}
						className="border rounded-lg p-4 space-y-4 shadow-sm bg-white"
					>
						<div className="flex items-center justify-between">
							<h4 className="font-medium text-gray-900">
								{product.title || "Untitled Product"}
							</h4>
							<button
								type="button"
								onClick={() => removeProduct(product.id)}
								className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
								aria-label={`Remove product ${product.title}`}
							>
								<Trash2 className="w-4 h-4" />
							</button>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
							<div>
								<label
									htmlFor={`productTitle-${product.id}`}
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Product Title
								</label>
								<input
									id={`productTitle-${product.id}`}
									type="text"
									value={product.title}
									onChange={(e) =>
										updateProduct(
											product.id,
											"title",
											e.target.value,
										)
									}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>
							<div>
								<label
									htmlFor={`productPrice-${product.id}`}
									className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"
								>
									<IndianRupee className="w-4 h-4" />
									Price per Unit
								</label>
								<input
									id={`productPrice-${product.id}`}
									type="number"
									value={
										product.price_per_unit === 0
											? ""
											: product.price_per_unit
									}
									onChange={(e) =>
										handleProductNumberChange(
											product.id,
											"price_per_unit",
											e,
										)
									}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
								/>
							</div>
							<div>
								<label
									htmlFor={`productUnits-${product.id}`}
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Units Required
								</label>
								<input
									id={`productUnits-${product.id}`}
									type="number"
									value={
										product.units_required === 0
											? ""
											: product.units_required
									}
									onChange={(e) =>
										handleProductNumberChange(
											product.id,
											"units_required",
											e,
										)
									}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
								/>
							</div>
							<div className="flex items-end">
								<span className="text-sm text-gray-600">
									Collected: {product.units_collected}
								</span>
							</div>
						</div>

						<div>
							<label
								htmlFor={`productDescription-${product.id}`}
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Product Description
							</label>
							<textarea
								id={`productDescription-${product.id}`}
								value={product.description}
								onChange={(e) =>
									updateProduct(
										product.id,
										"description",
										e.target.value,
									)
								}
								rows={2}
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>

						<div className="w-full">
							<CampaignImageUpload
								label={`Image for ${product.title || "Product"}`}
								imageUrl={product.image || ""}
								setImageUrl={(url: string) =>
									updateProduct(product.id, "image", url)
								}
								imageUploadFolder="product"
								slug={campaignSlug}
								width={200}
								height={100}
								objectFit="contain"
								LabelIcon={Package}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
