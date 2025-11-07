import { supabaseAdmin } from "@/lib/db/supabase";

export async function fetchArticleDescription(
	articleId: string,
): Promise<string | null> {
	try {
		const { data, error } = await supabaseAdmin.storage
			.from("articles")
			.download(`${articleId}/description.html`);

		if (error) {
			console.error("Error fetching article description:", error.message);
			return null;
		}

		const text = await data.text();
		return text;
	} catch (error) {
		console.error("Error reading article description:", error);
		return null;
	}
}
