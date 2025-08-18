"use client";
import React from "react";
import { Carousel } from "@mantine/carousel";
import { User, Star } from "lucide-react";
import { reviews } from "@/components/homepage/data/reviews";

const ReviewSection = () => {
	const renderStars = (rating: number) =>
		Array.from({ length: 5 }, (_, i) => (
			<Star
				key={i}
				size={16}
				className={`${
					i < rating
						? "text-yellow-400 fill-yellow-400"
						: "text-gray-200"
				} sm:w-[18px] sm:h-[18px]`}
			/>
		));

	return (
		<div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12">
			{/* Section Header */}
			<div className="text-center mb-8 md:mb-12">
				<h2 className="text-center w-full text-3xl sm:text-4xl font-bold py-5">
					<span className="inline-block relative">
						What Our <span className="text-blue-500 ">Backers</span>{" "}
						Say
					</span>
				</h2>
				<p className="text-blue-500 text-md sm:text-lg max-w-2xl mx-auto px-4 sm:px-0">
					Don{"'"}t just take our word for it - hear from our
					satisfied patrons
				</p>
			</div>

			<div
				className=" border border-slate-200"
				style={{
					background:
						"linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
				}}
			>
				<Carousel
					withIndicators
					height={500}
					className=" sm:h-[550px] md:h-[600px]"
					slideSize="100%"
					emblaOptions={{
						align: "center",
						loop: true,
						skipSnaps: false,
						dragFree: true,
						containScroll: "trimSnaps",
						slidesToScroll: 1,
						duration: 25,
						startIndex: 0,
						active: true,
						watchDrag: true,
						watchResize: true,
						watchSlides: true,
						axis: "x",
						direction: "ltr",
						inViewThreshold: 0.7,
					}}
					styles={{
						indicator: {
							width: 8,
							height: 8,
							borderRadius: "50%",
							transition: "all 250ms ease",
							backgroundColor: "#cbd5e1",
							border: "none",
							"&[dataActive]": {
								backgroundColor: "#3b82f6",
								transform: "scale(1.4)",
								boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)",
							},
						},
						indicators: {
							marginBottom: 20,
							gap: 6,
						},
						control: {
							border: "none",
							backgroundColor: "#bfdbfe",
							width: 30,
							height: 30,
							transform: "translate(0, 10)",
						},
						controls: {
							padding: "0 10px",
						},
					}}
				>
					{reviews.map((review, index) => (
						<Carousel.Slide key={index}>
							<div className="h-full flex items-center justify-center">
								<div className="flex flex-col items-center gap-5 sm:gap-6 md:gap-8 max-w-2xl mx-auto">
									{/* User Profile */}
									<div className="flex flex-col items-center gap-3 sm:gap-4">
										<div
											className="w-15 h-15 sm:w-[70px] sm:h-[70px] md:w-20 md:h-20 rounded-full flex items-center justify-center border-3 border-white"
											style={{
												background:
													"linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)",
												boxShadow:
													"0 10px 30px -10px rgba(59, 130, 246, 0.3)",
											}}
										>
											<User
												size={28}
												className="text-blue-600 sm:w-8 sm:h-8 md:w-9 md:h-9"
											/>
										</div>

										<div className="flex flex-col items-center gap-1">
											<h3 className="text-gray-900 text-lg sm:text-xl font-bold text-center">
												{review.name}
											</h3>
											<span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs sm:text-sm font-medium">
												{review.role}
											</span>
										</div>
									</div>

									{/* Star Rating */}
									<div className="flex items-center gap-1 sm:gap-1">
										{renderStars(review.rating)}
									</div>

									{/* Review Text */}
									<div
										className="bg-white p-5 sm:p-8 md:p-10 rounded-lg sm:rounded-xl md:rounded-2xl border border-slate-100 relative"
										style={{
											boxShadow:
												"0 10px 40px -10px rgba(0, 0, 0, 0.1)",
										}}
									>
										{/* Speech Bubble Arrow */}
										<div
											className="absolute -top-2 left-1/2 transform -translate-x-1/2"
											style={{
												width: 0,
												height: 0,
												borderLeft:
													"12px solid transparent",
												borderRight:
													"12px solid transparent",
												borderBottom:
													"12px solid white",
											}}
										/>
										<p className="text-gray-700 text-sm sm:text-lg leading-relaxed italic text-center">
											{`"`}
											{review.text}
										</p>
									</div>
								</div>
							</div>
						</Carousel.Slide>
					))}
				</Carousel>
			</div>
		</div>
	);
};

export default ReviewSection;
