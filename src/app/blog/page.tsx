import { Container, Title, Text, SimpleGrid, Stack } from "@mantine/core";
import { BlogService, articleQuerySchema } from "@/lib/db/blogs";
import BlogCard from "@/components/blog/card";
import TagFilter from "@/components/blog/tag-filter";
import BlogPagination from "@/components/blog/pagination";
import { IconArticle } from "@tabler/icons-react";

interface Props {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

function parseSearchParams(searchParams: {
	[key: string]: string | string[] | undefined;
}) {
	const page = parseInt(
		(Array.isArray(searchParams.page)
			? searchParams.page[0]
			: searchParams.page) || "0",
	);

	const tagsParam = searchParams.tags;
	const tags = Array.isArray(tagsParam)
		? tagsParam
		: tagsParam
			? [tagsParam]
			: [];

	const search = Array.isArray(searchParams.search)
		? searchParams.search[0]
		: searchParams.search;

	return articleQuerySchema.parse({ page, tags, search });
}

export default async function ArticlesPage(props: Props) {
	const searchParams = await props.searchParams;
	const params = parseSearchParams(searchParams);

	const [data, availableTags] = await Promise.all([
		BlogService.list(params),
		BlogService.getTagNames(),
	]);

	return (
		<Container size="xl" className="py-12 mt-24">
			<div className="text-center max-w-3xl mx-auto">
				<Title order={1}>Read Our Latest Articles</Title>
				<Text c="dimmed" mt="sm">
					Discover stories, insights, and updates from our
					organization. Stay informed about our mission and the impact
					we are making.
				</Text>
			</div>

			<TagFilter
				availableTags={availableTags}
				selectedTags={params.tags}
			/>

			{data.items.length === 0 ? (
				<Stack align="center" py="xl" gap="sm" className="mt-8">
					<IconArticle size={48} stroke={1.5} color="gray" />
					<Text fw={500} size="lg">
						No articles found
					</Text>
					<Text size="sm" c="dimmed" ta="center" mx="auto" maw={300}>
						We couldn{"'"}t find any articles matching your filters.
						Try adjusting your selection.
					</Text>
				</Stack>
			) : (
				<SimpleGrid
					cols={{ base: 1, sm: 2, md: 3 }}
					spacing="lg"
					className="mt-8"
				>
					{data.items.map((article) => (
						<BlogCard key={article.id} article={article} />
					))}
				</SimpleGrid>
			)}

			<Text size="sm" c="dimmed" mt="md">
				Showing {data.items.length} of {data.total} articles
			</Text>

			<BlogPagination
				total={data.total}
				currentPage={params.page}
				pageSize={9}
			/>
		</Container>
	);
}
