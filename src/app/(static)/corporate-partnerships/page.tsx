import HeroSection from "@/components/partners/hero-section";
import FlagshipPrograms from "@/components/partners/flagship-programs";
import EngagementOpportunities from "@/components/partners/engagement-opportunities";
import ImpactSection from "@/components/partners/impact-section";
import WhyChooseUs from "@/components/partners/why-choose-us";
import Partners from "@/components/partners/partners";

export default function PartnersPage() {
	return (
		<>
			<main>
				<HeroSection />
				<FlagshipPrograms />
				<EngagementOpportunities />
				<ImpactSection />
				<WhyChooseUs />
				<Partners />
			</main>
		</>
	);
}
