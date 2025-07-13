import { razorpay } from "@/lib/razorpay";

describe("DB", () => {
	it("Check something", () => {
		expect(Object.keys(razorpay).length).toBe(0);
	});
});
