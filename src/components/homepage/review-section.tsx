"use client";
import React, { useState } from "react";
import { motion, AnimatePresence, easeInOut } from "motion/react";
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
		scale: 1.1,
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
	duration: 0.6,
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
					i < rating ? "text-blue-500 fill-blue-500" : "text-gray-300"
				}`}
			/>
		));

	return (
		<div className="w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8 bg-white lg:mb-10 sm:mb-5 md:mb-7 rounded-lg">
			<h2 className="text-base sm:text-lg font-bold flex items-center gap-2 mb-4 text-blue-600">
				<CircleDotDashed className="h-5 w-5 sm:h-6 sm:w-6" />
				Testimonials
			</h2>

			<div className="relative bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden">
				{/* Navigation Buttons */}
				<button
					onClick={() => swipeTo(-1)}
					className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-blue-200 rounded-full p-2 shadow-md transition-all hover:scale-110"
					aria-label="Previous testimonial"
				>
					<ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
				</button>
				<button
					onClick={() => swipeTo(1)}
					className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-blue-200 rounded-full p-2 shadow-md transition-all hover:scale-110"
					aria-label="Next testimonial"
				>
					<ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
				</button>

				<div className="relative overflow-hidden min-h-[520px] sm:min-h-[580px] md:min-h-[620px] lg:min-h-[660px] ">
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
							<div className="w-full px-6 py-8 sm:px-10 sm:py-10 md:px-14 md:py-12 lg:px-20 lg:py-14">
								{/* Profile */}
								<div className="flex flex-col items-center justify-center mb-6">
									<div className="relative mb-4">
										<div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center shadow-lg border-2 border-blue-200">
											<User className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600" />
										</div>
									</div>

									<Quote className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 mb-2 sm:mb-3" />
									<div className="flex gap-1 sm:gap-1.5 mb-5">
										{renderStars(
											reviews[activeIndex].rating,
										)}
									</div>
								</div>

								{/* Review Text */}
								<div className="text-center max-w-2xl mx-auto">
									<p className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed mb-6 font-medium px-2 sm:px-0">
										{reviews[activeIndex].text}
									</p>

									<div className="border-t border-gray-200 pt-4 sm:pt-6">
										<h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1">
											{reviews[activeIndex].name}
										</h3>
										<p className="text-gray-500 text-sm sm:text-base">
											{reviews[activeIndex].role}
										</p>
									</div>
								</div>
							</div>
						</motion.div>
					</AnimatePresence>
				</div>

				{/* Indicator Dots */}
				<div className="flex justify-center gap-2 sm:gap-3 pb-5 sm:pb-6">
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
