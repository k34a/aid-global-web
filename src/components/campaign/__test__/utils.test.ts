import {
	formatTimeLeft,
	getTimeAgo,
	getInitials,
	getImageForCampaign,
} from "@/components/campaign/utils";

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

describe("getTimeAgo", () => {
	test("returns 'just now' for current date", () => {
		expect(getTimeAgo(new Date())).toBe("just now");
	});

	test("returns '1 second ago' for 1 second ago", () => {
		const now = new Date();
		const past = new Date(now.getTime() - 1000);
		expect(getTimeAgo(past)).toBe("1 second ago");
	});

	test("returns '5 minutes ago' correctly", () => {
		const past = new Date(Date.now() - 5 * 60 * 1000);
		expect(getTimeAgo(past)).toBe("5 minutes ago");
	});

	test("handles string input", () => {
		const now = new Date();
		const iso = new Date(now.getTime() - 2000).toISOString();
		expect(getTimeAgo(iso)).toBe("2 seconds ago");
	});
});

describe("getInitials", () => {
	test("returns empty string for empty input", () => {
		expect(getInitials("")).toBe("");
		expect(getInitials("   ")).toBe("");
	});

	test("returns first two letters for single name", () => {
		expect(getInitials("Alice")).toBe("AL");
		expect(getInitials("a")).toBe("A");
	});

	test("returns initials for two names", () => {
		expect(getInitials("John Doe")).toBe("JD");
		expect(getInitials("Elon Musk")).toBe("EM");
	});

	test("returns initials for multi-word names", () => {
		expect(getInitials("Martin Luther King Jr")).toBe("MJ");
	});

	test("trims whitespace properly", () => {
		expect(getInitials("  Jane   Smith ")).toBe("JS");
	});
});

describe("getImageForCampaign", () => {
	const HOSTNAME = "xyz.supabase.co";

	beforeAll(() => {
		process.env.NEXT_PUBLIC_SUPABASE_HOSTNAME = HOSTNAME;
	});

	test("returns full URL if imageName is a full URL", () => {
		const url = "https://example.com/image.jpg";
		expect(getImageForCampaign("123", url)).toBe(url);
	});

	test("returns image path with campaigns/ prefix", () => {
		const imageName = "campaigns/abc.jpg";
		expect(getImageForCampaign("123", imageName)).toBe(
			`https://${HOSTNAME}/storage/v1/object/public/content/${imageName}`,
		);
	});

	test("returns fallback format if not prefixed with 'campaigns/'", () => {
		const imageName = "banner.png";
		expect(getImageForCampaign("123", imageName)).toBe(
			`https://${HOSTNAME}/storage/v1/object/public/content/campaigns/123/banner.png`,
		);
	});

	test("returns imageName if hostname is missing", () => {
		delete process.env.NEXT_PUBLIC_SUPABASE_HOSTNAME;
		expect(getImageForCampaign("123", "test.png")).toBe("test.png");
	});
});
