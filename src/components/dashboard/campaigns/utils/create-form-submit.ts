"use client";

import { FormEvent } from "react";
import { toast } from "react-hot-toast";
import { CampaignProduct, FormDataType } from "../types";
import { CampaignCreateSchema } from "@/lib/validations/campaign";

interface Args {
	e: FormEvent;
	formData: FormDataType;
	setLoading: (loading: boolean) => void;
	richTextContent: string;
	products: CampaignProduct[];
	router: any;
}

export async function handleCreateFormSubmit({
	e,
	formData,
	setLoading,
	richTextContent,
	products,
	router,
}: Args) {
	e.preventDefault();
	setLoading(true);

	try {
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

		if (formData.slug === "new") {
			toast.error('Slug cannot be "new"');
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
				formData.ended_at.trim() === ""
					? null
					: new Date(formData.ended_at).toISOString(),
			products: products.map((p) => ({
				...p,
				price_per_unit: Number(p.price_per_unit),
				units_required: Number(p.units_required),
			})),
		};

		const result = CampaignCreateSchema.safeParse(payload);
		if (!result.success) {
			console.error("Validation error:", result.error.flatten());
			toast.error("Please fix the form errors before submitting.");
			return;
		}

		const response = await fetch("/api/admin/campaigns", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(result.data),
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.error || "Failed to create campaign");
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
			form.append("path", `campaigns/${formData.slug}`);

			const upload = await fetch("/api/upload-html", {
				method: "POST",
				body: form,
			});

			if (!upload.ok) {
				toast.error("Campaign created, but rich text upload failed.");
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
}
