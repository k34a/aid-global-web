import MissionSection from "@/components/homepage/mission-section";
import AidsSection from "@/components/homepage/aids-section";
import CalltoActionSection from "@/components/homepage/call-to-action";
import AssuranceSection from "@/components/homepage/assurance-section";
import ReviewSection from "@/components/homepage/review-section";
import PartnersSection from "@/components/homepage/partners";
import RecurringPlansShowcase from "@/components/recurring-donations/showcase";
import { getNumberOfSubscribers } from "@/lib/db/donation/fns";

export const revalidate = 3600; // refresh every hour to prevent data from being stale for long

export default async function HomePage() {
	const [subscribers1, subscribers100] = await Promise.all([
		getNumberOfSubscribers("29c7e0b7-7edf-4db5-95e2-977793672cee"),
		getNumberOfSubscribers("ac1ad332-5ce0-4fdc-a808-84dbc29f8701"),
	]);
	try {
		return (
			<main className={`p-0 overflow-hidden`}>
				<CalltoActionSection />
				<MissionSection />
				<RecurringPlansShowcase
					subscribers1={subscribers1}
					subscribers100={subscribers100}
				/>
				<AidsSection />
				<ReviewSection />
				<AssuranceSection />
				<PartnersSection />
			</main>
		);
	} catch (error) {
		return <p>Failed to load articles.</p>;
	}
}
