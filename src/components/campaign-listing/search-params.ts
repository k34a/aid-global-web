import z, { ZodObject } from "zod";

export const querySchema = z.object({
	search: z.string().default(""),
	page: z.coerce.number().int().nonnegative().default(0),
	minBackers: z.coerce.number().int().nonnegative().default(0),
	maxBackers: z
		.union([
			z.coerce.number().nonnegative().transform(Math.floor),
			z.literal("Infinity"), // allow explicit "Infinity"
		])
		.transform((val) => (val === "Infinity" ? Infinity : val))
		.default(Infinity),
	sortBy: z
		.enum(["latest", "oldest", "popular", "most-donated", "A-Z", "Z-A"])
		.default("latest"),
	tags: z
		.preprocess((val) => {
			// Convert query param (e.g., ?tags=health,education) to array
			if (typeof val === "string") {
				return val
					.split(",")
					.map((tag) => tag.trim())
					.filter(Boolean);
			}
			return Array.isArray(val) ? val : [];
		}, z.array(z.string()))
		.default([]),
});

export const campaignSortByVsQuery: Record<
	z.infer<typeof querySchema>["sortBy"],
	{ column: string; ascending: boolean }
> = {
	latest: { column: "created_at", ascending: false },
	oldest: { column: "created_at", ascending: true },
	popular: { column: "backers", ascending: false },
	"most-donated": { column: "collection", ascending: false },
	"A-Z": { column: "title", ascending: true },
	"Z-A": { column: "title", ascending: false },
};

export function parseQueryWithPerFieldDefaults<T extends ZodObject<any>>(
	schema: T,
	rawParams: Record<string, any>,
): z.infer<T> {
	const result = schema.safeParse(rawParams);

	if (result.success) return result.data;

	const cleanedParams = { ...rawParams };

	for (const issue of result.error.issues) {
		const field = issue.path[0];
		// Make sure field is a key of schema.shape
		if (field in schema.shape) {
			delete cleanedParams[field];
		}
	}

	return schema.parse(cleanedParams);
}
