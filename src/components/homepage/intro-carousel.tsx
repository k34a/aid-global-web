"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, easeInOut } from "motion/react";
import { wrap } from "@popmotion/popcorn";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { DonateButton } from "@/components/campaign/donate";

const images = [
	{ src: "/intro/one.jpg", alt: "image" },
	{ src: "/intro/two.jpg", alt: "image" },
	{ src: "/intro/four.jpg", alt: "image" },
];

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

const IntroCarousel = () => {
	const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
	const activeIndex = wrap(0, images.length, page);

	const swipeTo = (dir: number) => {
		setPage(([prevPage]) => [prevPage + dir, dir]);
	};

	const dragEndHandler = (dragInfo: { offset: { x: number } }) => {
		const swipeThreshold = 50;
		if (dragInfo.offset.x > swipeThreshold) swipeTo(-1);
		else if (dragInfo.offset.x < -swipeThreshold) swipeTo(1);
	};

	useEffect(() => {
		let animationFrameId: number;
		let lastTime = performance.now();

		const scrollInterval = 5000;

		const animate = (currentTime: number) => {
			if (currentTime - lastTime >= scrollInterval) {
				swipeTo(1);
				lastTime = currentTime;
			}
			animationFrameId = requestAnimationFrame(animate);
		};

		animationFrameId = requestAnimationFrame(animate);

		return () => cancelAnimationFrame(animationFrameId);
	}, []);

	return (
		<div className="w-full mx-auto p-4 sm:p-6 lg:p-8">
			<div className="relative bg-white rounded-2xl shadow-lg overflow-x-auto">
				<div className="hidden md:block">
					<button
						onClick={() => swipeTo(-1)}
						className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-blue-300 rounded-full p-1.5 sm:p-2 shadow-lg transition-all duration-200 hover:scale-110 cursor-pointer"
						aria-label="Previous image"
					>
						<ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-600" />
					</button>
					<button
						onClick={() => swipeTo(1)}
						className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-blue-300 rounded-full p-1.5 sm:p-2 shadow-lg transition-all duration-200 hover:scale-110 cursor-pointer"
						aria-label="Next image"
					>
						<ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-600" />
					</button>
				</div>
				<div className="relative w-full aspect-[16/7] min-h-[300px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[600px] rounded-2xl overflow-x-auto flex">
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
							className="absolute w-full h-full top-0 left-0 flex items-center"
						>
							<div className="w-full h-full relative">
								<Image
									src={images[activeIndex].src}
									alt={images[activeIndex].alt}
									fill
									className="object-cover w-full h-full rounded-2xl"
									priority
								/>
								<div className="absolute inset-0 flex items-center justify-center">
									<div className="absolute inset-0 bg-black/50 z-0" />
									<div className="relative z-10 flex flex-col items-center justify-center w-full px-4">
										<h1 className="text-white text-3xl sm:text-5xl font-bold text-center mb-4">
											Together we{" "}
											<br className="hidden sm:block" />{" "}
											can make a{" "}
											<span className="text-blue-400">
												Difference
											</span>
										</h1>
										<p className="text-white text-base sm:text-lg text-center mb-6 max-w-2xl drop-shadow-md">
											Forget what you can get and see what
											you can give.
										</p>
										<div className="flex gap-4 mt-2">
											<div className="bg-white hover:bg-blue-100 text-blue-500 font-semibold px-1 py-1 rounded shadow-lg border border-blue-400 transition-all duration-200 text-base cursor-pointer">
												<DonateButton
													name="Saksham Garg"
													email="myemail@gmail.com"
													is_anon={false}
													amount={60}
													contact_number="9999999999"
													auto_allocate={true}
													campaign_id="81263c39-4c04-460d-af9c-585937104b6f"
													products={{
														"3f506987-646a-4544-8653-d3a90dd1a07b": 1,
														"71246dba-94fd-4d13-8fb9-4ffc733acfbd": 2,
													}}
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</motion.div>
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
};

export default IntroCarousel;
