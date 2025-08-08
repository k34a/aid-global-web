import IntroCarousel from "@/components/recurring-donations/1rupee/intro-carousel";
import Intro from "@/components/recurring-donations/1rupee/intro";
import CallToAction from "@/components/recurring-donations/1rupee/call-to-action";
import Register from "@/components/recurring-donations/1rupee/register";
import type { Metadata } from "next";
import SubscriberCounter from "@/components/recurring-donations/1rupee/subscribers-count";

export const metadata: Metadata = {
	title: "One Rupee Donation",
};

export default async function OneRupeeDonation() {
	return (
		<main>
			<IntroCarousel />
			<Intro />
			<CallToAction />
			<SubscriberCounter />
			<Register />
		</main>
	);
}
