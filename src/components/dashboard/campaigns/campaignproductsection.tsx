import { CampaignProduct } from "@/lib/db/campaigns";
import Image from "next/image";
import { Plus, Trash2, Upload, Target } from "lucide-react";
import React from "react";

// Type for new product form data
type NewProductForm = {
	title: string;
	description: string;
	price_per_unit: string;
	units_required: string;
	image: string;
};

interface Props {
	products: CampaignProduct[];
	setProducts: React.Dispatch<React.SetStateAction<CampaignProduct[]>>;
	newProduct: NewProductForm;
	setNewProduct: React.Dispatch<React.SetStateAction<NewProductForm>>;
	uploadImage: (file: File, type: "banner" | "product") => Promise<string>;
	productImageRefs: React.MutableRefObject<{
		[key: string]: HTMLInputElement;
	}>;
}

export default function CampaignProductSection({
	products,
	setProducts,
	newProduct,
	setNewProduct,
	uploadImage,
	productImageRefs,
}: Props) {
	const handleNumberChange = (
		field: keyof NewProductForm,
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		const value = e.target.value;
		if (value === "" || /^\d*\.?\d*$/.test(value)) {
			setNewProduct((prev: NewProductForm) => ({
				...prev,
				[field]: value,
			}));
		}
	};

	const addProduct = () => {
		const price = parseFloat(newProduct.price_per_unit) || 0;
		const units = parseFloat(newProduct.units_required) || 0;

		if (
			!newProduct.title ||
			!newProduct.description ||
			price <= 0 ||
			units <= 0
		)
			return;

		const newItem: CampaignProduct = {
			id: `temp-${Date.now()}`,
			campaign_id: "",
			title: newProduct.title,
			description: newProduct.description,
			price_per_unit: price,
			units_required: units,
			units_collected: 0,
			image: newProduct.image,
		};

		setProducts((prev: CampaignProduct[]) => [...prev, newItem]);
		setNewProduct({
			title: "",
			description: "",
			price_per_unit: "",
			units_required: "",
			image: "",
		});
	};

	const updateProduct = (
		productId: string,
		field: keyof CampaignProduct,
		value: string | number,
	) => {
		let processed = value;
		if (field === "price_per_unit" || field === "units_required") {
			processed = value === "" ? 0 : parseFloat(value as string) || 0;
		}

		setProducts((prev: CampaignProduct[]) =>
			prev.map((p) =>
				p.id === productId ? { ...p, [field]: processed } : p,
			),
		);
	};

	const removeProduct = (productId: string) => {
		setProducts((prev: CampaignProduct[]) =>
			prev.filter((p) => p.id !== productId),
		);
	};

	const handleProductImageChange = async (
		productId: string,
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		const file = e.target.files?.[0];
		if (!file) return;

		try {
			const imageUrl = await uploadImage(file, "product");
			setProducts((prev: CampaignProduct[]) =>
				prev.map((p) =>
					p.id === productId ? { ...p, image: imageUrl } : p,
				),
			);
		} catch (err) {
			console.error("Failed to upload product image:", err);
		}
	};

	return (
		<div className="space-y-6">
			<h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
				<Target className="w-5 h-5" />
				Campaign Products
			</h2>

			{/* New Product Form */}
			<div className="bg-gray-50 p-4 rounded-lg space-y-4">
				<h3 className="font-medium text-gray-900">Add New Product</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					<input
						type="text"
						placeholder="Title"
						value={newProduct.title}
						onChange={(e) =>
							setNewProduct((prev: NewProductForm) => ({
								...prev,
								title: e.target.value,
							}))
						}
						className="px-3 py-2 border rounded-md"
					/>
					<input
						type="number"
						placeholder="Price per unit"
						value={newProduct.price_per_unit}
						onChange={(e) =>
							handleNumberChange("price_per_unit", e)
						}
						className="px-3 py-2 border rounded-md"
					/>
					<input
						type="number"
						placeholder="Units required"
						value={newProduct.units_required}
						onChange={(e) =>
							handleNumberChange("units_required", e)
						}
						className="px-3 py-2 border rounded-md"
					/>
					<button
						type="button"
						onClick={addProduct}
						className="bg-blue-600 text-white rounded-md px-4 py-2 flex items-center justify-center gap-2"
					>
						<Plus className="w-4 h-4" />
						Add
					</button>
				</div>
				<textarea
					placeholder="Description"
					value={newProduct.description}
					onChange={(e) =>
						setNewProduct((prev: NewProductForm) => ({
							...prev,
							description: e.target.value,
						}))
					}
					rows={2}
					className="w-full px-3 py-2 border rounded-md"
				/>
			</div>

			{/* Existing Products */}
			<div className="space-y-4">
				{products.map((product) => (
					<div
						key={product.id}
						className="border rounded-lg p-4 space-y-4"
					>
						<div className="flex justify-between">
							<h4 className="font-medium">{product.title}</h4>
							<button
								onClick={() => removeProduct(product.id)}
								className="text-red-500"
							>
								<Trash2 className="w-4 h-4" />
							</button>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
							<input
								type="text"
								value={product.title}
								onChange={(e) =>
									updateProduct(
										product.id,
										"title",
										e.target.value,
									)
								}
								className="px-3 py-2 border rounded-md"
							/>
							<input
								type="number"
								value={
									product.price_per_unit === 0
										? ""
										: product.price_per_unit
								}
								onChange={(e) =>
									updateProduct(
										product.id,
										"price_per_unit",
										e.target.value,
									)
								}
								className="px-3 py-2 border rounded-md"
							/>
							<input
								type="number"
								value={
									product.units_required === 0
										? ""
										: product.units_required
								}
								onChange={(e) =>
									updateProduct(
										product.id,
										"units_required",
										e.target.value,
									)
								}
								className="px-3 py-2 border rounded-md"
							/>
							<span className="text-sm text-gray-500 self-center">
								Collected: {product.units_collected}
							</span>
						</div>

						<textarea
							value={product.description}
							onChange={(e) =>
								updateProduct(
									product.id,
									"description",
									e.target.value,
								)
							}
							rows={2}
							className="w-full px-3 py-2 border rounded-md"
						/>

						<div className="space-y-2">
							{product.image && (
								<Image
									src={product.image.trim()}
									alt={product.title}
									width={128}
									height={128}
									className="rounded object-cover border"
								/>
							)}
							<input
								ref={(el) => {
									if (el)
										productImageRefs.current[product.id] =
											el;
								}}
								type="file"
								accept="image/*"
								onChange={(e) =>
									handleProductImageChange(product.id, e)
								}
								className="hidden"
							/>
							<button
								type="button"
								onClick={() =>
									productImageRefs.current[
										product.id
									]?.click()
								}
								className="flex items-center gap-2 px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
							>
								<Upload className="w-3 h-3" />
								{product.image
									? "Change Image"
									: "Upload Image"}
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
