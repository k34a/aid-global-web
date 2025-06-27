"use client";

import { partners } from "@/components/homepage/data/partners";

export default function PartnersSection() {
	return (
		<section className="relative font-inter antialiased bg-slate-900 py-16 sm:py-24 overflow-hidden">
			<div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
				<div className="text-center">
					<h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
						Our Trusted Partners
					</h2>
					<p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-10 sm:mb-12">
						We collaborate with leading organizations to create
						lasting change and expand our impact together.
					</p>

					<div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_96px,_black_calc(100%-96px),transparent_100%)]">
						{[...Array(2)].map((_, index) => (
							<ul
								key={index}
								className="flex items-center gap-x-4 sm:gap-x-8 animate-[scroll_20s_linear_infinite]"
								aria-hidden={index === 1}
							>
								{partners.map((partner, i) => (
									<li
										key={`${partner.name}-${i}`}
										className="shrink-0 min-w-[120px] sm:min-w-[150px]"
									>
										<div className="partner-glow px-3 sm:px-4 py-2 sm:py-2.5 rounded-md shadow-md transition duration-300 text-center">
											{partner.name}
										</div>
									</li>
								))}
							</ul>
						))}
					</div>
				</div>
			</div>

			<style jsx>{`
				@keyframes scroll {
					0% {
						transform: translateX(0);
					}
					100% {
						transform: translateX(-50%);
					}
				}

				.partner-glow {
					font-family: "sans-serif";
					font-size: 1rem;
					font-weight: 600;
					color: white;
					text-shadow:
						0 0 5px rgba(255, 255, 255, 0.5),
						0 0 10px rgba(255, 255, 255, 0.6),
						0 0 15px rgba(255, 255, 255, 0.7);
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				@media (min-width: 640px) {
					.partner-glow {
						font-size: 1.25rem;
					}
				}
			`}</style>
		</section>
	);
}
