import Image from "next/image";
import { HandHeart } from "lucide-react";
import Link from "next/link";
import { STATIC_IMAGE_HOST } from "@/config/config";

const content = [
	{
		image: `${STATIC_IMAGE_HOST}sakhi-aid/partner1.webp`,
		desc: "Sponsor a girl's skill training",
	},
	{
		image: `${STATIC_IMAGE_HOST}sakhi-aid/partner2.webp`,
		desc: "Donate pads or hygiene kits",
	},
	{
		image: `${STATIC_IMAGE_HOST}sakhi-aid/partner3.webp`,
		desc: "Fund a goat or dairy setup for a woman",
	},
	{
		image: `${STATIC_IMAGE_HOST}sakhi-aid/partner4.webp`,
		desc: "Invite SHGs to your exhibition",
	},
	{
		image: `${STATIC_IMAGE_HOST}sakhi-aid/partner5.webp`,
		desc: "Conduct workshops at your school or office",
	},
	{
		image: `${STATIC_IMAGE_HOST}sakhi-aid/partner6.webp`,
		desc: "Volunteer your skills",
	},
];

export default function PartnerWithUs() {
	return (
		<section className="bg-gradient-to-br from-rose-700 via-red-300 to-rose-400 py-12 px-2 sm:px-6">
			<div>
				<h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 flex items-center justify-center gap-2 mb-8 text-center">
					Partner with us to:
				</h2>
				<div className="flex flex-row justify-between overflow-x-auto items-stretch w-full scrollbar-thin scrollbar-thumb-rose-400 scrollbar-track-rose-100">
					{content.map((item, idx) => (
						<div
							key={idx}
							className="flex flex-col items-center min-w-[120px] max-w-[140px] sm:min-w-[140px] sm:max-w-[160px] md:min-w-[160px] md:max-w-[180px] flex-shrink-0"
						>
							<div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mb-2 sm:mb-3 rounded-lg overflow-hidden shadow-lg">
								<Image
									src={item.image}
									alt="partner with us"
									fill
									className="object-cover"
									sizes="96px"
								/>
							</div>
							<p className="text-center text-sm sm:text-sm md:text-base font-bold text-slate-900 px-2 py-1">
								{item.desc}
							</p>
						</div>
					))}
				</div>
				<p className="mt-10 text-xl sm:text-lg md:text-lg font-bold text-rose-900 text-center">
					Let&#39;s raise 10,000 Sakhis together.
				</p>
				<div className="flex justify-center w-full mt-10">
					<Link
						href="/donate?program=sakhi-aid"
						aria-label="Join SakhiAid Cause"
						className="flex items-center justify-center gap-2 px-6 py-2 sm:px-8 sm:py-3 rounded-full text-base sm:text-lg font-semibold transition-all duration-300
          bg-gradient-to-r from-rose-600 to-rose-800 text-white shadow-lg
          group hover:scale-105 hover:shadow-xl relative overflow-hidden"
					>
						<span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>

						<span className="relative z-10 group-hover:text-rose-600">
							Join the cause
						</span>

						<HandHeart className="w-5 h-6 text-white font-bold relative z-10 transition duration-300 group-hover:text-rose-600 group-hover:scale-110 animate-pulse" />
					</Link>
				</div>
			</div>
		</section>
	);
}
