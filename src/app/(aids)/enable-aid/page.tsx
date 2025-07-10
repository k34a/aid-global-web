import EnableAidIntro from "@/components/aids/enable-aid/enableaid-intro";
import WhatWeDo from "@/components/aids/enable-aid/what-we-do";
import Initiatives from "@/components/aids/enable-aid/initiatives";
import JoinUsSection from "@/components/aids/enable-aid/join-us";

export default function EnableAidPage() {
	return (
		<main>
			<EnableAidIntro />
			<WhatWeDo />
			<Initiatives />
			<JoinUsSection />
		</main>
	);
}
