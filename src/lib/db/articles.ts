import {
	articleSortByVsQuery,
	articleQuerySchema,
} from "@/components/articles-listing/search-params";
import { supabaseAdmin } from "@/lib/db/supabase";
import z from "zod";

const PAGE_SIZE = 12;

export interface ArticleDetails {
	id: string;
	title: string;
	description: string;
	slug: string;
	created_at: Date;
	updated_at: Date;
	status: string;
	banner_image: string | null;
	metadata?: Record<string, any> | null;
	tags: Array<string>;
}

export interface ArticleDetailsForListing {
	id: string;
	title: string;
	description: string;
	slug: string;
	created_at: Date | string;
	banner_image: string | null;
}

export interface PaginationArticleFilters {
	limit: number;
	offset: number;
}

export class ArticleService {
	/**
	 * Fetch a single article by slug.
	 * Includes its tags.
	 */
	static async getBySlug(slug: string): Promise<ArticleDetails | null> {
		const { data, error } = await supabaseAdmin
			.from("articles")
			.select("*")
			.eq("slug", slug)
			.eq("status", "Published")
			.single();

		if (error) {
			console.error("Error fetching article details:", error.message);
			return null;
		}

		// Fetch tag IDs associated with the article
		const { data: tagLinks, error: tagLinkError } = await supabaseAdmin
			.from("tag_articles")
			.select("tag_id")
			.eq("article_id", data.id);

		if (tagLinkError) {
			console.error(
				"Error fetching article tag links:",
				tagLinkError.message,
			);
			return { ...data, tags: [] };
		}

		const tagIds = tagLinks?.map((t) => t.tag_id) || [];

		// Fetch tag names
		let tags: string[] = [];
		if (tagIds.length > 0) {
			const { data: tagNames, error: tagNameError } = await supabaseAdmin
				.from("tags")
				.select("name")
				.in("id", tagIds);

			if (tagNameError) {
				console.error(
					"Error fetching article tag names:",
					tagNameError.message,
				);
			} else {
				tags = tagNames.map((t) => t.name);
			}
		}

		return { ...data, tags };
	}

	/**
	 * Get total number of articles.
	 */
	static async getCount(): Promise<number> {
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

	/**
	 * Get all available tag names.
	 */
	static async getTagNames(): Promise<string[]> {
		const { data, error } = await supabaseAdmin.from("tags").select("name");

		if (error) {
			console.error("Error fetching tags:", error.message);
			return [];
		}

		return data?.map((tag) => tag.name) ?? [];
	}

	/**
	 * Paginated list of articles with filters and sorting.
	 */
	static async list(
		params: z.infer<typeof articleQuerySchema>,
	): Promise<{ items: ArticleDetailsForListing[]; total: number }> {
		const { page, search, sortBy, tags } = params;
		const sort =
			articleSortByVsQuery[sortBy] ?? articleSortByVsQuery["latest"];

		let query = supabaseAdmin
			.from("articles")
			.select("*", { count: "exact" })
			.eq("status", "Published");

		// Search filter
		if (search) {
			query = query.ilike("title", `%${search}%`);
		}

		// Tag filtering
		if (tags && tags.length > 0) {
			// Step 1: Get tag IDs
			const { data: tagData, error: tagError } = await supabaseAdmin
				.from("tags")
				.select("id")
				.in("name", tags);

			if (tagError || !tagData?.length) {
				console.error("Error fetching tag IDs:", tagError?.message);
				return { items: [], total: 0 };
			}

			const tagIds = tagData.map((t) => t.id);

			// Step 2: Get article IDs linked to those tags
			const { data: articleLinks, error: linkError } = await supabaseAdmin
				.from("tag_articles")
				.select("article_id")
				.in("tag_id", tagIds);

			if (linkError || !articleLinks?.length) {
				console.error(
					"Error fetching articles by tags:",
					linkError?.message,
				);
				return { items: [], total: 0 };
			}

			const articleIds = Array.from(
				new Set(articleLinks.map((link) => link.article_id)),
			);

			if (articleIds.length === 0) {
				return { items: [], total: 0 };
			}

			query = query.in("id", articleIds);
		}

		// Sorting
		query = query.order(sort.column, { ascending: sort.ascending });

		// Pagination
		const from = page * PAGE_SIZE;
		const to = from + PAGE_SIZE - 1;
		query = query.range(from, to);

		const { data, error, count } = await query;

		if (error) {
			console.error("Error fetching articles:", error);
			return { items: [], total: 0 };
		}

		return {
			items: data || [],
			total: count || 0,
		};
	}

	static async getDescription(id: string): Promise<string | null> {
		const { data, error } = await supabaseAdmin.storage
			.from("content")
			.download(`articles/${id}/description.html`);

		if (error) {
			console.error(
				`Error fetching article description for article ID "${id}":`,
				error.message,
			);
			return null;
		}

		if (!data) {
			console.warn(
				`No article description file found for article ID: ${id}`,
			);
			return null;
		}

		return await data.text();
	}
}
