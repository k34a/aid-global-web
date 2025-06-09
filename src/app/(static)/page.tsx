import ArticleList from "@/components/articleList";
import { DonateButton } from "@/components/campaign/donate";
import { getAllArticles, type ArticleMeta } from "@/lib/db/articles";
import Link from "next/link";
export default async function HomePage() {
	try {
		const articles: ArticleMeta[] = await getAllArticles(3);
		return (
			<main className="p-6">
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

			
			</main>
		);
	} catch (error) {
		return <p>Failed to load articles.</p>;
	}
}
