"use client";
import Image from "@/components/image";
import React from "react";

interface CorpPartner {
	image: string;
	title: string;
	desc: string;
}
interface CorpPartnerListProps {
	partners: CorpPartner[];
}
export default function CorporatePartners({ partners }: CorpPartnerListProps) {
	return (
		<section className="flex flex-wrap justify-center">
			{partners.map((part, index) => (
				<div
					key={index}
					className="flex flex-col items-center shadow-md hover:shadow-xl transition-all duration-300 p-4 w-[80vw] sm:w-100 bg-white rounded-lg m-3"
				>
					<Image
						src={part.image}
						alt={part.title}
						width={700}
						height={700}
						className="w-fit h-40 object-fill"
					/>
					<h3 className="text-center text-lg font-semibold my-2 text-sky-400">
						{part.title}
					</h3>
					<p className="text-center text-sm text-gray-600">
						{part.desc}
					</p>
				</div>
			))}
		</section>
	);
}
