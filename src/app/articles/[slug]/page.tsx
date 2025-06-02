import { getArticle, Article } from '@/lib/supabase';
import { notFound } from 'next/navigation';

type Props = {
  params: { slug: string };
};

export default async function ArticlePage({ params }: Props) {
  const article: Article | null = await getArticle(params.slug);

  if (!article) return notFound();

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        {new Date(article.created_at).toLocaleDateString()}
      </p>
      <article>{article.content}</article>
    </main>
  );
}
