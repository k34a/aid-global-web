import { z } from "zod";

export const CampaignProductSchema = z.object({
	id: z.string().optional(),
	title: z.string().min(1),
	description: z.string().min(1),
	price_per_unit: z.number().positive(),
	units_required: z.number().int().positive(),
	image: z.string().optional(),
});

export const CampaignCreateSchema = z.object({
	title: z.string().min(1),
	description: z.string().min(1),
	slug: z.string().min(1),
	amount: z.number().positive(),
	ended_at: z
		.union([z.string().datetime(), z.literal(""), z.null()])
		.optional(),

	banner_image: z.string().optional(),
	products: z.array(CampaignProductSchema).optional(),
});

export const CampaignUpdateSchema = z.object({
	title: z.string().min(1),
	description: z.string().min(1),
	amount: z.number().positive(),
	ended_at: z.string().datetime().optional(),
	banner_image: z.string().optional(),
	products: z
		.array(
			CampaignProductSchema.extend({
				id: z.string().min(1), // Required for update
			}),
		)
		.optional(),
});
