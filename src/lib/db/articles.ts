import { supabaseAdmin } from "./supabase";
import { fetchArticleMarkdown } from "./fetchmarkdown";

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

async function getAllArticles(limit = 10): Promise<ArticleMeta[]> {
	const { data, error } = await supabaseAdmin
		.from("articles")
		.select("id, title, slug, description")
		.order("created_at", { ascending: false })
		.limit(limit);

	if (error) {
		console.error("Error fetching articles:", error.message);
		return [];
	}

	return data || [];
}

async function getArticle(slug: string): Promise<Article | null> {
	const { data: meta, error: metaError } = await supabaseAdmin
		.from("articles")
		.select("title, description")
		.eq("slug", slug);

	if (metaError || !meta?.[0]) {
		console.error("Error fetching article metadata:", metaError?.message);
		return null;
	}

	const markdown = await fetchArticleMarkdown(slug);

	if (!markdown) {
		return null;
	}

	const baseImageURL =
		process.env.NEXT_PUBLIC_SUPABASE_ARTICLE_IMAGE_BASE_URL!;

	const fixedMarkdown = markdown.replace(
		/!\[(.*?)\]\((?!https?:\/\/)(.*?)\)/g,
		`![$1](${baseImageURL}$2)`,
	);

	return {
		title: meta[0].title,
		description: meta[0].description,
		content: fixedMarkdown,
	};
}

export { getAllArticles, getArticle };
export type { Article, ArticleMeta };
