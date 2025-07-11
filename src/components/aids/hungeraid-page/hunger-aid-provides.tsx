"use client";
import Image from "next/image";
import { CircleDotDashed } from "lucide-react";
import { cards } from "@/components/aids/hungeraid-page/provides";

export default function HungerAidProvides() {
	return (
		<section className="py-8 px-2 sm:py-12 sm:px-4 bg-white">
			<h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 flex items-center justify-center gap-2 mb-8 sm:mb-10 text-center">
				What HungerAid provides?
			</h2>
			<div className="max-w-7xl mx-auto grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
				{cards.map((card, index) => (
					<div
						key={index}
						className="shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-gradient-to-r from-orange-100 to-orange-300 w-full max-w-xs sm:max-w-sm flex flex-col"
					>
						<div className="relative h-48 sm:h-52 w-full">
							<Image
								src={card.image}
								alt={card.title}
								sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
								fill
								className="object-cover"
							/>
						</div>
						<div className="p-4 sm:p-6 flex-1 flex flex-col">
							<h3 className="text-lg sm:text-xl text-center text-gray-800 font-extrabold">
								{card.title}
							</h3>
							<hr className="my-2 sm:my-3 border-gray-200 w-2/3 mx-auto" />
							<p className="text-sm sm:text-md font-serif text-gray-600 font-semibold mb-2 sm:mb-3">
								{card.description}
							</p>
							<ul className="pl-4 sm:pl-5 text-md sm:text-md font-serif space-y-1 text-gray-600 font-semibold mb-2 sm:mb-3">
								{card.bullets.map((point, i) => (
									<li
										key={i}
										className="flex items-start gap-2"
									>
										<CircleDotDashed
											className="w-4 h-4 mt-1 text-blue-800"
											strokeWidth={3.5}
										/>
										<span>{point}</span>
									</li>
								))}
							</ul>
							<p className="text-base sm:text-lg text-gray-700 mt-auto font-bold">
								{card.footer}
							</p>
						</div>
					</div>
				))}
				{/* Custom 6th card */}
				<div className="relative shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-orange-100 flex flex-col items-center justify-center min-h-[220px] sm:min-h-[320px] w-full max-w-xs sm:max-w-sm">
					<Image
						src="https://website-content.aidglobal.ngo/hunger-aid/intro.jpg"
						alt="Your contribution creates a change"
						fill
						sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
						className="object-cover z-0"
					/>
					{/* Orange overlay */}
					<div className="absolute inset-0 bg-orange-100 opacity-80 z-10"></div>
					{/* Content */}
					<div className="relative z-20 flex flex-col items-center justify-center h-full w-full p-4 sm:p-6">
						<h3 className="text-xl sm:text-2xl md:text-4xl font-serif text-center text-gray-800 font-semibold mb-2 sm:mb-4 mx-2 sm:mx-10 leading-tight">
							Your <br />
							contribution <br />
							creates a <br />
							change
						</h3>
						<button
							aria-label="Donate to HungerAid"
							className="bg-orange-500 hover:bg-orange-800 shadow-lg hover:scale-105 hover:shadow-xl text-white text-base sm:text-2xl md:text-4xl font-serif font-bold py-2 px-4 sm:px-6 rounded shadow mt-6 sm:mt-10 transition-all"
						>
							Donate now
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}
