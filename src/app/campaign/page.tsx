import CampaignCard from "@/components/campaign-listing/card";
import FilterSearchSortCampaigns from "@/components/campaign-listing/filter-search-sort";
import {
	parseQueryWithPerFieldDefaults,
	querySchema,
} from "@/components/campaign-listing/search-params";
import { CampaignService } from "@/lib/db/campaigns";
import { Container, SimpleGrid, Stack, Text } from "@mantine/core";

interface Props {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page(props: Props) {
	const searchParams = await props.searchParams;
	const params = parseQueryWithPerFieldDefaults(querySchema, searchParams);

	const data = await CampaignService.list(params);

	return (
		<Container size="lg" py="xl">
			<FilterSearchSortCampaigns {...params} />
			{data.items.length === 0 ? (
				<Text>No campaigns found.</Text>
			) : (
				<SimpleGrid
					cols={{
						base: 1,
						sm: 2,
						md: 3,
					}} // default 3 columns on large screens
					spacing="lg"
				>
					{data.items.map((campaign) => (
						<CampaignCard key={campaign.id} campaign={campaign} />
					))}
				</SimpleGrid>
			)}

			<Text size="sm" c="dimmed" mt="md">
				Showing {data.items.length} of {data.total} campaigns
			</Text>
		</Container>
	);
}
