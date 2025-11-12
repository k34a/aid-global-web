import { BannerImage } from "@/components/articles/banner-image";
import ArticleDescription from "@/components/articles/description";
import Image from "@/components/image";
import { ArticleService } from "@/lib/db/articles";
import { Badge, Box, Flex, Pill, Stack, Title } from "@mantine/core";
import { IconHash } from "@tabler/icons-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
	params: Promise<{ slug: string }>;
};

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const campaign = await ArticleService.getBySlug((await params).slug);

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

	const article = await ArticleService.getBySlug(slug);
	if (!article) {
		return notFound();
	}

	const description = (await ArticleService.getDescription(article.id)) ?? "";

	return (
		<Box maw={800} mx="auto" px="sm" py="lg">
			<Stack gap="md">
				<Title order={1}>{article.title}</Title>
				{article.banner_image && (
					<BannerImage
						id={article.id}
						src={article.banner_image}
						title={article.title}
					/>
				)}
				<ArticleDescription articleId={article.id} html={description} />
				<Flex wrap="wrap" gap="md" align="center" mb="lg">
					{article.tags.map((t) => {
						return (
							<Link href={`/articles?tags=${t}`} key={t}>
								<Badge
									size="md"
									color="sky.5"
									variant="outline"
									leftSection={<IconHash size={14} />}
									style={{ cursor: "pointer" }}
								>
									{t}
								</Badge>
							</Link>
						);
					})}
				</Flex>
			</Stack>
		</Box>
	);
}
