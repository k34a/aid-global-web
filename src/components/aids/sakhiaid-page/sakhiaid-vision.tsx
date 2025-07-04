"use client";

import Image from "next/image";
import {
	GraduationCap,
	HandCoins,
	BookOpenCheck,
	Users,
	HandHeart,
} from "lucide-react";

export default function SakhiAidVision() {
	const bulletPoints = [
		{
			icon: GraduationCap,
			text: "Girls talk freely about periods.",
		},
		{
			icon: HandCoins,
			text: "Women earn from their skills.",
		},
		{
			icon: BookOpenCheck,
			text: "Mothers educate their daughters.",
		},
		{
			icon: Users,
			text: "Families stand with empowered women.",
		},
	];

	return (
		<section className="relative">
			<div className="absolute inset-0 -z-10">
				<Image
					src="/sakhi-aid/vision.webp"
					alt="sakhi-aid vision"
					fill
					className="object-cover"
					sizes="100vw"
				/>
			</div>

			{/* Light orange overlay */}
			<div className="absolute inset-0 bg-rose-100/80 backdrop-brightness-95"></div>

			{/* Content */}
			<div className="relative max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto px-2 sm:px-4 md:px-6 py-8 sm:py-12 md:py-16 text-center">
				<h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 flex items-center justify-center gap-2 mb-3 sm:mb-4">
					Our Vision
				</h2>

				<p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-800 font-medium mb-4 sm:mb-8">
					We dream of a society where:
				</p>

				<ul className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 md:gap-5 justify-center items-center max-w-full sm:max-w-2xl mx-auto mb-2">
					{bulletPoints.map(({ icon: Icon, text }, index) => (
						<li
							key={index}
							className="flex gap-2 sm:gap-3 items-center text-slate-700 font-bold text-base sm:text-lg md:text-xl justify-center"
						>
							<Icon
								className="text-rose-800 mt-1 font-extrabold shrink-0 fill-rose-800"
								size={22}
							/>
							<span className="font-serif whitespace-normal">
								{text}
							</span>
						</li>
					))}
				</ul>
				<p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-2xl font-bold text-rose-900">
					SakhiAid is not just a program. It&#39;s a movement to make
					every woman strong, skilled, and self-reliant.
				</p>
				<div className="flex justify-center w-full mt-8 sm:mt-10">
					<button
						aria-label="Donate to SakhiAid"
						className="flex items-center justify-center gap-2 px-5 py-2 sm:px-8 sm:py-3 rounded-full text-base sm:text-lg font-semibold transition-all duration-300
          bg-gradient-to-r from-rose-600 to-rose-800 text-white shadow-lg
          group hover:scale-105 hover:shadow-xl relative overflow-hidden"
					>
						<span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>

						<span className="relative z-10 group-hover:text-rose-600">
							Contribute Now
						</span>

						<HandHeart className="w-5 h-6 text-white font-bold relative z-10 transition duration-300 group-hover:text-rose-600 group-hover:scale-110 animate-pulse" />
					</button>
				</div>
			</div>
		</section>
	);
}
