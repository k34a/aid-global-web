"use client";
import Image from "next/image";

const CallToAction = () => {
	return (
		<section className="bg-white rounded-xl mx-2 sm:mx-4 md:mx-10 lg:mx-15 px-2 sm:px-4 md:px-6">
			<div className="my-8 sm:my-12 md:my-14 lg:my-15 mx-2 sm:mx-4 md:mx-10 lg:mx-30 px-2 sm:px-4 md:px-8 lg:px-32 cursor-pointer">
				<h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-black-900 font-mono text-center mx-2 sm:mx-4 md:mx-10 lg:mx-20">
					Be the <span className="text-blue-600"> Hope </span> for the
					Helpless
				</h1>
				<div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
					<div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 mx-2 sm:mx-4 md:mx-10 lg:mx-30 pt-6 sm:pt-8 md:pt-10">
						<div className="relative w-full sm:w-48 md:w-56 lg:w-60 h-48 sm:h-52 md:h-56 lg:h-60 bg-white border border-transparent rounded-xl sm:rounded-2xl">
							<Image
								src="/emergencies/Heart-Disease-2.jpg"
								alt="call-to-action-image"
								fill
								className="object-cover border border-transparent rounded-lg"
							/>
						</div>
						<div className="flex flex-col items-center justify-center w-full sm:w-48 md:w-56 lg:w-60 h-48 sm:h-52 md:h-56 lg:h-60 border border-transparent rounded-xl sm:rounded-2xl bg-[#eceaea] p-4 sm:p-6">
							<h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3 sm:mb-4 text-center">
								Save Life
							</h2>
							<button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1.5 sm:py-2 px-3 sm:px-4 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base">
								Donate Now
							</button>
						</div>
					</div>

					<div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 mx-2 sm:mx-4 md:mx-10 lg:mx-30 pt-6 sm:pt-8 md:pt-10">
						<div className="relative w-full sm:w-48 md:w-56 lg:w-60 h-48 sm:h-52 md:h-56 lg:h-60 bg-white border border-transparent rounded-xl sm:rounded-2xl">
							<Image
								src="/emergencies/homeless.webp"
								alt="call-to-action-image"
								fill
								className="object-cover border border-transparent rounded-lg"
							/>
						</div>
						<div className="flex flex-col items-center justify-center w-full sm:w-48 md:w-56 lg:w-60 h-48 sm:h-52 md:h-56 lg:h-60 border border-transparent rounded-xl sm:rounded-2xl bg-[#eceaea] p-4 sm:p-6">
							<h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3 sm:mb-4 text-center">
								Mission Hunger
							</h2>
							<button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1.5 sm:py-2 px-3 sm:px-4 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base">
								Donate Now
							</button>
						</div>
					</div>

					<div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 mx-2 sm:mx-4 md:mx-10 lg:mx-30 pt-6 sm:pt-8 md:pt-10">
						<div className="relative w-full sm:w-48 md:w-56 lg:w-60 h-48 sm:h-52 md:h-56 lg:h-60 bg-white border border-transparent rounded-xl sm:rounded-2xl">
							<Image
								src="/aids/shiksha.webp"
								alt="call-to-action-image"
								fill
								className="object-cover border border-transparent rounded-lg"
							/>
						</div>
						<div className="flex flex-col items-center justify-center w-full sm:w-48 md:w-56 lg:w-60 h-48 sm:h-52 md:h-56 lg:h-60 border border-transparent rounded-xl sm:rounded-2xl bg-[#eceaea] p-4 sm:p-6">
							<h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3 sm:mb-4 text-center">
								Mission Education
							</h2>
							<button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1.5 sm:py-2 px-3 sm:px-4 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base">
								Donate Now
							</button>
						</div>
					</div>

					<div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 mx-2 sm:mx-4 md:mx-10 lg:mx-30 pt-6 sm:pt-8 md:pt-10">
						<div className="relative w-full sm:w-48 md:w-56 lg:w-60 h-48 sm:h-52 md:h-56 lg:h-60 bg-white border border-transparent rounded-xl sm:rounded-2xl">
							<Image
								src="/aids/sakhi.jpg"
								alt="call-to-action-image"
								fill
								className="object-cover border border-transparent rounded-lg"
							/>
						</div>
						<div className="flex flex-col items-center justify-center w-full sm:w-48 md:w-56 lg:w-60 h-48 sm:h-52 md:h-56 lg:h-60 border border-transparent rounded-xl sm:rounded-2xl bg-[#eceaea] p-4 sm:p-6">
							<h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3 sm:mb-4 text-center">
								Women Empowerment
							</h2>
							<button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1.5 sm:py-2 px-3 sm:px-4 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base">
								Donate Now
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CallToAction;
