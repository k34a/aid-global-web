"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, easeInOut } from "motion/react";
import { wrap } from "@popmotion/popcorn";
import Image from "next/image";
import { emergencies } from "@/components/homepage/data/emergencies";
import {
	CircleDotDashed,
	ArrowRight,
	BadgeInfo,
	ChevronsLeft,
	ChevronsRight,
	CircleDot,
} from "lucide-react";

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

const EmergencySection = () => {
	const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
	const [cardsToShow, setCardsToShow] = useState<number>(3);
	const activeIndex = wrap(0, emergencies.length, page);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 640) setCardsToShow(1);
			else if (window.innerWidth < 1024) setCardsToShow(2);
			else setCardsToShow(3);
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
		emergencies.length,
		cardsToShow,
	);

	const swipeTo = (dir: number) => setPage([page + dir, dir]);

	const dragEndHandler = (dragInfo: { offset: { x: number } }) => {
		const swipeThreshold = 50;
		if (dragInfo.offset.x > swipeThreshold) swipeTo(-1);
		else if (dragInfo.offset.x < -swipeThreshold) swipeTo(1);
	};

	return (
		<section className="bg-white rounded-xl p-2 sm:p-4 md:p-8 lg:p-10 xl:p-12 mx-2 sm:mx-4 md:mx-10 lg:mx-20">
			<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
				<h2 className="text-base sm:text-lg font-bold flex items-center gap-2">
					<CircleDotDashed className="text-blue-600 h-5 w-5 sm:h-6 sm:w-6 font-bold" />
					Active Campaigns
				</h2>
				<a
					href="#"
					className="text-blue-600 font-medium text-sm sm:text-md hover:underline flex items-center gap-1"
				>
					View All <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
				</a>
			</div>
			<div className="relative my-6 sm:my-10">
				<button
					onClick={() => swipeTo(-1)}
					className="absolute -left-2 sm:-left-3 md:-left-5 top-1/2 z-200 -translate-y-1/2 bg-white p-1.5 sm:p-2 shadow-xl rounded-full hover:scale-110 hover:bg-blue-100 transition"
				>
					<ChevronsLeft className="text-blue-600 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
				</button>
				<div className="flex justify-center items-center gap-4 sm:gap-5 min-h-[260px] md:min-h-[320px] lg:min-h-[340px] relative">
					<AnimatePresence initial={false} custom={direction}>
						{visibleIndices.map((idx) => {
							const item = emergencies[idx];
							const isActive = idx === activeIndex;
							return (
								<motion.div
									key={item.id + "-" + activeIndex}
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
									className={`w-full max-w-full sm:min-w-[260px] md:min-w-[280px] sm:max-w-xs flex-shrink-0 bg-white rounded-2xl sm:rounded-4xl shadow-lg flex flex-col transition-transform duration-300 ease-in-out hover:scale-95 border-2 border-transparent opacity-80 z-10`}
									style={{
										pointerEvents: isActive
											? "auto"
											: "none",
									}}
								>
									<div className="relative h-32 sm:h-40 w-full rounded-t-xl overflow-hidden">
										<Image
											src={item.image}
											alt={item.title}
											fill
											className="object-cover"
											sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 33vw"
											priority
										/>
										{item.taxBenefit && (
											<div className="absolute top-2 right-2 bg-yellow-400 text-xs font-semibold px-2 py-1 rounded flex items-center gap-1">
												Tax Benefit{" "}
												<BadgeInfo className="h-3 w-3" />
											</div>
										)}
									</div>
									<div className="flex-1 flex flex-col p-3 sm:p-4">
										<h3 className="font-semibold text-sm sm:text-base mb-1">
											{item.title}
										</h3>
										<div className="mb-2">
											<span className="bg-gray-100 text-xs px-2 py-1 rounded text-gray-700">
												By {item.author}
											</span>
										</div>
										<div className="flex items-center justify-between mb-1">
											<span className="text-blue-600 font-bold text-sm sm:text-base">
												&#8377;{item.raised} Raised
											</span>
											<span className="text-gray-700 font-medium text-xs sm:text-sm">
												&#8377;
												{item.required} Required
											</span>
										</div>
										{/* Progress Bar */}
										<div className="w-full bg-gray-200 rounded-full h-2 mb-2">
											<div
												className="bg-blue-500 h-2 rounded-full"
												style={{
													width: `${Math.min(
														(item.raised /
															(item.raised +
																item.required)) *
															100,
														100,
													)}%`,
												}}
											/>
										</div>
										<div className="flex items-center justify-between mb-3">
											<span className="text-xs text-gray-500">
												{item.backers} Backers
											</span>
										</div>
										<div className="flex gap-2 mt-auto">
											<button className="flex-1 bg-gray-100 text-gray-700 text-xs sm:text-sm rounded px-2 sm:px-3 py-1 font-medium border hover:bg-gray-200 cursor-pointer">
												Share
											</button>
											<button className="flex-1 bg-blue-500 text-white text-xs sm:text-sm rounded px-2 sm:px-3 py-1 font-medium hover:bg-blue-700 cursor-pointer">
												Donate Now
											</button>
										</div>
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
		</section>
	);
};

export default EmergencySection;
