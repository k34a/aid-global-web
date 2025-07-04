import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/db/supabase";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

// Middleware to verify admin authentication
async function verifyAdminAuth() {
	const cookieStore = await cookies();
	const token = cookieStore.get("token")?.value;

	if (!token) {
		return { error: "Unauthorized", status: 401 };
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
		return { user: decoded };
	} catch (error) {
		return { error: "Invalid token", status: 401 };
	}
}

export async function POST(request: NextRequest) {
	try {
		// Verify admin authentication
		const authResult = await verifyAdminAuth();
		if (authResult.error) {
			return NextResponse.json(
				{ error: authResult.error },
				{ status: authResult.status },
			);
		}

		const formData = await request.formData();
		const file = formData.get("file") as File;
		const path = formData.get("path") as string;

		if (!file) {
			return NextResponse.json(
				{ error: "No file provided" },
				{ status: 400 },
			);
		}

		if (!path) {
			return NextResponse.json(
				{ error: "No path provided" },
				{ status: 400 },
			);
		}

		// Validate file type
		if (!file.type.startsWith("image/")) {
			return NextResponse.json(
				{ error: "Only image files are allowed" },
				{ status: 400 },
			);
		}

		// Validate file size (max 5MB)
		const maxSize = 5 * 1024 * 1024; // 5MB
		if (file.size > maxSize) {
			return NextResponse.json(
				{ error: "File size must be less than 5MB" },
				{ status: 400 },
			);
		}

		// Generate unique filename
		const fileExtension = file.name.split(".").pop();
		const uniqueFilename = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExtension}`;
		const fullPath = `${path}/${uniqueFilename}`;

		// Convert file to buffer
		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);

		// Upload to Supabase Storage
		const { data, error } = await supabaseAdmin.storage
			.from("content")
			.upload(fullPath, buffer, {
				contentType: file.type,
				cacheControl: "3600",
				upsert: false,
			});

		if (error) {
			console.error("Error uploading file:", error);
			return NextResponse.json(
				{ error: "Failed to upload file" },
				{ status: 500 },
			);
		}

		// Get public URL
		const { data: urlData } = supabaseAdmin.storage
			.from("content")
			.getPublicUrl(fullPath);

		return NextResponse.json({
			url: urlData.publicUrl,
			path: fullPath,
		});
	} catch (error) {
		console.error("Error in upload API:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
