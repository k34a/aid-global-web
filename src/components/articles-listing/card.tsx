"use client";

import React from "react";
import {
	Card,
	Text,
	Badge,
	Group,
	Button,
	Stack,
	Title,
	Divider,
} from "@mantine/core";
import { IconBrandWhatsapp, IconClock, IconTag } from "@tabler/icons-react";
import Image from "@/components/image";
import Link from "next/link";
import { ngoDetails } from "@/config/config";
import {
	type ArticleDetailsForListing,
	resolveImageForArticle,
} from "@k34a/blog";

interface Props {
	article: ArticleDetailsForListing & { tags?: string[] };
}

export default function ArticleCard({ article }: Props) {
	const {
		id,
		title,
		description,
		slug,
		banner_image,
		created_at,
		tags = [],
	} = article;

	const articleLink = `/articles/${slug}`;
	const shareUrl = `${ngoDetails.contact.website}/articles/${slug}`;
	const shareText = encodeURIComponent(
		`Check out this article "${title}": ${shareUrl}`,
	);
	const whatsappLink = `https://wa.me/?text=${shareText}`;

	const formattedDate = new Date(created_at).toLocaleDateString("en-IN", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});

	return (
		<Card shadow="sm" radius="md" p={0} withBorder maw={350}>
			{/* Banner image */}
			{banner_image && (
				<Card.Section style={{ position: "relative" }}>
					<Link href={articleLink}>
						<Image
							src={resolveImageForArticle(
								process.env.NEXT_PUBLIC_SUPABASE_HOSTNAME!,
								id,
								banner_image,
							)}
							alt={`${title} banner`}
							width={400}
							height={220}
							style={{
								objectFit: "cover",
								width: "100%",
								height: 220,
							}}
						/>
					</Link>
				</Card.Section>
			)}

			<Stack gap="xs" p="md">
				{/* Title */}
				<Link href={articleLink}>
					<Title size="lg" order={3} style={{ lineHeight: 1.2 }}>
						{title}
					</Title>
				</Link>

				{/* Meta info */}
				<Group gap="xs" c="dimmed" mb={4}>
					<IconClock size={14} />
					<Text size="sm">{formattedDate}</Text>
				</Group>

				{/* Short description (truncate) */}
				<Text size="sm" lineClamp={3}>
					{description}
				</Text>

				{/* Tags */}
				{tags.length > 0 && (
					<Group gap={6} mt={6}>
						{tags.slice(0, 3).map((tag, idx) => (
							<Badge
								key={idx}
								color="gray"
								variant="light"
								leftSection={<IconTag size={12} />}
							>
								{tag}
							</Badge>
						))}
					</Group>
				)}

				<Divider my="sm" />

				{/* Actions */}
				<Group grow>
					<Button
						component="a"
						href={whatsappLink}
						target="_blank"
						rel="noopener noreferrer"
						variant="outline"
						color="green"
						leftSection={<IconBrandWhatsapp size={16} />}
						fullWidth
						size="md"
					>
						Share
					</Button>

					<Button
						component={Link}
						href={articleLink}
						variant="filled"
						fullWidth
						size="md"
					>
						Read More
					</Button>
				</Group>
			</Stack>
		</Card>
	);
}
