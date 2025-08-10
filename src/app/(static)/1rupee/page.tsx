import IntroCarousel from "@/components/recurring-donations/1rupee/intro-carousel";
import Intro from "@/components/recurring-donations/1rupee/intro";
import CallToAction from "@/components/recurring-donations/1rupee/call-to-action";
import Register from "@/components/recurring-donations/1rupee/register";
import Onerupeefaq from "@/components/recurring-donations/1rupee/faq";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "One Rupee Donation",
};

export default function OneRupeeDonation() {
	return (
		<main>
			<IntroCarousel />
			<Intro />

			<CallToAction />
			<Register />
			<Onerupeefaq />
		</main>
	);
}
