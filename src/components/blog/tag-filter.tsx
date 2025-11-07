"use client";

import { MultiSelect } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";

interface TagFilterProps {
	availableTags: string[];
	selectedTags: string[];
}

export default function TagFilter({
	availableTags,
	selectedTags,
}: TagFilterProps) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const handleTagChange = (values: string[]) => {
		const params = new URLSearchParams(searchParams);

		if (values.length > 0) {
			params.delete("tags");
			values.forEach((tag) => params.append("tags", tag));
		} else {
			params.delete("tags");
		}

		// Reset to first page when tags change
		params.delete("page");

		router.push(`/blog?${params.toString()}`);
	};

	return (
		<div className="mt-8 max-w-xl mx-auto">
			<MultiSelect
				label="Filter by Tags"
				placeholder="Select tags"
				data={availableTags}
				value={selectedTags}
				onChange={handleTagChange}
				searchable
				clearable
			/>
		</div>
	);
}
