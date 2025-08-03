"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { gamificationqa } from "@/config/faqquestions";
function Gamification() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const toggleItem = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	const questions = gamificationqa;

	return (
		<div className="ml-4 mt-6 sm:ml-8 sm:mt-8 md:ml-12 md:mt-10 lg:ml-20 lg:mt-12 xl:ml-32 xl:mt-12 mr-4 sm:mr-5 md:mr-6 lg:mr-7 xl:mr-8">
			<h2 className="text-blue-400 font-medium text-base sm:text-xl md:text-xl lg:text-2xl mt-5">
				Gamification & Rewards
			</h2>
			<ul className="ml-1 sm:ml-2 md:ml-3 lg:ml-4 mt-3 mr-4 sm:mr-5 md:mr-5 lg:mr-6">
				{questions.map((item, index) => (
					<li
						key={index}
						onClick={() => toggleItem(index)}
						className="text-base sm:text-xl md:text-xl lg:text-2xl opacity-60 font-semibold bg-white shadow-lg border-black rounded-xl p-3 mb-5 cursor-pointer"
					>
						<div className="flex items-center justify-between pl-1 sm:pl-2 md:pl-3 lg:pl-4">
							<span>{item.question}</span>
							<ChevronDown
								className={`transition-transform duration-300 ${
									openIndex === index ? "rotate-180" : ""
								}`}
							/>
						</div>
						{openIndex === index && (
							<div className="mt-3 text-base pl-1 sm:pl-2 md:pl-3 lg:pl-4 sm:text-base md:text-lg lg:text-lg leading-relaxed opacity-85 whitespace-pre-line">
								{item.answer}
							</div>
						)}
					</li>
				))}
			</ul>
		</div>
	);
}

export default Gamification;
