"use client";

import Image from "next/image";
import {
	CircleDotDashed,
	HeartHandshake,
	HandCoins,
	PiggyBank,
} from "lucide-react";

const MissionSection = () => {
	return (
		<section className="bg-white rounded-xl mx-2 sm:mx-4 md:mx-10 lg:mx-15 pt-8 sm:pt-12 md:pt-16 lg:pt-20 px-4 sm:px-6 md:px-8">
			<h2 className="text-base sm:text-lg font-bold flex items-center gap-2">
				<CircleDotDashed className="text-blue-600 h-5 w-5 sm:h-6 sm:w-6 font-bold" />{" "}
				About Aid Global Foundation
			</h2>
			<div className="my-6 sm:my-8 md:my-10 mx-2 sm:mx-4 md:mx-10 lg:mx-30 px-2 sm:px-4 md:px-8 lg:px-25">
				<h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 font-mono text-center mx-2 sm:mx-4 md:mx-10 lg:mx-20">
					Helping Each Other Can Make The World Better
				</h1>
				<div className="px-2 sm:px-4 md:px-8 lg:px-20 pt-6 sm:pt-8 md:pt-10">
					<div className="flex flex-col md:flex-row gap-4 md:gap-0">
						<Image
							src="/emergencies/Heart-Disease-2.jpg"
							alt="child-image"
							width={200}
							height={50}
							className="object-contain border border-transparent rounded-[40%] w-full md:w-auto max-w-[200px] mx-auto md:mx-0"
						/>
						<p className="text-gray-700 md:pl-10 text-base sm:text-lg font-semibold text-center md:text-left">
							At Aid Global Foundation, we deliver compassionate
							aid with heart and create lasting impact with clear
							purpose. Our commitment is to empower vulnerable
							communities by fostering hope, dignity, and
							sustainable change worldwide.
						</p>
					</div>
					<div className="flex flex-col sm:flex-row justify-between mt-6 sm:mt-8 md:mt-10 text-center text-black font-semibold gap-4 sm:gap-0">
						<div className="flex flex-col items-center">
							<HeartHandshake className="text-blue-600 h-6 w-6 sm:h-8 sm:w-8 font-bold text-center" />
							<span className="text-sm sm:text-base">
								Join Our team
							</span>
							<span className="text-sm sm:text-base">120+</span>
						</div>
						<div className="flex flex-col items-center">
							<HandCoins className="text-blue-600 h-6 w-6 sm:h-8 sm:w-8 font-bold" />
							<span className="text-sm sm:text-base">
								Donate Now
							</span>
						</div>
						<div className="flex flex-col items-center">
							<PiggyBank className="text-blue-600 h-6 w-6 sm:h-8 sm:w-8 font-bold" />
							<span className="text-sm sm:text-base">
								Total Fund Raised
							</span>
							<span className="text-sm sm:text-base">
								10 Lakhs+
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default MissionSection;
