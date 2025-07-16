import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/db/supabase";
import { verifyAdminAuth } from "@/lib/auth/admin";

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
		const file = formData.get("file") as File;
		const path = formData.get("path") as string;

		if (!file || !path) {
			return NextResponse.json(
				{ error: "Missing file or path" },
				{ status: 400 },
			);
		}

		const arrayBuffer = await file.arrayBuffer();
		const uint8Array = new Uint8Array(arrayBuffer);

		const { error } = await supabaseAdmin.storage
			.from("content")
			.upload(`${path}/description.html`, uint8Array, {
				contentType: "text/html",
				upsert: true,
			});

		if (error) {
			console.error("Supabase upload error:", error);
			return NextResponse.json(
				{ error: "Upload failed" },
				{ status: 500 },
			);
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Error uploading description:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
