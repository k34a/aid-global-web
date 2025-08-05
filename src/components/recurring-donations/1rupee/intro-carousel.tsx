"use client";

import { Carousel } from "@mantine/carousel";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import "@mantine/carousel/styles.css";

export default function IntroCarousel() {
	const autoplay = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

	const slides = [
		{
			title: "\u20B9" + "1 Warrior",
			subtitle: "Good. Daily. Small Acts. Massive Impact.",
			description:
				"Just " +
				"\u20B9" +
				"1" +
				" a day can build hope, dignity, and opportunity for those in need.",
			rightTitleStart: "Micro-Giving, ",
			rightTitleHighlight: "Macro Impact",
			rightTitleEnd: ".",
			rightDescription:
				"Real change doesn&apos;t need thousands. it needs consistency. This isn&apos;t charity. This is a movement, a commitment to do good daily, together.",
		},
		{
			title: "Small Steps,",
			subtitle: "Big Changes!",
			description: "Every rupee makes a difference",
			rightTitleStart: "Community Power, ",
			rightTitleHighlight: "Real Impact",
			rightTitleEnd: ".",
			rightDescription:
				"When thousands contribute just " +
				"\u20B9" +
				"1" +
				", we create waves of positive change that transform entire communities.",
		},
		{
			title: "Join the",
			subtitle: "Movement!",
			description: "Be part of something bigger",
			rightTitleStart: "Together We Rise, ",
			rightTitleHighlight: "Together We Thrive",
			rightTitleEnd: ".",
			rightDescription:
				"Your small contribution joins millions of others to create sustainable solutions for lasting social impact.",
		},
	];

	return (
		<div className="relative min-h-screen bg-gradient-to-br from-[#2563eb] via-[#4ECDC4] to-blue-400 overflow-hidden">
			{/* Background Geometric Patterns */}
			<div className="absolute inset-0 opacity-10">
				<div className="absolute top-20 left-10 w-32 h-32 bg-white/20 rounded-full blur-xl"></div>
				<div className="absolute top-40 right-20 w-24 h-24 bg-white/15 rounded-full blur-lg"></div>
				<div className="absolute bottom-32 left-32 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
				<div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/25 rounded-full blur-md"></div>
			</div>

			{/* Geometric Shapes */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-white/5 to-transparent rounded-full transform translate-x-32 -translate-y-32"></div>
				<div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-white/5 to-transparent rounded-full transform -translate-x-32 translate-y-32"></div>
			</div>

			<Carousel
				withIndicators
				withControls={false}
				height="100vh"
				plugins={[autoplay.current]}
				onMouseEnter={autoplay.current.stop}
				onMouseLeave={autoplay.current.reset}
				classNames={{
					root: "h-full border-b-[6px] border-yellow-400 rounded-xl",
					viewport: "h-full",
					container: "h-full",
					slide: "h-full",
					indicators: "bottom-8 gap-2",
					indicator:
						"w-3 h-3 bg-white/40 data-[active]:bg-[#FFD700] transition-all duration-300 rounded-full border-0",
				}}
			>
				{slides.map((slide, index) => (
					<Carousel.Slide key={index}>
						<div className="container mx-auto px-4 h-full flex items-center relative z-10">
							<div className="grid lg:grid-cols-2 gap-12 items-center w-full">
								{/* Left Content */}
								<div className="text-white space-y-6">
									<div className="space-y-2">
										<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
											{slide.title}
										</h1>
										<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#FFD700] leading-tight">
											{slide.subtitle}
										</h2>
									</div>
									<p className="text-lg md:text-xl text-white/90">
										{slide.description}
									</p>
								</div>

								{/* Right Content */}
								<div className="relative">
									{/* Info Box */}
									<div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 mb-8 border border-white/20">
										<h3 className="text-xl md:text-2xl font-bold text-white mb-4">
											{slide.rightTitleStart}
											<span className="text-[#FFD700]">
												&quot;
												{slide.rightTitleHighlight}
												&quot;
											</span>
											{slide.rightTitleEnd}
										</h3>

										<p className="text-white/90 leading-relaxed">
											{slide.rightDescription}
										</p>
									</div>

									{/* Coin Character */}
									<div className="flex justify-center">
										<div className="relative">
											{/* Coin Body */}
											<div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-full shadow-2xl flex items-center justify-center relative animate-bounce">
												{/* Coin Inner Circle */}
												<div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-[#FFA500] to-[#FF8C00] rounded-full flex items-center justify-center">
													<span className="text-white font-bold text-2xl md:text-3xl">
														&#8377;1
													</span>
												</div>

												{/* Arms */}
												<div className="absolute -left-6 top-1/2 transform -translate-y-1/2">
													<div className="w-8 h-3 bg-[#FFD700] rounded-full rotate-12"></div>
													<div className="w-4 h-4 bg-[#FFD700] rounded-full mt-1 ml-6"></div>
												</div>
												<div className="absolute -right-6 top-1/2 transform -translate-y-1/2 rotate-12">
													<div className="w-8 h-3 bg-[#FFD700] rounded-full -rotate-12"></div>
													<div className="w-4 h-4 bg-[#FFD700] rounded-full mt-1"></div>
												</div>

												{/* Legs */}
												<div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
													<div className="flex space-x-4">
														<div className="flex flex-col items-center">
															<div className="w-3 h-8 bg-[#FFD700] rounded-full"></div>
															<div className="w-5 h-3 bg-[#FFD700] rounded-full"></div>
														</div>
														<div className="flex flex-col items-center">
															<div className="w-3 h-8 bg-[#FFD700] rounded-full"></div>
															<div className="w-5 h-3 bg-[#FFD700] rounded-full"></div>
														</div>
													</div>
												</div>
											</div>

											{/* Glow Effect */}
											<div className="absolute inset-0 bg-[#FFD700] rounded-full blur-xl opacity-30 animate-pulse"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Carousel.Slide>
				))}
			</Carousel>
		</div>
	);
}
