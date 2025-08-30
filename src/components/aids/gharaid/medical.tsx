import React from "react";
import { STATIC_IMAGE_HOST } from "@/config/config";
import { CheckSquare, ArrowRight } from "lucide-react";
const servinginfo = [
	"Depression",
	"PTSD (Post-Traumatic Stress Disorder)",
	"Schizophrenia",
	"Dementia",
	"Alcohol and Drug Addiction",
	"Chronic Illness and Post-Accident Injuries",
	"Mental Decline Due to Age or Abandonment",
];
function Medical() {
	return (
		<div className="relative font-serif bg-gradient-to-b from-sky-100 to-white py-10 px-6 sm:px-10 md:px-16 lg:px-24">
			<div className="max-w-7xl mx-auto text-center">
				<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-sky-900 mb-6">
					Medical, Mental Health & Addiction Support
				</h2>
			</div>

			<div
				className="relative  bg-cover bg-center rounded-2xl shadow-xl overflow-hidden"
				style={{
					backgroundImage: `url(${STATIC_IMAGE_HOST}ghar-aid/gharAid-4.webp)`,
				}}
			>
				<div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>

				<div className="relative z-10 flex flex-col lg:flex-row gap-8 p-8 sm:p-10 md:p-12 text-sky-900">
					<div className="flex-1 bg-white bg-opacity-90 rounded-xl p-6 shadow-lg border border-sky-100">
						<h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">
							We serve individuals suffering from:
						</h3>
						<ul className="list-none space-y-3 text-base sm:text-lg md:text-lg text-black leading-snug md:leading-relaxed break-words text-pretty px-2">
							{servinginfo.map((item) => (
								<li
									key={item}
									className="flex items-start gap-3"
								>
									<CheckSquare className="text-cyan-700 w-5 h-5 flex-shrink-0 mt-1" />
									<span className="pl-1">{item}</span>
								</li>
							))}
						</ul>
					</div>

					<div className="flex-1 bg-white bg-opacity-90 rounded-xl p-6 shadow-lg border border-sky-100 ">
						<h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">
							We provide:
						</h3>
						<ul className="space-y-3 text-base sm:text-lg md:text-lg text-black leading-snug md:leading-relaxed break-words text-pretty">
							<li className="flex items-start gap-2">
								<ArrowRight className="text-cyan-700 w-5 h-5 mt-1 flex-shrink-0" />
								Doctor Visits & Mobile Health Vans
							</li>
							<li className="flex items-start gap-2">
								<ArrowRight className="text-cyan-700 w-5 h-5 mt-1 flex-shrink-0" />
								Psychiatric Support & Counseling
							</li>
							<li className="flex items-start gap-2">
								<ArrowRight className="text-cyan-700 w-5 h-5 mt-1 flex-shrink-0" />
								Detox & Recovery Pathways
							</li>
							<li className="flex items-start gap-2">
								<ArrowRight className="text-cyan-700 w-5 h-5 mt-1 flex-shrink-0" />
								Emotional Healing via Therapy & Group Care
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Medical;
