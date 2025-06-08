import { supabaseAdmin } from "./supabase";

const getCampaignBySlug = async (slug: string) => {
	const { data: campaign, error } = await supabaseAdmin
		.from("campaigns")
		.select("*, campaign_products(*)")
		.eq("slug", slug)
		.single();

	if (error) {
		console.error("Error fetching campaign details:", error.message);
		return null;
	}

	return campaign;
};

export { getCampaignBySlug };
