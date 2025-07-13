import { APP_ENV } from "@/config/config";

describe("Constants", () => {
	it("should have vald APP_ENV", () => {
		expect(APP_ENV).toBe("test");
	});
});
