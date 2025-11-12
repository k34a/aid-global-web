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
	status?: string | null;
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
	campaign_products: Array<CampaignProduct>;
	tags: Array<string>;
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

		// Fetch tags associated with this campaign
		const { data: tagData, error: tagError } = await supabaseAdmin
			.from("tag_campaigns")
			.select("tag_id")
			.eq("campaign_id", data.id);

		if (tagError || !tagData?.length) {
			console.error("Error fetching campaign tags:", tagError?.message);
			return { ...data, tags: [] }; // Return empty tags if there is an error
		}

		// Fetch tag names using tag IDs
		const tagIds = tagData.map((t) => t.tag_id);
		const { data: tags, error: tagsError } = await supabaseAdmin
			.from("tags")
			.select("name")
			.in("id", tagIds);

		if (tagsError || !tags?.length) {
			console.error("Error fetching tag names:", tagsError?.message);
			return { ...data, tags: [] }; // Return empty tags if there is an error
		}

		// Return the campaign data along with its associated tags
		return {
			...data,
			campaign_products: data.campaign_products.filter(
				(p: CampaignProduct) => p.status !== "Archived",
			),
			tags: tags.map((tag) => tag.name),
		};
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

	static async getTagNames(): Promise<string[]> {
		const { data, error } = await supabaseAdmin.from("tags").select("name");

		if (error) {
			console.error("Error fetching tags:", error.message);
			return [];
		}

		return data?.map((tag) => tag.name) ?? [];
	}

	static async list(
		params: z.infer<typeof querySchema>,
	): Promise<{ items: CampaignDetailsForListing[]; total: number }> {
		const { page, search, minBackers, maxBackers, sortBy, tags } = params;

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

		if (tags && tags.length > 0) {
			// Step 1: Get tag IDs for given tag names
			const { data: tagData, error: tagError } = await supabaseAdmin
				.from("tags")
				.select("id")
				.in("name", tags);

			if (tagError || !tagData?.length) {
				console.error("Error fetching tag IDs:", tagError?.message);
				return { items: [], total: 0 };
			}

			const tagIds = tagData.map((t) => t.id);

			// Step 2: Get campaign IDs that match any of the tags
			const { data: matchingCampaigns, error: matchingError } =
				await supabaseAdmin
					.from("tag_campaigns")
					.select("campaign_id")
					.in("tag_id", tagIds);

			if (matchingError || !matchingCampaigns?.length) {
				console.error(
					"Error fetching campaigns by tags:",
					matchingError,
				);
				return { items: [], total: 0 };
			}

			// Get distinct campaign IDs
			const campaignIds = Array.from(
				new Set(matchingCampaigns.map((row) => row.campaign_id)),
			);

			if (campaignIds.length === 0) {
				return { items: [], total: 0 };
			}

			// Include campaigns with matching tag IDs (ANY tag match)
			query = query.in("id", campaignIds);
		}

		query = query
			.eq("status", "Published")
			.order(sort.column, { ascending: sort.ascending });

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
