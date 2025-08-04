"use client";
import Image from "next/image";
import { STATIC_IMAGE_HOST } from "@/config/config";
import { useRef, useState } from "react";
import { useAnimationFrame, motion } from "motion/react";
import { HandHeart, IndianRupee, Users, Heart, TrendingUp } from "lucide-react";
import Link from "next/link";

const rotatingWords = ["future", "world", "society", "tomorrow", "community"];

const callToActions = [
	{
		title: "Save Life",
		img: `${STATIC_IMAGE_HOST}home-page/emergencies/Heart-Disease-2.webp`,
	},
	{
		title: "Mission Hunger",
		img: `${STATIC_IMAGE_HOST}home-page/emergencies/homeless.webp`,
	},
	{
		title: "Mission Education",
		img: `${STATIC_IMAGE_HOST}home-page/aids/shiksha.webp`,
	},
	{
		title: "Women Empowerment",
		img: `${STATIC_IMAGE_HOST}home-page/aids/sakhi.webp`,
	},
];

export function CallToActionQuote() {
	const [index, setIndex] = useState(0);
	const lastChange = useRef(0);

	useAnimationFrame((time) => {
		if (time - lastChange.current > 3000) {
			setIndex((prev) => (prev + 1) % rotatingWords.length);
			lastChange.current = time;
		}
	});

	const word = rotatingWords[index] + ".";

	return (
		<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-indigo-900">
			Together, we can build a better{" "}
			<motion.span
				key={word}
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 20 }}
				transition={{ duration: 0.5 }}
				className="inline-block text-sky-600"
			>
				{word}
			</motion.span>
		</h2>
	);
}

function HundredClubSection() {
	return (
		<section className="bg-gradient-to-br from-blue-50 to-sky-100 py-16 px-4 sm:px-6 lg:px-8">
			<div className="max-w-6xl mx-auto">
				<div className="text-center mb-12">
					<div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
						<Users className="w-4 h-4" />
						Join the Movement
					</div>
					<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
						The{" "}
						<span className="inline-flex items-center gap-1 text-blue-600">
							<IndianRupee className="w-6 h-6" />
							100 Club
						</span>
					</h2>
					<p className="text-lg text-gray-600 max-w-3xl mx-auto flex justify-center items-center gap-1">
						Big hearts, bigger impact. Join thousands of everyday
						heroes who donate just
						<IndianRupee className="w-5 h-5 inline-block text-blue-600" />
						100 monthly to create sustainable change.
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-8 mb-12">
					<div className="text-center">
						<div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
							<Heart className="w-8 h-8 text-blue-600" />
						</div>
						<h3 className="text-xl font-semibold text-gray-900 mb-2">
							Small Amount
						</h3>
						<p className="text-gray-600 flex items-center justify-center gap-1">
							Just{" "}
							<IndianRupee className="w-4 h-4 inline-block text-blue-600" />
							100 per month - less than a cup of coffee
						</p>
					</div>
					<div className="text-center">
						<div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
							<TrendingUp className="w-8 h-8 text-blue-600" />
						</div>
						<h3 className="text-xl font-semibold text-gray-900 mb-2">
							Big Impact
						</h3>
						<p className="text-gray-600">
							Collective power creates lasting change
						</p>
					</div>
					<div className="text-center">
						<div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
							<Users className="w-8 h-8 text-blue-600" />
						</div>
						<h3 className="text-xl font-semibold text-gray-900 mb-2">
							Community
						</h3>
						<p className="text-gray-600">
							Join a nationwide network of changemakers
						</p>
					</div>
				</div>

				<div className="text-center">
					<Link
						href="/100rupee"
						className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
					>
						<IndianRupee className="w-6 h-6" />
						Join The 100 Club Today
					</Link>
					<p className="text-sm text-gray-500 mt-4">
						Cancel anytime - Tax benefits available - Secure
						payments
					</p>
				</div>
			</div>
		</section>
	);
}

export default function CallToActionSection() {
	return (
		<>
			<section className="sm:bg-gradient-to-br sm:from-stone-300 sm:to-sky-800 bg-gradient-to-b from-stone-300 to-sky-800 text-white px-4 py-6 sm:px-10 lg:px-20">
				<div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto">
					{/* Left Text Content */}
					<div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left">
						<p className="text-md tracking-widest mb-4 uppercase text-stone-800">
							Transforming Lives Together
							<span className="block mx-auto lg:mx-0 mt-1 w-16 h-[3px] bg-indigo-400 rounded-full"></span>
						</p>

						<CallToActionQuote />

						<p className="text-slate-600 mt-4 mb-6 text-base sm:text-lg">
							Your support delivers food, education, healthcare,
							and hope. Join us in lighting up lives, one act of
							kindness at a time.
						</p>

						<div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
							<Link
								href="/donate"
								className="flex items-center gap-2 px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300
								bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-lg
								group hover:scale-105 hover:shadow-xl relative overflow-hidden"
							>
								<span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>

								<span className="relative z-10 group-hover:text-sky-600">
									Donate Now
								</span>

								<HandHeart className="w-5 h-6 text-white relative z-10 transition duration-300 group-hover:text-sky-600 group-hover:scale-110 animate-pulse" />
							</Link>

							<Link
								href="/100rupee"
								className="flex items-center gap-2 px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300
								bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg
								group hover:scale-105 hover:shadow-xl relative overflow-hidden"
							>
								<span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>

								<span className="relative z-10 group-hover:text-blue-600">
									Join The 100 Club
								</span>

								<IndianRupee className="w-5 h-6 text-white relative z-10 transition duration-300 group-hover:text-blue-600 group-hover:scale-110 animate-pulse" />
							</Link>
						</div>
					</div>

					{/* Right Masonry Image Grid */}
					<div className="w-full lg:w-1/2 columns-2 gap-3 space-y-3">
						{callToActions.map((item, idx) => (
							<div
								key={idx}
								className="overflow-hidden rounded-xl break-inside-avoid shadow-md"
							>
								<Image
									src={item.img}
									alt={item.title}
									width={400}
									height={180 + idx * 20}
									className="w-full h-auto object-cover rounded-lg"
								/>
							</div>
						))}
					</div>
				</div>
			</section>
			<HundredClubSection />
		</>
	);
}
