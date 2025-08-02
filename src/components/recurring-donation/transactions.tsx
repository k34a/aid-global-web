"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

function Transactions() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const toggleItem = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	const questions = [
		{
			question: "Where is my money kept before it reaches a project?",
			answer: `All coins sit in a secure, non-interest-bearing trustee wallet - ring-fenced from company operations - until transferred to the project or released at goal/term completion.`,
		},
		{
			question: "Do I receive any tax benefit for contributing?",
			answer: `Not at the moment. We are exploring Section 80G partnerships, but today your Rs.1 is purely for impact, not deductions.`,
		},
		{
			question: "Which payment methods can I use to buy coins?",
			answer: `UPI, major credit/debit cards, and net-banking (final list confirmed at launch). Every transaction is SSL-encrypted and PCI-DSS compliant.`,
		},
		{
			question: "Are there extra charges?",
			answer: `Yes, standard payment gateway transaction fees and government taxes apply when you contribute.

For every Rs.1 you give:

90 paise goes directly to the project.  
10 paise helps sustain the platform by covering operational costs.  
Full breakdown shown before you pay.`,
		},
		{
			question: "When does a project actually get the money?",
			answer: `Ongoing model: instantly, coin by coin.  
Goal/term model: in one lump-sum after the goal or term completes.`,
		},
	];

	return (
		<div className="ml-4 mt-6 sm:ml-8 sm:mt-8 md:ml-12 md:mt-10 lg:ml-20 lg:mt-12 xl:ml-32 xl:mt-12 mr-4 sm:mr-5 md:mr-6 lg:mr-7 xl:mr-8">
			<h2 className="text-blue-400 font-medium text-base sm:text-xl md:text-xl lg:text-2xl mt-5">
				Transactions & Contributions
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

export default Transactions;
