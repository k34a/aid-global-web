"use client";

import { Pagination } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";

interface BlogPaginationProps {
	total: number;
	currentPage: number;
	pageSize: number;
}

export default function BlogPagination({
	total,
	currentPage,
	pageSize,
}: BlogPaginationProps) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const totalPages = Math.max(1, Math.ceil(total / pageSize));

	const handlePageChange = (newPage: number) => {
		const params = new URLSearchParams(searchParams);

		if (newPage > 1) {
			params.set("page", String(newPage - 1));
		} else {
			params.delete("page");
		}

		router.push(`/blog?${params.toString()}`);
	};

	if (totalPages <= 1) return null;

	return (
		<div className="mt-10 flex justify-center">
			<Pagination
				value={currentPage + 1}
				onChange={handlePageChange}
				total={totalPages}
				siblings={1}
				boundaries={1}
			/>
		</div>
	);
}
