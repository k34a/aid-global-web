"use client";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { STATIC_IMAGE_HOST } from "@/config/config";

const points = [
	{ text: "A child can study again.", color: "#5d3dc4" },
	{ text: "A parent can work again.", color: "#6a1e55" },
	{ text: "A senior can reconnect with loved ones.", color: "#118b50" },
];

export default function WhyItMattersSection() {
	return (
		<section className="bg-white px-6 md:px-16 py-2 my-4">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
				<div className="col-span-1 relative w-full h-[350px] rounded-xl overflow-hidden shadow-lg">
					<Image
						src={`${STATIC_IMAGE_HOST}vision-aid/childwithglasses.webp`}
						alt="Beneficiary smiling after receiving glasses"
						fill
						className="object-cover rounded-xl"
					/>
				</div>
				<div className="md:col-span-2">
					<h2 className="text-3xl font-bold text-[#1a1a1d] mb-6">
						Why It Matters
					</h2>
					<p className="text-base text-gray-700 mb-4">
						Restoring vision is not just about eyesight — it&rsquo;s
						about{" "}
						<strong className="text-[#6a1e55]">
							restoring life, dignity, and independence
						</strong>
						.
					</p>
					<div className="space-y-4 text-lg text-[#2f194d]">
						{points.map(({ text, color }, index) => (
							<div key={index} className="flex items-start gap-3">
								<CheckCircle
									className="w-6 h-6 mt-1"
									style={{ color }}
								/>
								<span>{text}</span>
							</div>
						))}
					</div>
					<p className="mt-6 font-semibold text-[#6a1e55] text-lg">
						Every restored vision is a life reignited.
					</p>
				</div>
			</div>
		</section>
	);
}
