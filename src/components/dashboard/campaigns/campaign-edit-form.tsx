"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { CampaignDetails, CampaignProduct } from "@/lib/db/campaigns";
import { toast } from "react-hot-toast";
import { getAdminImageUrl } from "@/lib/utils/image-url";
import Image from "next/image";
import {
	Save,
	Upload,
	X,
	Plus,
	Trash2,
	Image as ImageIcon,
	Calendar,
	Target,
	FileText,
	Users,
	IndianRupee,
} from "lucide-react";
import RichTextEditor from "./rich-text-editor";

interface CampaignEditFormProps {
	campaign: CampaignDetails;
}

export default function CampaignEditForm({ campaign }: CampaignEditFormProps) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		title: campaign.title,
		description: campaign.description,
		amount: campaign.amount,
		ended_at: campaign.ended_at
			? new Date(campaign.ended_at).toISOString().split("T")[0]
			: "",
		banner_image: campaign.banner_image,
	});

	const [richTextContent, setRichTextContent] = useState("");
	const [products, setProducts] = useState<CampaignProduct[]>(
		campaign.campaign_products || [],
	);
	const [newProduct, setNewProduct] = useState({
		title: "",
		description: "",
		price_per_unit: 0,
		units_required: 0,
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
			[name]:
				name === "amount"
					? value === ""
						? 0
						: parseFloat(value) || 0
					: value,
		}));
	};

	const handleNumberInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
		// Clear the input if it's 0 when user starts typing
		if (e.target.value === "0") {
			e.target.value = "";
		}
	};

	const handleNumberInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		// Set to 0 if empty when user leaves the field
		if (e.target.value === "") {
			e.target.value = "0";
		}
	};

	const handleBannerImageChange = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		const file = e.target.files?.[0];
		if (file) {
			setBannerImageFile(file);
			setFormData((prev) => ({
				...prev,
				banner_image: URL.createObjectURL(file),
			}));
		}
	};

	const handleProductImageChange = (
		productId: string,
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		const file = e.target.files?.[0];
		if (file) {
			setProductImageFiles((prev) => ({
				...prev,
				[productId]: file,
			}));
			setProducts((prev) =>
				prev.map((product) =>
					product.id === productId
						? { ...product, image: URL.createObjectURL(file) }
						: product,
				),
			);
		}
	};

	const addProduct = () => {
		if (
			!newProduct.title ||
			!newProduct.description ||
			newProduct.price_per_unit <= 0 ||
			newProduct.units_required <= 0
		) {
			toast.error("Please fill all product fields");
			return;
		}

		const product: CampaignProduct = {
			id: `temp-${Date.now()}`,
			campaign_id: campaign.id,
			title: newProduct.title,
			description: newProduct.description,
			price_per_unit: newProduct.price_per_unit,
			units_required: newProduct.units_required,
			units_collected: 0,
			image: newProduct.image,
		};

		setProducts((prev) => [...prev, product]);
		setNewProduct({
			title: "",
			description: "",
			price_per_unit: 0,
			units_required: 0,
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
		setProducts((prev) =>
			prev.map((product) =>
				product.id === productId
					? { ...product, [field]: value }
					: product,
			),
		);
	};

	const uploadImage = async (file: File, path: string): Promise<string> => {
		const formData = new FormData();
		formData.append("file", file);
		formData.append("path", path);

		const response = await fetch("/api/upload", {
			method: "POST",
			body: formData,
		});

		if (!response.ok) {
			throw new Error("Failed to upload image");
		}

		const data = await response.json();
		return data.url;
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
			// Upload banner image if changed
			let bannerImageUrl = formData.banner_image;
			if (bannerImageFile) {
				bannerImageUrl = await uploadImage(
					bannerImageFile,
					`campaigns/${campaign.slug}/banner`,
				);
			}

			// Upload product images if changed
			const updatedProducts = await Promise.all(
				products.map(async (product) => {
					let productImageUrl = product.image;
					if (productImageFiles[product.id]) {
						productImageUrl = await uploadImage(
							productImageFiles[product.id],
							`campaigns/${campaign.slug}/products/${product.id}`,
						);
					}
					return { ...product, image: productImageUrl };
				}),
			);

			// Update campaign
			const response = await fetch(
				`/api/admin/campaigns/${campaign.slug}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						...formData,
						banner_image: bannerImageUrl,
						products: updatedProducts,
					}),
				},
			);

			if (!response.ok) {
				throw new Error("Failed to update campaign");
			}

			// Upload rich text content if provided
			if (richTextContent.trim()) {
				try {
					await uploadRichText(richTextContent, campaign.slug);
				} catch (error) {
					console.error("Failed to upload rich text content:", error);
					// Don't fail the entire request if rich text upload fails
				}
			}

			toast.success("Campaign updated successfully!");
			router.push("/admin/dashboard/campaigns");
		} catch (error) {
			console.error("Error updating campaign:", error);
			toast.error("Failed to update campaign");
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
								Campaign Title
							</label>
							<input
								type="text"
								name="title"
								value={formData.title}
								onChange={handleInputChange}
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								required
							/>
						</div>

						<div>
							<label className=" text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
								<IndianRupee className="w-4 h-4" />
								Target Amount
							</label>
							<input
								type="number"
								name="amount"
								value={formData.amount}
								onChange={handleInputChange}
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
								required
								min="0"
							/>
						</div>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Short Description
						</label>
						<textarea
							name="description"
							value={formData.description}
							onChange={handleInputChange}
							rows={3}
							maxLength={160}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
						<p className="text-xs text-gray-500 mt-1">
							{formData.description.length}/160 characters
						</p>
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
									src={getAdminImageUrl(
										formData.banner_image,
										campaign.slug,
									)}
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
								<label className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
									<IndianRupee className="w-4 h-4" />
									Price per Unit *
								</label>
								<input
									type="number"
									placeholder="100"
									value={newProduct.price_per_unit}
									onChange={(e) =>
										setNewProduct((prev) => ({
											...prev,
											price_per_unit:
												parseFloat(e.target.value) || 0,
										}))
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
										setNewProduct((prev) => ({
											...prev,
											units_required:
												parseInt(e.target.value) || 0,
										}))
									}
									onFocus={handleNumberInputFocus}
									onBlur={handleNumberInputBlur}
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
												updateProduct(
													product.id,
													"price_per_unit",
													parseFloat(
														e.target.value,
													) || 0,
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
												updateProduct(
													product.id,
													"units_required",
													parseInt(e.target.value) ||
														0,
												)
											}
											onFocus={handleNumberInputFocus}
											onBlur={handleNumberInputBlur}
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
												src={getAdminImageUrl(
													product.image,
													campaign.slug,
												)}
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
						{loading ? "Saving..." : "Save Changes"}
					</button>
				</div>
			</form>
		</div>
	);
}
