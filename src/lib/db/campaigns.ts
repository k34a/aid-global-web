import { DEFAULT_CAMPAIGN } from "@/config/data";
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
		.neq("id", DEFAULT_CAMPAIGN)
		.single();

	if (error) {
		console.error("Error fetching campaign details:", error.message);
		return null;
	}

	return campaign as CampaignDetails;
};

interface BackerDetailsForCampaign {
	id: string;
	amount: number;
	name: string;
	is_anon: boolean;
	created_at: Date;
}

const getBackersForCampaign = async (
	campaignId: string,
	limit = 10,
	offset = 0,
) => {
	const { data, error } = await supabaseAdmin
		.from("backers")
		.select("id, amount, is_anon, created_at, name")
		.neq("campaign_id", DEFAULT_CAMPAIGN)
		.eq("campaign_id", campaignId)
		.neq("payment_id", null)
		.order("created_at", { ascending: false })
		.range(offset, offset + limit); // fetch one extra

	if (error) {
		console.error("Error fetching backers for campaign:", error.message);
		return { backers: null, hasMore: false };
	}

	// Determine if there's more
	const hasMore = data.length > limit;

	// Slice back to the requested limit
	const slicedData = data.slice(0, limit) as BackerDetailsForCampaign[];

	// Handle anonymizing
	const backers = slicedData.map((backer) => {
		if (backer.is_anon) {
			return {
				...backer,
				name: "Anonymous",
			};
		}
		return backer;
	});

	return { backers, hasMore };
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
		.neq("id", DEFAULT_CAMPAIGN)
		.order("created_at", { ascending: false })
		.range(offset, offset + limit - 1);
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
		.neq("id", DEFAULT_CAMPAIGN)
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

interface ListCampaignsParams {
	page: number;
	pageSize: number;
	search?: string;
	activeOnly: boolean;
	minAmount?: number;
	maxAmount?: number;
	minCollection?: number;
	maxCollection?: number;
	minBackers?: number;
	maxBackers?: number;
	sortBy: "created_at" | "amount" | "collection" | "backers" | "title";
	sortOrder: "asc" | "desc";
}

export async function listCampaigns(params: ListCampaignsParams) {
	const {
		page,
		pageSize,
		search,
		activeOnly,
		minAmount,
		maxAmount,
		minCollection,
		maxCollection,
		minBackers,
		maxBackers,
		sortBy,
		sortOrder,
	} = params;

	let query = supabaseAdmin
		.from("campaigns")
		.select("*", { count: "exact" })
		.neq("id", DEFAULT_CAMPAIGN);

	if (search) {
		query = query.ilike("title", `%${search}%`);
	}

	if (activeOnly) {
		query = query.or(
			`ended_at.is.null,ended_at.gt.${new Date().toISOString()}`,
		);
	}

	if (minAmount !== undefined) query = query.gte("amount", minAmount);
	if (maxAmount !== undefined) query = query.lte("amount", maxAmount);
	if (minCollection !== undefined)
		query = query.gte("collection", minCollection);
	if (maxCollection !== undefined)
		query = query.lte("collection", maxCollection);
	if (minBackers !== undefined) query = query.gte("backers", minBackers);
	if (maxBackers !== undefined) query = query.lte("backers", maxBackers);

	query = query.order(sortBy, { ascending: sortOrder === "asc" });

	const from = (page - 1) * pageSize;
	const to = from + pageSize - 1;
	query = query.range(from, to);

	const { data, error, count } = await query;

	if (error) {
		console.error("Error fetching campaigns:", error);
		return { items: [], total: 0 };
	}

	return {
		items: data || [],
		total: count || 0,
	};
}

export {
	getCampaignBySlug,
	getCampaigns,
	getAllCampaignsCount,
	getBackersForCampaign,
};

export type { CampaignDetails, CampaignProduct, BackerDetailsForCampaign };
