import Link from "next/link";
import { Title, SimpleGrid, Card, Image, Text } from "@mantine/core";
import type { ArticleForListing } from "@/lib/db/blogs";

interface RelatedPostsProps {
	articles: ArticleForListing[];
}

export default function RelatedPosts({ articles }: RelatedPostsProps) {
	if (articles.length === 0) return null;

	return (
		<div>
			<Title order={4} className="mb-4">
				More Articles
			</Title>

			<SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
				{articles.map((article) => (
					<Link
						key={article.id}
						href={`/blog/${article.id}`}
						className="no-underline"
					>
						<Card
							withBorder
							padding="xs"
							className="text-center hover:shadow-md transition-shadow"
						>
							<Image
								src={article.banner_image}
								alt={article.title}
								height={60}
								fit="cover"
							/>
							<Text size="xs" mt={6} lineClamp={2}>
								{article.title}
							</Text>
						</Card>
					</Link>
				))}
			</SimpleGrid>
		</div>
	);
}
