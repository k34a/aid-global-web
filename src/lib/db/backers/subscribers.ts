import { supabaseAdmin } from "@/lib/db/supabase";
import { SubscriptioDetails } from "./types";

class Subscribers {
	static async getDetailsById(
		id: string,
	): Promise<SubscriptioDetails | null> {
		const { data, error } = await supabaseAdmin
			.from("subscriptions")
			.select("*, subscription_plans(name)")
			.eq("id", id)
			.single();

		if (error) {
			console.error(
				"Error fetching subscription details:",
				error.message,
			);
			return null;
		}

		const { data: charges, error: chargesError } = await supabaseAdmin
			.from("subscription_charges")
			.select("amount, created_at")
			.eq("subscription_id", data.id);

		if (chargesError) {
			console.error(
				"Error fetching charges for subscription ID:",
				data.id,
			);
			return null;
		}

		return { ...data, charges } as SubscriptioDetails;
	}

	static async doesExist(id: string): Promise<boolean> {
		const { data, error } = await supabaseAdmin
			.from("subscriptions")
			.select("id")
			.eq("id", id)
			.maybeSingle();

		if (error) {
			console.error(
				"Error fetching subscription details:",
				error.message,
			);
			return false;
		}

		return !!data;
	}
}

export default Subscribers;
