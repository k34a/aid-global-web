import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = `https://${process.env.NEXT_PUBLIC_SUPABASE_HOSTNAME}`;
export const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);
