"use client";

import React from "react";
import { CategoryType } from "@/components/homepage/categories/types";

interface CategoryTabsProps {
	categories: CategoryType[];
	selected: string;
	onSelect: (key: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
	categories,
	selected,
	onSelect,
}) => (
	<div className="flex flex-wrap justify-center gap-1 sm:gap-4 md:gap-6 mt-4 sm:mt-6 px-2 sm:px-4">
		{categories.map((cat) => {
			const Icon = cat.icon;
			return (
				<button
					key={cat.key}
					onClick={() => onSelect(cat.key)}
					className={`flex flex-col items-center px-2 sm:px-3 md:px-4 py-2 rounded-t-lg transition ${
						selected === cat.key
							? "bg-blue-200 text-blue-700"
							: "hover:bg-blue-100 text-gray-700"
					}`}
				>
					<span className="mb-1">
						<Icon
							className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 font-bold"
							aria-label={cat.label}
						/>
					</span>
					<span className="text-xs sm:text-sm font-semibold text-center">
						{cat.label}
					</span>
				</button>
			);
		})}
	</div>
);

export default CategoryTabs;
