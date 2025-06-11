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
