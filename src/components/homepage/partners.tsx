"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { partners } from "@/components/homepage/data/partners";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { motion, AnimatePresence, easeInOut } from "framer-motion";
import { wrap } from "@popmotion/popcorn";

type Partner = {
	name: string;
	logo: string;
};

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
	duration: 0.4,
	ease: easeInOut,
};

const getCardsToShow = (width: number) => {
	if (width < 640) return 2; // mobile
	if (width < 900) return 3; // tablets
	if (width < 1280) return 4; // laptops
	return 5; // large desktops
};

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

export default function PartnersSection() {
	const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
	const [cardsToShow, setCardsToShow] = useState<number>(5);
	const activeIndex = wrap(0, partners.length, page);

	useEffect(() => {
		const handleResize = () => {
			setCardsToShow(getCardsToShow(window.innerWidth));
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const visibleIndices = getVisibleIndices(
		activeIndex,
		partners.length,
		cardsToShow,
	);

	const swipeTo = (dir: number) => setPage([page + dir, dir]);

	const dragEndHandler = (dragInfo: { offset: { x: number } }) => {
		const swipeThreshold = 50;
		if (dragInfo.offset.x > swipeThreshold) swipeTo(-1);
		else if (dragInfo.offset.x < -swipeThreshold) swipeTo(1);
	};

	return (
		<section className="bg-[#F0F8FF] py-12 px-4 sm:px-6 md:px-16">
			<div className="max-w-6xl mx-auto text-center">
				<h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-4">
					Our Trusted Partners
				</h2>
				<p className="text-sm sm:text-base text-blue-800 mb-8 max-w-2xl mx-auto">
					We collaborate with leading organizations to create lasting
					change and expand our impact together.
				</p>
				<div className="relative">
					<button
						onClick={() => swipeTo(-1)}
						className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full z-30 bg-white p-1.5 sm:p-2 shadow-xl rounded-full hover:scale-110 hover:bg-blue-100 transition"
					>
						<ChevronsLeft className="text-blue-600 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
					</button>
					<div className="flex justify-center items-center gap-6 px-8 min-h-[120px] md:min-h-[140px] lg:min-h-[160px] relative">
						<AnimatePresence initial={false} custom={direction}>
							{visibleIndices.map((idx) => {
								const partner = partners[idx];
								const isActive = idx === activeIndex;
								return (
									<motion.div
										key={partner.name + "-" + activeIndex}
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
										className="inline-block w-36 sm:w-44 md:w-48 lg:w-56 flex-shrink-0 bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 hover:rotate-[1deg] border-2 border-transparent opacity-80 z-10"
										style={{
											pointerEvents: isActive
												? "auto"
												: "none",
										}}
									>
										<div className="relative h-16 w-full flex items-center justify-center">
											<Image
												src={
													partner.logo || "/logo.png"
												}
												alt={partner.name}
												width={100}
												height={50}
												className="object-contain max-h-12 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(0,115,255,0.5)]"
											/>
										</div>
										<p className="text-sm text-blue-900 font-semibold mt-2 truncate">
											{partner.name}
										</p>
									</motion.div>
								);
							})}
						</AnimatePresence>
					</div>
					<button
						onClick={() => swipeTo(1)}
						className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full z-30 bg-white p-1.5 sm:p-2 shadow-xl rounded-full hover:scale-110 hover:bg-blue-100 transition"
					>
						<ChevronsRight className="text-blue-600 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
					</button>
				</div>
			</div>
		</section>
	);
}
