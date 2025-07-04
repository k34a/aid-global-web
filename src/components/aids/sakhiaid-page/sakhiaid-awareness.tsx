"use client";
import Image from "next/image";
import { motion } from "motion/react";
import { AwarenessContent } from "@/components/aids/sakhiaid-page/sakhiaid-data";

interface SakhiAidAwarenessProps {
	content: AwarenessContent;
}

export default function SakhiAidAwareness({ content }: SakhiAidAwarenessProps) {
	return (
		<section className="bg-[#f7f5f0] px-6 py-12 md:py-16 md:px-20">
			<div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
				{/* Left image */}
				<div className="w-full md:w-1/2 max-w-sm relative">
					<motion.div
						initial={{ x: -60, opacity: 0 }}
						whileInView={{ x: 0, opacity: 1 }}
						transition={{ duration: 0.7, ease: "easeOut" }}
						viewport={{ once: true, amount: 0.2 }}
					>
						<Image
							src={content.image}
							alt={content.title}
							width={400}
							height={400}
							className="w-full h-auto object-contain"
						/>
					</motion.div>
				</div>

				{/* Right content */}
				<div className="w-full md:w-1/2 text-left">
					<h2 className="text-2xl md:text-3xl font-bold text-rose-900 mb-4">
						{content.title}
					</h2>
					<p className="text-lg text-gray-800 leading-relaxed mb-3">
						{content.desc1}
					</p>
					<p className="text-lg text-gray-800 leading-relaxed">
						{content.desc2}
					</p>
				</div>
			</div>
		</section>
	);
}
