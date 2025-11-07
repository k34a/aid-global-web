"use client";

import { Tabs } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";

interface CategoryTabsProps {
	categories: string[];
	activeCategory: string;
}

export default function CategoryTabs({
	categories,
	activeCategory,
}: CategoryTabsProps) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const handleCategoryChange = (value: string | null) => {
		const params = new URLSearchParams(searchParams);

		if (value && value !== "All") {
			params.set("category", value);
		} else {
			params.delete("category");
		}

		// Reset to first page when category changes
		params.delete("page");

		router.push(`/blog?${params.toString()}`);
	};

	const allCategories = ["All", ...categories];

	return (
		<div className="mt-8">
			<Tabs
				value={activeCategory}
				onChange={handleCategoryChange}
				className="max-w-4xl mx-auto"
				keepMounted={false}
			>
				<Tabs.List grow>
					{allCategories.map((category) => (
						<Tabs.Tab
							key={category}
							value={category}
							className="text-sm"
						>
							{category}
						</Tabs.Tab>
					))}
				</Tabs.List>
			</Tabs>
		</div>
	);
}
