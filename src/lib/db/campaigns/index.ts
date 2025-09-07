import { DEFAULT_CAMPAIGN } from "@/config/data";
import { supabaseAdmin } from "@/lib/db/supabase";

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

export interface Campaigns {
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

export interface PaginationCampaignFilters {
	limit: number;
	offset: number;
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

	static async getPaginated(
		offset: number,
		limit: number,
	): Promise<Campaigns[]> {
		const { data, error } = await supabaseAdmin
			.from("campaigns")
			.select("*")
			.neq("id", DEFAULT_CAMPAIGN)
			.order("created_at", { ascending: false })
			.range(offset, offset + limit);

		if (error) {
			console.error("Error fetching campaigns (paginated):", error);
			return [];
		}

		return data || [];
	}

	static async getAll(): Promise<Campaigns[]> {
		const { data, error } = await supabaseAdmin
			.from("campaigns")
			.select("*")
			.neq("id", DEFAULT_CAMPAIGN)
			.order("created_at", { ascending: false });

		if (error) {
			console.error("Error fetching all campaigns:", error);
			return [];
		}

		return data || [];
	}

	static async getAllWithFilter(
		filter: PaginationCampaignFilters | null,
	): Promise<Campaigns[]> {
		if (filter) {
			return await this.getPaginated(filter.offset, filter.limit);
		}
		return await this.getAll();
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
		params: ListCampaignsParams,
	): Promise<{ items: Campaigns[]; total: number }> {
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
}
