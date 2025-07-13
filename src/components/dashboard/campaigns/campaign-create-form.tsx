"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Image from "next/image";
import {
	Save,
	Upload,
	X,
	Plus,
	Trash2,
	Image as ImageIcon,
	Target,
	FileText,
	Link as LinkIcon,
	IndianRupee,
} from "lucide-react";
import RichTextEditor from "./rich-text-editor";

interface CampaignProduct {
	id: string;
	campaign_id: string;
	title: string;
	description: string;
	image?: string;
	price_per_unit: number;
	units_required: number;
	units_collected: number;
}

export default function CampaignCreateForm() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		slug: "",
		amount: "",
		ended_at: "",
		banner_image: "",
	});

	const [richTextContent, setRichTextContent] = useState("");
	const [products, setProducts] = useState<CampaignProduct[]>([]);
	const [newProduct, setNewProduct] = useState({
		title: "",
		description: "",
		price_per_unit: "",
		units_required: "",
		image: "",
	});

	const [bannerImageFile, setBannerImageFile] = useState<File | null>(null);
	const [productImageFiles, setProductImageFiles] = useState<{
		[key: string]: File;
	}>({});

	const bannerImageRef = useRef<HTMLInputElement>(null);
	const productImageRefs = useRef<{ [key: string]: HTMLInputElement }>({});

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		// Auto-generate slug from title
		if (name === "title") {
			const baseSlug = value
				.toLowerCase()
				.trim()
				.replace(/[^a-z0-9\s-]/g, "") // Remove special characters except spaces and hyphens
				.replace(/\s+/g, "-") // Replace spaces with hyphens
				.replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
				.replace(/(^-|-$)/g, ""); // Remove leading/trailing hyphens

			// Prevent "new" as slug
			if (baseSlug === "new") {
				setFormData((prev) => ({ ...prev, slug: "campaign-new" }));
			} else {
				// Add timestamp to make it more unique
				const timestamp = Date.now().toString().slice(-6);
				const uniqueSlug = baseSlug
					? `${baseSlug}-${timestamp}`
					: `campaign-${timestamp}`;

				setFormData((prev) => ({ ...prev, slug: uniqueSlug }));
			}
		}
	};

	const handleBannerImageChange = async (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		const file = e.target.files?.[0];
		if (file) {
			setBannerImageFile(file);

			try {
				const imageUrl = await uploadImage(file, "banner");

				// Update form with the uploaded image URL
				setFormData((prev) => ({
					...prev,
					banner_image: imageUrl,
				}));

				// Clear the file reference since it's now uploaded
				setBannerImageFile(null);
			} catch (error) {
				console.error("Failed to upload banner image:", error);
				toast.error("Failed to upload banner image");
			}
		}
	};

	const handleProductImageChange = async (
		productId: string,
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		const file = e.target.files?.[0];
		if (file) {
			try {
				const imageUrl = await uploadImage(file, "product");

				// Update product with the uploaded image URL
				setProducts((prev) =>
					prev.map((product) =>
						product.id === productId
							? { ...product, image: imageUrl }
							: product,
					),
				);

				// Clear the file reference since it's now uploaded
				setProductImageFiles((prev) => {
					const newState = { ...prev };
					delete newState[productId];
					return newState;
				});
			} catch (error) {
				console.error("Failed to upload product image:", error);
				toast.error("Failed to upload product image");
			}
		}
	};

	const addProduct = () => {
		const pricePerUnit = parseFloat(newProduct.price_per_unit) || 0;
		const unitsRequired = parseFloat(newProduct.units_required) || 0;

		if (
			!newProduct.title ||
			!newProduct.description ||
			pricePerUnit <= 0 ||
			unitsRequired <= 0
		) {
			toast.error("Please fill all product fields");
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
			image: newProduct.image,
		};

		setProducts((prev) => [...prev, product]);
		setNewProduct({
			title: "",
			description: "",
			price_per_unit: "",
			units_required: "",
			image: "",
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
		// Convert string values to numbers for numeric fields
		let processedValue = value;
		if (field === "price_per_unit" || field === "units_required") {
			processedValue = value === "" ? 0 : parseFloat(value) || 0;
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

		// Allow empty string or valid numbers
		if (value === "" || /^\d*\.?\d*$/.test(value)) {
			setNewProduct((prev) => ({
				...prev,
				[field]: value,
			}));
		}
	};

	const handleProductNumberChange = (
		productId: string,
		field: keyof CampaignProduct,
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		const value = e.target.value;

		// Allow empty string or valid numbers
		if (value === "" || /^\d*\.?\d*$/.test(value)) {
			updateProduct(productId, field, value);
		}
	};

	const uploadImage = async (
		file: File,
		type: "banner" | "product",
	): Promise<string> => {
		const filename = file.name;

		const res = await fetch("/api/upload", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				slug: formData.slug || "temp",
				filename,
				type,
			}),
		});

		if (!res.ok) {
			throw new Error("Failed to get presigned upload URL");
		}

		const { presignedUrl, publicUrl } = await res.json();

		const uploadRes = await fetch(presignedUrl, {
			method: "PUT",
			headers: {
				"Content-Type": file.type,
			},
			body: file,
		});

		if (!uploadRes.ok) {
			throw new Error("Failed to upload image to storage");
		}

		return publicUrl;
	};

	const uploadRichText = async (
		content: string,
		slug: string,
	): Promise<string> => {
		const formData = new FormData();
		const blob = new Blob([content], { type: "text/html" });
		formData.append("file", blob, "description.html");
		formData.append("path", `campaigns/${slug}`);

		const response = await fetch("/api/upload", {
			method: "POST",
			body: formData,
		});

		if (!response.ok) {
			throw new Error("Failed to upload rich text content");
		}

		const data = await response.json();
		return data.path;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			// Validate required fields
			const parsedAmount = Number(formData.amount);
			if (
				!formData.title ||
				!formData.description ||
				!formData.slug ||
				isNaN(parsedAmount) ||
				parsedAmount <= 0
			) {
				toast.error("Please fill all required fields");
				return;
			}

			// Validate slug
			if (formData.slug === "new") {
				toast.error('Slug cannot be "new"');
				return;
			}

			// Process rich text images if any
			let processedRichTextContent = richTextContent;
			if (
				richTextContent.trim() &&
				(window as any).processRichTextImages
			) {
				try {
					processedRichTextContent = await (
						window as any
					).processRichTextImages();
				} catch (error) {
					console.error("Failed to process rich text images:", error);
					toast.error(
						"Failed to upload some images. Please try again.",
					);
					return;
				}
			}

			// Images are already uploaded, so we can use them directly
			const updatedProducts = products.map((product) => ({
				...product,
				// Product images are already uploaded URLs
			}));

			const response = await fetch("/api/admin/campaigns", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...formData,
					amount: Number(formData.amount),
					ended_at:
						formData.ended_at.trim() === ""
							? null
							: new Date(formData.ended_at).toISOString(),
					products: updatedProducts.map((p) => ({
						...p,
						price_per_unit: Number(p.price_per_unit),
						units_required: Number(p.units_required),
					})),
				}),
			});

			if (!response.ok) {
				const errorData = await response.json();
				console.error("API Error:", errorData);
				throw new Error(errorData.error || "Failed to create campaign");
			}

			const result = await response.json();

			if (
				processedRichTextContent &&
				processedRichTextContent.trim() &&
				processedRichTextContent.trim() !== "<p></p>"
			) {
				try {
					await uploadRichText(
						processedRichTextContent,
						formData.slug,
					);
				} catch (error) {
					console.error("Failed to upload rich text content:", error);
					toast.error(
						"Campaign created, but rich text upload failed.",
					);
				}
			}

			toast.success("Campaign created successfully!");
			router.push("/admin/dashboard/campaigns");
		} catch (error) {
			console.error("Error creating campaign:", error);
			toast.error(
				error instanceof Error
					? error.message
					: "Failed to create campaign",
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="bg-white rounded-lg shadow-sm border">
			<form onSubmit={handleSubmit} className="p-6 space-y-8">
				{/* Basic Information */}
				<div className="space-y-6">
					<h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
						<FileText className="w-5 h-5" />
						Basic Information
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Campaign Title *
							</label>
							<input
								type="text"
								name="title"
								value={formData.title}
								onChange={handleInputChange}
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								required
								placeholder="Enter campaign title"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Campaign Slug *
							</label>
							<div className="flex items-center gap-2">
								<span className="text-gray-500">
									/campaign/
								</span>
								<input
									type="text"
									name="slug"
									value={formData.slug}
									onChange={handleInputChange}
									className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
									required
									placeholder="campaign-slug"
								/>
							</div>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label className=" text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
								<IndianRupee className="w-4 h-4" />
								Target Amount *
							</label>
							<input
								type="number"
								name="amount"
								placeholder="1000"
								value={
									formData.amount === "0"
										? ""
										: formData.amount
								}
								onChange={handleInputChange}
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								End Date (Optional)
							</label>
							<input
								type="date"
								name="ended_at"
								value={formData.ended_at}
								onChange={handleInputChange}
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Short Description *
						</label>
						<textarea
							name="description"
							value={formData.description}
							onChange={handleInputChange}
							rows={3}
							maxLength={160}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
							placeholder="Brief description of the campaign (max 160 characters)"
						/>
						<p className="text-xs text-gray-500 mt-1">
							{formData.description.length}/160 characters
						</p>
					</div>
				</div>

				{/* Rich Text Editor for Detailed Description */}
				<div className="space-y-6">
					<h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
						<FileText className="w-5 h-5" />
						Detailed Description
					</h2>
					<RichTextEditor
						value={richTextContent}
						onChange={setRichTextContent}
						placeholder="Write a detailed description of your campaign..."
					/>
				</div>

				{/* Banner Image */}
				<div className="space-y-6">
					<h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
						<ImageIcon className="w-5 h-5" />
						Banner Image
					</h2>

					<div className="space-y-4">
						{formData.banner_image && (
							<div className="relative w-full max-w-md">
								<Image
									src={formData.banner_image}
									alt="Banner preview"
									width={400}
									height={192}
									className="w-full h-48 object-cover rounded-lg border"
									onError={(e) => {
										console.error(
											"Failed to load banner image:",
											formData.banner_image,
										);
										e.currentTarget.style.display = "none";
									}}
								/>
								<button
									type="button"
									onClick={() => {
										setFormData((prev) => ({
											...prev,
											banner_image: "",
										}));
										setBannerImageFile(null);
									}}
									className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
								>
									<X className="w-4 h-4" />
								</button>
							</div>
						)}

						<input
							ref={bannerImageRef}
							type="file"
							accept="image/*"
							onChange={handleBannerImageChange}
							className="hidden"
						/>
						<button
							type="button"
							onClick={() => bannerImageRef.current?.click()}
							className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
						>
							<Upload className="w-4 h-4" />
							{formData.banner_image
								? "Change Banner Image"
								: "Upload Banner Image"}
						</button>
					</div>
				</div>

				{/* Campaign Products */}
				<div className="space-y-6">
					<h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
						<Target className="w-5 h-5" />
						Campaign Products
					</h2>

					{/* Add New Product */}
					<div className="bg-gray-50 p-4 rounded-lg space-y-4">
						<h3 className="font-medium text-gray-900">
							Add New Product
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Product Title *
								</label>
								<input
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
								<label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
									<IndianRupee className="w-4 h-4" />
									Price per Unit *
								</label>
								<input
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
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Units Required *
								</label>
								<input
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
									className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full"
								>
									<Plus className="w-4 h-4" />
									Add Product
								</button>
							</div>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Product Description *
							</label>
							<textarea
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
						{products.map((product) => (
							<div
								key={product.id}
								className="border rounded-lg p-4 space-y-4"
							>
								<div className="flex items-center justify-between">
									<h4 className="font-medium text-gray-900">
										{product.title}
									</h4>
									<button
										type="button"
										onClick={() =>
											removeProduct(product.id)
										}
										className="text-red-500 hover:text-red-700"
									>
										<Trash2 className="w-4 h-4" />
									</button>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											Product Title
										</label>
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
											className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
										/>
									</div>
									<div>
										<label className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
											<IndianRupee className="w-4 h-4" />
											Price per Unit
										</label>
										<input
											type="number"
											value={product.price_per_unit}
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
										<label className="block text-sm font-medium text-gray-700 mb-1">
											Units Required
										</label>
										<input
											type="number"
											value={product.units_required}
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
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Product Description
									</label>
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
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
									/>
								</div>

								{/* Product Image */}
								<div className="space-y-2">
									{product.image && (
										<div className="relative w-32 h-32">
											<Image
												src={product.image}
												alt={product.title}
												width={128}
												height={128}
												className="w-full h-full object-cover rounded border"
												onError={(e) => {
													console.error(
														"Failed to load product image:",
														product.image,
													);
													e.currentTarget.style.display =
														"none";
												}}
											/>
										</div>
									)}
									<input
										ref={(el) => {
											if (el)
												productImageRefs.current[
													product.id
												] = el;
										}}
										type="file"
										accept="image/*"
										onChange={(e) =>
											handleProductImageChange(
												product.id,
												e,
											)
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

				{/* Submit Button */}
				<div className="flex justify-end space-x-4 pt-6 border-t">
					<button
						type="button"
						onClick={() =>
							router.push("/admin/dashboard/campaigns")
						}
						className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
					>
						Cancel
					</button>
					<button
						type="submit"
						disabled={loading}
						className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
					>
						<Save className="w-4 h-4" />
						{loading ? "Creating..." : "Create Campaign"}
					</button>
				</div>
			</form>
		</div>
	);
}
