import { STATIC_IMAGE_HOST } from "@/config/config";
import Image from "next/image";

export default function HeroImage() {
	return (
		<section className="relative w-[95%] mx-auto rounded-2xl h-[50vh] md:h-[75vh] overflow-hidden shadow-2xl">
			<Image
				src={`${STATIC_IMAGE_HOST}shiksha-aid/shiksha.webp`}
				alt="ShikshaAid Hero"
				layout="fill"
				objectFit="cover"
				className="brightness-50 scale-105 transition-transform duration-700 hover:scale-100"
				priority
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
			<div className="absolute inset-0 flex flex-col items-center justify-end sm:justify-center text-center px-6 z-10">
				<h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
					<span className="bg-gradient-to-r from-white to-orange-300 bg-clip-text text-transparent">
						ShikshaAid
					</span>
				</h1>
				<div className="mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
					<p className="text-white/80 text-sm md:text-base font-medium">
						by Aid Global Foundation
					</p>
				</div>
			</div>
		</section>
	);
}
