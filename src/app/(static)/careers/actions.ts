"use server";

import { supabaseAdmin } from "@/lib/db/supabase";
import {
	careerApplicationSchema,
	CareerApplicationData,
} from "@/lib/db/careers/schema";

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

		const { data: application, error: insertError } = await supabaseAdmin
			.from("careers")
			.insert([
				{
					first_name: validatedData.userInfo.firstName,
					last_name: validatedData.userInfo.lastName,
					email: validatedData.userInfo.email,
					contact: validatedData.userInfo.contact,
					applying_for: validatedData.userInfo.applyingFor,
					resume_file_name: validatedData.resume.fileName,
				},
			])
			.select()
			.single();

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
