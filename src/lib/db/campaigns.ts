import { supabaseAdmin } from "./supabase";

interface CampaignProduct {
	id: string;
	campaign_id: string;
	title: string;
	description: string;
	image?: string;
	price_per_unit: number;
	units_required: number;
	units_collected: number;
}

interface CampaignDetails {
	id: string;
	title: string;
	description: string;
	slug: string;
	amount: number;
	created_at: Date;
	ended_at?: Date;
	collection: number;
	backers: number;
	unallocated_amount: number;
	banner_image: string;
	campaign_products: Array<CampaignProduct>;
}

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

	return campaign as CampaignDetails;
};

const getAllCampaigns = async () => {
	const { data: campaigns, error } = await supabaseAdmin
		.from("campaigns")
		.select("*")
		.order("created_at", { ascending: false });

	if (error) {
		console.error("Error fetching campaigns:", error.message);
		return [];
	}

	return campaigns || [];
};

export { getCampaignBySlug, getAllCampaigns };

export type { CampaignProduct, CampaignDetails };
