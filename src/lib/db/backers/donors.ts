import { supabaseAdmin } from "@/lib/db/supabase";
import { PostgrestError } from "@supabase/supabase-js";
import type { Donation, ReceiptDetails } from "./types";

class Donors {
	static async getById(id: string): Promise<Donation | null> {
		const { data, error } = await supabaseAdmin
			.from("backers")
			.select("*")
			.eq("id", id)
			.single();

		if (error) {
			console.error("Error fetching backer by ID:", error.message);
			return null;
		}

		return data as Donation;
	}

	static async doesExist(id: string): Promise<boolean> {
		const { data, error } = await supabaseAdmin
			.from("backers")
			.select("id")
			.eq("id", id)
			.maybeSingle();

		if (error) {
			console.error("Error fetching donation details:", error.message);
			return false;
		}

		return !!data;
	}

	static async getDetailsById(id: string): Promise<ReceiptDetails | null> {
		const {
			data: donation,
			error,
		}: { data: ReceiptDetails | null; error: PostgrestError | null } =
			await supabaseAdmin
				.from("backers")
				.select(
					"*, campaigns(title, description), donated_products(quantity, campaign_products(title, price_per_unit))",
				)
				.eq("id", id)
				.single();

		if (error) {
			console.error("Error fetching donation details:", error.message);
			return null;
		}

		return donation;
	}
}

export default Donors;
