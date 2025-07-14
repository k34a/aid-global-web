"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { CampaignDetails, CampaignProduct } from "@/lib/db/campaigns";
import { toast } from "react-hot-toast";
import { Save, Trash2 } from "lucide-react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalTitle,
	ModalCloseButton,
} from "@/components/ui/custom-modal";
import CampaignBasicInfoSection from "@/components/dashboard/campaigns/campaignbasicsections";
import BannerImageSection from "@/components/dashboard/campaigns/bannerimagesection";
import CampaignProductSection from "@/components/dashboard/campaigns/campaignproductsection";

interface CampaignEditFormProps {
	campaign: CampaignDetails;
}

export default function CampaignEditForm({ campaign }: CampaignEditFormProps) {
	const router = useRouter();
	const [deleteOpen, setDeleteOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const [formData, setFormData] = useState({
		title: campaign.title,
		description: campaign.description,
		amount: campaign.amount,
		ended_at: campaign.ended_at
			? new Date(campaign.ended_at).toISOString().split("T")[0]
			: "",
		banner_image: campaign.banner_image,
		slug: campaign.slug,
	});

	const [richTextContent, setRichTextContent] = useState("");
	const [products, setProducts] = useState<CampaignProduct[]>(
		campaign.campaign_products || [],
	);
	const [newProduct, setNewProduct] = useState({
		title: "",
		description: "",
		price_per_unit: "",
		units_required: "",
		image: "",
	});

	const bannerImageRef = useRef<HTMLInputElement>(null);
	const productImageRefs = useRef<{ [key: string]: HTMLInputElement }>({});

	const uploadImage = async (
		file: File,
		type: "banner" | "product",
	): Promise<string> => {
		const filename = file.name;
		const res = await fetch("/api/upload", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify({
				slug: formData.slug || "temp",
				filename,
				type,
			}),
		});

		if (!res.ok) throw new Error("Failed to get presigned upload URL");

		const { presignedUrl, publicUrl } = await res.json();

		const uploadRes = await fetch(presignedUrl, {
			method: "PUT",
			headers: { "Content-Type": file.type },
			body: file,
		});

		if (!uploadRes.ok) throw new Error("Failed to upload image to storage");

		return publicUrl;
	};

	const uploadRichText = async (
		content: string,
		slug: string,
	): Promise<string> => {
		const formData = new FormData();
		formData.append(
			"file",
			new Blob([content], { type: "text/html" }),
			"description.html",
		);
		formData.append("path", `campaigns/${slug}`);

		const response = await fetch("/api/upload", {
			method: "POST",
			body: formData,
		});

		if (!response.ok) throw new Error("Failed to upload rich text content");

		const data = await response.json();
		return data.path;
	};

	const handleDelete = async () => {
		try {
			const res = await fetch(`/api/admin/campaigns/${campaign.slug}`, {
				method: "DELETE",
			});
			if (!res.ok) return toast.error("Failed to delete campaign");
			toast.success("Campaign deleted");
			router.push("/admin/dashboard/campaigns");
		} catch (err) {
			console.error("Delete failed:", err);
			toast.error("Something went wrong");
		} finally {
			setDeleteOpen(false);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			if (
				!formData.title ||
				!formData.description ||
				formData.amount <= 0
			) {
				toast.error(
					"Please fill all required fields and ensure amount is greater than 0",
				);
				return;
			}

			let processedRichTextContent = richTextContent;
			if (
				richTextContent.trim() &&
				(window as any).processRichTextImages
			) {
				processedRichTextContent = await (
					window as any
				).processRichTextImages();
			}

			const response = await fetch(
				`/api/admin/campaigns/${campaign.slug}`,
				{
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ ...formData, products }),
				},
			);

			if (!response.ok) throw new Error("Failed to update campaign");

			if (processedRichTextContent.trim()) {
				await uploadRichText(processedRichTextContent, campaign.slug);
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
		<>
			<div className="bg-white rounded-lg shadow-sm border">
				<form onSubmit={handleSubmit} className="p-6 space-y-10">
					<CampaignBasicInfoSection
						formData={formData}
						setFormData={setFormData}
						richTextContent={richTextContent}
						setRichTextContent={setRichTextContent}
					/>

					<BannerImageSection
						formData={formData}
						setFormData={setFormData}
						bannerImageRef={bannerImageRef}
						uploadImage={uploadImage}
					/>

					<CampaignProductSection
						products={products}
						setProducts={setProducts}
						newProduct={newProduct}
						setNewProduct={setNewProduct}
						uploadImage={uploadImage}
						productImageRefs={productImageRefs}
					/>

					<div className="flex justify-between items-center pt-4 border-t">
						<button
							type="button"
							onClick={() => setDeleteOpen(true)}
							className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
						>
							<Trash2 className="w-4 h-4" />
							Delete Campaign
						</button>

						<div className="flex gap-4">
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
					</div>
				</form>
			</div>

			<Modal open={deleteOpen} onOpenChange={setDeleteOpen}>
				<ModalContent>
					<ModalHeader>
						<ModalTitle>Delete Campaign</ModalTitle>
					</ModalHeader>

					<div className="p-6 space-y-4">
						<p className="text-slate-600">
							Are you sure you want to delete this campaign? This
							action cannot be undone.
						</p>

						<div className="flex justify-end gap-3 pt-4 border-t">
							<button
								onClick={() => setDeleteOpen(false)}
								className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 text-gray-700"
							>
								Cancel
							</button>
							<button
								onClick={handleDelete}
								className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
							>
								Yes, Delete
							</button>
						</div>
					</div>

					<ModalCloseButton onClose={() => setDeleteOpen(false)} />
				</ModalContent>
			</Modal>
		</>
	);
}
