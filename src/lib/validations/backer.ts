import { z } from "zod";

export const baseBackerSchema = z.object({
	id: z.string(),
	amount: z.number(),
	name: z.string(),
	is_anon: z.boolean(),
	created_at: z.coerce.date(),
});

export const adminBackerSchema = baseBackerSchema.extend({
	email: z.string().nullable().optional(),
	contact_number: z.string().nullable().optional(),
});
