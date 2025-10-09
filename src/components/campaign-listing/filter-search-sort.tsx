"use client";
import {
	TextInput,
	ActionIcon,
	Popover,
	Select,
	RangeSlider,
	Group,
	Text,
	Stack,
	Box,
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
import { querySchema } from "./search-params";
import { programLinks } from "@/config/links";
import { useDebouncedCallback } from "@mantine/hooks";

type FilterProps = z.infer<typeof querySchema>;

const SORT_OPTIONS = [
	{ value: "latest", label: "Latest" },
	{ value: "oldest", label: "Oldest" },
	{ value: "popular", label: "Most Popular" },
	{ value: "most-donated", label: "Most Donated" },
	{ value: "A-Z", label: "Title A-Z" },
	{ value: "Z-A", label: "Title Z-A" },
];

const PROGRAM_OPTIONS = [
	{ value: "all", label: "All Programs" },
	...programLinks.map((program) => ({
		value: program.name,
		label: program.name,
	})),
];

export default function FilterSearchSortCampaigns(props: FilterProps) {
	const router = useRouter();
	const pathname = usePathname();

	const [search, setSearch] = useState(props.search ?? "");
	const [sortBy, setSortBy] = useState<FilterProps["sortBy"]>(
		props.sortBy ?? "latest",
	);
	const [backersRange, setBackersRange] = useState<[number, number]>([
		props.minBackers ?? 0,
		props.maxBackers === Infinity ? 2000 : (props.maxBackers ?? 2000),
	]);
	const [program, setProgram] = useState(props.program ?? "all");

	const [filterOpened, setFilterOpened] = useState(false);
	const [sortOpened, setSortOpened] = useState(false);

	const debouncedApplyFilters = useDebouncedCallback(() => {
		const query = buildQuery();
		router.push(`${pathname}?${query}`);
	}, 300);

	const buildQuery = useCallback(() => {
		const params = new URLSearchParams();

		if (search) params.set("search", search);
		if (backersRange[0] > 0)
			params.set("minBackers", String(backersRange[0]));
		if (backersRange[1] < 2000) {
			params.set("maxBackers", String(backersRange[1]));
		} else {
			params.set("maxBackers", "Infinity");
		}
		if (program && program !== "all") params.set("program", program);
		if (sortBy) params.set("sortBy", sortBy);

		params.set("page", "0");
		return params.toString();
	}, [search, backersRange, sortBy, program]);

	useEffect(() => {
		debouncedApplyFilters();
	}, [program, search, sortBy, backersRange]);

	const hasActiveFilter =
		program !== "all" || backersRange[0] > 0 || backersRange[1] < 2000;

	const hasActiveSort = sortBy !== "latest";

	return (
		<form style={{ paddingBottom: "20px" }}>
			<Group justify="space-between" wrap="nowrap">
				{/* Search Input */}
				<TextInput
					placeholder="Search..."
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
					width={250}
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
							<Select
								label="Program"
								data={PROGRAM_OPTIONS}
								value={program}
								onChange={(val) => {
									if (val) setProgram(val);
								}}
								clearable={false}
							/>

							<Box pb="lg">
								<Group justify="space-between" mb={4}>
									<Text size="sm">Donor Count</Text>
									<Text size="xs" c="dimmed">
										{backersRange[0]} -{" "}
										{backersRange[1] === 2000
											? "2000+"
											: backersRange[1]}
									</Text>
								</Group>
								<RangeSlider
									min={0}
									max={2000}
									step={50}
									value={backersRange}
									onChange={(range) => setBackersRange(range)}
									marks={[
										{ value: 0, label: "0" },
										{ value: 1000, label: "1k" },
										{ value: 2000, label: "2k+" },
									]}
								/>
							</Box>
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
							{SORT_OPTIONS.map((option, idx) => (
								<Button
									key={idx}
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
