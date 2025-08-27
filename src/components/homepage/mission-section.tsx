"use client";

import Image from "@/components/image";
import { STATIC_IMAGE_HOST } from "@/config/config";
import { HeartHandshake, HandCoins, PiggyBank } from "lucide-react";

const MissionSection = () => {
	return (
		<section className="w-full py-12 bg-white">
			<div className="max-w-6xl mx-auto px-4 flex flex-col items-center">
				<h2 className="text-center text-sky-600 text-2xl sm:text-4xl font-bold mb-8">
					Helping Each Other Can Make The World Better
				</h2>

				<div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
					<Image
						src={`${STATIC_IMAGE_HOST}home-page/emergencies/Heart-Disease-2.webp`}
						alt="child-image"
						width={500}
						height={500}
						className="w-full max-w-xs sm:max-w-sm md:max-w-[300px] rounded-2xl shadow-md"
					/>
					<p className="text-zinc-800 text-center md:text-left text-base sm:text-lg leading-relaxed">
						At Aid Global Foundation, we deliver compassionate aid
						with heart and create lasting impact with clear purpose.
						Our commitment is to empower vulnerable communities by
						fostering hope, dignity, and sustainable change
						worldwide.
					</p>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 w-full">
					<div className="flex flex-col items-center bg-sky-50 p-6 rounded-2xl shadow-sm">
						<HeartHandshake className="text-sky-600 h-8 w-8 mb-2" />
						<span className="text-base font-semibold">
							Join Our Team
						</span>
						<span className="text-sm text-zinc-700">120+</span>
					</div>
					<div className="flex flex-col items-center bg-sky-50 p-6 rounded-2xl shadow-sm">
						<HandCoins className="text-sky-600 h-8 w-8 mb-2" />
						<span className="text-base font-semibold">
							Donate Now
						</span>
					</div>
					<div className="flex flex-col items-center bg-sky-50 p-6 rounded-2xl shadow-sm">
						<PiggyBank className="text-sky-600 h-8 w-8 mb-2" />
						<span className="text-base font-semibold">
							Total Fund Raised
						</span>
						<span className="text-sm text-zinc-700">1 Lakh+</span>
					</div>
				</div>
			</div>
		</section>
	);
};

export default MissionSection;
