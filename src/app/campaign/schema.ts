import { z } from "zod";

export const SortBySchema = z.enum([
	"created_at",
	"amount",
	"collection",
	"backers",
	"title",
]);

export const SortOrderSchema = z.enum(["asc", "desc"]);

export const QuerySchema = z
	.object({
		page: z.coerce.number().int().min(1).default(1),
		pageSize: z.coerce.number().int().min(1).max(100).default(12),
		search: z.preprocess((value) => {
			if (typeof value === "string") {
				const trimmed = value.trim();
				return trimmed === "" ? undefined : trimmed;
			}
			return value;
		}, z.string().optional()),
		activeOnly: z
			.preprocess((value) => {
				if (value == null) return undefined;
				if (typeof value === "string") {
					const s = value.toLowerCase();
					if (["1", "true", "yes"].includes(s)) return true;
					if (["0", "false", "no"].includes(s)) return false;
				}
				return value;
			}, z.boolean())
			.default(true),
		minAmount: z.coerce.number().nonnegative().optional(),
		maxAmount: z.coerce.number().nonnegative().optional(),
		minCollection: z.coerce.number().nonnegative().optional(),
		maxCollection: z.coerce.number().nonnegative().optional(),
		minBackers: z.coerce.number().nonnegative().optional(),
		maxBackers: z.coerce.number().nonnegative().optional(),
		sortBy: SortBySchema.default("created_at"),
		sortOrder: z
			.preprocess(
				(value) =>
					typeof value === "string" ? value.toLowerCase() : value,
				SortOrderSchema,
			)
			.default("desc"),
	})
	.refine(
		(data) =>
			data.minAmount === undefined ||
			data.maxAmount === undefined ||
			data.minAmount <= data.maxAmount,
		{ path: ["maxAmount"], message: "maxAmount must be >= minAmount" },
	)
	.refine(
		(data) =>
			data.minCollection === undefined ||
			data.maxCollection === undefined ||
			data.minCollection <= data.maxCollection,
		{
			path: ["maxCollection"],
			message: "maxCollection must be >= minCollection",
		},
	)
	.refine(
		(data) =>
			data.minBackers === undefined ||
			data.maxBackers === undefined ||
			data.minBackers <= data.maxBackers,
		{ path: ["maxBackers"], message: "maxBackers must be >= minBackers" },
	);

export type QueryParams = z.infer<typeof QuerySchema>;
