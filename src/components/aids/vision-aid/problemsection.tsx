"use client";
import { Baby, Utensils, UserRoundX } from "lucide-react";

export default function ProblemSection() {
	return (
		<section className="bg-white py-2 sm:py-10  px-6 md:px-24">
			<div className="text-center mb-6">
				<div className="text-center mb-10">
					<h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1d] mb-2">
						The Problem
					</h2>
					<div className="h-1 w-40 bg-[#6a1e55] mx-auto rounded-tr-xl rounded-bl-2xl"></div>
				</div>
				<p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
					In India, <strong>over 137 million people</strong> live with
					some form of visual impairment.{" "}
					<span className="text-[#5d3dc4] font-semibold">
						More than 80% of these cases are either preventable or
						curable.
					</span>{" "}
					Yet, due to poverty, lack of awareness, and limited access
					to healthcare, millions remain trapped in a world of
					darkness.
				</p>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
				<div className="bg-white border border-[#e2d9f3] rounded-xl shadow-sm p-6 hover:shadow-md transition">
					<Baby className="w-8 h-8 text-[#6a1e55] mb-4" />
					<h3 className="text-lg font-semibold text-[#1a1a1d] mb-2">
						A child who can’t see the blackboard...
					</h3>
					<p className="text-sm text-gray-700 leading-relaxed">
						Missing out on education, confidence, and opportunity.
					</p>
				</div>
				<div className="bg-white border border-[#e2d9f3] rounded-xl shadow-sm p-6 hover:shadow-md transition">
					<Utensils className="w-8 h-8 text-[#5d3dc4] mb-4" />
					<h3 className="text-lg font-semibold text-[#1a1a1d] mb-2">
						A mother unable to cook safely...
					</h3>
					<p className="text-sm text-gray-700 leading-relaxed">
						Everyday tasks become risky without proper vision.
					</p>
				</div>
				<div className="bg-white border border-[#e2d9f3] rounded-xl shadow-sm p-6 hover:shadow-md transition">
					<UserRoundX className="w-8 h-8 text-[#6a1e55] mb-4" />
					<h3 className="text-lg font-semibold text-[#1a1a1d] mb-2">
						A grandfather losing connection...
					</h3>
					<p className="text-sm text-gray-700 leading-relaxed">
						Struggles to recognize loved ones or walk independently.
					</p>
				</div>
			</div>
			<div className="my-4 sm:mt-10 max-w-4xl mx-auto border-l-4 border-[#6a1e55] bg-[#faf6fb] px-6 py-5 rounded-md shadow-sm text-center">
				<p className="text-[#6a1e55] font-medium italic text-lg">
					All of this—because they don’t have access to basic eye
					care.
				</p>
			</div>
		</section>
	);
}
