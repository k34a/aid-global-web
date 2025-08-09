"use server";

import { CorporateFormData, corporateFormSchema } from "./schema";
import { supabaseAdmin } from "@/lib/db/supabase";
import { sendTelegramMessage } from "@/lib/telegram";
import { escape } from "html-escaper";

async function notifyAdminsOfCorporatePartnership(data: CorporateFormData) {
	try {
		const { name, email, organization, website, subject, message } = data;

		const truncatedMessage =
			message.length > 100 ? message.slice(0, 100) + "..." : message;

		const telegramText = `
<b>New Corporate Partnership Inquiry</b>

<b>Name:</b> ${escape(name)}
<b>Email:</b> ${escape(email)}
<b>Organization:</b> ${escape(organization)}
${website ? `<b>Website:</b> ${escape(website)}\n` : ""}
<b>Subject:</b> ${escape(subject)}
<b>Message:</b> ${escape(truncatedMessage)}
		`.trim();

		await sendTelegramMessage(telegramText);
	} catch (error) {
		console.error("Failed to notify admins:", error);
	}
}

export async function submitCorporatePartnership(
	data: CorporateFormData,
): Promise<string | undefined> {
	const parsed = corporateFormSchema.safeParse(data);

	if (!parsed.success) {
		const firstError = Object.values(
			parsed.error.flatten().fieldErrors,
		)[0]?.[0];
		return firstError || "Invalid input";
	}

	const formData: CorporateFormData = parsed.data;

	const { error } = await supabaseAdmin
		.from("corporate_partnerships")
		.insert([formData]);

	if (error) {
		console.error("Supabase error:", error);
		return "Failed to save your submission. Please try again.";
	}

	await notifyAdminsOfCorporatePartnership(parsed.data);
}
