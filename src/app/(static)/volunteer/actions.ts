"use server";

import { volunteerSchema } from "@/lib/db/volunteers/schema";
import { createVolunteer } from "@/lib/db/volunteers/server";
import { z } from "zod";

export async function submitVolunteer(data: unknown) {
	try {
		const validatedData = volunteerSchema.parse(data);
		const volunteer = await createVolunteer(validatedData);

		return {
			success: true,
			message: "Volunteer application submitted successfully",
			data: volunteer,
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
