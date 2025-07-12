import Image from "next/image";
import {
	School,
	Soup,
	Accessibility,
	UserRoundX,
	CloudDrizzle,
} from "lucide-react";
import { STATIC_IMAGE_HOST } from "@/config/config";

const bulletPoints = [
	{ icon: School, text: "A school child too weak to concentrate" },
	{ icon: Soup, text: "An elderly widow sharing one meal over two days" },
	{ icon: Accessibility, text: "A disabled person unable to cook" },
	{
		icon: UserRoundX,
		text: "A transgender individual denied work and support",
	},
	{
		icon: CloudDrizzle,
		text: "A family devastated by flood or illness, unsure of their next meal",
	},
];

export default function WhyHungerAid() {
	return (
		<section className="relative ">
			<div className="absolute inset-0 -z-10">
				<Image
					src={`${STATIC_IMAGE_HOST}hunger-aid/hunger-aid_why.webp`}
					alt="Why HungerAid"
					fill
					priority
					className="object-cover"
					sizes="100vw"
				/>
			</div>

			{/* Light orange overlay */}
			<div className="absolute inset-0 bg-orange-100/80 backdrop-brightness-95"></div>

			{/* Content */}
			<div className="relative max-w-5xl mx-auto px-2 sm:px-6 py-10 sm:py-16 md:py-20 text-center">
				<h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 flex items-center justify-center gap-2 mb-3 sm:mb-4">
					Why HungerAid Is Needed?
				</h2>

				<p className="text-base sm:text-lg md:text-xl text-slate-800 font-medium mb-4 sm:mb-8">
					Hunger hides in plain sight:
				</p>

				<ul className="text-left space-y-4 sm:space-y-5 max-w-full sm:max-w-2xl mx-auto">
					{bulletPoints.map(({ icon: Icon, text }, index) => (
						<li
							key={index}
							className="flex gap-2 sm:gap-3 items-start text-slate-700 font-bold text-base sm:text-lg md:text-xl"
						>
							<Icon
								className="text-orange-800 mt-1 font-extrabold shrink-0 fill-orange-800"
								size={22}
							/>
							<span className="font-serif whitespace-normal">
								{text}
							</span>
						</li>
					))}
				</ul>
				<p className="mt-6 sm:mt-8 text-lg sm:text-2xl font-bold text-orange-900">
					HungerAid reaches these lives where no one else does — with
					love and urgency.
				</p>
			</div>
		</section>
	);
}
