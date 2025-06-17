"use client";

import Image from "next/image";
import { emergencies } from "@/config/emergencies";
import { Stethoscope, ArrowRight, BadgeInfo } from "lucide-react";

const EmergencySection = () => {
	return (
		<section className="bg-white rounded-xl p-2 sm:p-4 md:p-8 lg:p-10 xl:p-12 mx-2 sm:mx-4 md:mx-10 lg:mx-20">
			<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
				<h2 className="text-base sm:text-lg font-bold flex items-center gap-2">
					<Stethoscope className="text-blue-600 h-5 w-5 sm:h-6 sm:w-6 font-bold" />
					Medical Emergency
				</h2>
				<a
					href="#"
					className="text-blue-600 font-medium text-sm sm:text-md hover:underline flex items-center gap-1"
				>
					View All <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
				</a>
			</div>
			<div className="flex gap-4 sm:gap-5 overflow-x-auto my-6 sm:my-10 px-1 sm:px-4 md:px-10">
				{emergencies.map((item) => (
					<div
						key={item.id}
						className="min-w-[220px] sm:min-w-[260px] md:min-w-[280px] max-w-xs flex-shrink-0 bg-white rounded-2xl sm:rounded-4xl shadow-lg flex flex-col transition-transform duration-300 ease-in-out hover:scale-95"
					>
						<div className="relative h-32 sm:h-40 w-full rounded-t-xl overflow-hidden">
							<Image
								src={item.image}
								alt={item.title}
								fill
								className="object-cover"
								sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 33vw"
								priority
							/>
							{item.taxBenefit && (
								<div className="absolute top-2 right-2 bg-yellow-400 text-xs font-semibold px-2 py-1 rounded flex items-center gap-1">
									Tax Benefit{" "}
									<BadgeInfo className="h-3 w-3" />
								</div>
							)}
						</div>
						<div className="flex-1 flex flex-col p-3 sm:p-4">
							<h3 className="font-semibold text-sm sm:text-base mb-1">
								{item.title}
							</h3>
							<div className="mb-2">
								<span className="bg-gray-100 text-xs px-2 py-1 rounded text-gray-700">
									By {item.author}
								</span>
							</div>
							<div className="flex items-center justify-between mb-1">
								<span className="text-blue-600 font-bold text-sm sm:text-base">
									₹{item.raised.toLocaleString()} Raised
								</span>
								<span className="text-gray-700 font-medium text-xs sm:text-sm">
									₹{item.required.toLocaleString()} Required
								</span>
							</div>
							{/* Progress Bar */}
							<div className="w-full bg-gray-200 rounded-full h-2 mb-2">
								<div
									className="bg-blue-500 h-2 rounded-full"
									style={{
										width: `${Math.min(
											(item.raised /
												(item.raised + item.required)) *
												100,
											100,
										)}%`,
									}}
								/>
							</div>
							<div className="flex items-center justify-between mb-3">
								<span className="text-xs text-gray-500">
									{item.backers} Backers
								</span>
							</div>
							<div className="flex gap-2 mt-auto">
								<button className="flex-1 bg-gray-100 text-gray-700 text-xs sm:text-sm rounded px-2 sm:px-3 py-1 font-medium border hover:bg-gray-200 cursor-pointer">
									Share
								</button>
								<button className="flex-1 bg-blue-500 text-white text-xs sm:text-sm rounded px-2 sm:px-3 py-1 font-medium hover:bg-blue-700 cursor-pointer">
									Donate Now
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default EmergencySection;
