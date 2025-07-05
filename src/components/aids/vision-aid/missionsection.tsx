"use client";
import { Check, Goal } from "lucide-react";

const missionServices = [
	{
		title: "Free Eye Screening Camps",
		description:
			"Conducted in low-income and remote communities to catch problems early.",
		color: "#6a1e55",
	},
	{
		title: "Diagnosis & Treatment",
		description: "Medical support for various eye conditions and diseases.",
		color: "#5d3dc4",
	},
	{
		title: "Prescription Spectacles",
		description: "Free glasses provided to those who cannot afford them.",
		color: "#6a1e55",
	},
	{
		title: "Cataract Surgery Support",
		description:
			"Assistance for elderly and vulnerable people requiring surgery.",
		color: "#5d3dc4",
	},
	{
		title: "Vision Awareness Campaigns",
		description:
			"Conducted in schools, factories, and public areas to spread awareness.",
		color: "#6a1e55",
	},
	{
		title: "Children’s Eye Care",
		description:
			"Eye checkups and support for children in Aid Foundation Centres.",
		color: "#5d3dc4",
	},
];

export default function MissionSection() {
	return (
		<section className="bg-gradient-to-b from-[#f8f2fc] to-[#fbeffc] py-10 px-6 md:px-24">
			<div className="text-center mb-10">
				<h2 className="text-4xl md:text-5xl font-bold mb-4">
					Our Mission:{" "}
					<span className="text-[#6a1e55]">Vision for All</span>
				</h2>
				<p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-4">
					<strong>VisionAid</strong>, a flagship program of{" "}
					<strong>Aid Global Foundation</strong>, is working
					tirelessly to ensure that{" "}
					<em className="text-[#5d3dc4] font-semibold">
						no life remains in darkness due to poor vision.
					</em>
				</p>
			</div>
			<div className="flex items-center gap-2 mb-4">
				<Goal className="text-black w-7 h-7" />
				<h3 className="text-2xl md:text-3xl font-bold text-[#6a1e55]">
					What VisionAid Does
				</h3>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[#2f194d]">
				{missionServices.map((service, index) => (
					<div key={index} className="flex items-start gap-4">
						<Check
							className="w-8 h-8 mt-1"
							style={{ color: service.color }}
						/>
						<div>
							<h4 className="font-semibold text-lg">
								{service.title}
							</h4>
							<p className="text-gray-700">
								{service.description}
							</p>
						</div>
					</div>
				))}
			</div>
			<div className="relative bg-[#f3eaff]/40 bg-opacity-40 border border-[#e4d3fb] rounded-2xl px-8 py-4 mt-6 sm:mt-10  text-center max-w-5xl mx-auto">
				<h3 className="text-3xl sm:text-4xl font-extrabold text-[#6a1e55] mb-4">
					Empowering Children Through Sight
				</h3>
				<p className="text-lg sm:text-xl text-[#2f194d] leading-relaxed max-w-3xl mx-auto">
					We ensure every child under our care receives routine eye
					check-ups and glasses if needed.
				</p>
				<p className="mt-3 text-base sm:text-lg italic font-semibold text-[#5d3dc4]">
					Because every child deserves to see their dreams clearly.
				</p>
			</div>
		</section>
	);
}
