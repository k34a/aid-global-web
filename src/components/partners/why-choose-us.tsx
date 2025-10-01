import { CheckCircle2 } from "lucide-react";
import Image from "@/components/image";
import { STATIC_IMAGE_HOST } from "@/config/config";

const differentiators = [
	{
		title: "Grassroots Presence",
		description:
			"Deep community ties ensure relevant, effective interventions",
	},
	{
		title: "Transparency & Accountability",
		description:
			"Clear, auditable reporting with complete financial transparency",
	},
	{
		title: "Customized Solutions",
		description:
			"Programs tailored to your CSR goals, geography, and focus areas",
	},
	{
		title: "Scalability",
		description:
			"Proven pilot-to-scale model for wider, sustainable impact",
	},
	{
		title: "Inclusive Focus",
		description:
			"Dedicated programs for women and persons with disabilities",
	},
	{
		title: "Long-Term Partnerships",
		description:
			"Multi-year MoUs for building sustainable community outcomes",
	},
];

export default function WhyChooseUs() {
	return (
		<section className="py-20">
			<div className="container mx-auto px-4">
				<div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
					<div>
						<h2 className="mb-6 text-3xl font-bold text-balance md:text-4xl">
							Why Choose Aid Global Foundation?
						</h2>
						<p className="mb-8 text-lg text-muted-foreground leading-relaxed">
							We transform CSR from compliance into a movement for
							change. Our proven track record, transparent
							operations, and deep community connections make us
							the ideal partner for creating measurable social
							impact.
						</p>

						<div className="space-y-4">
							{differentiators.map((item, index) => (
								<div key={index} className="flex gap-4">
									<div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20">
										<CheckCircle2 className="h-4 w-4 text-green-600" />
									</div>
									<div>
										<h3 className="mb-1 font-semibold">
											{item.title}
										</h3>
										<p className="text-sm text-muted-foreground leading-relaxed">
											{item.description}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="relative">
						<div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
							<Image
								src={`${STATIC_IMAGE_HOST}vision-aid/visionAid-2.webp`}
								alt="choose us"
								fill
								className="object-cover"
							/>
						</div>
						<div className="absolute -bottom-6 -right-6 rounded-xl bg-primary p-6 text-white shadow-xl bg-green-400">
							<div className="mb-2 text-sm font-medium">
								Launched 2025
							</div>
							<div className="text-2xl font-bold">
								Driven by Purpose
							</div>
							<div className="text-sm opacity-90">
								Creating Impact
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
