import { DEFAULT_CAMPAIGN } from "@/config/data";
import { supabaseAdmin } from "@/lib/db/supabase";

interface DonorDetail {
	amount: number;
	name: string;
	donatedAt: Date;
}

interface DonorDetailsPaginated {
	donors: Array<DonorDetail>;
	hasMore: boolean;
}

export default class DonorDetailsForCampaign {
	private campaignId: string;

	constructor(campaignId: string) {
		this.campaignId = campaignId;
	}

	public async getBackers(
		limit = 10,
		offset = 0,
	): Promise<DonorDetailsPaginated> {
		const { data, error } = await supabaseAdmin
			.from("backers")
			.select("id, amount, is_anon, created_at, name")
			.neq("campaign_id", DEFAULT_CAMPAIGN)
			.eq("campaign_id", this.campaignId)
			.neq("payment_id", null)
			.order("created_at", { ascending: false })
			.range(offset, offset + limit); // fetch one extra

		if (error) {
			console.error(
				"Error fetching backers for campaign:",
				error.message,
			);
			return { donors: [], hasMore: false };
		}

		// Determine if there's more
		const hasMore = data.length > limit;

		// Slice back to the requested limit
		const slicedData = data.slice(0, limit);

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

		return {
			donors: backers.map((backer) => ({
				amount: backer.amount,
				name: backer.name,
				donatedAt: backer.created_at,
			})),
			hasMore,
		};
	}

	public async countBackers() {
		const { count, error } = await supabaseAdmin
			.from("backers")
			.select("*", { count: "exact", head: true })
			.neq("campaign_id", DEFAULT_CAMPAIGN)
			.eq("campaign_id", this.campaignId)
			.neq("payment_id", null);

		if (error) {
			console.error(
				"Error fetching backers count for campaign:",
				error.message,
			);
			return 0;
		}
		return count || 0;
	}
}
