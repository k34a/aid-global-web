"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

function Account() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const toggleItem = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	const questions = [
		{
			question: "Who can use 1RupeeProject?",
			answer: `There are four types of users:

- Contributors (Coin Rebels): Individuals who buy coins and contribute daily to support projects.
- Project Owners: Creators, including NGOs, individuals, and social impact organizations, who submit their initiatives for funding.
- Corporate Partners: Companies that collaborate on large-scale impact projects, contribute funds, or empanel their entire staff to contribute and volunteer through 1RupeeProject.
- Admins: Platform moderators who review, verify, and approve projects.`,
		},
		{
			question: "Can project owners see contributor details?",
			answer: `Only your username - never personal contact info.`,
		},
		{
			question: "How is my data protected?",
			answer: `Military-grade encryption, no data-selling, and you control what's public. We've got your back.`,
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
							{item.question}
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

export default Account;
