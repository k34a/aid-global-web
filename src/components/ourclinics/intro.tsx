import React from "react";
import Image from "@/components/image";
import { STATIC_IMAGE_HOST } from "@/config/config";

function Intro() {
	return (
		<div>
			<h1 className="font-bold text-3xl md:text-3xl lg:text-5xl text-center text-blue-900 mb-12">
				Our Locations
			</h1>

			<div className="flex sm:flex-row flex-col items-center mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-32 justify-between">
				<div className="w-[250px] sm:w-[350px] md:w-[400px] lg:w-[450px] xl:w-[450px] shrink-0">
					<Image
						src={`${STATIC_IMAGE_HOST}ouclinics/india1.webp`}
						width={500}
						height={500}
						alt="India Map"
						className="w-full h-auto"
					/>
				</div>
				<p className="mt-5 lg:mt-0 -translate-y-6 lg:-translate-y-10 font-serif leading-relaxed text-lg lg:ml-10 text-justify relative z-10">
					We partner with the National Health Mission and Department
					of Health and Family Welfare in the states of Uttar Pradesh,
					Himachal Pradesh, Haryana, Madhya Pradesh, Gujarat, Mizoram,
					Nagaland, Tripura, Jharkhand, Punjab and Uttarakhand.
					Additionally, we partner with the Municipal Corporation of
					Greater Mumbai (MCGM) in Maharashtra. In Maharashtra, Madhya
					Pradesh, and Uttar Pradesh, we also work with select
					charitable and trust-run hospitals.
				</p>
			</div>
		</div>
	);
}

export default Intro;
