import { Star } from "lucide-react";

const impactFeatures = [
	{
		color: "text-blue-500",
		title: "Rigorous Monitoring: ",
		description:
			"Quarterly and annual impact reports with photos, case studies, and detailed metrics",
	},
	{
		color: "text-green-500",
		title: "SDG Alignment: ",
		description:
			"All programs mapped to UN Sustainable Development Goals for global impact tracking",
	},
	{
		color: "text-yellow-500",
		title: "Financial Transparency: ",
		description:
			"Clear fund utilization statements and auditable reporting for complete accountability",
	},
	{
		color: "text-purple-500",
		title: "Recognition & Branding: ",
		description:
			"Co-branded campaigns, media mentions, and joint visibility opportunities",
	},
];

export default function ImpactSection() {
	return (
		<section id="impact" className="py-10 bg-muted/30">
			<div className="container mx-auto px-4">
				{/* Header */}
				<div className="mb-12 text-center">
					<h2 className="mb-4 text-3xl font-bold md:text-4xl">
						Impact Measurement & Reporting
					</h2>
					<p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
						We believe in transparent, measurable impact. Every
						partnership comes with comprehensive reporting and clear
						metrics aligned with global standards.
					</p>
				</div>

				{/* Single Card with All Points */}
				<div
					className="rounded-2xl border border-green-600
        bg-green-50 p-6 transition-all
        hover:border-green-800 hover:shadow-md"
				>
					<ul className="space-y-6">
						{impactFeatures.map((feature, index) => (
							<li
								key={index}
								className="flex items-start space-x-4"
							>
								<Star
									className={`h-4 w-4 flex-shrink-0 ${feature.color} mt-1`}
								/>
								<div className="flex flex-col md:flex-row md:items-center md:space-x-2">
									<h3 className="text-lg font-semibold">
										{feature.title}
									</h3>
									<p className="text-muted-foreground leading-relaxed">
										{feature.description}
									</p>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
}
