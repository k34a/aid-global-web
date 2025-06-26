"use client";
import React from "react";
import Image from "next/image";

function Visionmission() {
	return (
		<div className="w-full">
			<section
				id="vision"
				className="flex flex-col md:flex-row gap-6 md:gap-8 px-4 sm:px-6 lg:px-16 py-10 sm:py-14 md:py-16 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl"
			>
				<div className="relative flex-1 min-h-[16rem] sm:min-h-[22rem] md:min-h-[26rem] lg:min-h-[30rem] rounded-2xl shadow-md overflow-hidden">
					<div className="absolute inset-0">
						<Image
							src="/vision.webp"
							alt="Vision"
							fill
							className="object-cover object-center"
							priority
						/>
					</div>
					<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
					<div className="absolute bottom-0 p-4 sm:p-6 text-white">
						<h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">
							Vision
						</h2>
						<p className="font-medium sm:font-semibold">
							Aid with Heart. Impact with Purpose.
						</p>
					</div>
				</div>

				<div className="relative flex-1 min-h-[16rem] sm:min-h-[22rem] md:min-h-[26rem] lg:min-h-[30rem] rounded-2xl shadow-md overflow-hidden">
					<div className="absolute inset-0">
						<Image
							src="/mission.webp"
							alt="Mission"
							fill
							className="object-cover object-center"
							priority
						/>
					</div>
					<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
					<div className="absolute bottom-0 p-4 sm:p-6 text-white">
						<h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">
							Mission
						</h2>
						<p className="font-medium sm:font-semibold text-xs sm:text-sm md:text-base">
							We deliver compassionate aid with heart and create
							lasting impact with clear purpose. Our commitment is
							to empower vulnerable communities by fostering hope,
							dignity, and sustainable change worldwide.
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}

export default Visionmission;
