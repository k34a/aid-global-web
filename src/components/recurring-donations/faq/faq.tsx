"use client";
import { Accordion } from "@mantine/core";
import React from "react";
import { ngoDetails } from "@/config/config";

interface FaqItem {
	question: string;
	answer?: string;
	type?: string;
}

interface FaqProps {
	subtitle: string;
	description: string;
	faqTitle: string;
	faqItems: FaqItem[];
	contactUrl: string;
	showContactCard?: boolean;
}

function Faq({
	subtitle,
	description,
	faqTitle,
	faqItems,
	contactUrl,
	showContactCard = false,
}: FaqProps) {
	return (
		<div className="ml-4 mt-6 sm:ml-8 sm:mt-8 md:ml-12 md:mt-10 lg:ml-20 lg:mt-12 xl:ml-32 xl:mt-12 mr-4 sm:mr-5 md:mr-6 lg:mr-7 xl:mr-8">
			<h2 className="text-blue-400 font-extrabold text-xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl">
				Frequently Asked Questions
			</h2>

			<h2 className="text-blue-400 font-medium text-base sm:text-xl md:text-xl lg:text-2xl mt-5">
				{subtitle}
			</h2>

			<p className="font-medium text-base sm:text-base md:text-md lg:text-lg mt-3 opacity-50 leading-relaxed">
				{description}
			</p>

			<h2 className="text-blue-400 font-medium text-base sm:text-xl md:text-xl lg:text-2xl mt-5">
				{faqTitle}
			</h2>

			<Accordion className="ml-1 sm:ml-2 md:ml-3 lg:ml-4 mt-3 mr-4 sm:mr-5 md:mr-5 lg:mr-6">
				{faqItems.map((item, index) => (
					<Accordion.Item key={index} value={item.question}>
						<Accordion.Control className="sm:text-base md:text-lg lg:text-lg">
							{item.question}
						</Accordion.Control>
						<Accordion.Panel className="mt-3 text-lg pl-1 sm:pl-2 md:pl-3 lg:pl-4 sm:text-base md:text-lg lg:text-lg leading-relaxed opacity-85 whitespace-pre-line">
							{item.type === "contact" ? (
								<>
									Visit{" "}
									<a
										href={contactUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="text-blue-500 underline"
									>
										{contactUrl.replace("https://", "")}
									</a>{" "}
									to sign up or learn more.
									<br />
									Email:{" "}
									<a
										href={`mailto:${ngoDetails.contact.email}`}
										className="text-blue-500 underline"
									>
										{ngoDetails.contact.email}
									</a>
									<br />
									Phone:{" "}
									<a
										href={`tel:${ngoDetails.contact.phone}`}
										className="text-blue-500 underline"
									>
										{ngoDetails.contact.phone}
									</a>
								</>
							) : (
								item.answer
							)}
						</Accordion.Panel>
					</Accordion.Item>
				))}
			</Accordion>

			{showContactCard && (
				<div className="bg-gray-100 rounded-xl shadow-md p-5 mt-8">
					<h3 className="text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2">
						{"\uD83D\uDCDE"} Contact Us
					</h3>
					<p className="text-gray-700 mb-2">
						<strong>{ngoDetails.name}</strong>
					</p>
					<p className="mb-2">
						Email:{" "}
						<a
							href={`mailto:${ngoDetails.contact.email}`}
							className="text-blue-500 underline"
						>
							{ngoDetails.contact.email}
						</a>
					</p>
					<p>
						Phone:{" "}
						<a
							href={`tel:${ngoDetails.contact.phone}`}
							className="text-blue-500 underline"
						>
							{ngoDetails.contact.phone}
						</a>
					</p>
				</div>
			)}

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
	);
}

export default Faq;
