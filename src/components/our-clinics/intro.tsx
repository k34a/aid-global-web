import React from "react";
import Image from "@/components/image";
import { STATIC_IMAGE_HOST } from "@/config/config";

function Intro() {
	return (
		<div>
			<h1 className="font-bold text-3xl md:text-3xl lg:text-5xl text-sky-900 py-12 text-center">
				Our Clinics
			</h1>
			<div className="w-[250px] sm:w-[350px] md:w-[400px] lg:w-[450px] shrink-0 mx-auto">
				<Image
					src={`${STATIC_IMAGE_HOST}ouclinics/india1.webp`}
					width={500}
					height={500}
					alt="India Map"
					className="w-full h-auto"
				/>
			</div>
			<p className="leading-relaxed text-justify mx-6 md:mx-12 lg:mx-16">
				We partner with the National Health Mission and Department of
				Health and Family Welfare in the states of Uttar Pradesh,
				Himachal Pradesh, Haryana, Madhya Pradesh, Gujarat, Mizoram,
				Nagaland, Tripura, Jharkhand, Punjab and Uttarakhand.
				Additionally, we partner with the Municipal Corporation of
				Greater Mumbai (MCGM) in Maharashtra. In Maharashtra, Madhya
				Pradesh, and Uttar Pradesh, we also work with select charitable
				and trust-run hospitals.
				<br />
				<br />
				Below is a list of the clinics that we currently have in India.
				You can search and filter to find the clinics closest to your
				location.
			</p>
		</div>
	);
}

export default Intro;
