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

export const fetchCampaignContent = async (
	slug: string,
): Promise<string | null> => {
	// Try to fetch HTML content first
	let { data, error } = await supabaseAdmin.storage
		.from("content")
		.download(`campaigns/${slug}/description.html`);

	// If HTML file doesn't exist, try to fetch markdown file (for backward compatibility)
	if (error) {
		({ data, error } = await supabaseAdmin.storage
			.from("content")
			.download(`campaigns/${slug}/description.md`));
	}

	if (error) {
		console.error(
			`Error fetching campaign content for slug "${slug}":`,
			error.message,
		);
		return null;
	}

	if (!data) {
		console.warn(`No campaign content file found for slug: ${slug}`);
		return null;
	}

	return await data.text();
};

export async function uploadFileToSupabase(
	file: File,
	buffer: Buffer,
	fullPath: string,
) {
	const { error } = await supabaseAdmin.storage
		.from("content")
		.upload(fullPath, buffer, {
			contentType: file.type,
			cacheControl: "3600",
			upsert: false,
		});

	if (error) {
		throw new Error("Failed to upload file");
	}

	const { data: urlData } = supabaseAdmin.storage
		.from("content")
		.getPublicUrl(fullPath);

	return {
		url: urlData.publicUrl,
		path: fullPath,
	};
}
