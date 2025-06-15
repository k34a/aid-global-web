import { supabaseAdmin } from "./supabase";

export const fetchCampaignMarkdown = async (slug: string): Promise<string | null> => {
  const { data, error } = await supabaseAdmin
    .storage
    .from("content")
    .download(`campaigns/${slug}/description.md`);

  if (error) {
    console.error("Supabase error:", error.message);
    return null;
  }

  if (!data) {
    console.warn(`No markdown file found for slug: ${slug}`);
    return null;
  }

  const text = await data.text();
  return text;
}
