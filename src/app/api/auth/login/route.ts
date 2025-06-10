import { NextResponse } from "next/server";
import {
	loginAdmin,
	loginRequestSchema,
	UnableToLoginError,
} from "@/lib/db/auth";
import { CustomRequestError } from "@/lib/types";
import { ZodError } from "zod/v4";
import { JWT_TOKEN_AGE_IN_DAYS } from "@/config/data";

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const details = loginRequestSchema.parse(body);

		const token = await loginAdmin(details.email, details.password);
		const response = NextResponse.json({ message: "Login successful" });
		response.cookies.set("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			path: "/",
			maxAge: 60 * 60 * 24 * JWT_TOKEN_AGE_IN_DAYS,
		});

		return response;
	} catch (error) {
		console.error(error);
		const errorDetails: CustomRequestError = {
			message: "Unable to log in to your account",
			error: "Unknown error",
			status: 500,
		};

		if (error instanceof ZodError) {
			errorDetails.message = "Invalid request data";
			errorDetails.error = error.issues;
			errorDetails.status = 400;
		}

		if (error instanceof UnableToLoginError) {
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
