"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { aids } from "@/components/homepage/data/aids";
import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";

const AidsSection = () => {
	const sectionRef = useRef<HTMLDivElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);

	const [scrollProgress, setScrollProgress] = useState(0);
	const [maxTranslate, setMaxTranslate] = useState(0);

	useEffect(() => {
		const calculateMaxTranslate = () => {
			if (!trackRef.current) return;
			const scrollWidth = trackRef.current.scrollWidth;
			const viewportWidth = window.innerWidth;
			const lastCard = trackRef.current.lastElementChild as HTMLElement;

			// Calculate the padding needed to bring the last card fully into view
			const buffer = lastCard
				? lastCard.offsetWidth + 32 /* margin */
				: 0;

			// Remove only the difference, not full viewport
			const total = scrollWidth - (viewportWidth - buffer);
			setMaxTranslate(total > 0 ? total : 0); // Prevent negative scroll
		};

		calculateMaxTranslate();
		window.addEventListener("resize", calculateMaxTranslate);
		return () =>
			window.removeEventListener("resize", calculateMaxTranslate);
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			if (!sectionRef.current) return;

			const rect = sectionRef.current.getBoundingClientRect();
			const sectionHeight = rect.height;

			const progress = Math.min(
				Math.max(0, 1 - rect.top / sectionHeight),
				1,
			);
			setScrollProgress(progress);
		};

		handleScroll();
		window.addEventListener("scroll", handleScroll);
		window.addEventListener("resize", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleScroll);
		};
	}, []);

	const translateX = Math.min(
		Math.max(scrollProgress * maxTranslate, 0),
		maxTranslate,
	);

	return (
		<section
			ref={sectionRef}
			className="relative w-full min-h-[400px] top-15 justify-center items-center"
		>
			<div className="sticky top-0 h-full overflow-hidden bg-white z-10 flex items-center">
				<div
					ref={trackRef}
					className="flex items-center pl-[8vw] pr-[8vw] transition-transform duration-75 ease-out"
					style={{
						transform: `translateX(-${translateX}px)`,
						willChange: "transform",
					}}
				>
					{aids.map((item) => (
						<motion.div
							key={item.id}
							initial={{ opacity: 0, scale: 0.95 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.3 }}
							className="relative bg-white rounded-2xl shadow-lg flex flex-col transition-transform duration-300 ease-in-out hover:scale-95 border-2 
								min-w-[260px] max-w-xs w-full md:min-w-[320px] md:max-w-sm lg:min-w-[350px] lg:max-w-md mx-2"
						>
							<div className="relative min-h-[220px] md:min-h-[260px] lg:min-h-[300px] w-full rounded-2xl overflow-hidden">
								<Image
									src={item.image}
									alt={item.title}
									className="object-cover brightness-50"
									fill
									sizes="(max-width: 640px) 90vw, (max-width: 768px) 80vw, (max-width: 1024px) 50vw, 33vw"
								/>
								<div className="absolute inset-0 flex flex-col justify-between p-2 md:p-6">
									<h1 className="text-white text-lg md:text-xl font-bold mb-2">
										{item.title}
									</h1>
									<p className="text-gray-300 text-xs md:text-base mb-3">
										{item.desc}
									</p>

									<div className="mt-4 flex flex-wrap gap-2 items-center justify-between">
										{/* Donate Button */}
										<Link
											href="/donate"
											className="px-2 py-2 rounded-full text-sm inline-flex items-center gap-2 border border-white text-white font-bold hover:bg-sky-600/60 hover:text-black transition-colors duration-300"
										>
											<Heart className="w-4 h-4" />
											Donate
										</Link>

										{/* Read More Button */}
										<Link
											href={item.link}
											className="group inline-flex items-center gap-2 rounded-full border border-black/10 bg-sky-400 font-bold backdrop-blur-md px-2 py-2 text-sm  text-black shadow-sm transition-all duration-300 hover:bg-white/40 hover:text-white"
										>
											<span className="transition-all duration-300 group-hover:tracking-wider">
												Read More
											</span>
											<ArrowRight className="w-4 h-4 transition-transform duration-300 transform group-hover:translate-x-1" />
										</Link>
									</div>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default AidsSection;
