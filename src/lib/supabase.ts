import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export type ArticleMeta = {
  id: number;
  title: string;
  slug: string;
  description: string;
};

export type Article = {
  title: string;
  description: string;
  content: string;
};

export async function getAllArticles(limit = 10): Promise<ArticleMeta[]> {
  const { data, error } = await supabase
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

export async function getArticle(slug: string): Promise<Article | null> {
  const { data: meta, error: metaError } = await supabase
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

  const { data: file, error: fileError } = await supabase.storage
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
