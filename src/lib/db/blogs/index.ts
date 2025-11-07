import { supabaseAdmin } from "@/lib/db/supabase";
import z from "zod";

const PAGE_SIZE = 9;

export interface Article {
	id: string;
	title: string;
	description: string; // SEO description
	created_at: string;
	updated_at: string;
	banner_image: string;
}

export interface ArticleWithTags extends Article {
	tags: string[];
}

export interface ArticleForListing extends Article {
	tags: string[];
}

export const articleQuerySchema = z.object({
	page: z.number().int().min(0).default(0),
	tags: z.array(z.string()).default([]),
	search: z.string().optional(),
});

export class BlogService {
	static async getBySlug(slug: string): Promise<ArticleWithTags | null> {
		// Assuming slug is the article ID or you have a slug column
		const { data, error } = await supabaseAdmin
			.from("articles")
			.select("*")
			.eq("id", slug)
			.single();

		if (error) {
			console.error("Error fetching article:", error.message);
			return null;
		}

		// Fetch tags for this article
		const { data: tagData, error: tagError } = await supabaseAdmin
			.from("tag_articles")
			.select("tag_id")
			.eq("article_id", data.id);

		if (tagError || !tagData?.length) {
			console.error("Error fetching article tags:", tagError?.message);
			return { ...data, tags: [] };
		}

		// Fetch tag names
		const tagIds = tagData.map((t) => t.tag_id);
		const { data: tags, error: tagsError } = await supabaseAdmin
			.from("tags")
			.select("name")
			.in("id", tagIds);

		if (tagsError || !tags?.length) {
			console.error("Error fetching tag names:", tagsError?.message);
			return { ...data, tags: [] };
		}

		return {
			...data,
			tags: tags.map((tag) => tag.name),
		};
	}

	static async getTagNames(): Promise<string[]> {
		const { data, error } = await supabaseAdmin.from("tags").select("name");

		if (error) {
			console.error("Error fetching tags:", error.message);
			return [];
		}

		return data?.map((tag) => tag.name) ?? [];
	}

	static async list(
		params: z.infer<typeof articleQuerySchema>,
	): Promise<{ items: ArticleForListing[]; total: number }> {
		const { page, tags, search } = params;

		let query = supabaseAdmin
			.from("articles")
			.select("*", { count: "exact" });

		// Search by title if provided
		if (search) {
			query = query.ilike("title", `%${search}%`);
		}

		// Filter by tags if provided
		if (tags && tags.length > 0) {
			// Get tag IDs for given tag names
			const { data: tagData, error: tagError } = await supabaseAdmin
				.from("tags")
				.select("id")
				.in("name", tags);

			if (tagError || !tagData?.length) {
				console.error("Error fetching tag IDs:", tagError?.message);
				return { items: [], total: 0 };
			}

			const tagIds = tagData.map((t) => t.id);

			// Get article IDs that match any of the tags
			const { data: matchingArticles, error: matchingError } =
				await supabaseAdmin
					.from("tag_articles")
					.select("article_id")
					.in("tag_id", tagIds);

			if (matchingError || !matchingArticles?.length) {
				console.error(
					"Error fetching articles by tags:",
					matchingError?.message,
				);
				return { items: [], total: 0 };
			}

			// Get distinct article IDs
			const articleIds = Array.from(
				new Set(matchingArticles.map((row) => row.article_id)),
			);

			if (articleIds.length === 0) {
				return { items: [], total: 0 };
			}

			query = query.in("id", articleIds);
		}

		// Order by created_at descending (latest first)
		query = query.order("created_at", { ascending: false });

		// Apply pagination
		const from = page * PAGE_SIZE;
		const to = from + PAGE_SIZE - 1;
		query = query.range(from, to);

		const { data, error, count } = await query;

		if (error) {
			console.error("Error fetching articles:", error);
			return { items: [], total: 0 };
		}

		// Fetch tags for each article
		const articlesWithTags = await Promise.all(
			(data || []).map(async (article) => {
				const { data: tagData } = await supabaseAdmin
					.from("tag_articles")
					.select("tag_id")
					.eq("article_id", article.id);

				if (!tagData?.length) {
					return { ...article, tags: [] };
				}

				const tagIds = tagData.map((t) => t.tag_id);
				const { data: tags } = await supabaseAdmin
					.from("tags")
					.select("name")
					.in("id", tagIds);

				return {
					...article,
					tags: tags?.map((tag) => tag.name) ?? [],
				};
			}),
		);

		return {
			items: articlesWithTags,
			total: count || 0,
		};
	}

	static async getRelatedArticles(
		currentId: string,
		limit: number = 3,
	): Promise<ArticleForListing[]> {
		const { data, error } = await supabaseAdmin
			.from("articles")
			.select("*")
			.neq("id", currentId)
			.order("created_at", { ascending: false })
			.limit(limit);

		if (error) {
			console.error("Error fetching related articles:", error);
			return [];
		}

		// Fetch tags for each article
		const articlesWithTags = await Promise.all(
			(data || []).map(async (article) => {
				const { data: tagData } = await supabaseAdmin
					.from("tag_articles")
					.select("tag_id")
					.eq("article_id", article.id);

				if (!tagData?.length) {
					return { ...article, tags: [] };
				}

				const tagIds = tagData.map((t) => t.tag_id);
				const { data: tags } = await supabaseAdmin
					.from("tags")
					.select("name")
					.in("id", tagIds);

				return {
					...article,
					tags: tags?.map((tag) => tag.name) ?? [],
				};
			}),
		);

		return articlesWithTags;
	}
}
