import { supabaseAdmin } from "./supabase";

export const fetchArticleMarkdown = async (
	slug: string,
): Promise<string | null> => {
	const { data, error } = await supabaseAdmin.storage
		.from("content")
		.download(`articles/${slug}.md`);

	if (error) {
		console.error(
			`Error fetching article markdown for slug "${slug}":`,
			error.message,
		);
		return null;
	}

	if (!data) {
		console.warn(`No article markdown file found for slug: ${slug}`);
		return null;
	}

	return await data.text();
};

export const fetchCampaignMarkdown = async (
	slug: string,
): Promise<string | null> => {
	const { data, error } = await supabaseAdmin.storage
		.from("content")
		.download(`campaigns/${slug}/description.md`);

	if (error) {
		console.error(
			`Error fetching campaign markdown for slug "${slug}":`,
			error.message,
		);
		return null;
	}

	if (!data) {
		console.warn(`No campaign markdown file found for slug: ${slug}`);
		return null;
	}

	return await data.text();
};
