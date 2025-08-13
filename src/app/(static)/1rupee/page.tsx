import IntroCarousel from "@/components/recurring-donations/1rupee/intro-carousel";
import Intro from "@/components/recurring-donations/1rupee/intro";
import CallToAction from "@/components/recurring-donations/1rupee/call-to-action";
import SubscriberCounter from "@/components/recurring-donations/1rupee/subscribers-count";
import Register from "@/components/recurring-donations/1rupee/register";
import type { Metadata } from "next";
import FAQ from "@/components/faq";
import { oneRupeeFaqs } from "@/config/faqs";

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
			<FAQ items={oneRupeeFaqs} />
		</main>
	);
}
