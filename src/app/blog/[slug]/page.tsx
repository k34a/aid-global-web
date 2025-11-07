import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, Divider } from "@mantine/core";
import { BlogService } from "@/lib/db/blogs";
import { fetchArticleDescription } from "@/lib/db/blogs/description";
import { ngoDetails } from "@/config/config";
import PostHeader from "@/components/blog/post-header";
import PostContent from "@/components/blog/post-content";
import ShareButtons from "@/components/blog/share-buttons";
import RelatedPosts from "@/components/blog/related-posts";

type PageProps = {
	params: Promise<{ slug: string }>;
};

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const article = await BlogService.getBySlug(slug);

	if (!article) {
		return {
			title: "Not Found",
			description: `The article you{"'"}re looking for does not exist.`,
		};
	}

	return {
		title: article.title,
		description:
			article.description ||
			`Read this article by ${ngoDetails.name} about ${article.title}`,
		openGraph: {
			title: article.title,
			description: article.description,
			images: [article.banner_image],
		},
	};
}

export default async function ArticlePage({ params }: PageProps) {
	const { slug } = await params;

	const [article, relatedArticles] = await Promise.all([
		BlogService.getBySlug(slug),
		BlogService.getRelatedArticles(slug, 3),
	]);

	if (!article) {
		return notFound();
	}

	// Fetch the HTML content from Supabase Storage
	const htmlContent = await fetchArticleDescription(article.id);

	return (
		<Container size="md" className="py-10 mt-20">
			<PostHeader
				title={article.title}
				description={article.description}
				created_at={article.created_at}
				banner_image={article.banner_image}
				tags={article.tags}
			/>

			<PostContent content={htmlContent || "No content available."} />

			<ShareButtons />

			<Divider my="sm" />

			<RelatedPosts articles={relatedArticles} />
		</Container>
	);
}
