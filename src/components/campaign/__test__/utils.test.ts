import { formatTimeLeft } from "@/components/campaign/utils";

describe("test formatTimeLeft", () => {
	test("returns null if no date provided", () => {
		expect(formatTimeLeft(undefined)).toBeNull();
		expect(formatTimeLeft(null)).toBeNull();
	});

	test("returns Ended if date is in the past", () => {
		const past = new Date(Date.now() - 1000 * 60 * 60 * 24);
		expect(formatTimeLeft(past)).toBe("Ended");
	});

	test("returns exact date if more than a year away", () => {
		const future = new Date();
		future.setFullYear(future.getFullYear() + 2);
		const formatted = formatTimeLeft(future);
		expect(formatted).toMatch(/\d{1,2} \w{3,4} \d{4}/); // e.g. "5 Sep 2027"
	});

	test("returns months if more than 1 month left", () => {
		const future = new Date();
		future.setMonth(future.getMonth() + 3);
		expect(formatTimeLeft(future)).toMatch(/about \d+ months left/);
	});

	test("returns days if less than a month left", () => {
		const future = new Date();
		future.setDate(future.getDate() + 10);
		expect(formatTimeLeft(future)).toBe("about 10 days left");
	});

	test("handles singular day/month correctly", () => {
		const oneDay = new Date();
		oneDay.setDate(oneDay.getDate() + 1);
		expect(formatTimeLeft(oneDay)).toBe("about 1 day left");

		const oneMonth = new Date();
		oneMonth.setMonth(oneMonth.getMonth() + 1);
		expect(formatTimeLeft(oneMonth)).toBe("about 1 month left");
	});
});
