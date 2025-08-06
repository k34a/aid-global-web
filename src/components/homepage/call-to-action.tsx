"use client";
import Image from "@/components/image";
import { STATIC_IMAGE_HOST } from "@/config/config";
import { useRef, useState } from "react";
import { useAnimationFrame, motion } from "motion/react";
import {
	HandHeart,
	IndianRupee,
	Users,
	Heart,
	TrendingUp,
	Star,
	Sparkles,
	ArrowRight,
	CheckCircle,
} from "lucide-react";
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
		<section className="bg-gradient-to-br from-sky-50 to-blue-50 py-16 px-4 sm:px-6 lg:px-8">
			<div className="max-w-6xl mx-auto">
				<div className="text-center mb-12">
					<div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-sm border border-sky-200/50">
						<Users className="w-4 h-4 text-sky-600" />
						Join The Movement
					</div>
					<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
						The{" "}
						<span className="inline-flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">
							<IndianRupee className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
							100 Club
						</span>
					</h2>
					<p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
						Big hearts, bigger impact. Join thousands of everyday
						heroes who donate just{" "}
						<span className="inline-flex items-center gap-1 font-semibold text-sky-600">
							<IndianRupee className="w-5 h-5" />
							100 monthly
						</span>{" "}
						to create sustainable change.
					</p>
				</div>

				<div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
					<div className="relative">
						<Image
							src={`${STATIC_IMAGE_HOST}home-page/aids/shiksha.webp`}
							alt="100 Club Impact"
							width={500}
							height={350}
							className="w-full h-auto rounded-2xl shadow-lg object-cover"
						/>
						<div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-lg border border-sky-100">
							<div className="text-center">
								<div className="text-2xl font-bold text-sky-600 flex items-center justify-center gap-1">
									<IndianRupee className="w-6 h-6" />
									100
								</div>
								<div className="text-sm text-gray-600">
									per month
								</div>
							</div>
						</div>
					</div>

					<div className="space-y-8">
						<div>
							<h3 className="text-2xl font-bold text-gray-900 mb-4">
								Why Join The 100 Club?
							</h3>
							<p className="text-gray-600 text-lg leading-relaxed">
								For less than the cost of a daily coffee, you
								can become part of a movement that transforms
								lives. Your Rs.100 monthly contribution creates
								ripples of positive change across communities.
							</p>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
							<div className="text-center p-6 bg-white rounded-xl shadow-sm border border-sky-100">
								<div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
									<Heart className="w-6 h-6 text-sky-600" />
								</div>
								<h4 className="font-semibold text-gray-900 mb-2">
									Small Amount
								</h4>
								<p className="text-sm text-gray-600 flex items-center justify-center gap-1">
									Just <IndianRupee className="w-4 h-4" />
									100/month
								</p>
							</div>

							<div className="text-center p-6 bg-white rounded-xl shadow-sm border border-sky-100">
								<div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
									<TrendingUp className="w-6 h-6 text-sky-600" />
								</div>
								<h4 className="font-semibold text-gray-900 mb-2">
									Big Impact
								</h4>
								<p className="text-sm text-gray-600">
									10,000+ lives changed
								</p>
							</div>

							<div className="text-center p-6 bg-white rounded-xl shadow-sm border border-sky-100">
								<div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
									<Users className="w-6 h-6 text-sky-600" />
								</div>
								<h4 className="font-semibold text-gray-900 mb-2">
									Community
								</h4>
								<p className="text-sm text-gray-600">
									5,000+ members
								</p>
							</div>
						</div>

						<div className="bg-white rounded-xl p-6 shadow-sm border border-sky-100">
							<div className="grid grid-cols-2 gap-6 text-center">
								<div>
									<div className="text-2xl font-bold text-sky-600 flex items-center justify-center gap-1">
										50L+
									</div>
									<div className="text-sm text-gray-600">
										Total Raised
									</div>
								</div>
								<div>
									<div className="text-2xl font-bold text-sky-600">
										5,000+
									</div>
									<div className="text-sm text-gray-600">
										Active Members
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="text-center">
					<Link
						href="/100rupee"
						className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:from-sky-600 hover:to-sky-700"
					>
						<IndianRupee className="w-6 h-6" />
						Join The 100 Club Today
					</Link>
					<div className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-gray-500">
						<span className="flex items-center gap-1">
							<CheckCircle className="w-4 h-4 text-green-500" />
							Tax benefits under 80G
						</span>
						<span className="flex items-center gap-1">
							<CheckCircle className="w-4 h-4 text-green-500" />
							Cancel anytime
						</span>
						<span className="flex items-center gap-1">
							<CheckCircle className="w-4 h-4 text-green-500" />
							Secure donations
						</span>
					</div>
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
