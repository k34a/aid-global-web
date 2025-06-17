"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Star, User } from "lucide-react";
import { reviews } from "@/config/reviews";

export default function TestimonialsSection() {
	const [current, setCurrent] = useState(0);
	useEffect(() => {
		const timer = setInterval(() => {
			setCurrent((prev) => (prev == reviews.length - 1 ? 0 : prev + 1));
		}, 5000);
		return () => clearInterval(timer);
	}, []);

	const review = reviews[current];
	return (
		<div className="relative min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-purple-400 flex items-center justify-center p-3 sm:p-4 md:p-6">
			<div className="absolute inset-0 opacity-20">
				<Image
					src="/reviews/template.png"
					alt="reviews"
					fill
					className="object-cover"
					sizes="(max-width: 640px) 100vw, (max-width: 768px) 95vw, (max-width: 1024px) 90vw, 80vw"
				/>
			</div>

			<div className="relative z-10 max-w-4xl w-full mx-2 sm:mx-4 md:mx-6">
				<h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 sm:mb-8 md:mb-12">
					Testimonials
				</h1>

				{/* Testimonial Card Container */}
				<div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl">
					<div className="flex flex-col lg:flex-row items-center justify-between mb-6 sm:mb-8">
						<div className="text-center lg:text-left mb-4 sm:mb-6 lg:mb-0">
							<h2 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight">
								What They are Saying About Aid Global Foundation
							</h2>
						</div>

						<div className="flex-shrink-0">
							<div className="relative w-48 sm:w-56 md:w-64 lg:w-72 h-16 sm:h-20 md:h-22 lg:h-24">
								<Image
									src="/reviews/image.png"
									alt="our team"
									fill
									className="object-cover rounded-xl sm:rounded-2xl shadow-lg"
									sizes="(max-width: 640px) 12rem, (max-width: 768px) 14rem, (max-width: 1024px) 16rem, 18rem"
								/>
							</div>
						</div>
					</div>

					<div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg">
						<div className="flex items-start space-x-3 sm:space-x-4">
							<div className="flex-shrink-0">
								<div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 rounded-full flex items-center justify-center">
									<User className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
								</div>
							</div>

							<div className="flex-1">
								<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 sm:mb-3">
									<div>
										<h3 className="font-semibold text-gray-900 text-base sm:text-lg">
											{review.name}
										</h3>
										<p className="text-pink-500 text-xs sm:text-sm font-medium">
											{review.role}
										</p>
									</div>

									<div className="flex space-x-1 mt-2 sm:mt-0">
										{[...Array(review.rating)].map(
											(_, i) => (
												<Star
													key={i}
													className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400"
												/>
											),
										)}
									</div>
								</div>

								<blockquote className="text-gray-700 text-sm sm:text-base italic leading-relaxed">
									{review.text}
								</blockquote>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
