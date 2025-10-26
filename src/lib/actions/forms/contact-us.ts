"use server";

import { z } from "zod/v4";
import { contactFormSchema } from "@/components/contact-us/schema";
import { sendTelegramMessage } from "@/lib/telegram";
import { escape } from "html-escaper";
import submitFormDetails from "@/lib/db/form-submission";

async function notifyAdmins(data: z.infer<typeof contactFormSchema>) {
	try {
		const { name, email, subject, message } = data;
		const truncatedMessage =
			message.length > 100 ? message.slice(0, 100) + "..." : message;

		const telegramText = `
			<b>New Contact Message Received</b>
			<b>Name:</b> ${escape(name)}
			<b>Email:</b> ${escape(email)}
			<b>Subject:</b> ${escape(subject)}
			<b>Message:</b> ${escape(truncatedMessage)}
			`.trim();
		await sendTelegramMessage(telegramText);
	} catch (error) {
		console.error(error);
	}
}

export async function submitContactMessage(
	data: z.infer<typeof contactFormSchema>,
) {
	const parsed = contactFormSchema.safeParse(data);

	if (!parsed.success) {
		return "Invalid details provided";
	}

	const { error } = await submitFormDetails("contact_us", parsed.data);

	if (error) {
		console.error(error);
		return "Unable to submit your message";
	}

	await notifyAdmins(parsed.data);
}
