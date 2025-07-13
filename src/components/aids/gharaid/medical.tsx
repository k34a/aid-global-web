import React from "react";

function Medical() {
	return (
		<div className="relative font-serif bg-gradient-to-b from-blue-50 to-white py-16 px-6 sm:px-10 md:px-16 lg:px-24">
			<div className="max-w-7xl mx-auto text-center">
				<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 mb-10">
					Medical, Mental Health & Addiction Support
				</h2>
			</div>

			<div className="relative bg-[url('/aids/medical.webp')] bg-cover bg-center rounded-2xl shadow-xl overflow-hidden">
				<div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>

				<div className="relative z-10 flex flex-col lg:flex-row gap-8 p-8 sm:p-10 md:p-12 text-blue-900">
					<div className="flex-1 bg-white bg-opacity-90 rounded-xl p-6 shadow-lg border border-blue-100">
						<h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">
							We serve individuals suffering from:
						</h3>
						<ul className="list-disc list-inside space-y-3 text-base sm:text-lg md:text-xl leading-relaxed">
							<li>Depression</li>
							<li>PTSD (Post-Traumatic Stress Disorder)</li>
							<li>Schizophrenia</li>
							<li>Dementia</li>
							<li>Alcohol and Drug Addiction</li>
							<li>Chronic Illness and Post-Accident Injuries</li>
							<li>Mental Decline Due to Age or Abandonment</li>
						</ul>
					</div>

					<div className="flex-1 bg-white bg-opacity-90 rounded-xl p-6 shadow-lg border border-blue-100">
						<h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">
							We provide:
						</h3>
						<ul className="list-disc list-inside space-y-3 text-base sm:text-lg md:text-xl leading-relaxed">
							<li>Doctor Visits & Mobile Health Vans</li>
							<li>Psychiatric Support & Counseling</li>
							<li>Detox & Recovery Pathways</li>
							<li>Emotional Healing via Therapy & Group Care</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Medical;
