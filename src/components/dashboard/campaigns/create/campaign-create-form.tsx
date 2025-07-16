"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import CampaignBasicInfoSection from "@/components/dashboard/campaigns/form-sections/campaign-basic-section";
import CampaignRichTextSection from "../form-sections/rich-text-section";
import CampaignProductSection from "../form-sections/campaign-product-section";
import CampaignImageUpload from "@/components/dashboard/campaigns/form-sections/campaign-image-upload";
import { CampaignProduct, FormDataType } from "../types";
import { handleCreateFormSubmit } from "../utils/create-form-submit";
import { ImageIcon } from "lucide-react";

export default function CampaignCreateForm() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState<FormDataType>({
		title: "",
		description: "",
		slug: "",
		amount: 0,
		ended_at: "",
		banner_image: "",
	});
	const [richTextContent, setRichTextContent] = useState("");
	const [products, setProducts] = useState<CampaignProduct[]>([]);

	return (
		<div className="bg-white rounded-lg shadow-sm border">
			<form
				onSubmit={(e) =>
					handleCreateFormSubmit({
						e,
						formData,
						setLoading,
						richTextContent,
						products,
						router,
					})
				}
				className="p-6 space-y-8"
			>
				<CampaignBasicInfoSection
					formData={formData}
					setFormData={setFormData}
					isCreate={true}
				/>
				<CampaignRichTextSection
					value={richTextContent}
					onChange={setRichTextContent}
				/>

				<CampaignImageUpload
					label="Banner Image"
					imageUrl={formData.banner_image}
					setImageUrl={(url) =>
						setFormData((prev) => ({ ...prev, banner_image: url }))
					}
					imageUploadFolder="banner"
					slug={formData.slug || "temp-campaign"}
					width={800}
					height={384}
					objectFit="cover"
					LabelIcon={ImageIcon}
				/>

				<CampaignProductSection
					products={products}
					setProducts={setProducts}
					campaignSlug={formData.slug || "temp-campaign"}
				/>
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
