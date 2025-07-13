import React from "react";
import Image from "next/image";
import { STATIC_IMAGE_HOST } from "@/config/config";
function Live() {
	return (
		<div className="font-serif mx-5 sm:mx-7 md:mx-9 lg:mx-11 py-16 mt-5 sm:mt-7 md:mt-9 bg-gradient-to-b from-gray-200 to-gray-50 lg:mt-11 relative ">
			<h2 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center text-blue-900 mb-10">
				{" "}
				Reintegration & Livelihood Support
			</h2>
			<h2 className="font-bold text-md sm:text-lg md:text-xl lg:text-2xl text-center mt-2 sm:mt-3 md:mt-4 lg-mt-5 mb-2 sm:mb-3 md:mb-4 lg-mb-5">
				We dont stop at rescue—we rebuild lives.
			</h2>
			<div className="flex flex-col lg:flex-row justify-between mx-5 sm:mx-10 gap-12 lg:gap-10">
				<div className="flex flex-col p-6 sm:p-8 rounded-xl bg-white/90 shadow-lg text-black">
					<h2 className="font-bold text-base sm:text-lg md:text-lg lg:text-xl mt-2 sm:mt-3 md:mt-4 lg-mt-5">
						We support:
					</h2>
					<p className="mt-3 sm:mt-4 md:mt-5 lg-mt-6 text-base sm:text-lg md:text-xl leading-relaxed">
						Family reunification (if safe and possible) Vocational
						training for adults and older youth Identity document
						recovery (Aadhaar, health card, etc.) Life skills
						training and emotional resilience Connecting to small
						job opportunities or home-based work Our goal: from
						rescued to restored.
					</p>
				</div>
				<Image
					className="rounded-xl shadow-lg sm:mx-auto"
					src={`${STATIC_IMAGE_HOST}ghar-aid/buildlives.webp`}
					alt="lives"
					width={500}
					height={400}
				/>
			</div>{" "}
		</div>
	);
}

export default Live;
