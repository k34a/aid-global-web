import IntroCarousel from "@/components/recurring-donations/1rupee/intro-carousel";
import Intro from "@/components/recurring-donations/1rupee/intro";
import CallToAction from "@/components/recurring-donations/1rupee/call-to-action";
import Register from "@/components/recurring-donations/1rupee/register";
import type { Metadata } from "next";
import { getNumberOfSubscribers } from "@/lib/db/donation/subscription-manager";

export const metadata: Metadata = {
	title: "One Rupee Donation",
};

export default async function OneRupeeDonation() {
	const res = await getNumberOfSubscribers(
		"29c7e0b7-7edf-4db5-95e2-977793672cee",
	);
	console.log({ res });
	return (
		<main>
			<IntroCarousel />
			<Intro />
			<CallToAction />
			<Register />
		</main>
	);
}
