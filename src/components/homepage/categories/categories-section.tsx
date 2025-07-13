"use client";
import { useState } from "react";
import { categories } from "@/components/homepage/data/categories";
import { CircleDotDashed, ArrowRight } from "lucide-react";
import CategoryTabs from "@/components/homepage/categories/category-tabs";
import DonationCard from "@/components/homepage/categories/donation-card";

export default function CategoriesSection() {
	const [selected, setSelected] = useState(categories[0].key);
	const currentCategory = categories.find((cat) => cat.key === selected);
	const cards = currentCategory?.cards || [];

	return (
		<div className="pb-6 px-4 sm:px-6 md:px-8">
			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:justify-between mx-2 sm:mx-4 md:mx-8 lg:mx-10 gap-2 sm:gap-0">
				<h2 className="text-base sm:text-lg font-bold flex items-center gap-2">
					<CircleDotDashed className="text-blue-600 h-5 w-5 sm:h-6 sm:w-6" />
					Categories
				</h2>
				<a
					href="#"
					className="text-blue-600 font-medium text-sm sm:text-md hover:underline flex items-center gap-1"
				>
					View All <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
				</a>
			</div>

			{/* Category Tabs */}
			<CategoryTabs
				categories={categories}
				selected={selected}
				onSelect={(key) => setSelected(key)}
			/>

			{/* Scrollable Cards */}
			<div className="relative mt-6 flex justify-center gap-2 ">
				<div
					className="custom-scrollbar flex overflow-x-auto gap-2 p-2 scroll-smooth snap-x snap-mandatory px-1"
					style={{
						scrollbarWidth: "thin",
						scrollbarColor: "grey transparent",
					}}
				>
					{cards.slice(0, 3).map((card, idx) => (
						<div
							key={card.title + idx}
							className="snap-start min-w-[300px] max-w-[70%]"
						>
							<DonationCard card={card} />
						</div>
					))}

					{cards.length > 3 && (
						<div className="snap-start min-w-[120px] flex items-center justify-center">
							<a
								href="#"
								className="text-blue-600 font-semibold hover:underline"
							>
								Read More &rarr;
							</a>
						</div>
					)}
				</div>
			</div>

			{/* Custom Scrollbar Styles */}
			<style jsx>{`
				.custom-scrollbar::-webkit-scrollbar {
					height: 4px;
				}
				.custom-scrollbar::-webkit-scrollbar-track {
					background: transparent;
				}
				.custom-scrollbar::-webkit-scrollbar-thumb {
					background-color: grey;
					border-radius: 10px;
				}
			`}</style>
		</div>
	);
}
