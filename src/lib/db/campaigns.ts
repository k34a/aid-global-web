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

interface PaginationCampaignFilters {
	limit: number;
	offset: number;
}

interface Campaigns {
	id: string;
	slug: string;
	title: string;
	description: string;
	amount: number;
	created_at: Date | string;
	ended_at: Date | null;
	collection: number;
	backers: number;
	unallocated_amount: number;
}

async function getPaginatedCampaigns(
	offset: number,
	limit: number,
): Promise<Campaigns[]> {
	const { data, error } = await supabaseAdmin
		.from("campaigns")
		.select("*")
		.order("created_at", { ascending: false })
		.range(offset, offset + limit);
	if (error) {
		console.error("Error fetching articles:", error);
		return [];
	}

	return data || [];
}

async function getAllCampaigns(): Promise<Campaigns[]> {
	const { data, error } = await supabaseAdmin
		.from("campaigns")
		.select("*")
		.order("created_at", { ascending: false });
	if (error) {
		console.error("Error fetching articles:", error);
		return [];
	}

	return data || [];
}

async function getCampaigns(
	filter: null | PaginationCampaignFilters,
): Promise<Campaigns[]> {
	if (filter) {
		return await getPaginatedCampaigns(filter.offset, filter.limit);
	} else {
		return await getAllCampaigns();
	}
}

async function getAllCampaignsCount(): Promise<number> {
	const { data, error } = await supabaseAdmin
		.rpc("get_table_row_count", {
			arg_schema_name: "public",
			arg_table_name: "campaigns",
		})
		.single();

	if (error) {
		console.error("Error fetching campaigns count:", error);
		return 0;
	}

	return (data as unknown as number) || 0;
}

export { getCampaignBySlug, getCampaigns, getAllCampaignsCount };

export type { CampaignDetails, CampaignProduct };
