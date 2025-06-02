import ArticleList from '@/components/ArticleList';

export default function HomePage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Blog Articles</h1>
      <ArticleList />
    </main>
  );
}
