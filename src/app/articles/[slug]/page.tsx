import { articleService } from "@/lib/db/articles";
import { Article } from "@k34a/blog";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type PageProps = {
	params: Promise<{ slug: string }>;
};

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const campaign = await articleService.getBySlug((await params).slug);

	if (!campaign) {
		return {
			title: "Not Found",
			description: "The article you're looking for does not exist.",
		};
	}

	return {
		title: campaign.title,
		description: campaign.description,
	};
}

export default async function ArticlePage({ params }: PageProps) {
	const { slug } = await params;

	const article = await articleService.getBySlug(slug);
	if (!article) {
		return notFound();
	}

	const description = (await articleService.getDescription(article.id)) ?? "";

	return (
		<Article
			config={{
				supabaseHost: process.env.NEXT_PUBLIC_SUPABASE_HOSTNAME!,
				listingPage: "/articles",
			}}
			description={description}
			tags={article.tags}
			title={article.title}
			banner_image={article.banner_image ?? undefined}
			id={article.id}
		/>
	);
}
