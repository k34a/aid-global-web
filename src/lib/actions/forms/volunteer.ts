"use server";

import { volunteerSchema } from "@/lib/schema/volunteer-application";
import { z } from "zod";

import { escape } from "html-escaper";
import { VolunteerData } from "@/lib/schema/volunteer-application";
import { sendTelegramMessage } from "@/lib/telegram";
import submitFormDetails from "@/lib/db/form-submission";

async function notifyAdminsVolunteer(data: VolunteerData) {
	try {
		const {
			first_name,
			last_name,
			email,
			phone,
			address,
			city,
			state,
			zipcode,
			volunteer_areas,
			availability,
			skills,
			experience,
		} = data;

		const telegramText = `
<b>New Volunteer Application Received</b>
<b>Name:</b> ${escape(first_name)} ${escape(last_name)}
<b>Email:</b> ${escape(email)}
<b>Phone:</b> ${escape(phone)}
<b>Location:</b> ${escape(address)}, ${escape(city)}, ${escape(state)} - ${escape(zipcode)}
<b>Areas of Interest:</b> ${escape(volunteer_areas.join(", "))}
<b>Availability:</b> ${escape(availability.join(", "))}
<b>Skills:</b> ${escape(skills?.join(", ") || "N/A")}
<b>Experience:</b> ${escape(experience || "N/A")}
		`.trim();

		await sendTelegramMessage(telegramText);
	} catch (error) {
		console.error(
			"Failed to notify admin of volunteer application:",
			error,
		);
	}
}

export async function submitVolunteer(data: z.infer<typeof volunteerSchema>) {
	try {
		const validatedData = volunteerSchema.parse(data);
		const { error } = await submitFormDetails(
			"volunteer_application",
			validatedData,
		);

		if (error)
			throw new Error(`Failed to create volunteer: ${error.message}`);

		await notifyAdminsVolunteer(validatedData);

		return {
			success: true,
			message: "Volunteer application submitted successfully",
		};
	} catch (error) {
		if (error instanceof z.ZodError) {
			return {
				success: false,
				message: "Validation failed",
				errors: error.errors,
			};
		}

		if (error instanceof Error) {
			return {
				success: false,
				message: error.message,
			};
		}

		return {
			success: false,
			message: "Unknown error",
		};
	}
}
