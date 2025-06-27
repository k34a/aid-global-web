"use client";

import Image from "next/image";
import { CircleDotDashed, ChevronsRight, ChevronsLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { ArticleMeta } from "@/lib/db/articles";
import { motion, AnimatePresence, easeInOut } from "motion/react";
import { wrap } from "@popmotion/popcorn";

const sliderVariants = {
	incoming: (direction: number) => ({
		x: direction > 0 ? 300 : -300,
		scale: 0.85,
		opacity: 0,
	}),
	active: { x: 0, scale: 1, opacity: 1 },
	exit: (direction: number) => ({
		x: direction > 0 ? -300 : 300,
		scale: 0.85,
		opacity: 0,
	}),
};

const sliderTransition = {
	duration: 0.3,
	ease: easeInOut,
};

interface NewsSectionProps {
	articles: ArticleMeta[];
}

export default function NewsSection({ articles }: NewsSectionProps) {
	const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
	const [cardsToShow, setCardsToShow] = useState<number>(3);
	const activeIndex = wrap(0, articles.length, page);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 640)
				setCardsToShow(1); // mobile
			else if (window.innerWidth < 1024)
				setCardsToShow(2); // tablet
			else setCardsToShow(3); // desktop
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const getVisibleIndices = (
		active: number,
		total: number,
		cardsToShow: number,
	) => {
		const indices = [];
		const half = Math.floor(cardsToShow / 2);
		for (let i = -half; i <= half; i++) {
			if (cardsToShow % 2 === 0 && i === 0) continue;
			indices.push(wrap(0, total, active + i));
		}
		if (cardsToShow % 2 === 0) indices.push(wrap(0, total, active + half));
		return indices.slice(0, cardsToShow);
	};

	const visibleIndices = getVisibleIndices(
		activeIndex,
		articles.length,
		cardsToShow,
	);

	const swipeTo = (dir: number) => setPage([page + dir, dir]);

	const dragEndHandler = (dragInfo: { offset: { x: number } }) => {
		const swipeThreshold = 50;
		if (dragInfo.offset.x > swipeThreshold) swipeTo(-1);
		else if (dragInfo.offset.x < -swipeThreshold) swipeTo(1);
	};

	return (
		<section className="py-10 px-4 sm:px-6 md:px-16 bg-[#bde0ff] relative">
			<h2 className="text-lg font-bold flex items-center gap-2">
				<CircleDotDashed className="text-blue-600 h-6 w-6 font-bold" />
				Our Latest News
			</h2>
			<div className="max-w-6xl mx-auto pt-10">
				<h2 className="text-2xl sm:text-3xl font-bold text-black-600 text-center mb-10 flex items-center justify-center gap-2">
					Latest <span className="text-blue-600"> News</span> &{" "}
					<span className="text-blue-600"> Events </span>
				</h2>
				<div className="relative my-6 sm:my-8 md:my-10 mx-2 sm:mx-4 md:mx-10 lg:mx-20">
					<button
						onClick={() => swipeTo(-1)}
						className="absolute -left-2 sm:-left-3 md:-left-5 top-1/2 z-200 -translate-y-1/2 bg-white p-1.5 sm:p-2 shadow-xl rounded-full hover:scale-110 hover:bg-blue-100 transition"
					>
						<ChevronsLeft className="text-blue-600 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
					</button>
					<div className="flex justify-center items-center gap-6 min-h-[340px] md:min-h-[360px] lg:min-h-[380px] relative">
						<AnimatePresence initial={false} custom={direction}>
							{visibleIndices.map((idx) => {
								const news = articles[idx];
								if (!news) return null;
								const isActive = idx === activeIndex;
								return (
									<motion.div
										key={news.id + "-" + activeIndex}
										custom={direction}
										variants={sliderVariants}
										initial="incoming"
										animate="active"
										exit="exit"
										transition={sliderTransition}
										drag={isActive ? "x" : false}
										dragConstraints={{ left: 0, right: 0 }}
										dragElastic={1}
										onDragEnd={
											isActive
												? (_, dragInfo) =>
														dragEndHandler(dragInfo)
												: undefined
										}
										className="min-w-[280px] max-w-xs w-full flex-shrink-0 bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group border-2 border-transparent opacity-80 z-10"
										style={{
											pointerEvents: isActive
												? "auto"
												: "none",
										}}
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
											<p className="text-sm text-gray-700 mb-3">
												{news.description}
											</p>
											<a
												href={`/articles/${news.slug}`}
												className="text-blue-600 hover:underline text-sm font-medium cursor-pointer"
											>
												Read More →
											</a>
										</div>
									</motion.div>
								);
							})}
						</AnimatePresence>
					</div>
					<button
						onClick={() => swipeTo(1)}
						className="absolute -right-2 sm:-right-3 md:-right-5 top-1/2 z-200 -translate-y-1/2 bg-white p-1.5 sm:p-2 shadow-xl rounded-full hover:scale-110 hover:bg-blue-100 transition"
					>
						<ChevronsRight className="text-blue-600 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
					</button>
				</div>
			</div>
		</section>
	);
}
