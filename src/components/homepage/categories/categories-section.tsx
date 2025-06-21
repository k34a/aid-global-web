"use client";
import { useState, useEffect } from "react";
import { categories } from "@/components/homepage/data/categories";
import {
	CircleDotDashed,
	ArrowRight,
	ChevronsLeft,
	ChevronsRight,
} from "lucide-react";
import CategoryTabs from "@/components/homepage/categories/category-tabs";
import DonationCard from "@/components/homepage/categories/donation-card";
import { motion, AnimatePresence, easeInOut } from "framer-motion";
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

export default function CategoriesSection() {
	const [selected, setSelected] = useState(categories[0].key);
	const currentCategory = categories.find((cat) => cat.key === selected);
	const cards = currentCategory?.cards || [];
	const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
	const [cardsToShow, setCardsToShow] = useState<number>(3);
	const activeIndex = wrap(0, cards.length, page);

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
		cards.length,
		cardsToShow,
	);

	const swipeTo = (dir: number) => setPage([page + dir, dir]);

	const dragEndHandler = (dragInfo: { offset: { x: number } }) => {
		const swipeThreshold = 50;
		if (dragInfo.offset.x > swipeThreshold) swipeTo(-1);
		else if (dragInfo.offset.x < -swipeThreshold) swipeTo(1);
	};

	return (
		<div className="min-h-screen pt-6 sm:pt-8 md:pt-10 pb-2 sm:pb-3 md:pb-4 px-2 sm:px-4 md:px-6">
			<div className="flex flex-col sm:flex-row sm:justify-between mx-2 sm:mx-4 md:mx-8 lg:mx-15 gap-2 sm:gap-0">
				<h2 className="text-base sm:text-lg font-bold flex items-center gap-2">
					<CircleDotDashed className="text-blue-600 h-5 w-5 sm:h-6 sm:w-6 font-bold" />
					Categories
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
				onSelect={(key) => {
					setSelected(key);
					setPage([0, 0]);
				}}
			/>
			<div className="relative my-6 sm:my-8 md:my-10 mx-2 sm:mx-4 md:mx-10 lg:mx-20">
				<button
					onClick={() => swipeTo(-1)}
					className="absolute -left-2 top-1/2 -translate-y-1/2 z-20 sm:absolute sm:left-2 bg-white p-1.5 sm:p-2 shadow-xl rounded-full hover:scale-110 hover:bg-blue-100 transition"
				>
					<ChevronsLeft className="text-blue-600 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
				</button>
				<div className="flex justify-center items-center gap-2 min-h-[340px]">
					<AnimatePresence initial={false} custom={direction}>
						{visibleIndices.map((idx) => {
							const card = cards[idx];
							const isActive = idx === activeIndex;
							return (
								<motion.div
									key={card.title + "-" + activeIndex}
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
									className={
										"w-full sm:w-72 md:w-80 max-w-xs flex-shrink-0 flex flex-col border-2 border-transparent opacity-80 z-10 bg-white"
									}
									style={{
										pointerEvents: isActive
											? "auto"
											: "none",
									}}
								>
									<DonationCard card={card} />
								</motion.div>
							);
						})}
					</AnimatePresence>
				</div>
				<button
					onClick={() => swipeTo(1)}
					className="absolute right-2 top-1/2 -translate-y-1/2 z-20 sm:absolute sm:right-2 bg-white p-1.5 sm:p-2 shadow-xl rounded-full hover:scale-110 hover:bg-blue-100 transition"
				>
					<ChevronsRight className="text-blue-600 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
				</button>
			</div>
		</div>
	);
}
