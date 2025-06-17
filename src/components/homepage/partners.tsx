"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { partners } from "@/config/partners";

type Partner = {
	name: string;
	logo: string;
};

export default function PartnersSection() {
	const scrollRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const scroll = scrollRef.current;
		let interval: NodeJS.Timeout;

		if (scroll) {
			interval = setInterval(() => {
				if (
					scroll.scrollLeft + scroll.clientWidth >=
					scroll.scrollWidth
				) {
					scroll.scrollTo({ left: 0, behavior: "smooth" });
				} else {
					scroll.scrollBy({ left: 200, behavior: "smooth" });
				}
			}, 4000); // Scroll every 4 seconds
		}

		return () => clearInterval(interval);
	}, []);

	return (
		<section className="bg-[#F0F8FF] py-12 px-4 sm:px-6 md:px-16">
			<div className="max-w-6xl mx-auto text-center">
				<h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-4">
					Our Trusted Partners
				</h2>
				<p className="text-sm sm:text-base text-blue-800 mb-8 max-w-2xl mx-auto">
					We collaborate with leading organizations to create lasting
					change and expand our impact together.
				</p>
				<div className="relative overflow-hidden py-4 rounded-xl ">
					<div
						ref={scrollRef}
						className="flex gap-6 whitespace-nowrap overflow-x-auto scroll-smooth scrollbar-hide px-4 py-4 "
					>
						{partners
							.concat(partners)
							.map((partner: Partner, index: number) => (
								<div
									key={index}
									className="inline-block w-48 flex-shrink-0 bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 hover:rotate-[1deg]"
								>
									<div className="relative h-16 w-full flex items-center justify-center">
										<Image
											src="/logo.png"
											alt={partner.name}
											width={100}
											height={50}
											className="object-contain max-h-12 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(0,115,255,0.5)]"
										/>
									</div>
									<p className="text-sm text-blue-900 font-semibold mt-2 truncate">
										{partner.name}
									</p>
								</div>
							))}
					</div>
					<div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-blue-50 to-transparent pointer-events-none" />
					<div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-blue-50 to-transparent pointer-events-none" />
				</div>
			</div>
		</section>
	);
}
