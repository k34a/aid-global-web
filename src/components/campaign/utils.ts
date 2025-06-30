"use client";

// For client-side components, we need to use a public approach
// The hostname is safe to expose since it's just the Supabase project URL
function getImageUrl(campaign_slug: string, image: string): string {
	// If the image is already a full URL, return it as is
	if (image.startsWith("http")) {
		return image;
	}

	// Use a public environment variable for the hostname
	// This is safe because it's just the Supabase project URL, not sensitive keys
	const hostname = process.env.NEXT_PUBLIC_SUPABASE_HOSTNAME;

	if (!hostname) {
		console.warn("NEXT_PUBLIC_SUPABASE_HOSTNAME not set");
		return image;
	}

	// If the image is a relative path, construct the full URL
	if (image.startsWith("campaigns/")) {
		return `https://${hostname}/storage/v1/object/public/content/${image}`;
	}

	// Fallback to the old format
	return `https://${hostname}/storage/v1/object/public/content/campaigns/${campaign_slug}/images/${image}`;
}

export { getImageUrl };
