import { supabaseAdmin } from "@/lib/db/supabase";

interface ProductInput {
	title: string;
	description: string;
	price_per_unit: number;
	units_required: number;
	image?: string;
}

interface CampaignInput {
	title: string;
	description: string;
	slug: string;
	amount: number;
	ended_at?: string;
	banner_image?: string;
	products?: ProductInput[];
}

export async function createCampaign(input: CampaignInput) {
	const {
		title,
		description,
		slug,
		amount,
		ended_at,
		banner_image = "",
		products = [],
	} = input;

	// Step 1: Create the campaign
	const { data: campaign, error: campaignError } = await supabaseAdmin
		.from("campaigns")
		.insert({
			title,
			description,
			slug,
			amount,
			ended_at: ended_at ? new Date(ended_at).toISOString() : null,
			banner_image,
			collection: 0,
			backers: 0,
			unallocated_amount: 0,
		})
		.select()
		.single();

	if (campaignError) {
		throw new Error(`Failed to create campaign: ${campaignError.message}`);
	}

	// Step 2: Insert products if any
	if (products.length > 0) {
		const productsToInsert = products.map((product) => ({
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
			console.error("Failed to insert campaign products:", productsError);
			await supabaseAdmin
				.from("campaigns")
				.delete()
				.eq("id", campaign.id);

			throw new Error("Product insert failed, campaign rolled back.");
		}
	}

	return campaign;
}
