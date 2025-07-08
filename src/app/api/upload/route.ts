import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { verifyAdminAuth } from "@/lib/auth/admin";
import { uploadFileToSupabase } from "@/lib/db/storage";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
	"image/jpeg",
	"image/jpg",
	"image/png",
	"image/webp",
];

const uploadSchema = z.object({
	slug: z.string().min(1, "Campaign slug is required"),
	file: z
		.custom<File>((val) => val instanceof File, {
			message: "File is required",
		})
		.refine((file) => file.size <= MAX_FILE_SIZE, {
			message: "File size must be less than 5MB",
		})
		.refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
			message: "Only JPEG, PNG, and WebP images are allowed",
		}),
});

export async function POST(request: NextRequest) {
	try {
		const isAuthenticated = await verifyAdminAuth();
		if (!isAuthenticated) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 },
			);
		}

		const formData = await request.formData();
		const raw = {
			slug: formData.get("slug"),
			file: formData.get("file"),
		};

		const result = uploadSchema.safeParse(raw);

		if (!result.success) {
			return NextResponse.json(
				{ error: result.error.format() },
				{ status: 400 },
			);
		}

		const { slug, file } = result.data;

		// Generate unique filename
		const fileExtension = file.name.split(".").pop();
		const uniqueFilename = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExtension}`;
		const fullPath = `campaigns/${slug}/images/${uniqueFilename}`;

		const buffer = Buffer.from(await file.arrayBuffer());
		const resultData = await uploadFileToSupabase(file, buffer, fullPath);
		return NextResponse.json(resultData);
	} catch (error) {
		console.error("Error in upload API:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
