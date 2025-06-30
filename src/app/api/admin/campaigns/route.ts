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

		const body = await request.json();

		// Validate required fields
		if (!body.title || !body.description || !body.slug || !body.amount) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 },
			);
		}

		// Check if slug already exists
		const { data: existingCampaigns, error: slugCheckError } =
			await supabaseAdmin
				.from("campaigns")
				.select("id, title")
				.eq("slug", body.slug);

		if (slugCheckError) {
			console.error("Error checking slug uniqueness:", slugCheckError);
			return NextResponse.json(
				{ error: "Database error while checking slug availability" },
				{ status: 500 },
			);
		}

		if (existingCampaigns && existingCampaigns.length > 0) {
			return NextResponse.json(
				{
					error: "Campaign with this slug already exists",
					existingCampaign: existingCampaigns[0],
				},
				{ status: 409 },
			);
		}

		// Create campaign
		const { data: campaign, error: createError } = await supabaseAdmin
			.from("campaigns")
			.insert({
				title: body.title,
				description: body.description,
				slug: body.slug,
				amount: body.amount,
				ended_at: body.ended_at
					? new Date(body.ended_at).toISOString()
					: null,
				banner_image: body.banner_image || "",
				collection: 0,
				backers: 0,
				unallocated_amount: 0,
			})
			.select()
			.single();

		if (createError) {
			console.error("Error creating campaign:", createError);
			return NextResponse.json(
				{ error: "Failed to create campaign" },
				{ status: 500 },
			);
		}

		// Create campaign products if provided
		if (
			body.products &&
			Array.isArray(body.products) &&
			body.products.length > 0
		) {
			const productsToInsert = body.products.map((product: any) => ({
				campaign_id: campaign.id,
				title: product.title,
				description: product.description,
				price_per_unit: product.price_per_unit,
				units_required: product.units_required,
				units_collected: 0,
				image: product.image || "",
			}));

			const { error: productsError } = await supabaseAdmin
				.from("campaign_products")
				.insert(productsToInsert);

			if (productsError) {
				console.error(
					"Error creating campaign products:",
					productsError,
				);
				// Don't fail the entire request if products fail, just log it
			}
		}

		return NextResponse.json(
			{
				message: "Campaign created successfully",
				campaign: {
					id: campaign.id,
					slug: campaign.slug,
				},
			},
			{ status: 201 },
		);
	} catch (error) {
		console.error("Error in campaign creation API:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
