import type { Metadata } from "next";
import HeroSection from "@/components/recurring-donations/100rupee/hero-section";
import BenefitsSection from "@/components/recurring-donations/100rupee/benefits-section";
import ImpactSection from "@/components/recurring-donations/100rupee/impact-section";
import SubscriptionForm from "@/components/recurring-donations/100rupee/donation-form";

export const metadata: Metadata = {
	title: "The 100 Club - Big Hearts. Bigger Impact.",
	description:
		"Join The 100 Club - a movement of everyday heroes who believe in the power of collective action. For just 100/month, become a force for sustainable change.",
};

export default function HundredRupeeClub() {
	return (
		<main className="bg-gradient-to-br from-blue-50 via-white to-green-50 min-h-screen">
			<HeroSection />
			<ImpactSection />
			<BenefitsSection />
			<SubscriptionForm />
		</main>
	);
}
