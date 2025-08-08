import { z } from "zod/v4";

export const contactFormSchema = z.object({
	name: z.string().trim().min(2, "Name must be at least 2 characters"),

	email: z
		.string()
		.trim()
		.regex(
			/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
			"Invalid email",
		),

	subject: z
		.string()
		.trim()
		.min(1, "Subject is required")
		.refine((val) => val.length >= 3, {
			message: "Your subject should be descriptive.",
		}),

	message: z
		.string()
		.trim()
		.min(1, "Message is required")
		.refine((val) => val.length >= 10, {
			message:
				"Your message should be descriptive with relevant details.",
		})
		.max(1000, "Message is toooooo long"),
});
