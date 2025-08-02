"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

function Managing() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const toggleItem = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	const questions = [
		{
			question: "How do I activate auto-contribution?",
			answer: `You can activate auto-contribution in two ways:

1. **Project Category**: The system automatically contributes 1 coin daily to any active project within the selected category.

2. **Specific Project**: Users can enable and add auto-contribution for up to 11 specific projects at a time.

That's it - we handle the daily transfers.`,
		},
		{
			question: "Can I change my selected project category?",
			answer: `Totally. Swap categories, add or drop projects, reshuffle priorities - changes take effect the very next day.`,
		},
		{
			question:
				"Can I add or remove individual projects from auto-contribution?",
			answer: `Yes! You can add, remove, or replace projects at any time.

The system allows up to 11 active auto-contributions (a combination of project categories and specific projects).`,
		},
		{
			question: 'What about "Yearly Ongoing Funding" projects?',
			answer: `These never expire. Your daily coin flows indefinitely until you decide to remove them from auto-contribute - perfect for long-term causes.`,
		},
	];

	return (
		<div className="ml-4 mt-6 sm:ml-8 sm:mt-8 md:ml-12 md:mt-10 lg:ml-20 lg:mt-12 xl:ml-32 xl:mt-12 mr-4 sm:mr-5 md:mr-6 lg:mr-7 xl:mr-8">
			<h2 className="text-blue-400 font-medium text-base sm:text-xl md:text-xl lg:text-2xl mt-5">
				Managing Auto-Contribution
			</h2>
			<ul className="ml-1 sm:ml-2 md:ml-3 lg:ml-4 mt-3 mr-4 sm:mr-5 md:mr-5 lg:mr-6">
				{questions.map((item, index) => (
					<li
						key={index}
						onClick={() => toggleItem(index)}
						className="text-base sm:text-xl md:text-xl lg:text-2xl opacity-60 font-semibold bg-white shadow-lg border-black rounded-xl p-3 mb-5 cursor-pointer transition-all duration-300"
					>
						<div className="flex items-center gap-2 pl-1 sm:pl-2 md:pl-3 lg:pl-4">
							<ChevronDown
								className={`w-5 h-5 transition-transform duration-300 ${
									openIndex === index ? "rotate-180" : ""
								}`}
							/>
							<span>{item.question}</span>
						</div>
						{openIndex === index && (
							<div className="mt-3 pl-6 text-base sm:text-base md:text-lg lg:text-lg leading-relaxed opacity-85 whitespace-pre-line">
								{item.answer}
							</div>
						)}
					</li>
				))}
			</ul>
		</div>
	);
}

export default Managing;
