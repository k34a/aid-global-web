import Image from "next/image";
import {
	HelpingHand,
	Gift,
	Briefcase,
	Megaphone,
	HeartHandshake,
} from "lucide-react";
import { STATIC_IMAGE_HOST } from "@/config/config";
import Link from "next/link";

const enableAidActions = [
	{
		icon: HelpingHand,
		title: "Volunteer Your Time or Expertise",
		description:
			"Contribute in therapy, education, or outreach to support children with disabilities.",
	},
	{
		icon: Gift,
		title: "Sponsor a Child's Treatment or Assistive Device",
		description:
			"Support Clubfoot (₹12,000), Cleft Surgery (₹25,000), or provide essential assistive tools.",
	},
	{
		icon: Briefcase,
		title: "Partner Through CSR",
		description:
			"Join hands to launch EnableAid Clinics or fund inclusive community outreach campaigns.",
	},
	{
		icon: Megaphone,
		title: "Spread Awareness",
		description:
			"Advocate inclusion — every child deserves the right to grow, learn, and belong.",
	},
];

export default function SakhiAidVision() {
	return (
		<section className="relative">
			<div className="absolute inset-0 -z-10">
				<Image
					src={`${STATIC_IMAGE_HOST}enable-aid/enable-aid_joinus-bg.webp`}
					alt="Enable aid actions"
					fill
					className="object-cover"
					sizes="100vw"
				/>
			</div>

			{/* Light orange overlay */}
			<div className="absolute inset-0 bg-rose-100/80 backdrop-brightness-95"></div>

			{/* Content */}
			<div className="relative max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto px-2 sm:px-4 md:px-6 py-6 sm:py-10 md:py-16 text-center">
				<h2 className="text-lg sm:text-xl md:text-xl lg:text-2xl font-extrabold text-[#003944] flex items-center justify-center gap-2 mb-6 sm:mb-8 md:mb-10">
					JOIN THE MISSION
				</h2>

				<div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-5">
					{enableAidActions.map(
						({ icon: Icon, title, description }, i) => (
							<div
								key={i}
								className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-[#f0e6ff] flex flex-col items-center min-h-[180px]"
							>
								<Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#6a1e55] mb-2 sm:mb-3" />
								<h3 className="text-[#1a1a1d] font-semibold mb-1 text-sm sm:text-base">
									{title}
								</h3>
								<p className="text-sm sm:text-md text-gray-800">
									{description}
								</p>
							</div>
						),
					)}
				</div>

				<div className="flex justify-center items-center mt-8 sm:mt-10">
					<Link
						className="mt-3 sm:mt-4 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-[#003944] hover:bg-[#c44536] text-white font-semibold shadow-lg transition-transform transform hover:scale-105 duration-300 flex items-center gap-2 text-sm sm:text-base"
						href="/donate?program=enable-aid"
					>
						<HeartHandshake className="w-4 h-4 sm:w-5 sm:h-5" />
						Contribute Now
					</Link>
				</div>
			</div>
		</section>
	);
}
