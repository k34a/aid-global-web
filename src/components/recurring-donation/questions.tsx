"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

function Questions() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const toggleItem = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	const questions = [
		{
			question: "What is 1RupeeProject?",
			answer: `1RupeeProject, India's first micro-giving movement.

In simple terms, we are Rs.1-a-day giving platform. Buy a digital coin pack once, and every day the system moves Rs.1 from that pack to the project(s) you have chosen - no forms, no fuss. Over weeks and months, those tiny, automatic contributions build classrooms, lay water pipelines, fund art programmes - proof that pocket change can spark giant change. Setup takes under a minute on any phone or laptop.`,
		},
		{
			question: "How does it work, exactly?",
			answer: `Buy a coin pack with UPI, card, or net-banking (coins land in your wallet instantly).
Daily magic: We auto-transfer Rs.1 per project every single day until you:
- top up more coins,
- switch projects, or
- hit pause.
Pick up to 11 projects you love: education, health, environment, the arts, animal welfare, and more.
You will get regular project updates and impact reports, so you always know where your rupee went.`,
		},
		{
			question: "Who can contribute?",
			answer: `Anyone aged 18+ living in India with a digital payment method - whether you are a student with a prepaid wallet or a professional armed with a credit card. All you need is Rs.1 and the will to help.`,
		},
		{
			question: "Why only Rs.1 per project per day?",
			answer: `Two simple reasons:
- Accessibility: Almost everyone can spare a rupee, so nobody's left out.
- Habit-forming impact: When thousands of contributors give tiny amounts every day, projects enjoy steady cash flow instead of sporadic lump sums. Consistency beats size.`,
		},
	];

	return (
		<div className="ml-4 mt-6 sm:ml-8 sm:mt-8 md:ml-12 md:mt-10 lg:ml-20 lg:mt-12 xl:ml-32 xl:mt-12 mr-4 sm:mr-5 md:mr-6 lg:mr-7 xl:mr-8">
			<h2 className="text-blue-400 font-extrabold text-xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl">
				Frequently Asked Questions
			</h2>
			<h2 className="text-blue-400 font-medium text-base sm:text-xl md:text-xl lg:text-2xl mt-5">
				Learn more about the 1 Rupee Project
			</h2>
			<p className="font-medium text-base sm:text-base md:text-md lg:text-lg mt-3 opacity-50 leading-relaxed">
				1RupeeProject is a platform built to turn small daily
				contributions into meaningful impact. We will launch as soon as
				we reach 1 million registrations. Until then, these FAQs will
				help you understand how the platform will work once it goes
				live.
			</p>
			<h2 className="text-blue-400 font-medium text-base sm:text-xl md:text-xl lg:text-2xl mt-5">
				About 1RupeeProject
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

export default Questions;
