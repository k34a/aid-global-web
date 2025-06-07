import ArticleList from "@/components/articleList";
import { DonateButton } from "@/components/campaign/donate";
import { getAllArticles, type ArticleMeta } from "@/lib/db/articles";

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
					amount={100}
					contact_number="9999999999"
				/>
			</main>
		);
	} catch (error) {
		return <p>Failed to load articles.</p>;
	}
}
