"use client";
import { Accordion } from "@mantine/core";
import React from "react";
import Link from "next/link";
import { ReactNode } from "react";

export interface FaqItem {
	question: string;
	answer: ReactNode;
}

interface FaqProps {
	items: FaqItem[];
}

export default function FAQ({ items }: FaqProps) {
	return (
		<div className="py-16 max-w-3xl w-11/12 mx-auto">
			<h2 className="text-sky-400 font-extrabold text-4xl">
				Frequently Asked Questions
			</h2>

			<Accordion className="py-12">
				{items.map((item, index) => (
					<Accordion.Item key={index} value={item.question}>
						<Accordion.Control>{item.question}</Accordion.Control>
						<Accordion.Panel>{item.answer}</Accordion.Panel>
					</Accordion.Item>
				))}
			</Accordion>

			<div className="flex items-center justify-center mt-6 mb-10">
				<span className="text-gray-700 mr-3 text-base sm:text-lg">
					Have more questions?
				</span>
				<Link
					href="/contact"
					className="border-2 border-black text-black hover:text-white hover:bg-black px-2 py-1 rounded-lg transition"
				>
					Contact Us
				</Link>
			</div>
		</div>
	);
}
