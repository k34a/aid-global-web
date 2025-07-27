import { NextRequest, NextResponse } from "next/server";
import { createVolunteer } from "@/lib/db/volunteers/server";
import { volunteerSchema } from "@/lib/db/volunteers/schema";
import { z } from "zod";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		const validatedData = volunteerSchema.parse(body);

		const volunteer = await createVolunteer(validatedData);

		return NextResponse.json(
			{
				message: "Volunteer application submitted successfully",
				data: volunteer,
			},
			{ status: 201 },
		);
	} catch (error) {
		console.error("API error:", error);

		if (error instanceof z.ZodError) {
			return NextResponse.json(
				{
					message: "Validation failed",
					errors: error.errors,
				},
				{ status: 400 },
			);
		}

		if (error instanceof Error) {
			return NextResponse.json(
				{ message: error.message },
				{ status: 500 },
			);
		}

		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 },
		);
	}
}
