import { Metadata } from "next";
import { getArticle } from "@/lib/supabase";
import ReactMarkdown from "react-markdown";

type ArticlePageProps = {
  params: { slug: string };
};

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const article = await getArticle(params.slug);

  if (!article) {
    return {
      title: "Article Not Found",
      description: "The requested article does not exist.",
    };
  }

  return {
    title: article.title,
    description: article.description,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticle(params.slug);

  if (!article) {
    return (
      <h1 className="text-center mt-10 text-xl">404 - Article Not Found</h1>
    );
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-600 mb-6">{article.description}</p>
      <article className="prose prose-teal max-w-none">
        <ReactMarkdown>{article.content}</ReactMarkdown>
      </article>
    </main>
  );
}
