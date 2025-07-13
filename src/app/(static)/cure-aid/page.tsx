import HeroSection from "@/components/aids/cureaid/headersection";
import HivSupport from "@/components/aids/cureaid/hivsupport";
import JoinMission from "@/components/aids/cureaid/joinmission";
import HealthcareOutreachSection from "@/components/aids/cureaid/outreach";
import RMNCHSection from "@/components/aids/cureaid/rmnchasection";

import TbPrevention from "@/components/aids/cureaid/tbprevention";

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
