"use client";

import { FormEvent } from "react";
import { toast } from "react-hot-toast";
import { CampaignProduct, FormDataType } from "../types";
import { CampaignUpdateSchema } from "@/lib/validations/campaign";

interface Args {
	e: FormEvent;
	formData: FormDataType;
	setLoading: (loading: boolean) => void;
	richTextContent: string;
	products: CampaignProduct[];
	slug: string;
	router: any;
}

export async function handleEditFormSubmit({
	e,
	formData,
	setLoading,
	richTextContent,
	products,
	slug,
	router,
}: Args) {
	e.preventDefault();
	setLoading(true);

	try {
		const parsedAmount = Number(formData.amount);
		if (
			!formData.title ||
			!formData.description ||
			isNaN(parsedAmount) ||
			parsedAmount <= 0
		) {
			toast.error(
				"Please fill all required fields and ensure amount is valid",
			);
			return;
		}

		let processedRichTextContent = richTextContent;
		if (richTextContent.trim() && (window as any).processRichTextImages) {
			try {
				processedRichTextContent = await (
					window as any
				).processRichTextImages();
			} catch (error) {
				console.error("Rich text image processing failed:", error);
				toast.error("Failed to upload some images.");
				return;
			}
		}

		const payload = {
			...formData,
			amount: parsedAmount,
			ended_at:
				formData.ended_at?.trim() === ""
					? null
					: new Date(formData.ended_at).toISOString(),
			products: products.map((p) => ({
				...p,
				price_per_unit: Number(p.price_per_unit),
				units_required: Number(p.units_required),
			})),
		};

		const result = CampaignUpdateSchema.safeParse(payload);
		if (!result.success) {
			console.error("Validation failed:", result.error.flatten());
			toast.error("Please fix the form errors before submitting.");
			return;
		}

		const response = await fetch(`/api/admin/campaigns/${slug}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(result.data),
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.error || "Failed to update campaign");
		}

		if (
			processedRichTextContent &&
			processedRichTextContent.trim() &&
			processedRichTextContent.trim() !== "<p></p>"
		) {
			const blob = new Blob([processedRichTextContent], {
				type: "text/html",
			});
			const form = new FormData();
			form.append("file", blob, "description.html");
			form.append("path", `campaigns/${slug}`);

			const upload = await fetch("/api/upload", {
				method: "POST",
				body: form,
			});

			if (!upload.ok) {
				toast.error("Campaign updated, but rich text upload failed.");
			}
		}

		toast.success("Campaign updated successfully!");
		router.push("/admin/dashboard/campaigns");
	} catch (error) {
		console.error("Error updating campaign:", error);
		toast.error(
			error instanceof Error
				? error.message
				: "Failed to update campaign",
		);
	} finally {
		setLoading(false);
	}
}
