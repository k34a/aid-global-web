import HungerIntro from "@/components/aids/hunger-aid/intro";
import WhatIsHungerAid from "@/components/aids/hunger-aid/what-is";
import HungerStats from "@/components/aids/hunger-aid/stats";
import WhyHungerAid from "@/components/aids/hunger-aid/why";
import HungerAidProvides from "@/components/aids/hunger-aid/provides";
import CallToAction from "@/components/aids/hunger-aid/call-to-action";
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
