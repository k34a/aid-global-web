"use client";

import Image from "@/components/image";
import { aids } from "@/components/homepage/data/aids";
import { motion } from "framer-motion";
import Link from "next/link";
import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";

const AidsSection = () => {
	return (
		<section className="relative w-full py-8 bg-white flex flex-col justify-center items-center">
			<h2 className="text-center w-full text-3xl sm:text-4xl font-bold pb-8">
				<span className="inline-block relative">
					Give a Helping <span className="text-blue-500 ">Hand</span>{" "}
					For <span className="text-blue-500 ">Needy People</span>
				</span>
			</h2>
			<div className="w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
				<Carousel
					slideSize={{
						base: "100%",
						sm: "50%",
						md: "33.333%",
						lg: "33%",
					}}
					controlsOffset="0%"
					slideGap={{ base: "md", sm: "lg" }}
					withIndicators
					withControls
					emblaOptions={{
						loop: true,
						align: "center",
						containScroll: "trimSnaps",
						dragFree: true,
						skipSnaps: false,
						duration: 25,

						inViewThreshold: 0.7,
						breakpoints: {
							"(max-width: 768px)": {
								dragFree: false,
								containScroll: false,
							},
						},
					}}
					styles={{
						indicator: {
							backgroundColor: "#38bdf8",
							transform: "translate(0px, 45px)",
							width: "12px",
							height: "12px",
							transition: "all 150ms ease",
							"&[data-active]": {
								backgroundColor: "#1e40af",
							},
						},
						control: {
							backgroundColor: "rgba(255, 255, 255, 0.9)",
							border: "1px solid #e5e7eb",
							color: "#374151",
							transition: "all 200ms ease",
							"&:hover": {
								backgroundColor: "#38bdf8",
								color: "white",
								transform: "scale(1.05)",
							},
						},
					}}
				>
					{aids.map((item) => (
						<Carousel.Slide key={item.id}>
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-50px" }}
								transition={{ duration: 0.5, ease: "easeOut" }}
								className="h-full"
							>
								<div className="relative bg-white rounded-xl shadow-lg transition-all duration-300 flex flex-col overflow-hidden h-full group">
									{/* Image Container */}
									<div className="relative h-60 sm:h-56 md:h-64 lg:h-78 w-full overflow-hidden">
										<Image
											src={item.image}
											alt={item.title}
											className="object-cover transition-transform duration-500 group-hover:scale-110"
											fill
											sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
											priority={false}
											loading="lazy"
										/>
										{/* Enhanced Gradient Overlay */}
										<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-90  transition-opacity duration-300" />
									</div>

									{/* Content Container */}
									<div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-5 lg:p-6">
										{/* Title */}
										<div className="flex-shrink-0">
											<h3 className="text-white text-base sm:text-lg lg:text-xl font-bold leading-tight mb-2 drop-shadow-lg group-hover:text-blue-100 transition-colors duration-300">
												{item.title}
											</h3>
										</div>

										{/* Description and Actions */}
										<div className="flex-grow flex flex-col justify-end">
											<p className="text-white text-xs sm:text-sm lg:text-base mb-4">
												{item.desc}
											</p>

											{/* Action Buttons */}
											<div className="flex  sm:flex-row gap-5 sm:gap-10">
												<button
													className="flex-1 px-2 sm:px-2 sm:py-2 rounded-lg backdrop-blur-3xl font-semibold text-white text-xs sm:text-sm border"
													aria-label={`Donate to ${item.title}`}
												>
													Donate Now
												</button>
												<Link
													href={item.link}
													className="flex-1 px-2 py-1 sm:px-4 sm:py-2.5 rounded-lg font-semibold bg-blue-500 text-white text-xs sm:text-sm text-center"
													aria-label={`Read more about ${item.title}`}
												>
													Read More
												</Link>
											</div>
										</div>
									</div>
								</div>
							</motion.div>
						</Carousel.Slide>
					))}
				</Carousel>
			</div>
		</section>
	);
};

export default AidsSection;
