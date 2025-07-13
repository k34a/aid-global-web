import HeroSection from "@/components/aids/cure-aid/headersection";
import HivSupport from "@/components/aids/cure-aid/hivsupport";
import JoinMission from "@/components/aids/cure-aid/joinmission";
import HealthcareOutreachSection from "@/components/aids/cure-aid/outreach";
import RMNCHSection from "@/components/aids/cure-aid/rmnchasection";

import TbPrevention from "@/components/aids/cure-aid/tbprevention";

export default function CureAidPage() {
	return (
		<main>
			<HeroSection />
			<HealthcareOutreachSection />
			<RMNCHSection />
			<TbPrevention />
			<HivSupport />
			<JoinMission />
		</main>
	);
}
