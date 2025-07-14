import { supabaseAdmin } from "@/lib/db/supabase";

export async function checkCampaignSlugExists(slug: string) {
	const { data, error } = await supabaseAdmin
		.from("campaigns")
		.select("id, title")
		.eq("slug", slug);

	if (error) {
		throw new Error("Database error while checking slug availability");
	}

	return data?.[0] ?? null;
}
