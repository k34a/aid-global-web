"use client";

import Image from "@/components/image";
import { STATIC_IMAGE_HOST } from "@/config/config";
import {
	CircleDotDashed,
	HeartHandshake,
	HandCoins,
	PiggyBank,
} from "lucide-react";

const MissionSection = () => {
	return (
		<section className="w-full my-10">
			<div className="flex w-full flex-col items-center">
				<h2 className="text-center w-full text-blue-600 text-3xl sm:text-4xl font-bold py-8">
					Helping Each Other Can Make The World Better
				</h2>
				<div className="px-[20vw] my-10 ">
					<div className="flex justify-center sm:items-center flex-col sm:flex-row gap-4 sm:gap-0">
						<Image
							src={`${STATIC_IMAGE_HOST}home-page/emergencies/Heart-Disease-2.webp`}
							alt="child-image"
							width={500}
							height={500}
							className="sm:w-[10vw] sm:h-[10vw] border-2  rounded-3xl"
						/>
						<p className="text-zinc-800 sm:p-10 sm:pr-30 sm:text-left sm:text-lg text-center">
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
