"use client";

import {
	Accordion,
	TextInput,
	NumberInput,
	Button,
	Select,
	Stack,
	Group,
} from "@mantine/core";
import { IconFilter, IconSearch } from "@tabler/icons-react";
import { useRouter, usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import type { z } from "zod";
import { querySchema } from "./search-params";

type FilterProps = z.infer<typeof querySchema>;

const SORT_OPTIONS = [
	{ value: "latest", label: "Latest" },
	{ value: "oldest", label: "Oldest" },
	{ value: "popular", label: "Most Popular" },
	{ value: "most-donated", label: "Most Donated" },
	{ value: "A-Z", label: "Title A-Z" },
	{ value: "Z-A", label: "Title Z-A" },
];

export default function FilterSearchSortCampaigns(props: FilterProps) {
	const router = useRouter();
	const pathname = usePathname();

	const [search, setSearch] = useState(props.search ?? "");
	const [minBackers, setMinBackers] = useState<number>(props.minBackers ?? 0);
	const [maxBackers, setMaxBackers] = useState<number | undefined>(
		isFinite(props.maxBackers) ? props.maxBackers : undefined,
	);
	const [sortBy, setSortBy] = useState<FilterProps["sortBy"]>(
		props.sortBy ?? "latest",
	);

	const buildQuery = useCallback(() => {
		const params = new URLSearchParams();

		if (search) params.set("search", search);
		if (minBackers) params.set("minBackers", String(minBackers));
		if (maxBackers !== undefined) {
			params.set("maxBackers", String(maxBackers));
		}
		if (sortBy) params.set("sortBy", sortBy);

		// Always reset page when filters are applied
		params.set("page", "0");

		return params.toString();
	}, [search, minBackers, maxBackers, sortBy]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const query = buildQuery();
		router.push(`${pathname}?${query}`);
	};

	return (
		<Accordion defaultValue="filter-search-sort">
			<Accordion.Item value="filter-search-sort">
				<Accordion.Control icon={<IconFilter />}>
					Filter Campaigns
				</Accordion.Control>
				<Accordion.Panel>
					<form onSubmit={handleSubmit}>
						<Stack>
							<TextInput
								label="Search"
								placeholder="Search by title"
								leftSection={<IconSearch size={16} />}
								value={search}
								onChange={(e) =>
									setSearch(e.currentTarget.value)
								}
							/>

							<Group grow>
								<NumberInput
									label="Min Backers"
									min={0}
									value={minBackers}
									onChange={(val) => {
										try {
											if (typeof val === "string") {
												setMinBackers(
													parseInt(val) || 0,
												);
											} else {
												setMinBackers(val || 0);
											}
										} catch (error) {
											setMinBackers(0);
										}
									}}
								/>
								<NumberInput
									label="Max Backers"
									min={0}
									value={maxBackers}
									onChange={(val) => {
										if (typeof val === "number") {
											setMaxBackers(val);
										} else {
											// If input is cleared or invalid, treat as undefined (i.e. Infinity)
											setMaxBackers(undefined);
										}
									}}
									allowDecimal={false}
									placeholder="Unlimited"
									allowNegative={false}
								/>
							</Group>

							<Select
								label="Sort By"
								data={SORT_OPTIONS}
								value={sortBy}
								onChange={(val) =>
									setSortBy(val as FilterProps["sortBy"])
								}
							/>

							<Button type="submit" mt="sm">
								Apply Filters
							</Button>
						</Stack>
					</form>
				</Accordion.Panel>
			</Accordion.Item>
		</Accordion>
	);
}
