import { NextResponse } from "next/server";
import {
	createAccountRequestSchema,
	registerAdmin,
	UnableToRegisterError,
} from "@/lib/db/auth";
import { CustomRequestError } from "@/lib/types";
import { ZodError } from "zod/v4";

export async function POST(req: Request) {
	try {
		const body = await req.json();

		const details = createAccountRequestSchema.parse(body);

		await registerAdmin(details.email, details.name, details.password);

		return NextResponse.json({ message: "Account created successfully." });
	} catch (error) {
		console.error(error);
		const errorDetails: CustomRequestError = {
			message: "Error creating account",
			error: "Unknown error",
			status: 500,
		};

		if (error instanceof ZodError) {
			errorDetails.message = "Invalid request data";
			errorDetails.error = error.issues;
			errorDetails.status = 400;
		}

		if (error instanceof UnableToRegisterError) {
			errorDetails.message = error.message;
			errorDetails.error = error.message;
			errorDetails.status = 409;
		}
		return NextResponse.json(
			{
				success: false,
				message: errorDetails.message,
				error: errorDetails.error,
			},
			{ status: errorDetails.status },
		);
	}
}
