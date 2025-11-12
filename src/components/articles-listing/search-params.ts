import z from "zod";

export const articleQuerySchema = z.object({
	search: z.string().default(""),
	page: z.coerce.number().int().nonnegative().default(0),
	sortBy: z.enum(["latest", "oldest", "A-Z", "Z-A"]).default("latest"),
	tags: z
		.preprocess((val) => {
			// Convert query param (e.g., ?tags=tech,ai) to array
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

export const articleSortByVsQuery: Record<
	z.infer<typeof articleQuerySchema>["sortBy"],
	{ column: string; ascending: boolean }
> = {
	latest: { column: "created_at", ascending: false },
	oldest: { column: "created_at", ascending: true },
	"A-Z": { column: "title", ascending: true },
	"Z-A": { column: "title", ascending: false },
};
