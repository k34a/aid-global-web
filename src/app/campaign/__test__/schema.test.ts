import { QuerySchema } from "../schema";

describe("QuerySchema", () => {
	test("applies defaults", () => {
		const parsed = QuerySchema.parse({});
		expect(parsed.page).toBe(1);
		expect(parsed.pageSize).toBe(12);
		expect(parsed.activeOnly).toBe(true);
		expect(parsed.sortBy).toBe("created_at");
		expect(parsed.sortOrder).toBe("desc");
	});

	test("coerces numeric and boolean-like inputs", () => {
		const parsed = QuerySchema.parse({
			page: "2",
			pageSize: "5",
			sortBy: "amount",
			sortOrder: "ASC",
			activeOnly: "no",
			minAmount: "10",
			maxAmount: "20",
		});
		expect(parsed.page).toBe(2);
		expect(parsed.pageSize).toBe(5);
		expect(parsed.sortBy).toBe("amount");
		expect(parsed.sortOrder).toBe("asc");
		expect(parsed.activeOnly).toBe(false);
		expect(parsed.minAmount).toBe(10);
		expect(parsed.maxAmount).toBe(20);
	});

	test("rejects invalid ranges", () => {
		const r = QuerySchema.safeParse({ minBackers: "10", maxBackers: "5" });
		expect(r.success).toBe(false);
	});
});
