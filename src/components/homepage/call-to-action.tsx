"use client";
import Image from "@/components/image";
import { STATIC_IMAGE_HOST } from "@/config/config";
import { useRef, useState } from "react";
import { useAnimationFrame, motion } from "motion/react";
import { HandHeart } from "lucide-react";
import Link from "next/link";

const rotatingWords = ["future", "world", "society", "tomorrow", "community"];

const callToActions = [
	{
		title: "Save Life",
		img: `${STATIC_IMAGE_HOST}home-page/emergencies/Heart-Disease-2.webp`,
		route: "/cure-aid",
	},
	{
		title: "Mission Hunger",
		img: `${STATIC_IMAGE_HOST}home-page/emergencies/homeless.webp`,
		route: "/hunger-aid",
	},
	{
		title: "Mission Education",
		img: `${STATIC_IMAGE_HOST}home-page/aids/shiksha.webp`,
		route: "/shiksha-aid",
	},
	{
		title: "Women Empowerment",
		img: `${STATIC_IMAGE_HOST}home-page/aids/sakhi.webp`,
		route: "/sakhi-aid",
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
		<h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-sky-900 tracking-tight">
			Together, we can build a better{" "}
			<motion.span
				key={word}
				initial={{ opacity: 0, y: -15 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 15 }}
				transition={{ duration: 0.6, ease: "easeOut" }}
				className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-sky-500"
			>
				{word}
			</motion.span>
		</h2>
	);
}

export default function CallToActionSection() {
	return (
		<section className="bg-gradient-to-br from-gray-100 via-sky-200 to-sky-800 animate-gradient-slow text-white px-4 py-10 sm:px-10 lg:px-20">
			<div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto">
				{/* Left Text Content */}
				<div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left">
					<p className="text-md tracking-[0.2em] mb-4 uppercase text-stone-800 font-semibold">
						Transforming Lives Together
						<span className="block mx-auto lg:mx-0 mt-1 w-20 h-[3px] bg-gradient-to-r from-sky-400 to-sky-400 rounded-full"></span>
					</p>

					<CallToActionQuote />

					<p className="text-slate-700 mt-4 mb-8 text-base sm:text-lg leading-relaxed">
						Your support delivers food, education, healthcare, and
						hope. Join us in lighting up lives-one act of kindness
						at a time.
					</p>

					<div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
						<Link
							href="/donate"
							className="relative flex items-center gap-2 px-7 py-3 rounded-full text-sm font-bold transition-all duration-300
              bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-lg
              hover:scale-105 hover:shadow-2xl overflow-hidden group"
						>
							<span className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>
							<span className="relative z-10">Donate Now</span>
							<HandHeart className="w-5 h-6 text-white relative z-10 transition duration-300 group-hover:text-sky-600 group-hover:scale-110 animate-pulse" />
						</Link>
					</div>
				</div>

				{/* Right Masonry Image Grid */}
				<div className="w-full lg:w-1/2 columns-2 gap-4 space-y-4">
					{callToActions.map((item, idx) => (
						<motion.div
							key={idx}
							className="overflow-hidden rounded-xl break-inside-avoid shadow-md cursor-pointer group"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: idx * 0.15 }}
							whileHover={{ scale: 1.05 }}
						>
							<Link href={item.route}>
								<Image
									src={item.img}
									alt={item.title}
									width={400}
									height={180 + idx * 20}
									className="w-full h-auto object-cover rounded-lg group-hover:brightness-110 group-hover:contrast-110 transition-all duration-300"
								/>
							</Link>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
