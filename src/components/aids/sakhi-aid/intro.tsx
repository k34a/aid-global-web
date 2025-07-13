import { STATIC_IMAGE_HOST } from "@/config/config";
import Image from "next/image";

export default function SakhiAidIntro() {
	return (
		<section className="bg-rose-700 text-white py-8 sm:py-12 px-3 sm:px-6 md:px-10 lg:px-20 flex flex-col lg:flex-row items-center justify-between gap-8">
			{/* TEXT CONTENT */}
			<div className="w-full lg:w-1/2 text-center lg:text-left">
				<h2 className="text-base sm:text-lg font-bold uppercase tracking-wide">
					SakhiAid
				</h2>
				<p className="text-white/90 font-medium mb-2 text-sm sm:text-base">
					Led by Aid Global Foundation
				</p>
				<h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6 leading-tight">
					“Empowering Women, <br className="hidden sm:block" />
					Enabling Futures”
				</h1>

				<p className="text-base sm:text-lg md:text-xl text-white/90 mb-3 sm:mb-4 leading-relaxed font-semibold">
					SakhiAid is a flagship initiative of Aid Global Foundation
					focused on the holistic empowerment of marginalized women
					and adolescent girls. Our mission is to uplift them through
					health awareness, livelihood training, emotional counseling,
					leadership building, and social dignity.
				</p>

				<p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed font-semibold">
					We work in rural villages, urban slums, tribal belts, and
					backward communities—where opportunities for women are the
					most limited, but where their potential is the greatest.
				</p>
			</div>

			{/* IMAGE SECTION */}
			<div className="w-full lg:w-1/2 flex justify-center items-center">
				<div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
					<Image
						src={`${STATIC_IMAGE_HOST}sakhi-aid/intro.webp`}
						alt="Empowered SakhiAid Girls"
						width={600}
						height={500}
						className="rounded-md w-full h-auto"
						priority
					/>
					<div className="absolute inset-0 mix-blend-multiply rounded-md" />
				</div>
			</div>
		</section>
	);
}
