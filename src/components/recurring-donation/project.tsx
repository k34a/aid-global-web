"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

function Project() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const toggleItem = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	const questions = [
		{
			question: "How are projects vetted and verified?",
			answer: `Every submission jumps through three hoops:

1. Document check (registrations, audits, bank proofs).
2. Impact audit (field calls with beneficiaries).
3. Ongoing milestones (spend receipts before each payout).

Only the best clear all stages - it's trust or bust.`,
		},
		{
			question: "Can I submit my own project?",
			answer: `Yes! NGOs, startups, even individual changemakers can apply via Submit a Project. The same strict vetting applies to everyone.`,
		},
		{
			question: "What happens after submission?",
			answer: `1. Admin review (we may ask clarifying questions).
2. Approval & go-live.
3. Funding via one of three models:

- Ongoing: coins flow daily.
- Goal-based: funds release once the target is hit.
- Term-based: funds release at campaign end.`,
		},
		{
			question: "How do projects receive funding?",
			answer: `Projects can be funded in three ways:

- **Yearly / Ongoing Funding**: No set goal, projects keep receiving funds.
- **Goal-Based Funding**: A target amount is set.
- **Term-Based Funding**: Contributions are accepted for a specific period.`,
		},
	];

	return (
		<div className="ml-4 mt-6 sm:ml-8 sm:mt-8 md:ml-12 md:mt-10 lg:ml-20 lg:mt-12 xl:ml-32 xl:mt-12 mr-4 sm:mr-5 md:mr-6 lg:mr-7 xl:mr-8">
			<h2 className="text-blue-400 font-medium text-base sm:text-xl md:text-xl lg:text-2xl mt-5">
				Project Submissions & Funding
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

export default Project;
