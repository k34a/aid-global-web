"use client";

import { Banner } from "./banner";
import { partners } from "@/config/partners";

export default function PartnersSection() {
	return (
		<section className="relative font-inter antialiased bg-slate-900 py-16 sm:py-10 overflow-hidden">
			<div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
				<div className="text-center">
					<h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
						Our Trusted Partners
					</h2>
					<p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-10 sm:mb-12">
						We collaborate with leading organizations to create
						lasting change and expand our impact together.
					</p>

					<Banner partners={partners} speed={20000} />
				</div>
			</div>
		</section>
	);
}
