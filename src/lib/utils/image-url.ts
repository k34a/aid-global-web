export function getAdminImageUrl(
	imagePath: string | null | undefined,
	campaignSlug?: string,
): string {
	if (!imagePath) {
		return "";
	}

	if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
		return imagePath;
	}

	if (imagePath.startsWith("data:")) {
		return imagePath;
	}

	const hostname = process.env.NEXT_PUBLIC_SUPABASE_HOSTNAME;

	if (!hostname) {
		console.warn(
			"NEXT_PUBLIC_SUPABASE_HOSTNAME not set, using fallback image URL",
		);

		return imagePath;
	}

	if (imagePath.startsWith("campaigns/")) {
		return `https://${hostname}/storage/v1/object/public/content/${imagePath}`;
	}

	if (campaignSlug) {
		return `https://${hostname}/storage/v1/object/public/content/campaigns/${campaignSlug}/images/${imagePath}`;
	}

	return imagePath;
}
