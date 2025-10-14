"use client";
import Header from "@/components/structure/header";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
	Container,
	Title,
	Text,
	Tabs,
	Grid,
	Card,
	Image,
	Group,
	Button,
	Pagination,
} from "@mantine/core";

const DUMMY_POSTS = Array.from({ length: 18 }).map((_, i) => ({
	id: i + 1,
	slug: `post-${i + 1}`,
	title: `Lorem Ipsum is simply dummy text ${i + 1}`,
	author: "John Doe",
	date: "Nov 20, 2020",
	category: ["Category 1", "Category 2", "Category 3"][i % 3],
	excerpt:
		"Lorem ipsum is simply dummy text of the printing and typesetting industry. This is the short intro...",
	image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80&auto=format&fit=crop",
}));

const CATEGORIES = [
	"All",
	"Category 1",
	"Category 2",
	"Category 3",
	"Label 4",
	"Label 5",
	"Label 6",
];

function BlogCard({ post }: { post: (typeof DUMMY_POSTS)[number] }) {
	return (
		<Card shadow="sm" radius="md" withBorder className="overflow-hidden">
			<Link href={`/blog/${post.slug}`} className="block">
				<Image
					src={post.image}
					alt={post.title}
					height={170}
					fit="cover"
				/>
			</Link>

			<div className="p-4">
				<Link href={`/blog/${post.slug}`} className="no-underline">
					<Text fw={700} lineClamp={2}>
						{post.title}
					</Text>
				</Link>

				<Group justify="space-between" className="mt-2 mb-2">
					<Text size="sm" c="dimmed">
						{post.date} by {post.author}
					</Text>
					<Text size="sm" c="dimmed">
						10 min read
					</Text>
				</Group>

				<Text size="sm" lineClamp={2} className="text-gray-600">
					{post.excerpt}
				</Text>

				<div className="mt-4">
					<Link href={`/blog/${post.slug}`}>
						<Button variant="subtle">Read More &rarr;</Button>
					</Link>
				</div>
			</div>
		</Card>
	);
}

export default function BlogPage() {
	const [activeCategory, setActiveCategory] = useState<string>("All");
	const [page, setPage] = useState(1);
	const POSTS_PER_PAGE = 9;

	const filteredPosts = useMemo(() => {
		if (activeCategory === "All") return DUMMY_POSTS;
		return DUMMY_POSTS.filter((p) => p.category === activeCategory);
	}, [activeCategory]);

	const totalPages = Math.max(
		1,
		Math.ceil(filteredPosts.length / POSTS_PER_PAGE),
	);

	const visiblePosts = useMemo(() => {
		const start = (page - 1) * POSTS_PER_PAGE;
		return filteredPosts.slice(start, start + POSTS_PER_PAGE);
	}, [page, filteredPosts]);

	// reset to first page when category changes
	React.useEffect(() => setPage(1), [activeCategory]);

	return (
		<div>
			<Header />

			<Container size="xl" className="py-12 mt-24">
				<div className="text-center max-w-3xl mx-auto">
					<Title order={1}>Read Our Latest Blogs</Title>
					<Text c="dimmed" mt="sm">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Pellentesque eleifend ipsum justo, vitae lacinia mauris
						hendrerit quis. Etiam metus elit, porta at lorem id,
						malesuada eleifend ipsum.
					</Text>
				</div>

				{/* category selection bar */}
				<div className="mt-8">
					<Tabs
						value={activeCategory}
						onChange={(val) => setActiveCategory(val || "All")}
						className="max-w-4xl mx-auto"
						keepMounted={false}
					>
						<Tabs.List grow>
							{CATEGORIES.map((c) => (
								<Tabs.Tab key={c} value={c} className="text-sm">
									{c}
								</Tabs.Tab>
							))}
						</Tabs.List>
					</Tabs>
				</div>

				{/* grid of posts */}
				<div className="mt-8">
					<Grid gutter="xl">
						{visiblePosts.map((post) => (
							<Grid.Col
								key={post.id}
								span={{ base: 12, md: 6, lg: 4 }}
							>
								<BlogCard post={post} />
							</Grid.Col>
						))}
					</Grid>
				</div>

				{/* pagination */}
				<div className="mt-10 flex justify-center">
					<Pagination
						value={page}
						onChange={setPage}
						total={totalPages}
						siblings={1}
						boundaries={1}
					/>
				</div>
			</Container>
		</div>
	);
}
