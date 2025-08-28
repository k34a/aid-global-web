import {
	Handshake,
	Stethoscope,
	School,
	Megaphone,
	Briefcase,
} from "lucide-react";
import Link from "next/link";

const joinOptions = [
	{
		icon: <Stethoscope className="w-5 h-5 text-[#047857]" />,
		title: "Volunteer",
		desc: "Support camps, awareness drives, or outreach.",
		bg: "bg-emerald-100",
	},
	{
		icon: <School className="w-5 h-5 text-[#1E3A8A]" />,
		title: "Sponsor",
		desc: "Fund health kits for children and mothers.",
		bg: "bg-sky-100",
	},
	{
		icon: <Megaphone className="w-5 h-5 text-[#A21CAF]" />,
		title: "Raise Awareness",
		desc: "Promote dignity & care through your voice.",
		bg: "bg-fuchsia-100",
	},
	{
		icon: <Briefcase className="w-5 h-5 text-[#78350F]" />,
		title: "Partner",
		desc: "Collaborate via CSR or institutions.",
		bg: "bg-amber-100",
	},
];

export default function JoinMission() {
	return (
		<section className="w-full bg-[#ECFDF5] py-10 px-6 md:px-20">
			<div className="max-w-6xl mx-auto">
				<div className="text-center mb-12">
					<div className="flex flex-wrap items-center justify-center text-emerald-700 gap-2 text-center">
						<Handshake className="w-6 h-6 flex-shrink-0" />
						<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
							Join the CureAid Mission
						</h2>
					</div>
					<p className="mt-2 text-base sm:text-lg text-gray-700 leading-relaxed max-w-xl mx-auto">
						Together, we can transform lives through care and
						compassion.
					</p>
					<div className="w-16 h-[2px] bg-emerald-600 mx-auto mt-3 rounded-full" />
				</div>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
					{joinOptions.map((item, idx) => (
						<div
							key={idx}
							className="bg-white hover:bg-emerald-50/40 transition-all duration-300 rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md flex flex-col gap-2 text-gray-900"
						>
							<div
								className={`w-10 h-10 rounded-full flex items-center justify-center border border-white shadow-sm ${item.bg}`}
							>
								{item.icon}
							</div>
							<h3 className="text-base font-semibold">
								{item.title}
							</h3>
							<p className="text-sm text-gray-700 leading-snug">
								{item.desc}
							</p>
						</div>
					))}
				</div>
				<div className="text-center">
					<Link
						href="/donate?program=cure-aid"
						className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-sm sm:text-base font-semibold transition"
					>
						Donate Now
					</Link>
					<p className="mt-2 text-sm text-gray-600">
						Your support helps us reach more lives with care and
						dignity.
					</p>
				</div>
			</div>
		</section>
	);
}
