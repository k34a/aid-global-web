import { getAllArticles, type ArticleMeta } from "@/lib/db/articles";
import MissionSection from "@/components/homepage/mission-section";
import CategoriesSection from "@/components/homepage/categories/categories-section";
import AidsSection from "@/components/homepage/aids-section";
import CalltoActionSection from "@/components/homepage/call-to-action";
import AssuranceSection from "@/components/homepage/assurance-section";
import ReviewSection from "@/components/homepage/review-section";
import NewsSection from "@/components/homepage/news-section";
import PartnersSection from "@/components/homepage/partners";
import CampaignList from "@/components/campaign/campaignlist";
import OneHundredClubs from "@/components/homepage/one-hundred-clubs";

export default async function HomePage() {
	try {
		const articles: ArticleMeta[] = await getAllArticles(3);
		return (
			<main className="p-0 overflow-hidden">
				<CalltoActionSection />
				<MissionSection />
				<OneHundredClubs />
				<CampaignList />
				<CategoriesSection />
				<AidsSection />
				<ReviewSection />
				<NewsSection articles={articles} />
				<AssuranceSection />
				<PartnersSection />
			</main>
		);
	} catch (error) {
		return <p>Failed to load articles.</p>;
	}
}
