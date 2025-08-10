"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { questionqa100 } from "@/config/faqquestions";

function Question100() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const toggleItem = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<div className="ml-4 mt-6 sm:ml-8 sm:mt-8 md:ml-12 md:mt-10 lg:ml-20 lg:mt-12 xl:ml-32 xl:mt-12 mr-4 sm:mr-5 md:mr-6 lg:mr-7 xl:mr-8">
			<h2 className="text-blue-400 font-extrabold text-xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl">
				Frequently Asked Questions
			</h2>
			<h2 className="text-blue-400 font-medium text-base sm:text-xl md:text-xl lg:text-2xl mt-5">
				Learn more about the 100 Rupee Project
			</h2>
			<p className="font-medium text-base sm:text-base md:text-md lg:text-lg mt-3 opacity-50 leading-relaxed">
				100RupeeProject is a platform built to turn small daily
				contributions into meaningful impact. We will launch as soon as
				we reach 1 million registrations. Until then, these FAQs will
				help you understand how the platform will work once it goes
				live.
			</p>

			<div className="ml-4 mt-6 sm:ml-8 sm:mt-8 md:ml-12 md:mt-10 lg:ml-20 lg:mt-12 xl:ml-32 xl:mt-12 mr-4 sm:mr-5 md:mr-6 lg:mr-7 xl:mr-8">
				<h2 className="text-blue-400 font-medium text-base sm:text-xl md:text-xl lg:text-2xl mt-5">
					FAQ The{"\u20B9"}100 Club
				</h2>
				<ul className="ml-1 sm:ml-2 md:ml-3 lg:ml-4 mt-3 mr-4 sm:mr-5 md:mr-5 lg:mr-6">
					{questionqa100.map((item, index) => (
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
									{item.type === "contact" ? (
										<>
											Visit{" "}
											<a
												href="https://www.aidglobal.ngo/1rupee"
												target="_blank"
												rel="noopener noreferrer"
												className="text-blue-500 underline"
											>
												aidglobal.ngo/1rupee
											</a>{" "}
											to sign up or learn more.
											<br />
											Email:{" "}
											<a
												href="mailto:info@aidglobal.ngo"
												className="text-blue-500 underline"
											>
												info@aidglobal.ngo
											</a>
											<br />
											Phone:{" "}
											<a
												href="tel:+919373469754"
												className="text-blue-500 underline"
											>
												+91-9373469754
											</a>
										</>
									) : (
										item.answer
									)}
								</div>
							)}
						</li>
					))}
				</ul>

				<div className="bg-gray-100 rounded-xl shadow-md p-5 mt-8">
					<h3 className="text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2">
						{"\uD83D\uDCDE"} Contact Us
					</h3>
					<p className="text-gray-700 mb-2">
						<strong>Aid Global Foundation</strong>
					</p>
					<p className="mb-2">
						Email:{" "}
						<a
							href="mailto:Donate@aidglobal.ngo"
							className="text-blue-500 underline"
						>
							Donate@aidglobal.ngo
						</a>
					</p>
					<p>
						Phone:{" "}
						<a
							href="tel:+919373469754"
							className="text-blue-500 underline"
						>
							+91-9373469754
						</a>
					</p>
				</div>

				<div className="flex items-center justify-center mt-6 mb-10">
					<span className="text-gray-700 mr-3 text-base sm:text-lg">
						My question is not here.
					</span>
					<a
						href="/contact"
						className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
					>
						CONTACT US
					</a>
				</div>
			</div>
		</div>
	);
}

export default Question100;
