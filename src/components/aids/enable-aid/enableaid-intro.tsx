"use client";
import Image from "next/image";
import { Heart } from "lucide-react";
export default function VisionAidHero() {
	return (
		<section className="relative w-full overflow-hidden">
			{/* Background Split */}
			<div className="absolute inset-0 z-0 flex flex-col sm:flex-row">
				<div className="w-full sm:w-2/3 h-1/2 sm:h-full bg-[#f6f3fc] " />
				<div className="hidden sm:block sm:w-1/3 sm:h-full bg-[#003944]" />
			</div>

			{/* Main Content */}
			<div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 md:px-12 lg:px-20 py-8 sm:py-14 md:py-20 gap-8 sm:gap-12">
				{/* Text Side */}
				<div className="w-full md:w-1/2 text-gray-800 space-y-4 sm:space-y-6">
					{/* Tagline */}
					<p className="text-xs sm:text-sm font-bold uppercase tracking-wide text-[#6a1e55] border-l-4 pl-2 sm:pl-3 border-[#6a1e55]">
						“Enabling Abilities. Empowering Futures.”
					</p>

					{/* Heading */}
					<h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-snug text-black">
						EnableAid – An Initiative by{" "}
						<span className="text-[#003944]">
							Aid Global Foundation
						</span>
					</h1>

					{/* Sub Quote */}
					<p className="text-base sm:text-lg text-[#8b3a2b] font-medium italic">
						EnableAid is a flagship health and inclusion program of
						Aid Global Foundation, dedicated to identifying,
						treating, and empowering children with disabilities and
						congenital challenges. From early diagnosis to lifelong
						support, EnableAid transforms lives through inclusive
						care — delivered free of cost and strives to build a
						society where every ability is valued and every child is
						given a chance to thrive.
					</p>

					{/* CTA */}
					<button className="mt-3 sm:mt-4 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-[#003944] hover:bg-[#c44536] text-white font-semibold shadow-lg transition-transform transform hover:scale-105 duration-300 flex items-center gap-2 text-sm sm:text-base">
						<Heart className="w-4 h-4 sm:w-5 sm:h-5" />
						Help Now
					</button>
				</div>

				{/* Image Side */}
				<div className="w-full md:w-1/2 flex justify-center relative mt-6 md:mt-0">
					<div className="relative w-full max-w-xs sm:max-w-md md:max-w-lg aspect-[5/4] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
						<Image
							src="https://website-content.aidglobal.ngo/enable-aid/intro.jpg"
							alt="EnableAid Hero"
							fill
							priority
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							className="object-cover"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
