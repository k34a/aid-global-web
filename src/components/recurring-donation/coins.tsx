"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

function Coins() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const toggleItem = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	const questions = [
		{
			question: "How does contributing work in practice?",
			answer: `Coin packs: Available in 90, 180, 365, or 366 coins. Each coin = Rs. 1 of impact.
Daily rule: At least 1 coin must move every day - handled automatically.
Flexibility: Support 1 to 11 projects; switch or shuffle anytime.
Transparency: Every coin is traceable on your dashboard - no black box accounting.`,
		},
		{
			question: "How do I purchase coins?",
			answer: `Sign in and choose a pack.
Pay via UPI, card, or net-banking (all PCI-DSS encrypted).
Coins appear instantly.
Heads-up: Standard payment gateway fees and GST are added at checkout and are covered by the contributor - no hidden extras later.`,
		},
		{
			question: "How does daily contribution work?",
			answer: `Contributing at least 1 coin per day is mandatory.

You can enable auto-contribution in two ways:

1. By selecting a project category: The system will automatically contribute 1 coin daily to an active project within that category.
2. By selecting specific projects: Contributors can enable auto-contribution for up to 11 projects.`,
		},
		{
			question:
				"What happens if a project I support reaches its goal or expires?",
			answer: `Don't sweat it - we will:

- Pause that projects daily collection immediately.
- Notify you (email + in-app alert).
- Let you pick a new project whenever you're ready.

Your other auto-contributions keep flowing as usual.`,
		},
		{
			question: "What if I dont choose a replacement project?",
			answer: `That coin simply waits on standby. The platform never reassigns your money without your say-so.`,
		},
		{
			question: "How do I track my contribution?",
			answer: `Contributors will receive one daily notification summarizing all the projects they supported that day.

Daily digest: A quick ping telling you, "Rs. 1 went to ABC Project today."
Dashboard: Live balances, list of active auto-projects, referral stats, and a running impact meter that totals every rupee you have ever sent.`,
		},
		{
			question: "What happens if my coin balance hits zero?",
			answer: `Auto-contributions pause automatically - no penalties, no surprise charges.
Reload coins anytime and your streak picks up right where it left off.`,
		},
	];

	return (
		<div className="ml-4 mt-6 sm:ml-8 sm:mt-8 md:ml-12 md:mt-10 lg:ml-20 lg:mt-12 xl:ml-32 xl:mt-12 mr-4 sm:mr-5 md:mr-6 lg:mr-7 xl:mr-8">
			<h2 className="text-blue-400 font-medium text-base sm:text-xl md:text-xl lg:text-2xl mt-5">
				Coins & Contributions
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
							<div className="mt-3 text-base pl-6 sm:text-base md:text-lg lg:text-lg leading-relaxed opacity-85 whitespace-pre-line">
								{item.answer}
							</div>
						)}
					</li>
				))}
			</ul>
		</div>
	);
}

export default Coins;
