import { supabaseAdmin } from "./supabase";

import { headers } from "next/headers";

export default async function submitFormDetails(
	formType: string,
	formData: Record<string, any>,
) {
	const hdrs = await headers();
	const userAgent = hdrs.get("user-agent") ?? null;
	// get IP via forwarded headers
	const xff = hdrs.get("x-forwarded-for");
	const realIp = hdrs.get("x-real-ip");
	// choose whichever is available or a fallback
	const sourceIp = xff?.split(",")[0].trim() ?? realIp ?? null;

	return await supabaseAdmin
		.from("form_submissions")
		.insert([
			{
				form_type: formType,
				form_data: formData,
				source_ip: sourceIp,
				user_agent: userAgent,
			},
		])
		.select()
		.single();
}
