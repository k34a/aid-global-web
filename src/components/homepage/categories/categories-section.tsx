"use client";
import { useState } from "react";
import { categories } from "@/config/categories";
import { CircleDotDashed, ArrowRight } from "lucide-react";
import CategoryTabs from "@/components/homepage/categories/category-tabs";
import DonationList from "@/components/homepage/categories/donation-list";

export default function Home() {
	const [selected, setSelected] = useState(categories[0].key);
	const currentCategory = categories.find((cat) => cat.key === selected);

	return (
		<div className="min-h-screen py-6 sm:py-8 md:py-10 px-2 sm:px-4 md:px-6">
			<div className="flex flex-col sm:flex-row sm:justify-between mx-2 sm:mx-4 md:mx-8 lg:mx-15 gap-2 sm:gap-0">
				<h2 className="text-base sm:text-lg font-bold flex items-center gap-2">
					<CircleDotDashed className="text-blue-600 h-5 w-5 sm:h-6 sm:w-6 font-bold" />
					Medical Emergency
				</h2>
				<a
					href="#"
					className="text-blue-600 font-medium text-sm sm:text-md hover-underline flex items-center gap-1"
				>
					View All <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
				</a>
			</div>

			<CategoryTabs
				categories={categories}
				selected={selected}
				onSelect={setSelected}
			/>
			<div className="min-h-full bg-blue-200 w-full py-6 sm:py-8 md:py-10 px-2 sm:px-4">
				{currentCategory && (
					<DonationList cards={currentCategory.cards} />
				)}
			</div>
		</div>
	);
}
