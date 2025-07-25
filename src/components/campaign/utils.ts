"use client";

function getImageUrl(campaign_slug: string, image: string): string {
	if (image.startsWith("http")) {
		return image;
	}

	const hostname = process.env.NEXT_PUBLIC_SUPABASE_HOSTNAME;

	if (!hostname) {
		console.warn("NEXT_PUBLIC_SUPABASE_HOSTNAME not set");
		return image;
	}

	if (image.startsWith("campaigns/")) {
		return `https://${hostname}/storage/v1/object/public/content/${image}`;
	}

	// Fallback to the old format
	return `https://${hostname}/storage/v1/object/public/content/campaigns/${campaign_slug}/images/${image.trim()}`;
}

export { getImageUrl };
