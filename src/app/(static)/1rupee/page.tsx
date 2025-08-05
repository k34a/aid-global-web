import IntroCarousel from "@/components/recurring-donations/intro-carousel";
import Intro from "@/components/recurring-donations/intro";
import CallToAction from "@/components/recurring-donations/call-to-action";
import Register from "@/components/recurring-donations/register";
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
		</main>
	);
}
