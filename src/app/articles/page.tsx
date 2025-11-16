import ArticlesCard from "@/components/articles-listing/card";
import { articleQuerySchema } from "@k34a/blog";
import { parseQueryWithPerFieldDefaults } from "@/lib/utils/query-params";
import { Container, SimpleGrid, Stack, Text } from "@mantine/core";
import { IconSearchOff } from "@tabler/icons-react";
import { articleService } from "@/lib/db/articles";
import PaginationControls from "@/components/content-management/pagination-controls";
import { FilterSearchSort } from "@/components/articles-listing/filter-search-sort";

interface Props {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page(props: Props) {
	const searchParams = await props.searchParams;
	const params = parseQueryWithPerFieldDefaults(
		articleQuerySchema,
		searchParams,
	);

	const data = await articleService.list(params);
	const tags = await articleService.getTagNames();

	return (
		<Container size="lg" py="xl">
			<FilterSearchSort {...params} availableTags={tags} />
			{data.items.length === 0 ? (
				<Stack align="center" py="xl" gap="sm">
					<IconSearchOff size={48} stroke={1.5} color="gray" />
					<Text fw={500} size="lg">
						No articles found
					</Text>
					<Text size="sm" c="dimmed" ta="center" mx="auto" maw={300}>
						We couldn&apos;t find any articles matching your
						filters. Try adjusting your search or clearing some
						filters.
					</Text>
				</Stack>
			) : (
				<SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
					{data.items.map((article) => (
						<ArticlesCard key={article.id} article={article} />
					))}
				</SimpleGrid>
			)}

			<Text size="sm" c="dimmed" mt="md">
				Showing {data.items.length} of {data.total} articles
			</Text>

			<PaginationControls
				total={data.total}
				currentPage={params.page}
				pageSize={10}
			/>
		</Container>
	);
}
