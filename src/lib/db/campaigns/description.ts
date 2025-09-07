import { supabaseAdmin } from "@/lib/db/supabase";

export const fetchCampaignDescription = async (
	id: string,
): Promise<string | null> => {
	const { data, error } = await supabaseAdmin.storage
		.from("content")
		.download(`campaigns/${id}/description.html`);

	if (error) {
		console.error(
			`Error fetching campaign description for campaign ID "${id}":`,
			error.message,
		);
		return null;
	}

	if (!data) {
		console.warn(
			`No campaign description file found for campaign ID: ${id}`,
		);
		return null;
	}

	return await data.text();
};
