"use client";

function getImageForCampaign(id: string, imageName: string): string {
	if (imageName.startsWith("http")) {
		return imageName;
	}

	const hostname = process.env.NEXT_PUBLIC_SUPABASE_HOSTNAME;

	if (!hostname) {
		console.warn("NEXT_PUBLIC_SUPABASE_HOSTNAME not set");
		return imageName;
	}

	if (imageName.startsWith("campaigns/")) {
		return `https://${hostname}/storage/v1/object/public/content/${imageName}`;
	}

	// Fallback to the old format
	return `https://${hostname}/storage/v1/object/public/content/campaigns/${id}/images/${imageName.trim()}`;
}

function formatTimeLeft(end_date?: Date | null): string | null {
	if (!end_date) return null;

	const now = new Date();
	const diffMs = end_date.getTime() - now.getTime();
	if (diffMs <= 0) return "Ended";

	const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
	const diffMonths = Math.floor(diffDays / 30);

	if (diffDays > 365) {
		return end_date.toLocaleDateString("en-GB", {
			day: "numeric",
			month: "short",
			year: "numeric",
		});
	} else if (diffMonths >= 1) {
		return `about ${diffMonths} month${diffMonths > 1 ? "s" : ""} left`;
	} else {
		return `about ${diffDays} day${diffDays > 1 ? "s" : ""} left`;
	}
}

export function getTimeAgo(dateInput: Date | string): string {
	const date = new Date(dateInput);
	const now = new Date();
	const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

	const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

	const intervals: { unit: Intl.RelativeTimeFormatUnit; seconds: number }[] =
		[
			{ unit: "year", seconds: 31536000 },
			{ unit: "month", seconds: 2592000 },
			{ unit: "day", seconds: 86400 },
			{ unit: "hour", seconds: 3600 },
			{ unit: "minute", seconds: 60 },
			{ unit: "second", seconds: 1 },
		];

	for (const interval of intervals) {
		const count = Math.floor(seconds / interval.seconds);
		if (count !== 0) {
			return rtf.format(-count, interval.unit);
		}
	}

	return "just now";
}

export function getInitials(name: string): string {
	if (!name) return "";

	const parts = name.trim().split(" ").filter(Boolean); // Remove empty strings

	if (parts.length === 0) return "";

	if (parts.length === 1) {
		return parts[0].substring(0, 2).toUpperCase(); // First two letters of single word
	}

	return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase(); // First letter of first & last words
}

export { getImageForCampaign, formatTimeLeft };
