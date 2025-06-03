import ArticleList from '@/components/ArticleList';

export default async function HomePage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/articles`, {
    cache: 'no-store',
  });

  const articles = await res.json();

  if (!Array.isArray(articles) || articles.length === 0) {
    return <p>No articles found.</p>;
  }

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Latest Articles</h1>
      <ArticleList articles={articles} />
    </main>
  );
}
