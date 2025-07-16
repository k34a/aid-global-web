"use client";

import { ImageIcon, Upload, X } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { handleImageUpload } from "@/components/dashboard/campaigns/utils/handle-image-upload";

interface CampaignImageUploadProps {
	label: string;
	imageUrl: string;
	setImageUrl: (url: string) => void;
	imageUploadFolder: "banner" | "product";
	slug?: string;
	width?: number;
	height?: number;
	objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
	LabelIcon?: React.ElementType;
	disabled?: boolean;
}

export default function CampaignImageUpload({
	label,
	imageUrl,
	setImageUrl,
	imageUploadFolder,
	slug = "temp",
	width = 400,
	height = 192,
	objectFit = "cover",
	LabelIcon = ImageIcon,
	disabled = false,
}: CampaignImageUploadProps) {
	const imageInputRef = useRef<HTMLInputElement>(null);

	const handleImageChange = async (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const uploadedImageUrl = await handleImageUpload(
			file,
			slug,
			imageUploadFolder,
		);

		if (uploadedImageUrl) {
			setImageUrl(uploadedImageUrl);
		} else {
			console.error(`Failed to upload ${label.toLowerCase()} image.`);
			setImageUrl("");
		}

		if (imageInputRef.current) {
			imageInputRef.current.value = "";
		}
	};

	const handleRemoveImage = () => {
		setImageUrl("");
		if (imageInputRef.current) {
			imageInputRef.current.value = "";
		}
	};

	const Icon = LabelIcon;

	return (
		<div className="space-y-4">
			<h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
				<Icon className="w-5 h-5" />
				{label}
			</h2>

			<div className="space-y-4">
				{imageUrl && (
					<div className="relative w-full max-w-md">
						<Image
							src={imageUrl}
							alt={`${label} preview`}
							width={width}
							height={height}
							className={`w-full h-48 rounded-lg border`}
							style={{ objectFit: objectFit }}
							onError={(e) => {
								console.error(
									`Failed to load ${label.toLowerCase()} image:`,
									imageUrl,
								);
								e.currentTarget.style.display = "none";
							}}
						/>
						<button
							type="button"
							onClick={handleRemoveImage}
							className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
							aria-label={`Remove ${label.toLowerCase()}`}
						>
							<X className="w-4 h-4" />
						</button>
					</div>
				)}

				<input
					ref={imageInputRef}
					type="file"
					accept="image/webp"
					onChange={handleImageChange}
					className="hidden"
					aria-label={`Upload new ${label.toLowerCase()}`}
				/>
				<button
					type="button"
					onClick={() => imageInputRef.current?.click()}
					disabled={disabled}
					className={`flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md transition-colors ${
						disabled
							? "bg-gray-100 text-gray-400 cursor-not-allowed"
							: "hover:bg-gray-50" // Add disabled styles
					}`}
				>
					<Upload className="w-4 h-4" />
					{imageUrl ? `Change ${label}` : `Upload ${label}`}
				</button>
			</div>
		</div>
	);
}
