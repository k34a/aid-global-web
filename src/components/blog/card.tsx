import Link from "next/link";
import { Card, Image, Text, Group, Button, Badge } from "@mantine/core";
import type { ArticleForListing } from "@/lib/db/blogs";

interface BlogCardProps {
	article: ArticleForListing;
}

export default function BlogCard({ article }: BlogCardProps) {
	// Format date
	const formattedDate = new Date(article.created_at).toLocaleDateString(
		"en-US",
		{
			year: "numeric",
			month: "short",
			day: "numeric",
		},
	);

	return (
		<Card shadow="sm" radius="md" withBorder className="overflow-hidden">
			<Link href={`/blog/${article.id}`} className="block">
				<Image
					src={article.banner_image}
					alt={article.title}
					height={170}
					fit="cover"
				/>
			</Link>

			<div className="p-4">
				<Link href={`/blog/${article.id}`} className="no-underline">
					<Text fw={700} lineClamp={2}>
						{article.title}
					</Text>
				</Link>

				<Group justify="space-between" className="mt-2 mb-2">
					<Text size="sm" c="dimmed">
						{formattedDate}
					</Text>
				</Group>

				<Text size="sm" lineClamp={2} className="text-gray-600">
					{article.description}
				</Text>

				{/* Display tags */}
				{article.tags.length > 0 && (
					<Group gap="xs" mt="sm">
						{article.tags.slice(0, 3).map((tag) => (
							<Badge key={tag} size="sm" variant="light">
								{tag}
							</Badge>
						))}
					</Group>
				)}

				<div className="mt-4">
					<Link href={`/blog/${article.id}`}>
						<Button variant="subtle">Read More &rarr;</Button>
					</Link>
				</div>
			</div>
		</Card>
	);
}
