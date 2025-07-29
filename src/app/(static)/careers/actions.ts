"use server";

import { supabaseAdmin } from "@/lib/db/supabase";
import {
	careerApplicationSchema,
	CareerApplicationData,
} from "@/lib/db/careers/schema";

export async function submitCareerApplication(data: CareerApplicationData) {
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
					resume_file_size: validatedData.resume.fileSize,
					resume_file_type: validatedData.resume.fileType,
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
				.from("content")
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
			message: "Application submitted successfully",
			data: {
				applicationId: application.id,
				presignedUrl: presignedUrl.signedUrl,
				path: presignedUrl.path,
			},
		};
	} catch (error) {
		if (error instanceof Error) {
			return {
				success: false,
				message: error.message,
			};
		}

		return {
			success: false,
			message: "Unknown error occurred",
		};
	}
}
