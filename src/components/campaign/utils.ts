"use client";

function getImageUrl(campaign_slug: string, image: string): string {
	return `https://${process.env.NEXT_PUBLIC_SUPABASE_HOSTNAME}/storage/v1/object/public/content/campaigns/${campaign_slug}/images/${image}`;
}

export { getImageUrl };
