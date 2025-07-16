"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CampaignDetails, CampaignProduct } from "@/lib/db/campaigns";
import { toast } from "react-hot-toast";
import { Save, Trash2, ImageIcon } from "lucide-react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalTitle,
	ModalCloseButton,
} from "@/components/ui/custom-modal";
import CampaignBasicInfoSection from "@/components/dashboard/campaigns/form-sections/campaign-basic-section";

import CampaignProductSection from "@/components/dashboard/campaigns/form-sections/campaign-product-section";
import CampaignRichTextSection from "../form-sections/rich-text-section";
import CampaignImageUpload from "@/components/dashboard/campaigns/form-sections/campaign-image-upload";
import { handleEditFormSubmit } from "@/components/dashboard/campaigns/utils/edit-form-submit";

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

	const handleDelete = async () => {
		try {
			const res = await fetch(`/api/admin/campaigns/${campaign.slug}`, {
				method: "DELETE",
			});
			if (!res.ok) {
				const errorData = await res.json();
				return toast.error(
					errorData.message || "Failed to delete campaign",
				);
			}
			toast.success("Campaign deleted");
			router.push("/admin/dashboard/campaigns");
		} catch (err) {
			console.error("Delete failed:", err);
			toast.error("Something went wrong");
		} finally {
			setDeleteOpen(false);
		}
	};

	return (
		<>
			<div className="bg-white rounded-lg shadow-sm border">
				<form
					onSubmit={(e) =>
						handleEditFormSubmit({
							e,
							formData,
							setLoading,
							richTextContent,
							products,
							slug: formData.slug,
							router,
						})
					}
					className="p-6 space-y-10"
				>
					<CampaignBasicInfoSection
						formData={formData}
						setFormData={setFormData}
					/>

					<CampaignRichTextSection
						value={richTextContent}
						onChange={setRichTextContent}
					/>

					<CampaignImageUpload
						label="Banner Image"
						imageUrl={formData.banner_image || ""}
						setImageUrl={(url: string) =>
							setFormData((prev) => ({
								...prev,
								banner_image: url,
							}))
						}
						imageUploadFolder="banner"
						slug={formData.slug}
						width={800}
						height={384}
						objectFit="cover"
						LabelIcon={ImageIcon}
					/>

					<CampaignProductSection
						products={products}
						setProducts={setProducts}
						campaignSlug={formData.slug}
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
