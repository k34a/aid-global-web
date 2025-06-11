import { supabaseAdmin } from "./supabase";

type ArticleMeta = {
	id: number;
	title: string;
	slug: string;
	description: string;
};

type Article = {
	title: string;
	description: string;
	content: string;
};

async function getAllArticles(limit = 10, offset = 0): Promise<ArticleMeta[]> {
	const { data, error } = await supabaseAdmin
		.from("articles")
		.select("id, title, slug, description")
		.order("created_at", { ascending: false })
		.range(offset, offset + limit);

	if (error) {
		console.error("Error fetching articles:", error);
		return [];
	}

	return data || [];
}

async function getAllArticlesCount(): Promise<number> {
	const { data, error } = await supabaseAdmin
		.rpc("get_table_row_count", {
			arg_schema_name: "public",
			arg_table_name: "articles",
		})
		.single();

	if (error) {
		console.error("Error fetching articles count:", error);
		return 0;
	}

	return (data as unknown as number) || 0;
}

async function getArticle(slug: string): Promise<Article | null> {
	const { data: meta, error: metaError } = await supabaseAdmin
		.from("articles")
		.select("title, description")
		.eq("slug", slug);

	if (metaError) {
		console.error("Metadata fetch error:", metaError.message);
		return null;
	}

	if (!meta || meta.length === 0) {
		console.warn("No article found for slug:", slug);
		return null;
	}

	if (meta.length > 1) {
		console.warn("Multiple articles found for slug:", slug);
		return null;
	}

	const articleMeta = meta[0];

	const { data: file, error: fileError } = await supabaseAdmin.storage
		.from("content")
		.download(`articles/${slug}.md`);

	if (fileError || !file) {
		console.error("Markdown file fetch error:", fileError?.message);
		return null;
	}

	const text = await file.text();

	if (!text) {
		console.warn("Markdown content empty for slug:", slug);
		return null;
	}

	const baseImageURL = process.env.SUPABASE_IMAGE_STORE_BASE_URL!;

	const fixedMarkdown = text.replace(
		/!\[(.*?)\]\((?!https?:\/\/)(.*?)\)/g,
		`![$1](${baseImageURL}$2)`,
	);

	return {
		title: articleMeta.title,
		description: articleMeta.description,
		content: fixedMarkdown,
	};
}

export { getAllArticles, getArticle, getAllArticlesCount };

export type { Article, ArticleMeta };
