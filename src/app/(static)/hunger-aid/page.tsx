import HungerIntro from "@/components/aids/hungeraid-page/hunger-intro";
import WhatIsHungerAid from "@/components/aids/hungeraid-page/what-is-hungeraid";
import HungerStats from "@/components/aids/hungeraid-page/hunger-stats";
import WhyHungerAid from "@/components/aids/hungeraid-page/why-hunger-aid";
import HungerAidProvides from "@/components/aids/hungeraid-page/hunger-aid-provides";
import CallToAction from "@/components/aids/hungeraid-page/call-to-action";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Hunger Aid",
};

export default function HungerAidSection() {
	return (
		<main>
			<HungerIntro />
			<WhatIsHungerAid />
			<HungerStats />
			<WhyHungerAid />
			<HungerAidProvides />
			<CallToAction />
		</main>
	);
}
