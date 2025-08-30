import React from "react";
import Image from "@/components/image";
import { STATIC_IMAGE_HOST } from "@/config/config";
function Rescueinfo() {
	return (
		<div className="bg-gradient-to-b from-red-200 to-white mt-5 sm:mt-5 md:mt-7 lg:mt-9 px-4 sm:px-6 md:px-10 lg:px-24 py-16 sm:py-20 font-serif">
			<div className="mx-auto max-w-7xl">
				<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-sky-900 text-center mb-12 sm:mb-14">
					Rescue Across Maharashtra
				</h2>

				<div className="flex flex-col lg:flex-row gap-10 sm:gap-12">
					<div className="flex-1 space-y-8">
						<div className="bg-white border border-sky-100 rounded-2xl shadow-md p-5 sm:p-6">
							<h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-sky-700 mb-3">
								GharAid teams operate across:
							</h3>
							<ul className="list-disc list-inside text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl space-y-1">
								<li>Railway stations, footpaths, bus stops</li>
								<li>Underpasses, bridges, public hospitals</li>
								<li>Abandoned buildings & unsafe zones</li>
								<li>Slums and disaster-hit areas</li>
							</ul>
						</div>

						<div className="bg-white border border-sky-100 rounded-2xl shadow-md p-5 sm:p-6">
							<h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-sky-700 mb-3">
								Our rescue coverage includes:
							</h3>
							<p className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl">
								Bhiwandi (core focus), Thane District, Mumbai
								City and Suburbs, and other parts of
								Maharashtra.
							</p>
						</div>

						<div className="bg-white border border-sky-100 rounded-2xl shadow-md p-5 sm:p-6">
							<h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-sky-700 mb-3">
								We collaborate with:
							</h3>
							<ul className="list-disc list-inside text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl space-y-1">
								<li>Local citizens</li>
								<li>Police, civic officials, and childline</li>
								<li>Hospitals and transport staff</li>
								<li>Volunteers and social workers</li>
							</ul>
							<p className="mt-4 text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl">
								Our team brings people from dangerous, unhealthy
								street environments into a safe space of care.
							</p>
						</div>
					</div>

					<div className="flex-1 flex flex-col gap-8">
						<div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 rounded-2xl shadow-lg overflow-hidden">
							<Image
								src={`${STATIC_IMAGE_HOST}ghar-aid/gharAid-2.webp`}
								alt="Rescue operations"
								fill
								style={{ objectFit: "cover" }}
								className="rounded-2xl"
							/>
						</div>
						<div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 rounded-2xl shadow-lg overflow-hidden">
							<Image
								src={`${STATIC_IMAGE_HOST}ghar-aid/gharAid-3.webp`}
								alt="Medical rescue"
								fill
								style={{ objectFit: "cover" }}
								className="rounded-2xl"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Rescueinfo;
