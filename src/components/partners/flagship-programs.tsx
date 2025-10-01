import {
	BookOpen,
	Heart,
	Utensils,
	Users,
	Shield,
	Home,
	Eye,
} from "lucide-react";
import { ProgramCard } from "./program-card";

const programs = [
	{
		icon: BookOpen,
		title: "ShikshaAid",
		description: "Education for All",
		highlights: [
			"Quality education access",
			"Digital learning initiatives",
			"Teacher training programs",
			"Scholarship opportunities",
		],
	},
	{
		icon: Utensils,
		title: "HungerAid",
		description: "Eradicating Hunger & Malnutrition",
		highlights: [
			"Nutritious meal programs",
			"Ration kit distribution",
			"Community nutrition awareness",
			"Supplementation programs",
		],
	},
	{
		icon: Heart,
		title: "CureAid",
		description: "Healthcare & Well-being",
		highlights: [
			"Health camps & screenings",
			"Vaccination drives",
			"Preventive healthcare",
			"Mobile medical units",
		],
	},
	{
		icon: Users,
		title: "EnableAid",
		description: "Disability Inclusion & Livelihoods",
		highlights: [
			"Vocational training",
			"Assistive devices",
			"Entrepreneurship support",
			"Financial literacy programs",
		],
	},
	{
		icon: Shield,
		title: "SakhiAid",
		description: "Women Empowerment & Safety",
		highlights: [
			"Health camps for women",
			"Self-defense workshops",
			"Leadership training",
			"Entrepreneurship support",
		],
	},
	{
		icon: Home,
		title: "GharAid",
		description: "Shelter & Disaster Relief",
		highlights: [
			"Safe housing solutions",
			"School renovations",
			"Disaster relief operations",
			"Rehabilitation programs",
		],
	},
	{
		icon: Eye,
		title: "VisionAid",
		description: "Eye Care & Preventive Health",
		highlights: [
			"Community eye screenings",
			"Spectacles distribution",
			"Cataract surgeries",
			"Vision awareness programs",
		],
	},
];

export default function FlagshipPrograms() {
	return (
		<section id="opportunities" className="py-20 bg-muted/30">
			<div className="container mx-auto px-4">
				<div className="mb-12 text-center">
					<h2 className="mb-4 text-3xl font-bold text-balance md:text-4xl">
						CSR Grant Opportunities
					</h2>
					<p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
						Support our flagship programs and create lasting impact
						across communities. Your CSR grants directly strengthen
						lives through education, healthcare, and empowerment.
					</p>
				</div>

				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{programs.map((program, index) => (
						<ProgramCard key={index} {...program} />
					))}
				</div>
			</div>
		</section>
	);
}
