"use client";
import React from "react";
import Image from "next/image";
import { STATIC_IMAGE_HOST } from "@/config/config";

function Visionmission() {
	return (
		<div className="w-full">
			<section
				id="vision"
				className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 px-2 sm:px-4 md:px-6 lg:mx-16 py-6 sm:py-10 md:py-14 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl"
			>
				<div className="relative flex-1 min-h-[14rem] sm:min-h-[20rem] md:min-h-[26rem] lg:min-h-[30rem] rounded-2xl shadow-md overflow-hidden">
					<div className="absolute inset-0">
						<Image
							src={`${STATIC_IMAGE_HOST}whoweare/vision.webp`}
							alt="Vision"
							fill
							className="object-cover object-center"
							priority
						/>
					</div>
					<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
					<div className="absolute bottom-0 p-3 sm:p-5 text-white">
						<h2 className="text-base sm:text-lg md:text-2xl font-bold mb-1 sm:mb-2">
							Vision
						</h2>
						<p className="font-medium sm:font-semibold">
							Aid with Heart. Impact with Purpose.
						</p>
					</div>
				</div>

				<div className="relative flex-1 min-h-[14rem] sm:min-h-[20rem] md:min-h-[26rem] lg:min-h-[30rem] rounded-2xl shadow-md overflow-hidden">
					<div className="absolute inset-0">
						<Image
							src={`${STATIC_IMAGE_HOST}whoweare/mission.webp`}
							alt="Mission"
							fill
							className="object-cover object-center"
							priority
						/>
					</div>
					<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
					<div className="absolute bottom-0 p-3 sm:p-5 text-white">
						<h2 className="text-base sm:text-lg md:text-2xl font-bold mb-1 sm:mb-2">
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
