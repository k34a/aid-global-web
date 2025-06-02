'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllArticles, Article } from '../lib/supabase';

export default function ArticleList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const data = await getAllArticles(1);
        setArticles(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch articles');
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  if (loading) return <div>Loading articles...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!articles.length) return <div>No articles found.</div>;

  return (
    <div className="space-y-6">
      {articles.map((article) => (
        <div key={article.id} className="border rounded-lg p-4 shadow-sm">
          <h2 className="text-xl font-semibold">
            <Link href={`/articles/${article.slug}`} className="text-blue-600 hover:underline">
              {article.title}
            </Link>
          </h2>
          <p className="text-gray-700">{article.content.slice(0, 150)}...</p>
          <p className="text-sm text-gray-400 mt-2">Slug: {article.slug}</p>
        </div>
      ))}
    </div>
  );
}
