import CampaignCard from "@/components/campaign-listing/card";
import FilterSearchSortCampaigns from "@/components/campaign-listing/filter-search-sort";
import PaginationControls from "@/components/content-management/pagination-controls";
import { querySchema } from "@/components/campaign-listing/search-params";
import { parseQueryWithPerFieldDefaults } from "@/lib/utils/query-params";
import { CampaignService } from "@/lib/db/campaigns";
import { Container, SimpleGrid, Stack, Text } from "@mantine/core";
import { IconSearchOff } from "@tabler/icons-react";

interface Props {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page(props: Props) {
	const searchParams = await props.searchParams;
	const params = parseQueryWithPerFieldDefaults(querySchema, searchParams);

	const data = await CampaignService.list(params);
	const tags = await CampaignService.getTagNames();

	return (
		<Container size="lg" py="xl">
			<FilterSearchSortCampaigns {...params} availableTags={tags} />
			{data.items.length === 0 ? (
				<Stack align="center" py="xl" gap="sm">
					<IconSearchOff size={48} stroke={1.5} color="gray" />
					<Text fw={500} size="lg">
						No campaigns found
					</Text>
					<Text size="sm" c="dimmed" ta="center" mx="auto" maw={300}>
						We couldn&apos;t find any campaigns matching your
						filters. Try adjusting your search or clearing some
						filters.
					</Text>
				</Stack>
			) : (
				<SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
					{data.items.map((campaign) => (
						<CampaignCard key={campaign.id} campaign={campaign} />
					))}
				</SimpleGrid>
			)}

			<Text size="sm" c="dimmed" mt="md">
				Showing {data.items.length} of {data.total} campaigns
			</Text>

			<PaginationControls
				total={data.total}
				currentPage={params.page}
				pageSize={10}
			/>
		</Container>
	);
}
