"use client";

import {
	BookOpen,
	Utensils,
	Heart,
	Eye,
	Home,
	Users,
	Sparkles,
	ChevronLeft,
	ChevronRight,
	IndianRupee,
	Target,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Image from "@/components/image";
import { STATIC_IMAGE_HOST } from "@/config/config";

const aidPrograms = [
	{
		icon: BookOpen,
		title: "ShikshaAid",
		description:
			"Provides books, school bags, stationery, and digital learning to children in underserved communities.",
		color: "text-blue-600",
		bgColor: "bg-blue-50",
		borderColor: "border-blue-200",
		image: `${STATIC_IMAGE_HOST}home-page/aids/shiksha.webp`,
	},
	{
		icon: Utensils,
		title: "HungerAid",
		description:
			"Feeds a hungry child or family with hot meals and ration kits.",
		color: "text-orange-600",
		bgColor: "bg-orange-50",
		borderColor: "border-orange-200",
		image: `${STATIC_IMAGE_HOST}hunger-aid/intro.webp`,
	},
	{
		icon: Heart,
		title: "EnableAid",
		description:
			"Empowers people with disabilities through tools, mobility aids, and skill development.",
		color: "text-purple-600",
		bgColor: "bg-purple-50",
		borderColor: "border-purple-200",
		image: `${STATIC_IMAGE_HOST}enable-aid/intro.webp`,
	},
	{
		icon: Sparkles,
		title: "CureAid",
		description:
			"Delivers access to medical checkups, medicines, and healthcare awareness.",
		color: "text-green-600",
		bgColor: "bg-green-50",
		borderColor: "border-green-200",
		image: `${STATIC_IMAGE_HOST}home-page/aids/cure.webp`,
	},
	{
		icon: Eye,
		title: "VisionAid",
		description:
			"Conducts eye screenings and provides free spectacles to those in need.",
		color: "text-indigo-600",
		bgColor: "bg-indigo-50",
		borderColor: "border-indigo-200",
		image: `${STATIC_IMAGE_HOST}home-page/aids/vision.webp`,
	},
	{
		icon: Home,
		title: "GharAid",
		description:
			"Offers basic shelter support, hygiene kits, and emergency care to the homeless.",
		color: "text-red-600",
		bgColor: "bg-red-50",
		borderColor: "border-red-200",
		image: `${STATIC_IMAGE_HOST}home-page/aids/ghar.webp`,
	},
	{
		icon: Users,
		title: "SakhiAid",
		description:
			"Supports women through menstrual kits, entrepreneurship programs, and gender awareness drives.",
		color: "text-pink-600",
		bgColor: "bg-pink-50",
		borderColor: "border-pink-200",
		image: `${STATIC_IMAGE_HOST}home-page/aids/sakhi.webp`,
	},
];

export default function ImpactSection() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isAutoScrolling, setIsAutoScrolling] = useState(true);
	const carouselRef = useRef<HTMLDivElement>(null);
	const autoScrollInterval = useRef<NodeJS.Timeout | undefined>(undefined);

	// Auto-scroll functionality
	useEffect(() => {
		if (isAutoScrolling) {
			autoScrollInterval.current = setInterval(() => {
				setCurrentIndex(
					(prevIndex) => (prevIndex + 1) % aidPrograms.length,
				);
			}, 4000); // Change slide every 4 seconds
		}

		return () => {
			if (autoScrollInterval.current) {
				clearInterval(autoScrollInterval.current);
			}
		};
	}, [isAutoScrolling]);

	// Pause auto-scroll on hover
	const handleMouseEnter = () => setIsAutoScrolling(false);
	const handleMouseLeave = () => setIsAutoScrolling(true);

	const scrollToIndex = (index: number) => {
		setCurrentIndex(index);
		if (carouselRef.current) {
			const cardWidth =
				carouselRef.current.scrollWidth / aidPrograms.length;
			carouselRef.current.scrollTo({
				left: index * cardWidth,
				behavior: "smooth",
			});
		}
	};

	const scrollNext = () => {
		const nextIndex = (currentIndex + 1) % aidPrograms.length;
		scrollToIndex(nextIndex);
	};

	const scrollPrev = () => {
		const prevIndex =
			currentIndex === 0 ? aidPrograms.length - 1 : currentIndex - 1;
		scrollToIndex(prevIndex);
	};

	return (
		<section className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center mb-16">
					<div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
						<Target className="w-4 h-4" />
						<span>Your Impact</span>
					</div>
					<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
						Where Does Your{" "}
						<span className="inline-flex items-center gap-1 text-blue-600">
							<IndianRupee className="w-8 h-8" />
							100
						</span>{" "}
						Go?
					</h2>
					<p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
						Every rupee is carefully used to strengthen the
						foundation&apos;s mission-driven programs. Your{" "}
						<span className="inline-flex items-center gap-1 font-semibold">
							<IndianRupee className="w-4 h-4" />
							100
						</span>{" "}
						helps cover aid materials, transport, outreach, and
						delivery, ensuring that help reaches the last mile -
						fast and with dignity.
					</p>
				</div>

				{/* Carousel Container */}
				<div className="relative mb-16">
					{/* Navigation Buttons */}
					<button
						onClick={scrollPrev}
						className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-600 hover:text-gray-900 p-3 rounded-full shadow-lg border border-gray-200 transition-all duration-300 hover:scale-110"
						aria-label="Previous program"
					>
						<ChevronLeft className="w-6 h-6" />
					</button>

					<button
						onClick={scrollNext}
						className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-600 hover:text-gray-900 p-3 rounded-full shadow-lg border border-gray-200 transition-all duration-300 hover:scale-110"
						aria-label="Next program"
					>
						<ChevronRight className="w-6 h-6" />
					</button>

					{/* Carousel */}
					<div
						ref={carouselRef}
						className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
						style={{
							scrollbarWidth: "none",
							msOverflowStyle: "none",
						}}
					>
						{aidPrograms.map((program, index) => (
							<div
								key={index}
								className={`${program.bgColor} ${program.borderColor} border-2 rounded-xl p-6 min-w-[350px] max-w-[350px] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden`}
								onClick={() => scrollToIndex(index)}
							>
								{/* Program Image */}
								<div className="relative mb-4 rounded-lg overflow-hidden h-32">
									<Image
										src={program.image}
										alt={`${program.title} program`}
										width={350}
										height={128}
										className="w-full h-full object-cover"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
									<div
										className={`absolute top-3 right-3 ${program.color} p-2 rounded-lg bg-white/90 shadow-sm`}
									>
										<program.icon className="w-5 h-5" />
									</div>
								</div>

								<div className="space-y-3">
									<h3
										className={`${program.color} font-bold text-lg mb-2`}
									>
										{program.title}
									</h3>
									<p className="text-gray-700 text-sm leading-relaxed">
										{program.description}
									</p>
								</div>
							</div>
						))}
					</div>

					{/* Dots Indicator */}
					<div className="flex justify-center mt-8 space-x-2">
						{aidPrograms.map((_, index) => (
							<button
								key={index}
								onClick={() => scrollToIndex(index)}
								className={`w-3 h-3 rounded-full transition-all duration-300 ${
									index === currentIndex
										? "bg-blue-600 scale-125"
										: "bg-gray-300 hover:bg-gray-400"
								}`}
								aria-label={`Go to slide ${index + 1}`}
							/>
						))}
					</div>
				</div>
			</div>

			{/* Custom CSS for hiding scrollbar */}
			<style jsx>{`
				.scrollbar-hide::-webkit-scrollbar {
					display: none;
				}
			`}</style>
		</section>
	);
}
