import Image from "next/image";
import { HandHeart } from "lucide-react";
import { STATIC_IMAGE_HOST } from "@/config/config";
import Link from "next/link";

const HungerIntro = () => {
	return (
		<div className="relative w-full h-64 sm:h-80 md:h-[400px] lg:h-[500px]">
			<Image
				src={`${STATIC_IMAGE_HOST}hunger-aid/intro.jpg`}
				alt="introImage"
				sizes="100vw"
				fill
				priority
				className="object-cover brightness-50"
			/>
			<div className="absolute inset-0 flex flex-col items-start justify-end p-3 sm:p-6 md:p-8">
				<h1 className="text-white text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-2xl mb-4 sm:mb-6">
					No one should sleep hungry
				</h1>
				<div className="flex items-center gap-3 sm:gap-4 justify-center lg:justify-start mb-2 sm:mb-4">
					<Link
						href="/donate?program=hunger-aid"
						aria-label="Donate to HungerAid"
						className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base md:text-lg font-semibold transition-all duration-300
            bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg
            group hover:scale-105 hover:shadow-xl relative overflow-hidden"
					>
						<span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>

						<span className="relative z-10 group-hover:text-orange-600">
							Donate Now
						</span>

						<HandHeart className="w-5 h-6 sm:w-6 sm:h-7 text-white font-bold relative z-10 transition duration-300 group-hover:text-orange-600 group-hover:scale-110 animate-pulse" />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default HungerIntro;
