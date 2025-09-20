import IntroCarousel from "@/components/recurring-donations/1rupee/intro-carousel";
import Intro from "@/components/recurring-donations/1rupee/intro";
import CallToAction from "@/components/recurring-donations/1rupee/call-to-action";
import SubscriberCounter from "@/components/recurring-donations/subscribers-count";
import Register from "@/components/recurring-donations/1rupee/register";
import type { Metadata } from "next";
import FAQ from "@/components/faq";
import { oneRupeeFaqs } from "@/config/faqs";
import { getNumberOfSubscribers } from "@/lib/db/donation/fns";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
	title: "The 1 Club - Big Hearts. Bigger Impact.",
	description:
		"Join The 1 Club - a movement of everyday heroes who believe in the power of collective action. For just 1/day, become a force for sustainable change.",
};

export default async function OneRupeeDonation() {
	let count = 5;
	try {
		count = await getNumberOfSubscribers(
			"29c7e0b7-7edf-4db5-95e2-977793672cee",
		);
	} catch (err) {
		console.error("Failed to fetch subscriber count:", err);
	}
	return (
		<main>
			<IntroCarousel />
			<Intro />
			<CallToAction />
			<SubscriberCounter count={count} subscriptionName="1" />
			<Register />
			<FAQ items={oneRupeeFaqs} />
		</main>
	);
}
