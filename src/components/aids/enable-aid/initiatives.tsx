import Image from "@/components/image";
import { HeartHandshake, ArrowBigRight } from "lucide-react";
import { enableAidData } from "@/components/aids/enable-aid/key-initiatives";

export default function KeyInitiatives() {
	return (
		<section className="w-[95%] bg-white mx-auto overflow-hidden">
			{enableAidData.map((item) => (
				<div
					key={item.id}
					className={`flex flex-col  md:gap-8 lg:gap-0 lg:flex-row ${item.id % 2 !== 0 ? "lg:flex-row-reverse" : ""} shadow-xl rounded-3xl my-3 mx-2 md:my-6 lg:my-8`}
				>
					{/* Image Section */}
					<div className="relative w-[95%] mx-auto h-56 xs:h-64 sm:h-80 md:h-96 lg:w-1/2 lg:h-auto shadow-lg rounded-3xl overflow-hidden mx-3 mt-2 mb-0 lg:my-10 lg:mx-3 min-h-[220px]">
						<Image
							src={item.image}
							alt={item.title}
							fill
							className="object-cover"
							sizes="(max-width: 1024px) 100vw, 50vw"
						/>
					</div>

					{/* Text Section with Background Circles */}
					<div className="relative w-[95%] mx-auto lg:w-1/2 p-4 xs:p-6 sm:p-8 md:p-10 lg:p-16 bg-[#fbf6ff] flex flex-col justify-center text-[#3a3a3a] rounded-3xl overflow-hidden shadow-lg my-3 mx-3 lg:my-10 lg:mx-10 min-h-[220px]">
						{/* Background Circles */}

						<div className="absolute right-[-120px] xs:right-[-180px] sm:right-[-220px] md:right-[-260px] lg:right-[-300px] top-1/2 -translate-y-1/2 z-0 pointer-events-none max-w-full overflow-x-hidden">
							<div className="w-[240px] xs:w-[320px] sm:w-[400px] md:w-[500px] lg:w-[600px] h-[240px] xs:h-[320px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-full bg-[#d9e6ea] opacity-60" />
							<div className="absolute top-[24px] left-[24px] xs:top-[36px] xs:left-[36px] sm:top-[48px] sm:left-[48px] md:top-[60px] md:left-[60px] w-[180px] xs:w-[240px] sm:w-[300px] md:w-[360px] lg:w-[480px] h-[180px] xs:h-[240px] sm:h-[300px] md:h-[360px] lg:h-[480px] rounded-full bg-[#aac7d1] opacity-50" />
							<div className="absolute top-[48px] left-[48px] xs:top-[72px] xs:left-[72px] sm:top-[96px] sm:left-[96px] md:top-[120px] md:left-[120px] w-[120px] xs:w-[160px] sm:w-[200px] md:w-[240px] lg:w-[360px] h-[120px] xs:h-[160px] sm:h-[200px] md:h-[240px] lg:h-[360px] rounded-full bg-[#7aa7b7] opacity-40" />
							<div className="absolute top-[72px] left-[72px] xs:top-[108px] xs:left-[108px] sm:top-[144px] sm:left-[144px] md:top-[180px] md:left-[180px] w-[80px] xs:w-[120px] sm:w-[160px] md:w-[200px] lg:w-[240px] h-[80px] xs:h-[120px] sm:h-[160px] md:h-[200px] lg:h-[240px] rounded-full bg-[#4a889e] opacity-30" />
						</div>

						{/* Foreground Content */}
						<div className="relative z-10">
							<h2 className="text-xl sm:text-2xl font-bold text-[#003944] mb-2">
								{item.title}
							</h2>
							<p className="italic font-bold text-xs xs:text-sm sm:text-base mb-4 text-rose-800">
								{item.tagline}
							</p>

							<ul className="text-gray-800 text-left space-y-3 xs:space-y-4 text-xs xs:text-sm sm:text-base">
								{item.bullets.map((bullet, i) => (
									<li
										key={i}
										className="flex items-start gap-2"
									>
										<span className="mt-1 text-pink-700">
											<HeartHandshake
												size={18}
												className="xs:w-5 xs:h-5"
											/>
										</span>
										<div>
											{typeof bullet === "string" ? (
												<span className="text-sm sm:text-base">
													{bullet}
												</span>
											) : (
												<>
													<span className="font-semibold text-sm sm:text-base">
														{bullet.text}
													</span>
													<ul className="mt-2 pl-2 xs:pl-6 space-y-1 xs:space-y-2">
														{bullet.subpoints.map(
															(sub, j) => (
																<li
																	key={j}
																	className="flex items-start gap-2 text-sm sm:text-base text-gray-700"
																>
																	<ArrowBigRight className="text-pink-600 w-4 h-4 sm:w-5 sm:h-5 mt-[2px] shrink-0" />
																	<span>
																		{sub}
																	</span>
																</li>
															),
														)}
													</ul>
												</>
											)}
										</div>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			))}
		</section>
	);
}
