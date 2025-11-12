"use client";
import { applyImageFullPaths } from "@/lib/client-utils/fix-image-paths";
import { Typography } from "@mantine/core";

interface Props {
	articleId: string;
	html: string;
}

export function getImageForArticle(id: string, imageName: string): string {
	if (imageName.startsWith("http")) {
		return imageName;
	}

	const hostname = process.env.NEXT_PUBLIC_SUPABASE_HOSTNAME;

	if (!hostname) {
		console.warn("NEXT_PUBLIC_SUPABASE_HOSTNAME not set");
		return imageName;
	}

	if (imageName.startsWith("articles/")) {
		return `https://${hostname}/storage/v1/object/public/content/${imageName}`;
	}

	// Fallback to the old format
	return `https://${hostname}/storage/v1/object/public/content/articles/${id}/${imageName.trim()}`;
}

export default function ArticleDescription(props: Props) {
	const formattedHtml = applyImageFullPaths(props.html, (src) =>
		getImageForArticle(props.articleId, `content/${src}`),
	);
	return (
		<Typography>
			<div dangerouslySetInnerHTML={{ __html: formattedHtml }} />
		</Typography>
	);
}
