import { toast } from "react-hot-toast";
import { uploadImage } from "@/components/dashboard/campaigns/utils/upload-image";

export async function handleImageUpload(
	file: File,
	slug: string,
	folder: "banner" | "product",
): Promise<string | null> {
	if (!file.name.toLowerCase().endsWith(".webp")) {
		toast.error("Only .webp images are allowed");
		return null;
	}

	if (file.size > 200 * 1024) {
		toast.error("Image must be less than 200 KB");
		return null;
	}

	try {
		const imageUrl = await uploadImage(file, slug || "temp", folder);
		return imageUrl;
	} catch (error: any) {
		console.error("Image upload failed:", error);
		toast.error(error?.message || "Image upload failed");
		return null;
	}
}
