import { supabaseAdmin } from "./db/supabase";

export const fetchCampaignMarkdown = async (slug: string): Promise<string | null> => {
  const { data, error } = await supabaseAdmin
    .storage
    .from("content")
    .download(`campaigns/${slug}.md`);

  if (error || !data) {
    console.error("Error fetching markdown:", error?.message || error || "Unknown error");
    return null;
  }

  const text = await data.text();
  return text;
};
