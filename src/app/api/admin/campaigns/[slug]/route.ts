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

export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ slug: string }> },
) {
	try {
		// Verify admin authentication
		const authResult = await verifyAdminAuth();
		if (authResult.error) {
			return NextResponse.json(
				{ error: authResult.error },
				{ status: authResult.status },
			);
		}

		const { slug } = await params;
		const body = await request.json();

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

		// Handle campaign products
		if (body.products && Array.isArray(body.products)) {
			// Get existing products
			const { data: existingProducts } = await supabaseAdmin
				.from("campaign_products")
				.select("id")
				.eq("campaign_id", existingCampaign.id);

			const existingProductIds = existingProducts?.map((p) => p.id) || [];
			const newProducts = body.products.filter(
				(p: any) => !p.id.startsWith("temp-"),
			);
			const tempProducts = body.products.filter((p: any) =>
				p.id.startsWith("temp-"),
			);

			// Delete products that are no longer in the list
			const productsToKeep = body.products
				.map((p: any) => p.id)
				.filter((id: string) => !id.startsWith("temp-"));
			const productsToDelete = existingProductIds.filter(
				(id) => !productsToKeep.includes(id),
			);

			if (productsToDelete.length > 0) {
				await supabaseAdmin
					.from("campaign_products")
					.delete()
					.in("id", productsToDelete);
			}

			// Update existing products
			for (const product of newProducts) {
				await supabaseAdmin
					.from("campaign_products")
					.update({
						title: product.title,
						description: product.description,
						price_per_unit: product.price_per_unit,
						units_required: product.units_required,
						image: product.image,
					})
					.eq("id", product.id);
			}

			// Insert new products
			for (const product of tempProducts) {
				await supabaseAdmin.from("campaign_products").insert({
					campaign_id: existingCampaign.id,
					title: product.title,
					description: product.description,
					price_per_unit: product.price_per_unit,
					units_required: product.units_required,
					units_collected: 0,
					image: product.image,
				});
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
