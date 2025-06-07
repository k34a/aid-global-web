import type { $ZodIssue } from "zod/v4/core";

interface CustomRequestError {
	message: string;
	error: string | $ZodIssue[];
	status: number;
}

export type { CustomRequestError };
