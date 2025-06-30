import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/db/supabase";

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const path = searchParams.get("path");

		if (!path) {
			return NextResponse.json(
				{ error: "No path provided" },
				{ status: 400 },
			);
		}

		// Validate path to prevent directory traversal
		if (path.includes("..") || !path.startsWith("campaigns/")) {
			return NextResponse.json(
				{ error: "Invalid path" },
				{ status: 400 },
			);
		}

		// Get the file from Supabase storage
		const { data, error } = await supabaseAdmin.storage
			.from("content")
			.download(path);

		if (error || !data) {
			console.error("Error fetching image:", error);
			return NextResponse.json(
				{ error: "Image not found" },
				{ status: 404 },
			);
		}

		// Convert to buffer
		const buffer = Buffer.from(await data.arrayBuffer());

		// Determine content type based on file extension
		const extension = path.split(".").pop()?.toLowerCase();
		let contentType = "image/jpeg"; // default

		if (extension === "png") contentType = "image/png";
		else if (extension === "gif") contentType = "image/gif";
		else if (extension === "webp") contentType = "image/webp";
		else if (extension === "svg") contentType = "image/svg+xml";

		// Return the image with proper headers
		return new NextResponse(buffer, {
			headers: {
				"Content-Type": contentType,
				"Cache-Control": "public, max-age=3600", // Cache for 1 hour
			},
		});
	} catch (error) {
		console.error("Error serving image:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
