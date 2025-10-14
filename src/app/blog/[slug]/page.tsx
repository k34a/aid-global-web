"use client";

import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
	Container,
	Title,
	Text,
	Group,
	Image,
	Button,
	Card,
	Stack,
	Divider,
	Anchor,
	Grid,
} from "@mantine/core";
import {
	IconBrandInstagram,
	IconBrandFacebook,
	IconBrandTwitter,
} from "@tabler/icons-react";

import Header from "@/components/structure/header";

const DUMMY_POSTS = Array.from({ length: 12 }).map((_, i) => ({
	id: i + 1,
	slug: `post-${i + 1}`,
	title: `Lorem Ipsum is simply dummy text ${i + 1}`,
	author: "John Doe",
	date: "Nov 20, 2020",
	category: "Category 1",
	content: `\n<p>This is the full content of post ${i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>\n<p>Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>\n<p>Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>\n<p>Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>\n<p>Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>\n<p>Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>\n<p>Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>\n<p>Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>\n<p>Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>\n<p>Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>\n<p>Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>\n<p>Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>\n<p>Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>\n<p>Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>\n<p>Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>\n<p>Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>\n<p>Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>\n<p>Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>\n<p>Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>\n<p>Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>\n<p>Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>\n<p>Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>\n<p>Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>\n<p>Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>\n<p>Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>\n<p>Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>\n<p>Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>\n<p>Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>\n<p>Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>\n<p>Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>\n<p>Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>\n<p>Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>\n<p>Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>\n<p>Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>\n<p>Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>\n<p>Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>\n<p>Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.</p>\n`,
	image: `https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80&auto=format&fit=crop&ixlib=rb-4.0.3&s=${i}`,
}));

export default function BlogPostPage({ params }: { params: { slug: string } }) {
	const slug = params.slug;
	const post = DUMMY_POSTS.find((p) => p.slug === slug);

	if (!post) {
		notFound();
	}

	const morePosts = DUMMY_POSTS.filter((p) => p.slug !== slug).slice(0, 3);

	return (
		<div>
			<Header />

			<Container size="md" className="py-10 mt-20">
				<Title order={1} className="mb-2">
					{post?.title}
				</Title>

				<Group gap="md" mb="md">
					<Text size="sm" c="dimmed">
						{post?.author}
					</Text>
					<Text size="sm" c="green">
						| {post?.category}
					</Text>
					<Text size="sm" c="dimmed">
						| {post?.date}
					</Text>
				</Group>

				{/* Banner Image */}
				<Card withBorder className="mb-6">
					<Image
						src={post?.image}
						alt={post?.title}
						height={220}
						fit="cover"
					/>
				</Card>

				{/* Text Content */}
				<Card withBorder className="mb-6 p-6">
					{/* Danger: content uses simple HTML strings, agar switch krna hai to real data sanitize if needed */}
					<div
						dangerouslySetInnerHTML={{
							__html: post?.content || "",
						}}
					/>
				</Card>

				{/* Share buttons */}
				<Group gap="xs" className="mb-6">
					<Text size="sm">Share this</Text>
					<Anchor href="#" aria-label="share to instagram">
						<IconBrandInstagram size={20} />
					</Anchor>
					<Anchor href="#" aria-label="share to facebook">
						<IconBrandFacebook size={20} />
					</Anchor>
					<Anchor href="#" aria-label="share to twitter">
						<IconBrandTwitter size={20} />
					</Anchor>
				</Group>

				<Divider my="sm" />

				{/* More Posts */}
				<div>
					<Title order={4} className="mb-4">
						More Posts
					</Title>

					<Grid>
						{morePosts.map((m) => (
							<Grid.Col key={m.id} span={4}>
								<Link
									href={`/blog/${m.slug}`}
									className="no-underline"
								>
									<Card
										withBorder
										padding="xs"
										className="text-center"
									>
										<Image
											src={m.image}
											alt={m.title}
											height={60}
											fit="cover"
										/>
										<Text size="xs" mt={6} lineClamp={1}>
											{m.title}
										</Text>
									</Card>
								</Link>
							</Grid.Col>
						))}
					</Grid>
				</div>
			</Container>
		</div>
	);
}
