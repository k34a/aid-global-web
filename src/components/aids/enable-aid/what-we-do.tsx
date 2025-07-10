"use client";

import Image from "next/image";
import InfoCard from "@/components/aids/enable-aid/info-card";
import { enableAidData } from "@/components/aids/enable-aid/key-initiatives";

export default function WhatWeDo() {
	return (
		<section className="flex flex-col">
			<div className="relative w-full h-[180px] xs:h-[260px] sm:h-[320px] md:h-[400px]">
				<Image
					src="/enable-aid/background.webp"
					alt="what we do image"
					fill
					sizes="100vw"
				/>
			</div>
			<div className="bg-gradient-to-b from-[#f8f2fc] to-[#fbeffc] py-3 sm:py-4 md:py-6 px-1 xs:px-2 md:px-6 -mt-10 xs:-mt-16 sm:-mt-20 md:-mt-24 relative z-10 rounded-2xl shadow-xl mx-2 xs:mx-4 sm:mx-8 md:mx-20">
				<div className="text-center mb-2 sm:mb-8 relative">
					<h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-[#003944] mb-2 sm:mb-3 inline-block relative">
						WHAT WE DO
						<span className="block h-1 w-12 sm:w-20 bg-[#8b3a2b] mx-auto mt-2 rounded-bl-sm rounded-tr-sm"></span>
					</h2>
				</div>
				<div className="max-w-6xl mx-auto grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 px-0 xs:px-2">
					{enableAidData.map((card, i) => (
						<InfoCard key={card.id} {...card} />
					))}
				</div>
			</div>
		</section>
	);
}
