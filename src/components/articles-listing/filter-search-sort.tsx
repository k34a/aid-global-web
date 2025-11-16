"use client";

import {
	FilterSearchSortArticles,
	type FilterSearchSortArticlesProps,
} from "@k34a/blog";
import { usePathname, useRouter } from "next/navigation";

type Props = Omit<FilterSearchSortArticlesProps, "navigate">;

export const FilterSearchSort = (props: Props) => {
	const router = useRouter();
	const pathname = usePathname();

	function navigate(query: string) {
		router.push(`${pathname}?${query}`);
	}
	return <FilterSearchSortArticles {...props} navigate={navigate} />;
};
