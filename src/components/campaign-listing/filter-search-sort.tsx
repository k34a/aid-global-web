"use client";
import {
	Card,
	TextInput,
	Button,
	Select,
	SimpleGrid,
	Group,
	Stack,
	RangeSlider,
	Text,
} from "@mantine/core";
import { IconSearch, IconFilter } from "@tabler/icons-react";
import { useRouter, usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import type { z } from "zod";
import { querySchema } from "./search-params";
import { programLinks } from "@/config/links";

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

	const buildQuery = useCallback(() => {
		const params = new URLSearchParams();

		if (search) params.set("search", search);

		if (backersRange[0] > 0) {
			params.set("minBackers", String(backersRange[0]));
		}

		if (backersRange[1] < 2000) {
			params.set("maxBackers", String(backersRange[1]));
		} else {
			params.set("maxBackers", "Infinity");
		}

		if (program && program !== "all") {
			params.set("program", program);
		}

		if (sortBy) params.set("sortBy", sortBy);

		params.set("page", "0");
		return params.toString();
	}, [search, backersRange, sortBy, program]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const query = buildQuery();
		router.push(`${pathname}?${query}`);
	};

	const resetFilters = () => {
		setSearch("");
		setBackersRange([0, 2000]);
		setSortBy("latest");
		setProgram("all");
		router.push(`${pathname}?page=0`);
	};

	return (
		<Card withBorder radius="md" p="lg" mb="xl" bd="2px solid #ccc">
			<form onSubmit={handleSubmit}>
				<Stack gap="md">
					<SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
						{/* Search */}
						<TextInput
							label="Search"
							placeholder="Search by title"
							leftSection={<IconSearch size={16} />}
							value={search}
							onChange={(e) => setSearch(e.currentTarget.value)}
						/>

						{/* Program Select */}
						<Select
							label="Program"
							data={PROGRAM_OPTIONS}
							value={program}
							onChange={(val) =>
								setProgram(val as FilterProps["program"])
							}
							clearable={false}
							allowDeselect={false}
						/>

						{/* Sort By */}
						<Select
							label="Sort By"
							data={SORT_OPTIONS}
							value={sortBy}
							onChange={(val) =>
								setSortBy(val as FilterProps["sortBy"])
							}
							clearable={false}
							allowDeselect={false}
						/>
					</SimpleGrid>

					{/* Backers Range */}
					<Stack gap="xs">
						<Group justify="space-between">
							<Text fw={500}>Donor Count</Text>
							<Text size="sm" c="dimmed">
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
							onChange={setBackersRange}
							label={(val) => `${val}`}
							marks={[
								{ value: 0, label: "0" },
								{ value: 1000, label: "1k" },
								{ value: 2000, label: "2k+" },
							]}
						/>
					</Stack>

					{/* Action Buttons */}
					<Group justify="space-between" mt="sm">
						<Button variant="default" onClick={resetFilters}>
							Reset
						</Button>
						<Button
							type="submit"
							leftSection={<IconFilter size={16} />}
						>
							Apply Filters
						</Button>
					</Group>
				</Stack>
			</form>
		</Card>
	);
}
