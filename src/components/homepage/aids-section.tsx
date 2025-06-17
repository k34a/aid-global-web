"use client";

import Image from "next/image";
import { useRef } from "react";
import { ChevronsRight, ChevronsLeft } from "lucide-react";
import { aids } from "@/config/aids";

const AidsSection = () => {
	const scrollRef = useRef<HTMLDivElement>(null);
	const handleScroll = (direction: "left" | "right") => {
		const scrollAmount = 400;
		if (scrollRef.current) {
			scrollRef.current.scrollBy({
				left: direction == "left" ? -scrollAmount : scrollAmount,
				behavior: "smooth",
			});
		}
	};
	return (
		<div className="relative my-6 sm:my-8 md:my-10 mx-2 sm:mx-4 md:mx-10 lg:mx-20">
			{/* Scroll Buttons */}
			<button
				onClick={() => handleScroll("left")}
				className="absolute -left-2 sm:-left-3 md:-left-5 top-1/2 z-10 -translate-y-1/2 bg-white p-1.5 sm:p-2 shadow-xl rounded-full hover:scale-110 hover:bg-blue-100 transition"
			>
				<ChevronsLeft className="text-blue-600 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
			</button>

			<button
				onClick={() => handleScroll("right")}
				className="absolute -right-2 sm:-right-3 md:-right-5 top-1/2 z-10 -translate-y-1/2 bg-white p-1.5 sm:p-2 shadow-xl rounded-full hover:scale-110 hover:bg-blue-100 transition"
			>
				<ChevronsRight className="text-blue-600 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
			</button>

			<div
				ref={scrollRef}
				className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-12 overflow-x-auto no-scrollbar my-6 sm:my-8 md:my-10 mx-2 sm:mx-4 md:mx-10 lg:mx-20 px-2 sm:px-4"
			>
				{aids.map((item) => (
					<div
						key={item.id}
						className="min-w-[280px] sm:min-w-[320px] md:min-w-[350px] max-w-xs flex-shrink-0 bg-white rounded-2xl sm:rounded-3xl md:rounded-4xl shadow-lg flex flex-col transition-transform duration-300 ease-in-out hover:scale-95"
					>
						<div
							key={item.id}
							className="relative min-h-[250px] sm:min-h-[280px] md:min-h-[300px] max-h-[350px] sm:max-h-[380px] md:max-h-[400px] w-full rounded-t-xl overflow-hidden"
						>
							<Image
								src={item.image}
								alt={item.title}
								className="object-cover brightness-50"
								fill={true}
								sizes="(max-width: 640px) 90vw, (max-width: 768px) 80vw, (max-width: 1024px) 50vw, 33vw"
							/>
							<div className="absolute inset-0 flex flex-col justify-between p-3 sm:p-4 md:p-6 align-items-center">
								<h1 className="text-white drop-shadow-[0_0_8px_white] text-lg sm:text-xl md:text-2xl font-bold mb-2">
									{item.title}
								</h1>
								<p className="text-white text-xs sm:text-sm md:text-base mb-3 sm:mb-4">
									{item.desc}
								</p>
								{item.link ? (
									<a href={item.link} className="self-start">
										<button className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-semibold text-white text-xs sm:text-sm md:text-sm inline-flex items-center gap-1 sm:gap-2 shadow-2xl border-2 border-white hover:bg-blue-600 transition-colors duration-300 cursor-pointer">
											<ChevronsRight className="bg-blue-600 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full p-0.5 sm:p-1 text-white" />
											{item.button}
										</button>
									</a>
								) : (
									<button className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-semibold text-white text-xs sm:text-sm md:text-sm inline-flex items-center gap-1 sm:gap-2 shadow-2xl border-2 border-white hover:bg-blue-600 transition-colors duration-300 cursor-pointer self-start">
										<ChevronsRight className="bg-blue-600 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full p-0.5 sm:p-1 text-white" />
										{item.button}
									</button>
								)}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default AidsSection;
