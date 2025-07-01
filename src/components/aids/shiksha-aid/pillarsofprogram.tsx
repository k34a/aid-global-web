"use client";
import {
	Search,
	School,
	Landmark,
	Users,
	BookOpenCheck,
	Link as LinkIcon,
} from "lucide-react";
const pillars = [
	{
		title: "Search & Outreach",
		desc: "We locate and engage children who are never enrolled or have dropped out.",
		icon: Search,
		color: "from-yellow-200 to-yellow-100",
	},
	{
		title: "ShikshaAid Centre",
		desc: "Localized hubs for building foundational literacy and life skills.",
		icon: School,
		color: "from-red-200 to-red-100",
	},
	{
		title: "Bridge-to-School",
		desc: "Prepare children to confidently re-enter mainstream education.",
		icon: Landmark,
		color: "from-pink-200 to-pink-100",
	},
	{
		title: "Community Counseling",
		desc: "We help families overcome social barriers to sustain attendance.",
		icon: Users,
		color: "from-blue-200 to-blue-100",
	},
	{
		title: "Activity-Based Learning",
		desc: "Learning through play, music, stories, art, and real-life exposure.",
		icon: BookOpenCheck,
		color: "from-purple-200 to-purple-100",
	},
];

export default function Pillarssection() {
	return (
		<section className="py-16 bg-[#f9fafb] px-4">
			<h2 className="text-3xl font-bold text-center text-[#003366] mb-12">
				Pillars of Our Program
			</h2>

			<div className="flex justify-center flex-wrap gap-3 md:gap-5">
				{pillars.map((item, i) => {
					const Icon = item.icon;
					return (
						<div
							key={i}
							className={`relative w-46 h-50 md:w-48 md:h-52 clip-hex bg-gradient-to-b ${item.color} shadow-md hover:shadow-lg transition-all duration-300 group flex items-center justify-center`}
						>
							<div
								className={`w-[90%] h-[90%] clip-hex bg-white/60 group-hover:bg-white/80 backdrop-blur-sm shadow-inner`}
							>
								<div className="flex flex-col items-center justify-center h-full text-center px-3">
									<Icon className="h-6 w-6 text-[#333] mb-1" />
									<h3 className="text-sm font-semibold text-[#1a1a1d] sm:mb-1">
										{item.title}
									</h3>
									<p className="text-xs text-gray-700 leading-snug">
										{item.desc}
									</p>
								</div>
							</div>
						</div>
					);
				})}
			</div>
			<style jsx>{`
				.clip-hex {
					clip-path: polygon(
						50% 0%,
						93% 25%,
						93% 75%,
						50% 100%,
						7% 75%,
						7% 25%
					);
				}
			`}</style>
		</section>
	);
}
