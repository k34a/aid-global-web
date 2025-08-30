import Image from "@/components/image";
import { Baby, CheckCircle, ShieldCheck } from "lucide-react";
import { STATIC_IMAGE_HOST } from "@/config/config";
import { Title, Text, Stack, Center } from "@mantine/core";

const rmhchData = [
	{
		title: "Malnutrition Elimination & Child Wellness",
		description: [
			"Early detection of malnutrition in children under five, especially during the critical first 1,000 days.",
			"Identification of low birth weight babies and undernourished children through home visits and screenings.",
			"Mapping of high-risk areas and slum clusters to prioritize outreach and resource deployment.",
			"Household enrollment of beneficiaries and awareness generation on institutional deliveries, pregnancy care, and newborn health.",
			"Growth monitoring through community health workers using mobile tracking tools.",
			"Home visits and nutrition counseling for mothers and caregivers.",
			"Community-led feeding practices, hygiene education, and awareness drives.",
			"Coordination with local Anganwadi centers for sustained follow-up and support.",
		],
		icon: <Baby className="w-7 h-7 text-[#118B50]" />,
		image: "cure-aid/cureAid-2.webp",
		color: "text-[#E3B505]",
	},
	{
		title: " Women's and Adolescent Health",

		description: [
			"Comprehensive antenatal and postnatal care support, including birth preparedness.",
			"Breastfeeding support, vaccination awareness, and early childhood care.",
			{
				text: "Health education programs for adolescent girls, focusing on:",
				subpoints: [
					"Menstrual hygiene and reproductive health",
					"Nutrition and anemia prevention",
					"Mental wellness and self-care",
				],
			},
			"Crisis response and support systems for women facing violence or neglect, with access to legal and emotional counseling.",
			"Community-based health models addressing the social and safety needs of women and girls in urban slums.",
		],
		icon: <ShieldCheck className="w-7 h-7 text-[#E3B505]" />,
		image: "cure-aid/cureAid-3.webp",
		color: "text-[#118B50]",
	},
];

export default function RMNCHSection() {
	return (
		<section className="px-3 md:px-12 py-10 bg-[#F0FAF7]">
			{/* Section Heading */}

			<Center mb={40}>
				<Stack align="center">
					<Title
						order={2}
						c="dark"
						ta="center"
						style={{
							textDecorationThickness: "2px",
							textUnderlineOffset: "8px",
							fontWeight: 700,
							fontSize: "2rem",
						}}
						fz={{ base: 32, md: 40 }}
					>
						Maternal, Child & Nutrition Care (RMNCH+A)
					</Title>

					<Text
						mt={0}
						c="#E3B505"
						fz={{ base: "1rem", md: "1.125rem" }}
						fs="italic"
						ta="center"
					>
						Building Stronger Foundations for Families
					</Text>
					<Text
						mt={1}
						c="#555"
						fz={{ base: "1rem", md: "1rem" }}
						ta="center"
					>
						A unified approach supporting mothers, children, and
						adolescents across the continuum of care.
					</Text>
				</Stack>
			</Center>
			<div className="space-y-10">
				{rmhchData.map((card, index) => (
					<div
						key={index}
						className={`flex flex-col lg:flex-row ${
							index % 2 === 1 ? "lg:flex-row-reverse" : ""
						} items-stretch bg-white rounded-3xl shadow-md overflow-hidden`}
					>
						<div
							className={`flex-1 p-6 md:p-8 flex flex-col  justify-center min-h-[350px] ${
								index % 2 === 0
									? "lg:border-r-2 border-dashed md:pr-10 md:mr-6 border-red-300"
									: "lg:border-l-2 border-dashed md:pl-10 md:ml-6 border-purple-300"
							}`}
						>
							<div className="flex items-center gap-3 mb-4">
								<div className="bg-[#DFF3EB] p-3 rounded-xl shadow-sm">
									{card.icon}
								</div>
								<h3 className="text-xl md:text-2xl font-bold">
									{card.title}
								</h3>
							</div>
							<ul className="list-none space-y-3 text-[#333] text-[1rem] leading-relaxed">
								{card.description.map((item, i) => (
									<li key={i} className="flex flex-col gap-1">
										<div className="flex items-start gap-2">
											<CheckCircle
												className={`w-5 h-5 ${card.color} min-w-[20px] mt-1`}
											/>
											<span>
												{typeof item === "string"
													? item
													: item.text}
											</span>
										</div>
										{typeof item !== "string" &&
											item.subpoints && (
												<ul className="list-disc ml-8  text-[#E3B505] mt-1 space-y-1">
													{item.subpoints.map(
														(sub, idx) => (
															<li key={idx}>
																{sub}
															</li>
														),
													)}
												</ul>
											)}
									</li>
								))}
							</ul>
						</div>
						<div className="relative w-full h-[300px] lg:h-[350px] my-auto lg:w-1/2 flex-shrink-0">
							<Image
								src={`${STATIC_IMAGE_HOST}${card.image}`}
								alt={card.title}
								fill
								className="object-cover object-center"
								sizes="(max-width: 768px) 100vw, 50vw"
								priority
							/>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
