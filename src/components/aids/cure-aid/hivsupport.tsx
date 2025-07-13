import { CheckCheck, HeartHandshake, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { STATIC_IMAGE_HOST } from "@/config/config";

const awarenessPoints = [
	"HIV awareness sessions conducted in schools, slums, and workplaces to educate children, youth, and adults about transmission, prevention, and testing.",
	"Voluntary HIV testing camps in partnership with public health centers to encourage early detection and reduce stigma.",
	"Counseling and emotional support for individuals and families affected by HIV.",
	"Anti-retroviral therapy (ART) linkage for those diagnosed, with follow-up and adherence tracking.",
];
const specialFocus = [
	"Prevention of Parent-to-Child Transmission (PPTCT) for HIV-positive mothers.",
	"Life skills and rights-based education for adolescents to promote safe practices and reduce fear.",
	"Nutrition, hygiene, and mental health support for children living with or affected by HIV.",
];

const HivSupport = () => {
	return (
		<section className="bg-gradient-to-br from-rose-50 to-rose-100 py-10 px-6 md:px-20">
			<div className="text-center max-w-4xl mx-auto mb-6">
				<div className="flex items-center justify-center text-center gap-2 sm:gap-3 flex-nowrap">
					<HeartHandshake className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#D32F2F] flex-shrink-0" />
					<h2 className="text-lg sm:text-xl md:text-3xl font-extrabold text-[#B71C1C] leading-snug whitespace-nowrap">
						HIV Awareness, Prevention & Support
					</h2>
				</div>

				<div className="w-40 h-[4px] bg-[#118B50] mx-auto mt-2 rounded-tr-2xl rounded-bl-2xl" />
				<p className="text-gray-700 text-base md:text-lg leading-relaxed text-justify mt-3">
					CureAid recognizes the critical need for{" "}
					<span className="font-medium text-[#AD1457]">
						HIV education, early detection, treatment access,
					</span>{" "}
					and community-based support—especially among vulnerable
					groups such as children, adolescents, and adults in
					high-risk environments.
				</p>
			</div>
			<div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-10 text-gray-800">
				<div className="md:col-span-8 space-y-4">
					{awarenessPoints.map((point, index) => (
						<div key={index} className="flex items-start gap-3">
							<CheckCheck className="w-[18px] h-[18px] mt-1 text-rose-600 flex-shrink-0" />
							<p className="text-black text-sm sm:text-lg leading-relaxed">
								{point}
							</p>
						</div>
					))}
					<div className="mt-6">
						<p className="font-semibold text-[#880E4F] mb-3 text-lg sm:text-xl">
							Special focus on:
						</p>
						{specialFocus.map((item, idx) => (
							<div key={idx} className="flex gap-3 items-start">
								<ShieldCheck className="w-[20px] h-[20px] text-[#AB47BC] mt-1 flex-shrink-0" />
								<p className="text-black text-sm sm:text-lg leading-relaxed">
									{item}
								</p>
							</div>
						))}
					</div>
					<p className="mt-6 text-gray-700 text-justify text-base sm:text-[1.05rem] leading-relaxed">
						Through{" "}
						<span className="font-bold text-[#D32F2F]">
							CureAid
						</span>
						, we aim to ensure no child grows up uninformed or
						unsupported, and no adult faces the HIV journey alone.
					</p>
				</div>
				<div className="md:col-span-4 relative h-80 md:h-auto rounded-2xl overflow-hidden shadow-md">
					<Image
						src={`${STATIC_IMAGE_HOST}cure-aid/aids.webp`}
						alt="HIV Awareness"
						fill
						className="object-cover"
						quality={90}
					/>
				</div>
			</div>
		</section>
	);
};

export default HivSupport;
