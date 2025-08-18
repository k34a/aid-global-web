import ImpactSection from "@/components/aids/vision-aid/impactsection";
import HeroSection from "@/components/aids/vision-aid/introsection";
import JoinUsSection from "@/components/aids/vision-aid/joinussection";
import MissionSection from "@/components/aids/vision-aid/missionsection";
import ProblemSection from "@/components/aids/vision-aid/problemsection";
import VisionVanSection from "@/components/aids/vision-aid/visionvansection";
import WhyItMattersSection from "@/components/aids/vision-aid/whyitmattersection";

export default function VisionAid() {
	return (
		<main className="bg-[#fefefe] text-[#1a1a1d]">
			<HeroSection />
			<ProblemSection />
			<MissionSection />
			<VisionVanSection />
			<ImpactSection />
			<WhyItMattersSection />
			<JoinUsSection />
		</main>
	);
}
