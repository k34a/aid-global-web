"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/config/donation-faq";
import Link from "next/link";
import { SquareArrowOutUpRight } from "lucide-react";
const FaqSection = () => {
	const [openIndex, setOpenIndex] = useState(null);

	const toggle = (index) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<div className="bg-gray-200 min-h-screen py-16 flex flex-col items-center">
			<h1 className="text-4xl font-bold mb-10">FAQs</h1>

			<div className="w-full max-w-2xl bg-white rounded-md shadow-md">
				{faqs.map((faq, index) => (
					<div key={index} className="border-b">
						<button
							onClick={() => toggle(index)}
							className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none"
						>
							<span className="text-lg font-medium">
								{faq.question}
							</span>
							<ChevronDown
								className={`w-5 h-5 transition-transform duration-300 ${
									openIndex === index ? "rotate-180" : ""
								}`}
							/>
						</button>
						{openIndex === index && (
							<div className="px-6 pb-5 text-gray-600">
								{faq.answer}
							</div>
						)}
					</div>
				))}
			</div>

			<p className="mt-8 text-center text-black text-lg font-bold">
				In case you have more queries,{" "}
				<Link
					href="/contact"
					className="inline-flex items-center gap-1 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
				>
					CONTACT US
					<SquareArrowOutUpRight size={16} />
				</Link>
			</p>
		</div>
	);
};

export default FaqSection;
