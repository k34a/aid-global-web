"use server";

import { supabaseAdmin } from "@/lib/db/supabase";
import {
	careerApplicationSchema,
	CareerApplicationData,
} from "@/lib/schema/forms/career";
import { escape } from "html-escaper";
import { sendTelegramMessage } from "@/lib/telegram";
import submitFormDetails from "@/lib/db/form-submission";

async function notifyAdminsCareer(data: CareerApplicationData) {
	try {
		const {
			userInfo: { firstName, lastName, email, contact, applyingFor },
			resume: { fileName },
		} = data;

		const telegramText = `
<b>New Career Application Received</b>
<b>Name:</b> ${escape(firstName)} ${escape(lastName)}
<b>Email:</b> ${escape(email)}
<b>Contact:</b> ${escape(contact)}
<b>Position:</b> ${escape(applyingFor)}
<b>Resume:</b> ${escape(fileName)}
		`.trim();

		await sendTelegramMessage(telegramText);
	} catch (error) {
		console.error("Failed to notify admin:", error);
	}
}

interface SuccessResponse {
	success: true;
	presignedUrl: string;
}

interface ErrorResponse {
	success: false;
	message: string;
}

export async function submitCareerApplication(
	data: CareerApplicationData,
): Promise<SuccessResponse | ErrorResponse> {
	try {
		const validatedData: CareerApplicationData =
			careerApplicationSchema.parse(data);

		const formData = {
			...validatedData.userInfo,
			resume: validatedData.resume.fileName,
		};
		const { data: application, error: insertError } =
			await submitFormDetails("career_application", formData);

		if (insertError) {
			throw new Error(
				`Failed to insert application: ${insertError.message}`,
			);
		}

		const { data: presignedUrl, error: urlError } =
			await supabaseAdmin.storage
				.from("user-uploads")
				.createSignedUploadUrl(
					`resumes/${application.id}/${validatedData.resume.fileName}`,
				);

		if (urlError) {
			throw new Error(
				`Failed to generate upload URL: ${urlError.message}`,
			);
		}

		await notifyAdminsCareer(validatedData);

		return {
			success: true,
			presignedUrl: presignedUrl.signedUrl,
		};
	} catch (error) {
		let errorMessage = "Unknown error occurred";
		if (error instanceof Error) {
			errorMessage = error.message;
		}

		return {
			success: false,
			message: errorMessage,
		};
	}
}
