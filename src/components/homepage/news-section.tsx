"use client";

import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { CircleDotDashed } from "lucide-react";
import { useRef } from "react";
import { newsList, NewsItem } from "@/config/news";

export default function NewsSection() {
	const scrollRef = useRef<HTMLDivElement>(null);

	const scroll = (direction: "left" | "right") => {
		if (scrollRef.current) {
			const scrollAmount = direction === "left" ? -300 : 300;
			scrollRef.current.scrollBy({
				left: scrollAmount,
				behavior: "smooth",
			});
		}
	};

	return (
		<section className="py-20 px-4 sm:px-6 md:px-16 bg-[#F0F8FF] relative">
			<h2 className="text-lg font-bold flex items-center gap-2">
				<CircleDotDashed className="text-blue-600 h-6 w-6 font-bold" />{" "}
				Our Latest News
			</h2>
			<div className="max-w-6xl mx-auto pt-10">
				<h2 className="text-2xl sm:text-3xl font-bold text-black-600 text-center mb-10 flex items-center justify-center gap-2">
					Latest <span className="text-blue-600"> News</span> &{" "}
					<span className="text-blue-600"> Events </span>
				</h2>
				<div className="relative">
					<button
						onClick={() => scroll("left")}
						className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-blue-100 border border-blue-300 text-blue-600 rounded-full p-2 shadow-md z-20 transition-all duration-300 hover:scale-110"
					>
						<FaChevronLeft className="w-5 h-5" />
					</button>

					<div
						ref={scrollRef}
						className="flex overflow-x-auto scroll-smooth scrollbar-hide gap-6 px-8"
					>
						{newsList.map((news: NewsItem) => (
							<div
								key={news.id}
								className="min-w-[280px] max-w-xs flex-shrink-0 bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group"
							>
								<div className="relative overflow-hidden">
									<Image
										src="/dummyimage.jpg"
										alt={news.title || "News image"}
										width={280}
										height={300}
										className="transition-transform duration-500 group-hover:scale-105"
									/>
									<div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
								</div>
								<div className="p-4">
									<h4 className="text-lg font-semibold text-blue-900 mb-1">
										{news.title}
									</h4>
									<p className="text-sm text-gray-500 mb-2">
										{new Date(news.date).toLocaleDateString(
											"en-IN",
											{
												year: "numeric",
												month: "short",
												day: "numeric",
											},
										)}
									</p>
									<p className="text-sm text-gray-700 mb-3">
										{news.description}
									</p>
									<a
										href={news.link}
										className="text-blue-600 hover:underline text-sm font-medium"
									>
										Read More →
									</a>
								</div>
							</div>
						))}
					</div>

					<button
						onClick={() => scroll("right")}
						className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-blue-100 border border-blue-300 text-blue-600 rounded-full p-2 shadow-md z-20 transition-all duration-300 hover:scale-110"
					>
						<FaChevronRight className="w-5 h-5" />
					</button>
				</div>
			</div>
		</section>
	);
}
