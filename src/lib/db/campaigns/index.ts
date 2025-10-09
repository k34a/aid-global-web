import {
	campaignSortByVsQuery,
	querySchema,
} from "@/components/campaign-listing/search-params";
import { DEFAULT_CAMPAIGN } from "@/config/config";
import { supabaseAdmin } from "@/lib/db/supabase";
import z from "zod";

const PAGE_SIZE = 12;

export interface CampaignProduct {
	id: string;
	campaign_id: string;
	title: string;
	description: string;
	image?: string;
	price_per_unit: number;
	units_required: number;
	units_collected: number;
}

export interface CampaignDetails {
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
	beneficiary?: null | Record<string, any>;
	program?: null | string;
	campaign_products: Array<CampaignProduct>;
}

export interface CampaignDetailsForListing {
	id: string;
	slug: string;
	title: string;
	description: string;
	amount: number;
	created_at: Date | string;
	ended_at: Date | null;
	collection: number;
	backers: number;
	banner_image: string;
	beneficiary?: null | Record<string, any>;
}

export interface PaginationCampaignFilters {
	limit: number;
	offset: number;
}

export class CampaignService {
	static async getBySlug(slug: string): Promise<CampaignDetails | null> {
		const { data, error } = await supabaseAdmin
			.from("campaigns")
			.select("*, campaign_products(*)")
			.eq("slug", slug)
			.neq("id", DEFAULT_CAMPAIGN)
			.single();

		if (error) {
			console.error("Error fetching campaign details:", error.message);
			return null;
		}

		return data as CampaignDetails;
	}

	static async getCount(): Promise<number> {
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

	static async list(
		params: z.infer<typeof querySchema>,
	): Promise<{ items: CampaignDetailsForListing[]; total: number }> {
		const { page, search, minBackers, maxBackers, sortBy, program } =
			params;

		const sort =
			campaignSortByVsQuery[sortBy] ?? campaignSortByVsQuery["latest"];

		let query = supabaseAdmin
			.from("campaigns")
			.select("*", { count: "exact" })
			.neq("id", DEFAULT_CAMPAIGN);

		if (search) {
			query = query.ilike("title", `%${search}%`);
		}

		if (minBackers !== undefined) query = query.gte("backers", minBackers);
		if (maxBackers !== undefined && maxBackers !== Infinity)
			query = query.lte("backers", maxBackers);

		if (program !== "all") {
			query = query.eq("program", program);
		}

		query = query.order(sort.column, { ascending: sort.ascending });

		const from = page * PAGE_SIZE;
		const to = from + PAGE_SIZE - 1;
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
}
