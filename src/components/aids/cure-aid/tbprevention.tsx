import { STATIC_IMAGE_HOST } from "@/config/config";
import { ArrowRightSquare } from "lucide-react";
import Image from "@/components/image";
const tbPoints = [
	<>
		<span className="text-[#118B50] font-medium">Stigma-reduction</span> and{" "}
		<span className="text-[#118B50] font-medium">awareness campaigns</span>{" "}
		in slum communities and tribal areas.
	</>,
	<>
		Mobile testing and access to{" "}
		<span className="text-[#E3B505] font-medium">free TB diagnostics</span>{" "}
		and sample collection.
	</>,
	<>
		Treatment support through{" "}
		<span className="text-[#118B50] font-medium">DOTS adherence</span>,{" "}
		<span className="text-[#5DB996] font-medium">nutritional aid</span>, and
		regular follow-ups.
	</>,
	<>
		<span className="text-[#3B1C32] font-medium">
			Socioeconomic assistance
		</span>{" "}
		for TB-affected families, including women and caregivers.
	</>,
	<>
		Collaboration with public health networks for{" "}
		<span className="text-[#E3B505] font-medium">drug-resistant TB</span>{" "}
		and patient navigation.
	</>,
	<>
		Engagement with healthcare practitioners to strengthen{" "}
		<span className="text-[#118B50] font-medium">TB outreach and care</span>
		.
	</>,
	<>
		Support of the{" "}
		<span className="text-[#5DB996] font-medium">
			Nikshay Mitra Program
		</span>{" "}
		for continued TB patient care and counseling.
	</>,
	<>
		<span className="text-[#3B1C32] font-medium">
			Zero Dropout Strategy
		</span>{" "}
		across Bhiwandi, Maharashtra and pan-India to ensure no patient or child
		is left behind.
	</>,
	<>
		Special outreach for{" "}
		<span className="text-[#5DB996] font-medium">migrant laborers</span>,
		contractors, and slum communities including counseling, awareness and
		nutrition support.
	</>,
];

const TBPrevention = () => {
	return (
		<section className="w-full py-10 px-4 md:px-20 bg-gradient-to-br from-[#F9FAFB] via-[#E0F2FE] to-[#E0F7FA]">
			<div className="max-w-7xl mx-auto space-y-10">
				<div className="text-center max-w-3xl mx-auto space-y-4 px-2">
					<h2 className="relative inline-block text-2xl sm:text-3xl md:text-4xl font-bold text-[#B91C1C] text-center mx-auto">
						<span className="block w-40 mx-auto mb-2 border-t-2 border-[#FBBF24]"></span>
						Tuberculosis (TB) Prevention & Care
						<span className="block w-40 mx-auto mt-2 border-b-2 border-[#5DB996]"></span>
					</h2>

					<p className="text-[#555] text-sm sm:text-base leading-relaxed">
						A{" "}
						<span className="text-[#118B50] font-semibold">
							community-centered
						</span>{" "}
						approach to end TB through{" "}
						<span className="text-[#118B50] font-medium">
							education
						</span>
						,{" "}
						<span className="text-[#118B50] font-medium">
							timely diagnosis
						</span>
						,{" "}
						<span className="text-[#118B50] font-medium">
							nutritional support
						</span>
						, and{" "}
						<span className="text-[#118B50] font-medium">
							stigma-free care
						</span>
						.
					</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
					<div className="relative w-full h-[250px] sm:h-[350px] md:h-[420px] md:col-span-5 rounded-xl overflow-hidden shadow-md">
						<Image
							src={`${STATIC_IMAGE_HOST}cure-aid/cureAid-tb.webp`}
							alt="TB Prevention"
							fill
							className="object-cover"
							priority
						/>
					</div>
					<div className="space-y-4 md:col-span-7">
						{tbPoints.map((point, index) => (
							<div
								key={index}
								className="flex items-start gap-3 sm:gap-4"
							>
								<ArrowRightSquare className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 mt-1 flex-shrink-0" />
								<p className="text-[#1A1A1D] text-base  leading-relaxed">
									{point}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default TBPrevention;
