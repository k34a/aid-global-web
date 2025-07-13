import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { verifyAdminAuth } from "@/lib/auth/admin";
import { supabaseAdmin } from "@/lib/db/supabase";
import { buildPublicUrl } from "@/lib/db/storage";

const ACCEPTED_IMAGE_TYPES = [
	"image/jpeg",
	"image/jpg",
	"image/png",
	"image/webp",
];

const presignSchema = z.object({
	slug: z.string().min(1, "Campaign slug is required"),
	filename: z
		.string()
		.min(1, "Filename is required")
		.refine(
			(name) => {
				const ext = name.split(".").pop()?.toLowerCase();
				return ACCEPTED_IMAGE_TYPES.some((type) =>
					type.includes(ext || ""),
				);
			},
			{
				message: "Only JPEG, PNG, and WebP extensions are allowed",
			},
		),
	type: z.enum(["product", "banner"]),
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

		const body = await request.json();
		const result = presignSchema.safeParse(body);

		if (!result.success) {
			return NextResponse.json(
				{ error: result.error.format() },
				{ status: 400 },
			);
		}

		const { slug, filename, type } = result.data;

		const fileExtension = filename.split(".").pop();
		const prefix = type === "product" ? "product-" : "banner-";
		const uniqueFilename = `${prefix}${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExtension}`;
		const fullPath = `campaigns/${slug}/images/${uniqueFilename}`;

		const { data, error } = await supabaseAdmin.storage
			.from("content")
			.createSignedUploadUrl(fullPath);

		if (error || !data?.signedUrl) {
			return NextResponse.json(
				{ error: "Failed to create presigned URL" },
				{ status: 500 },
			);
		}
		const publicUrl = buildPublicUrl(fullPath);

		return NextResponse.json({
			presignedUrl: data.signedUrl,
			publicUrl,
			path: fullPath,
		});
	} catch (error) {
		console.error("Error generating presigned URL:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
