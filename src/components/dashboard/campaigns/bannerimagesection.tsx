import Image from "next/image";
import { Upload, X, Image as ImageIcon } from "lucide-react";

export interface FormDataType {
	title: string;
	description: string;
	amount: number;
	ended_at: string;
	banner_image: string;
	slug: string;
}

interface BannerImageSectionProps {
	formData: FormDataType;
	setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
	bannerImageRef: React.RefObject<HTMLInputElement | null>;
	uploadImage: (file: File, type: "banner" | "product") => Promise<string>;
}

export default function BannerImageSection({
	formData,
	setFormData,
	bannerImageRef,
	uploadImage,
}: BannerImageSectionProps) {
	const handleBannerImageChange = async (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		const file = e.target.files?.[0];
		if (!file) return;

		try {
			const imageUrl = await uploadImage(file, "banner");
			setFormData((prev) => ({ ...prev, banner_image: imageUrl }));
		} catch (error) {
			console.error("Failed to upload banner image:", error);
		}
	};

	return (
		<div className="space-y-6">
			<h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
				<ImageIcon className="w-5 h-5" />
				Banner Image
			</h2>

			<div className="space-y-4">
				{formData.banner_image && (
					<div className="relative w-full max-w-md">
						<Image
							src={formData.banner_image.trim()}
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
							onClick={() =>
								setFormData((prev) => ({
									...prev,
									banner_image: "",
								}))
							}
							className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
						>
							<X className="w-4 h-4" />
						</button>
					</div>
				)}

				<input
					ref={bannerImageRef}
					type="file"
					accept="image/webp"
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
	);
}
