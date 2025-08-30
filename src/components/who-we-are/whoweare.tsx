import React from "react";
import Image from "@/components/image";
import { STATIC_IMAGE_HOST } from "@/config/config";

function Whoweeare() {
	return (
		<div
			className="bg-cover bg-center pt-3 pb-3 sm:pt-6 sm:pb-6"
			style={{
				backgroundImage: `url(${STATIC_IMAGE_HOST}whoweare/background.webp)`,
			}}
		>
			<section className="max-w-7xl mx-4 my-10 sm:mx-20 flex flex-col lg:flex-row items-center gap-y-8 gap-8 lg:gap-x-12 px-2 sm:px-4">
				<div className="w-full lg:w-1/2 flex flex-col justify-center">
					<h2 className="text-3xl sm:text-4xl font-bold text-sky-800 mb-4">
						Who Are We
					</h2>
					<p className="text-sm sm:text-lg leading-relaxed text-gray-800">
						<strong className="font-bold">
							Aid Global Foundation
						</strong>{" "}
						is a not-for-profit organization registered in 2025,
						dedicated to bringing dignity, hope, and sustainable
						change to vulnerable communities across India and
						beyond. We focus on providing practical, compassionate
						solutions to life&apos;s most essential needs &ndash;{" "}
						<span className="font-medium text-sky-700">
							Education, Health, Food, and Shelter
						</span>
						.
					</p>
				</div>
				<div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
					<div className="w-full max-w-xs">
						<Image
							src={`${STATIC_IMAGE_HOST}whoweare/aboutus-1.webp`}
							alt="who we are"
							width={340}
							height={340}
							className="w-full h-auto object-contain rounded-lg shadow-lg"
						/>
					</div>
				</div>
			</section>
		</div>
	);
}

export default Whoweeare;
