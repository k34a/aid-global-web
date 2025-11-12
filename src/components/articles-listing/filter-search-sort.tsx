"use client";

import {
	TextInput,
	ActionIcon,
	Popover,
	MultiSelect,
	Group,
	Text,
	Stack,
	Button,
	Indicator,
} from "@mantine/core";
import {
	IconSearch,
	IconFilter,
	IconSelector,
	IconCheck,
} from "@tabler/icons-react";
import { useRouter, usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import type { z } from "zod";
import { articleQuerySchema } from "./search-params";
import { useDebouncedCallback } from "@mantine/hooks";

type FilterProps = z.infer<typeof articleQuerySchema>;

interface Props extends FilterProps {
	availableTags: string[];
}

const SORT_OPTIONS = [
	{ value: "latest", label: "Latest" },
	{ value: "oldest", label: "Oldest" },
	{ value: "A-Z", label: "Title A-Z" },
	{ value: "Z-A", label: "Title Z-A" },
];

export default function FilterSearchSortArticles(props: Props) {
	const router = useRouter();
	const pathname = usePathname();

	const [search, setSearch] = useState(props.search ?? "");
	const [sortBy, setSortBy] = useState<FilterProps["sortBy"]>(
		props.sortBy ?? "latest",
	);
	const [selectedTags, setSelectedTags] = useState<string[]>(
		props.tags ?? [],
	);

	const [filterOpened, setFilterOpened] = useState(false);
	const [sortOpened, setSortOpened] = useState(false);

	// Debounced query push to avoid excessive navigation
	const debouncedApplyFilters = useDebouncedCallback(() => {
		const query = buildQuery();
		router.push(`${pathname}?${query}`);
	}, 300);

	const buildQuery = useCallback(() => {
		const params = new URLSearchParams();

		if (search) params.set("search", search);
		if (selectedTags.length > 0) {
			params.set("tags", selectedTags.join(","));
		}
		if (sortBy) params.set("sortBy", sortBy);

		params.set("page", "0"); // reset pagination
		return params.toString();
	}, [search, selectedTags, sortBy]);

	useEffect(() => {
		debouncedApplyFilters();
	}, [selectedTags, search, sortBy]);

	const hasActiveFilter = selectedTags.length > 0;
	const hasActiveSort = sortBy !== "latest";

	return (
		<form style={{ paddingBottom: "20px" }}>
			<Group justify="space-between" wrap="nowrap">
				{/* Search Input */}
				<TextInput
					placeholder="Search articles..."
					value={search}
					onChange={(e) => setSearch(e.currentTarget.value)}
					leftSection={<IconSearch size={16} />}
					rightSectionWidth={40}
					w="100%"
					size="lg"
				/>

				{/* Filter Button with Popover */}
				<Popover
					opened={filterOpened}
					onChange={setFilterOpened}
					position="bottom-end"
					width={300}
					trapFocus
				>
					<Popover.Target>
						<Indicator
							color="blue"
							size={8}
							offset={4}
							disabled={!hasActiveFilter}
							inline
						>
							<ActionIcon
								variant="light"
								onClick={() => setFilterOpened((o) => !o)}
								size="lg"
							>
								<IconFilter size={18} />
							</ActionIcon>
						</Indicator>
					</Popover.Target>
					<Popover.Dropdown>
						<Stack gap="sm">
							<MultiSelect
								label="Tags"
								data={props.availableTags.map((tag) => ({
									value: tag,
									label: tag,
								}))}
								value={selectedTags}
								onChange={setSelectedTags}
								searchable
								placeholder="Select tags"
							/>
						</Stack>
					</Popover.Dropdown>
				</Popover>

				{/* Sort Button with Popover */}
				<Popover
					opened={sortOpened}
					onChange={setSortOpened}
					position="bottom-end"
					width={200}
					trapFocus
				>
					<Popover.Target>
						<Indicator
							color="blue"
							size={8}
							offset={4}
							disabled={!hasActiveSort}
							inline
						>
							<ActionIcon
								size="lg"
								variant="light"
								onClick={() => setSortOpened((o) => !o)}
							>
								<IconSelector size={18} />
							</ActionIcon>
						</Indicator>
					</Popover.Target>
					<Popover.Dropdown>
						<Stack>
							{SORT_OPTIONS.map((option) => (
								<Button
									key={option.value}
									onClick={() =>
										setSortBy(
											option.value as FilterProps["sortBy"],
										)
									}
									size="sm"
									variant="subtle"
									leftSection={
										sortBy === option.value ? (
											<IconCheck />
										) : undefined
									}
								>
									{option.label}
								</Button>
							))}
						</Stack>
					</Popover.Dropdown>
				</Popover>
			</Group>
		</form>
	);
}
