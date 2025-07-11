"use client";

import React from "react";
import { PackageCheck, Star } from "lucide-react";
import { InitiativeItem } from "@/components/aids/sakhiaid-page/sakhiaid-data";

interface KeyInitiativesProps {
	title: string;
	items: InitiativeItem[];
	bgImage?: string;
}

export default function KeyInitiatives({
	title,
	items,
	bgImage = "https://website-content.aidglobal.ngo/sakhi-aid/illustration1.webp",
}: KeyInitiativesProps) {
	return (
		<section
			className="relative bg-cover bg-center bg-fixed px-2 sm:px-4 lg:px-24 py-6 sm:py-10 min-h-[400px] flex items-center justify-center"
			style={{
				backgroundImage: `url(${bgImage})`,
			}}
		>
			<div className="w-full max-w-md sm:max-w-xl md:max-w-2xl rounded-xl p-4 sm:p-8 md:p-12 mx-auto">
				<div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
					<PackageCheck className="text-rose-900 w-7 h-7 sm:w-8 sm:h-8" />
					<h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-rose-900">
						{title}
					</h2>
				</div>
				<ul className="space-y-4 sm:space-y-6 text-gray-800 text-base sm:text-lg md:text-xl leading-relaxed">
					{items.map((item, idx) => (
						<li
							className="flex items-start gap-2 sm:gap-3"
							key={idx}
						>
							<Star
								className={`w-5 h-5 sm:w-6 sm:h-6 mt-1 shrink-0 ${item.color}`}
							/>
							<span>
								<strong>{item.title}</strong> {item.description}
							</span>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
