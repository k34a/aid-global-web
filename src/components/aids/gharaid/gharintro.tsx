import React from "react";
import Image from "@/components/image";
import { STATIC_IMAGE_HOST } from "@/config/config";
function Gharintro() {
	return (
		<div className="font-serif">
			<h1 className="font-bold text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans mt-10 text-red-800 drop-shadow-sm">
				GharAid
			</h1>

			<div className="relative mt-8 mx-5 sm:mx-7 md:mx-9 lg:mx-11 overflow-hidden rounded-2xl shadow-lg">
				<div className="absolute inset-0 flex">
					<div className="w-1/2 bg-[#003b4a]" />
					<div className="w-1/2 bg-[#f8f3fb]" />
				</div>

				<div className="relative z-10 flex flex-col lg:flex-row items-stretch justify-center gap-10 lg:gap-0 px-6 py-12">
					<div className="w-full lg:w-1/2 flex justify-center items-center">
						<div className="w-full max-w-[520px] h-[500px] flex">
							<Image
								className="rounded-xl border-4 border-sky-400 shadow-xl object-cover w-full h-full"
								src={`${STATIC_IMAGE_HOST}ghar-aid/gharAid-hero.webp`}
								width={520}
								height={500}
								alt="GharAid"
							/>
						</div>
					</div>

					<div className="w-full lg:w-1/2 flex justify-center items-stretch">
						<div className="bg-white/90 backdrop-blur-md shadow-xl rounded-xl p-6 sm:p-8 text-black leading-relaxed w-full max-w-[520px]">
							<h2 className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl font-sans text-sky-800">
								By Aid Global Foundation
								<br />
								<span className="italic text-sm sm:text-base md:text-lg lg:text-xl text-gray-700">
									&quot;Rescue. Rebuild. Restore.&quot;
								</span>
							</h2>

							<p className="mt-5 text-sm sm:text-base md:text-lg lg:text-xl text-gray-800 leading-relaxed">
								GharAid is a humanitarian initiative by Aid
								Global Foundation committed to rescuing,
								rehabilitating, and caring for homeless
								individuals and orphaned children across
								Bhiwandi, Thane, Mumbai, and other parts of
								Maharashtra.
								<br />
								<br />
								Our mission is to give a second chance to those
								living in helpless conditions {"-"}whether
								abandoned on the streets, suffering from mental
								illness, disabled, elderly, or orphaned. We
								provide safe shelter, medical care, emotional
								healing, and the dignity they deserve.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Gharintro;
