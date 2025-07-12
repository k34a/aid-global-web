import { NextRequest, NextResponse } from "next/server";
import { CampaignUpdateSchema } from "@/lib/validators/campaign";
import { supabaseAdmin } from "@/lib/db/supabase";
import { verifyAdminAuth } from "@/lib/auth/admin";
import { handleCampaignProductsUpdate } from "@/lib/handlers/updatecampaignproducts";
import { listAllFiles } from "@/lib/storage/listallfiles";

export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ slug: string }> },
) {
	try {
		const isAuthenticated = await verifyAdminAuth();
		if (!isAuthenticated) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 },
			);
		}

		const { slug } = await params;
		const json = await request.json();

		const parsed = CampaignUpdateSchema.safeParse(json);
		if (!parsed.success) {
			return NextResponse.json(
				{ error: parsed.error.flatten() },
				{ status: 400 },
			);
		}

		const body = parsed.data;

		// Get the campaign first to verify it exists
		const { data: existingCampaign, error: fetchError } =
			await supabaseAdmin
				.from("campaigns")
				.select("id")
				.eq("slug", slug)
				.single();

		if (fetchError || !existingCampaign) {
			return NextResponse.json(
				{ error: "Campaign not found" },
				{ status: 404 },
			);
		}

		// Update campaign basic information
		const { error: updateError } = await supabaseAdmin
			.from("campaigns")
			.update({
				title: body.title,
				description: body.description,
				amount: body.amount,
				ended_at: body.ended_at
					? new Date(body.ended_at).toISOString()
					: null,
				banner_image: body.banner_image,
			})
			.eq("slug", slug);

		if (updateError) {
			console.error("Error updating campaign:", updateError);
			return NextResponse.json(
				{ error: "Failed to update campaign" },
				{ status: 500 },
			);
		}

		// Update campaign products
		if (body.products) {
			const result = await handleCampaignProductsUpdate(
				existingCampaign.id,
				body.products,
			);
			if (result.error) {
				return NextResponse.json(
					{ error: result.error },
					{ status: 500 },
				);
			}
		}

		return NextResponse.json(
			{ message: "Campaign updated successfully" },
			{ status: 200 },
		);
	} catch (error) {
		console.error("Error in campaign update API:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ slug: string }> },
) {
	try {
		const isAuthenticated = await verifyAdminAuth();
		if (!isAuthenticated) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 },
			);
		}

		const { slug } = await params;
		const campaignPath = `campaigns/${slug}`;

		// ✅ Recursively get all file paths
		const filePaths = await listAllFiles(campaignPath);

		if (filePaths.length > 0) {
			const { error: deleteError } = await supabaseAdmin.storage
				.from("content")
				.remove(filePaths);

			if (deleteError) {
				console.error("Failed to delete files:", deleteError);
				return NextResponse.json(
					{ error: "Failed to delete storage files" },
					{ status: 500 },
				);
			}
		}

		// ✅ Delete the campaign row from the DB
		const { error: deleteCampaignError } = await supabaseAdmin
			.from("campaigns")
			.delete()
			.eq("slug", slug);

		if (deleteCampaignError) {
			console.error(
				"Failed to delete campaign from DB:",
				deleteCampaignError,
			);
			return NextResponse.json(
				{ error: "Failed to delete campaign" },
				{ status: 500 },
			);
		}

		return NextResponse.json(
			{ message: "Campaign deleted successfully" },
			{ status: 200 },
		);
	} catch (error) {
		console.error("Error deleting campaign:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
