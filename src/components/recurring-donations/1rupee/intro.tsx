"use client";

import {
	Heart,
	Plus,
	BookOpenCheck,
	Utensils,
	Accessibility,
	Stethoscope,
	Eye,
	Home,
	HandHeart,
} from "lucide-react";

const aids = [
	{
		icon: <BookOpenCheck className="text-white w-6 h-6" />,
		title: "ShikshaAid",
		description:
			"Provides pens, notebooks, school bags, and digital learning tools for children.",
		bg: "bg-gradient-to-br from-[#36D1DC] to-[#5B86E5]",
	},
	{
		icon: <Utensils className="text-white w-6 h-6" />,
		title: "HungerAid",
		description:
			"Supports hot meals and ration kits for those facing hunger.",
		bg: "bg-gradient-to-br from-[#F7971E] to-[#FFD200]",
	},
	{
		icon: <Accessibility className="text-white w-6 h-6" />,
		title: "EnableAid",
		description:
			"Empowers persons with disabilities through assistive support.",
		bg: "bg-gradient-to-br from-[#7F00FF] to-[#E100FF]",
	},
	{
		icon: <Stethoscope className="text-white w-6 h-6" />,
		title: "CureAid",
		description:
			"Brings healthcare access, medicine, and health education.",
		bg: "bg-gradient-to-br from-[#00B09B] to-[#96C93D]",
	},
	{
		icon: <Eye className="text-white w-6 h-6" />,
		title: "VisionAid",
		description: "Offers eye checkups and vision treatments.",
		bg: "bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]",
	},
	{
		icon: <Home className="text-white w-6 h-6" />,
		title: "GharAid",
		description:
			"Helps deliver basic shelter items and hygiene kits to the homeless.",
		bg: "bg-gradient-to-br from-[#4CA1AF] to-[#2CF364]",
	},
	{
		icon: <HandHeart className="text-white w-6 h-6" />,
		title: "SakhiAid",
		description: "Advances women&apos;s empowerment and dignity programs.",
		bg: "bg-gradient-to-br from-[#FF416C] to-[#FF4B2B]",
	},
];

export default function Intro() {
	return (
		<section className="py-16 px-4 relative overflow-hidden bg-gradient-to-br from-[#2563eb] via-[#4ECDC4] to-sky-400">
			{/* Background Circles */}
			<div className="absolute top-[-50px] left-[-40px] w-[300px] h-[300px] rounded-full bg-white opacity-10 blur-3xl"></div>
			<div className="absolute bottom-[-80px] right-[-60px] w-[250px] h-[250px] rounded-full bg-yellow-200 opacity-10 blur-2xl"></div>

			<div className="container mx-auto relative z-10">
				{/* Header */}
				<div className="text-center max-w-4xl mx-auto mb-12">
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
						Where Does Your &#8377;1 Go?
					</h2>
					<h3 className="text-xl md:text-2xl font-semibold text-[#FFD700]">
						Your &#8377;1 fuels powerful, real-world action across 7
						core missions by Aid Global Foundation:
					</h3>
				</div>

				{/* Aids Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-12 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32">
					{aids.map((aid, index) => (
						<div
							key={index}
							className={`rounded-2xl p-6 md:p-8 text-white shadow-xl hover:scale-[1.03] transition-transform duration-300 ${aid.bg} ${
								index === aids.length - 1
									? "sm:col-span-2 mx-auto max-w-lg"
									: ""
							}`}
						>
							<div className="flex items-center gap-3 mb-4">
								<div className="bg-white/20 rounded-full p-3">
									{aid.icon}
								</div>
								<h4 className="text-xl font-bold">
									{aid.title}
								</h4>
							</div>
							<p className="text-sm md:text-base text-white/90 font-bold">
								{aid.description}
							</p>
						</div>
					))}
				</div>

				{/* Support Line */}
				<p className="text-white/80 text-sm md:text-base mt-10 text-center italic font-bold max-w-3xl mx-auto">
					Your &#8377;1 supports logistics, transport, and direct aid
					to the underserved &mdash; powering all these missions.
				</p>
			</div>

			{/* Background Icons */}
			<div className="absolute right-8 top-1/2 transform -translate-y-1/2 opacity-10 pointer-events-none">
				<div className="w-32 h-32 md:w-48 md:h-48 relative">
					<Heart
						className="w-full h-full text-white"
						fill="currentColor"
						fillOpacity="0.3"
						strokeWidth={1.5}
						aria-hidden="true"
					/>
					<div className="absolute inset-0 flex items-center justify-center">
						<Plus
							className="w-8 h-8 md:w-12 md:h-12 text-white"
							strokeWidth={2.5}
							aria-hidden="true"
						/>
					</div>
				</div>
			</div>
			<div className="absolute right-8 bottom-1 transform -translate-y-1/2 opacity-20 pointer-events-none">
				<div className="w-32 h-32 md:w-48 md:h-48 relative">
					<Heart
						className="w-full h-full text-white"
						fill="currentColor"
						fillOpacity="0.3"
						strokeWidth={1.5}
						aria-hidden="true"
					/>
					<div className="absolute inset-0 flex items-center justify-center">
						<Plus
							className="w-8 h-8 md:w-12 md:h-12 text-white"
							strokeWidth={2.5}
							aria-hidden="true"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
