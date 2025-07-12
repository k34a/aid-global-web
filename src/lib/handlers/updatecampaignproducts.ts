import { supabaseAdmin } from "@/lib/db/supabase";

export async function handleCampaignProductsUpdate(
	campaignId: string,
	products: {
		id: string;
		title: string;
		description: string;
		price_per_unit: number;
		units_required: number;
		image?: string;
	}[],
): Promise<{ success?: boolean; error?: string }> {
	try {
		const { data: existingProducts, error: fetchError } =
			await supabaseAdmin
				.from("campaign_products")
				.select("id")
				.eq("campaign_id", campaignId);

		if (fetchError) {
			console.error("Error fetching existing products:", fetchError);
			return { error: "Failed to fetch existing products" };
		}

		const existingProductIds = existingProducts?.map((p) => p.id) || [];

		const newProducts = products.filter((p) => !p.id.startsWith("temp-"));
		const tempProducts = products.filter((p) => p.id.startsWith("temp-"));

		const productsToKeep = newProducts.map((p) => p.id);
		const productsToDelete = existingProductIds.filter(
			(id) => !productsToKeep.includes(id),
		);

		if (productsToDelete.length > 0) {
			await supabaseAdmin
				.from("campaign_products")
				.delete()
				.in("id", productsToDelete);
		}

		for (const product of newProducts) {
			await supabaseAdmin
				.from("campaign_products")
				.update({
					title: product.title,
					description: product.description,
					price_per_unit: product.price_per_unit,
					units_required: product.units_required,
					image: product.image || "",
				})
				.eq("id", product.id);
		}

		for (const product of tempProducts) {
			await supabaseAdmin.from("campaign_products").insert({
				campaign_id: campaignId,
				title: product.title,
				description: product.description,
				price_per_unit: product.price_per_unit,
				units_required: product.units_required,
				units_collected: 0,
				image: product.image || "",
			});
		}

		return { success: true };
	} catch (error) {
		console.error("Error updating campaign products:", error);
		return { error: "Failed to update campaign products" };
	}
}
