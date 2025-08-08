import MissionSection from "@/components/homepage/mission-section";
import AidsSection from "@/components/homepage/aids-section";
import CalltoActionSection from "@/components/homepage/call-to-action";
import AssuranceSection from "@/components/homepage/assurance-section";
import ReviewSection from "@/components/homepage/review-section";
import PartnersSection from "@/components/homepage/partners";
import OneHundredClubs from "@/components/donate/one-hundred-clubs";

export default async function HomePage() {
	try {
		return (
			<main className="p-0 overflow-hidden">
				<CalltoActionSection />
				<MissionSection />
				<AidsSection />
				<ReviewSection />
				<AssuranceSection />
				<PartnersSection />
				<OneHundredClubs />
			</main>
		);
	} catch (error) {
		return <p>Failed to load articles.</p>;
	}
}
