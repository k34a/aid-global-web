"use client";
import React, { useState } from "react";
import { motion, AnimatePresence, easeInOut } from "framer-motion";
import { wrap } from "@popmotion/popcorn";
import {
	CircleDotDashed,
	User,
	Star,
	ChevronLeft,
	ChevronRight,
	Quote,
} from "lucide-react";
import { reviews } from "@/components/homepage/data/reviews";

const sliderVariants = {
	incoming: (direction: number) => ({
		x: direction > 0 ? "100%" : "-100%",
		scale: 1.2,
		opacity: 0,
	}),
	active: { x: 0, scale: 1, opacity: 1 },
	exit: (direction: number) => ({
		x: direction > 0 ? "-100%" : "100%",
		scale: 1,
		opacity: 0.2,
	}),
};

const sliderTransition = {
	duration: 0.7,
	ease: easeInOut,
};

const ReviewSection = () => {
	const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
	const activeIndex = wrap(0, reviews.length, page);

	const swipeTo = (dir: number) => setPage([page + dir, dir]);

	const dragEndHandler = (dragInfo: { offset: { x: number } }) => {
		const swipeThreshold = 50;
		if (dragInfo.offset.x > swipeThreshold) swipeTo(-1);
		else if (dragInfo.offset.x < -swipeThreshold) swipeTo(1);
	};

	const skipTo = (idx: number) => {
		const dir = idx > activeIndex ? 1 : -1;
		setPage([idx, dir]);
	};

	const renderStars = (rating: number) =>
		Array.from({ length: 5 }, (_, i) => (
			<Star
				key={i}
				className={`w-4 h-4 sm:w-5 sm:h-5 ${
					i < rating
						? "text-yellow-400 fill-yellow-400"
						: "text-gray-300"
				}`}
			/>
		));

	return (
		<div className="w-full max-w-4xl mx-auto p-2 sm:p-4 md:p-6 lg:p-8">
			<h2 className="text-base sm:text-lg font-bold flex items-center gap-2 mb-3 sm:mb-4">
				<CircleDotDashed className="text-blue-600 h-5 w-5 sm:h-6 sm:w-6 font-bold" />
				Testimonials
			</h2>
			<div className="relative bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
				<button
					onClick={() => swipeTo(-1)}
					className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-blue-300 rounded-full p-1.5 sm:p-2 shadow-lg transition-all duration-200 hover:scale-110 cursor-pointer"
					aria-label="Previous testimonial"
				>
					<ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-gray-600" />
				</button>
				<button
					onClick={() => swipeTo(1)}
					className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-blue-300 rounded-full p-1.5 sm:p-2 shadow-lg transition-all duration-200 hover:scale-110 cursor-pointer"
					aria-label="Next testimonial"
				>
					<ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-gray-600" />
				</button>

				<div className="relative overflow-hidden min-h-[500px] sm:min-h-[550px] md:min-h-[600px] lg:min-h-[650px]">
					<AnimatePresence initial={false} custom={direction}>
						<motion.div
							key={page}
							custom={direction}
							variants={sliderVariants}
							initial="incoming"
							animate="active"
							exit="exit"
							transition={sliderTransition}
							drag="x"
							dragConstraints={{ left: 0, right: 0 }}
							dragElastic={1}
							onDragEnd={(_, dragInfo) =>
								dragEndHandler(dragInfo)
							}
							className="absolute w-full h-full top-0 left-0 flex items-center justify-center"
						>
							<div className="w-full px-4 py-4 sm:px-8 sm:py-6 md:px-12 md:py-8 lg:px-16 lg:py-10">
								{/* Profile Section */}
								<div className="flex flex-col items-center justify-center mb-4 sm:mb-6">
									<div className="relative mb-3 sm:mb-4 flex items-center justify-center">
										<div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center shadow-lg border-2 border-blue-200">
											<User className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-blue-600" />
										</div>
									</div>
									<div className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-gray-200 leading-none mb-2 sm:mb-3">
										<Quote className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 font-extrabold text-gray-600" />
									</div>
									<div className="flex gap-0.5 sm:gap-1 mb-4 sm:mb-6">
										{renderStars(
											reviews[activeIndex].rating,
										)}
									</div>
								</div>
								<div className="text-center max-w-2xl sm:max-w-3xl mx-auto">
									<p className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8 font-medium px-2 sm:px-0">
										{reviews[activeIndex].text}
									</p>

									<div className="border-t border-gray-200 pt-4 sm:pt-6">
										<h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
											{reviews[activeIndex].name}
										</h3>
										<p className="text-gray-500 text-xs sm:text-sm md:text-base lg:text-lg font-medium">
											{reviews[activeIndex].role}
										</p>
									</div>
								</div>
							</div>
						</motion.div>
					</AnimatePresence>
				</div>

				{/* Dots Indicator */}
				<div className="flex justify-center space-x-1.5 sm:space-x-2 pb-4 sm:pb-6 px-2 sm:px-4">
					{reviews.map((_, idx) => (
						<button
							key={idx}
							onClick={() => skipTo(idx)}
							className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
								idx === activeIndex
									? "bg-blue-500 scale-110"
									: "bg-gray-300 hover:bg-gray-400"
							}`}
							aria-label={`Go to testimonial ${idx + 1}`}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default ReviewSection;
