"use client";

import { Pagination, Group } from "@mantine/core";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface PaginationControlsProps {
	total: number;
	currentPage: number;
	pageSize: number;
}

export default function PaginationControls({
	total,
	currentPage,
	pageSize,
}: PaginationControlsProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const totalPages = Math.ceil(total / pageSize);

	if (totalPages <= 1) return null; // No need to show pagination

	const handlePageChange = (page: number) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("page", String(page - 1)); // page param is 0-indexed in schema
		router.push(`${pathname}?${params.toString()}`);
	};

	return (
		<Group justify="center" mt="xl">
			<Pagination
				total={totalPages}
				value={currentPage + 1} // show as 1-indexed
				onChange={handlePageChange}
			/>
		</Group>
	);
}
