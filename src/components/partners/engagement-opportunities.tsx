import {
	Users,
	TrendingUp,
	Package,
	HandHeart,
	Calendar,
	FileText,
} from "lucide-react";
import { ProgramCard } from "./program-card";

const opportunities = [
	{
		icon: Users,
		title: "Employee Giving & Engagement",
		description: "Empower your workforce to make a difference",
		highlights: [
			"Payroll giving with tax benefits",
			"Corporate matching programs",
			"Regular impact reports",
			"Easy administration",
		],
	},
	{
		icon: TrendingUp,
		title: "Cause-Related Campaigns",
		description: "Integrate social purpose with marketing",
		highlights: [
			"Co-created brand campaigns",
			"CSR-linked promotions",
			"Co-branding opportunities",
			"Campaign metrics & storytelling",
		],
	},
	{
		icon: Package,
		title: "Donation Boxes & Drives",
		description: "Enable giving at physical and digital touchpoints",
		highlights: [
			"Co-branded donation boxes",
			"Stationery drives for ShikshaAid",
			"Clothes collection drives",
			"Food grain collections",
		],
	},
	{
		icon: HandHeart,
		title: "Employee Volunteering",
		description: "Meaningful on-ground engagement opportunities",
		highlights: [
			"Teaching & mentoring programs",
			"Health camp support",
			"Event & exhibition assistance",
			"Pro-bono skills training",
		],
	},
	{
		icon: Calendar,
		title: "Special Corporate Engagements",
		description: "Targeted programs for maximum impact",
		highlights: [
			"Blood donation camps",
			"Health screening camps",
			"Community exhibitions",
			"Awareness campaigns",
		],
	},
	{
		icon: FileText,
		title: "Unspent CSR Funds",
		description: "Responsible utilization within statutory timelines",
		highlights: [
			"Transparent fund utilization",
			"Measurable outcomes",
			"Full CSR compliance",
			"Timely reporting",
		],
	},
];

export default function EngagementOpportunities() {
	return (
		<section id="engagement" className="py-20">
			<div className="container mx-auto px-4">
				<div className="mb-12 text-center">
					<h2 className="mb-4 text-3xl font-bold md:text-4xl">
						Employee Engagement & Beyond
					</h2>
					<p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
						Create meaningful connections between your team and
						social causes. From volunteering to cause marketing, we
						offer diverse engagement pathways.
					</p>
				</div>

				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{opportunities.map((opportunity, index) => (
						<ProgramCard key={index} {...opportunity} />
					))}
				</div>
			</div>
		</section>
	);
}
