import ArticleList from "@/components/articleList";
import { DonateButton } from "@/components/campaign/donate";
import { getAllArticles, type ArticleMeta } from "@/lib/db/articles";
import IntroCarousel from "@/components/homepage/intro-carousel";
import MissionSection from "@/components/homepage/mission-section";
import EmergencySection from "@/components/homepage/emergency-section";
import CategoriesSection from "@/components/homepage/categories/categories-section";
import AidsSection from "@/components/homepage/aids-section";
import CalltoActionSection from "@/components/homepage/call-to-action";
import AssuranceSection from "@/components/homepage/assurance-section";
import ReviewSection from "@/components/homepage/review-section";
import NewsSection from "@/components/homepage/news-section";
import PartnersSection from "@/components/homepage/partners";
export default async function HomePage() {
	try {
		const articles: ArticleMeta[] = await getAllArticles(3);
		return (
			<main className="p-0 overflow-hidden">
				<h1 className="text-2xl font-bold mb-4">Latest Articles</h1>
				<ArticleList articles={articles} />
				<DonateButton
					name="Saksham Garg"
					email="myemail@gmail.com"
					is_anon={false}
					amount={60}
					contact_number="9999999999"
					auto_allocate={true}
					campaign_id="81263c39-4c04-460d-af9c-585937104b6f"
					products={{
						"3f506987-646a-4544-8653-d3a90dd1a07b": 1, // 25
						"71246dba-94fd-4d13-8fb9-4ffc733acfbd": 2, // 10
					}}
				/>
				<IntroCarousel />
				<MissionSection />
				<EmergencySection />
				<CategoriesSection />
				<AidsSection />
				<CalltoActionSection />
				<ReviewSection />
				<NewsSection />
				<AssuranceSection />
				<PartnersSection />
			</main>
		);
	} catch (error) {
		return <p>Failed to load articles.</p>;
	}
}
