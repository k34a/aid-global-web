import ArticleList from "@/components/ArticleList";
import { getAllArticles, ArticleMeta } from "@/lib/supabase";

export default async function HomePage() {
  try {
    const articles: ArticleMeta[] = await getAllArticles(3);
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Latest Articles</h1>
        <ArticleList articles={articles} />
      </main>
    );
  } catch (error) {
    return <p>Failed to load articles.</p>;
  }
}
