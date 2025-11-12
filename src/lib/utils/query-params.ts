import z, { ZodObject } from "zod";

export function parseQueryWithPerFieldDefaults<T extends ZodObject<any>>(
	schema: T,
	rawParams: Record<string, any>,
): z.infer<T> {
	const result = schema.safeParse(rawParams);

	if (result.success) {
		return result.data;
	}

	const cleanedParams = { ...rawParams };

	for (const issue of result.error.issues) {
		const field = issue.path[0] as string;
		// Make sure field is a key of schema.shape
		if (field in schema.shape) {
			delete cleanedParams[field];
		}
	}

	return schema.parse(cleanedParams);
}
