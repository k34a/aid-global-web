"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronsRight, ChevronsLeft } from "lucide-react";
import { aids } from "@/components/homepage/data/aids";
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

const getVisibleIndices = (
	active: number,
	total: number,
	cardsToShow: number,
) => {
	// Center the active card if cardsToShow is odd, else left-align
	const indices = [];
	const half = Math.floor(cardsToShow / 2);
	for (let i = -half; i <= half; i++) {
		if (cardsToShow % 2 === 0 && i === 0) continue; // skip center for even
		indices.push(wrap(0, total, active + i));
	}
	if (cardsToShow % 2 === 0) indices.push(wrap(0, total, active + half));
	return indices.slice(0, cardsToShow);
};

const AidsSection = () => {
	const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
	const [cardsToShow, setCardsToShow] = useState(3);
	const activeIndex = wrap(0, aids.length, page);

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

	const visibleIndices = getVisibleIndices(
		activeIndex,
		aids.length,
		cardsToShow,
	);

	const swipeTo = (dir: number) => setPage([page + dir, dir]);

	const dragEndHandler = (dragInfo: { offset: { x: number } }) => {
		const swipeThreshold = 50;
		if (dragInfo.offset.x > swipeThreshold) swipeTo(-1);
		else if (dragInfo.offset.x < -swipeThreshold) swipeTo(1);
	};

	return (
		<div className="relative my-6 sm:my-8 md:my-10 mx-2 sm:mx-4 md:mx-10 lg:mx-20">
			{/* Scroll Buttons */}
			<button
				onClick={() => swipeTo(-1)}
				className="absolute -left-2 sm:-left-3 md:-left-5 top-1/2 z-200 -translate-y-1/2 bg-white p-1.5 sm:p-2 shadow-xl rounded-full hover:scale-110 hover:bg-blue-100 transition"
			>
				<ChevronsLeft className="text-blue-600 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
			</button>

			<button
				onClick={() => swipeTo(1)}
				className="absolute -right-2 sm:-right-3 md:-right-5 top-1/2 z-200 -translate-y-1/2 bg-white p-1.5 sm:p-2 shadow-xl rounded-full hover:scale-110 hover:bg-blue-100 transition"
			>
				<ChevronsRight className="text-blue-600 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
			</button>
			<div className="flex justify-center items-center gap-4 md:gap-8 min-h-[380px] md:min-h-[420px] lg:min-h-[440px] relative">
				<AnimatePresence initial={false} custom={direction}>
					{visibleIndices.map((idx, i) => {
						const item = aids[idx];
						// Center card is active
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
								className={`relative bg-white rounded-2xl shadow-lg flex flex-col transition-transform duration-300 ease-in-out hover:scale-95 border-2 
									 min-w-[260px] max-w-xs w-full md:min-w-[320px] md:max-w-sm lg:min-w-[350px] lg:max-w-md mx-2`}
								style={{
									pointerEvents: isActive ? "auto" : "none",
								}}
							>
								<div className="relative min-h-[220px] md:min-h-[260px] lg:min-h-[300px] w-full rounded-t-2xl overflow-hidden">
									<Image
										src={item.image}
										alt={item.title}
										className="object-cover brightness-50"
										fill={true}
										sizes="(max-width: 640px) 90vw, (max-width: 768px) 80vw, (max-width: 1024px) 50vw, 33vw"
									/>
									<div className="absolute inset-0 flex flex-col justify-between p-4 md:p-6">
										<h1 className="text-white drop-shadow-[0_0_8px_white] text-lg md:text-xl font-bold mb-2">
											{item.title}
										</h1>
										<p className="text-white text-xs md:text-base mb-3">
											{item.desc}
										</p>
										{item.link ? (
											<a
												href={item.link}
												className="self-start"
											>
												<button className="px-4 py-2 rounded-full font-semibold text-white text-sm inline-flex items-center gap-2 shadow-2xl border-2 border-white hover:bg-blue-600 transition-colors duration-300 cursor-pointer">
													<ChevronsRight className="bg-blue-600 w-6 h-6 rounded-full p-1 text-white" />
													{item.button}
												</button>
											</a>
										) : (
											<button className="px-4 py-2 rounded-full font-semibold text-white text-sm inline-flex items-center gap-2 shadow-2xl border-2 border-white hover:bg-blue-600 transition-colors duration-300 cursor-pointer self-start">
												<ChevronsRight className="bg-blue-600 w-6 h-6 rounded-full p-1 text-white" />
												{item.button}
											</button>
										)}
									</div>
								</div>
							</motion.div>
						);
					})}
				</AnimatePresence>
			</div>
		</div>
	);
};

export default AidsSection;
