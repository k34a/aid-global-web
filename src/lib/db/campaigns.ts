import { supabaseAdmin } from "./supabase";
import { baseBackerSchema, adminBackerSchema } from "@/lib/validators/backer";
import { z } from "zod";
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
	const { data: campaigns, error } = await supabaseAdmin
		.from("campaigns")
		.select("*, campaign_products(*)")
		.eq("slug", slug)
		.order("created_at", { ascending: false });

	if (error) {
		console.error("Error fetching campaign details:", error.message);
		return null;
	}

	// If no campaigns found
	if (!campaigns || campaigns.length === 0) {
		console.error("No campaign found with slug:", slug);
		return null;
	}

	// If multiple campaigns found, log warning and return the most recent one
	if (campaigns.length > 1) {
		console.warn(
			`Multiple campaigns found with slug "${slug}". Returning the most recent one.`,
		);
	}

	// Return the first (most recent) campaign
	return campaigns[0] as CampaignDetails;
};

interface BackerDetailsForCampaign {
	id: string;
	amount: number;
	name: string;
	is_anon: boolean;
	created_at: Date;
}
interface AdminBackerDetailsForCampaign extends BackerDetailsForCampaign {
	email?: string | null;
	contact_number?: string | null;
}
type BackerResponse = {
	backers:
		| BackerDetailsForCampaign[]
		| AdminBackerDetailsForCampaign[]
		| null;
	hasMore: boolean;
};

const getBackersForCampaign = async (
	campaignId: string,
	limit = 10,
	offset = 0,
	isAdmin = false,
): Promise<BackerResponse> => {
	const selectFields = isAdmin
		? "id, amount, is_anon, created_at, name, email, contact_number"
		: "id, amount, is_anon, created_at, name";

	const { data, error } = await supabaseAdmin
		.from("backers")
		.select(selectFields)
		.eq("campaign_id", campaignId)
		.neq("payment_id", null)
		.order("created_at", { ascending: false })
		.range(offset, offset + limit); // fetch one extra

	if (error) {
		console.error("Error fetching backers for campaign:", error.message);
		return { backers: null, hasMore: false };
	}

	const schema = isAdmin ? adminBackerSchema : baseBackerSchema;

	const result = z.array(schema).safeParse(data);

	if (!result.success) {
		console.error("Zod validation failed:", result.error.format());
		return { backers: null, hasMore: false };
	}

	const slicedData = result.data.slice(0, limit);
	const hasMore = result.data.length > limit;

	const backers = isAdmin
		? slicedData
		: slicedData.map((backer) => ({
				...backer,
				name: backer.is_anon ? "Anonymous" : backer.name,
			}));

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

export {
	getCampaignBySlug,
	getCampaigns,
	getAllCampaignsCount,
	getBackersForCampaign,
};

export type { CampaignDetails, CampaignProduct, BackerDetailsForCampaign };
