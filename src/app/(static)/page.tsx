import { getAllArticles, type ArticleMeta } from "@/lib/db/articles";
import MissionSection from "@/components/homepage/mission-section";
import AidsSection from "@/components/homepage/aids-section";
import CalltoActionSection from "@/components/homepage/call-to-action";
import AssuranceSection from "@/components/homepage/assurance-section";
import ReviewSection from "@/components/homepage/review-section";
import PartnersSection from "@/components/homepage/partners";

export default async function HomePage() {
	try {
		const articles: ArticleMeta[] = await getAllArticles(3);
		return (
			<main className="p-0 overflow-hidden">
				<CalltoActionSection />
				<MissionSection />
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
