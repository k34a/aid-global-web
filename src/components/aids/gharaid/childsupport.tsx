import React from "react";
import Image from "@/components/image";
import { STATIC_IMAGE_HOST } from "@/config/config";
function Childsupport() {
	return (
		<div className="mx-5 sm:mx-7 md:mx-9 lg:mx-11 py-16 mt-5 sm:mt-7 md:mt-9 lg:mt-11 bg-gradient-to-b from-pink-100 to-yellow-50">
			<h2 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center text-sky-900 mb-10">
				Orphaned & Abandoned Child Support
			</h2>
			<div className="flex flex-col lg:flex-row justify-between mx-5 sm:mx-10 gap-12 lg:gap-10">
				<div className="flex flex-col p-6 sm:p-8 rounded-xl bg-white/90 shadow-lg text-black">
					<h3 className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl mb-4 text-sky-700">
						Children rescued from neglect, abuse, or street life are
						given:
					</h3>

					<ul className="list-disc list-inside space-y-2 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
						<li>Immediate shelter and emergency care</li>
						<li>Nutrition, education, and emotional healing</li>
						<li>Admission to nearby schools</li>
						<li>Recreational and play-based learning</li>
						<li>
							Legal support for adoption/foster placement (via CWC
							norms)
						</li>
					</ul>

					<h2 className="mt-6 text-sm sm:text-base md:text-lg lg:text-xl font-bold text-sky-700 leading-relaxed">
						Every child deserves a safe home and a joyful future.
					</h2>
				</div>

				<Image
					className="rounded-xl shadow-lg sm:mx-auto"
					src={`${STATIC_IMAGE_HOST}ghar-aid/gharAid-5.webp`}
					alt="lives"
					width={500}
					height={400}
				/>
			</div>{" "}
		</div>
	);
}

export default Childsupport;
