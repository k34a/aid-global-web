import { supabaseAdmin } from "@/lib/db/supabase";
import { ArticleService } from "@k34a/blog";

export const articleService = new ArticleService(supabaseAdmin);
