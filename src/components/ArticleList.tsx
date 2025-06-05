import React from 'react';
import Link from 'next/link';
import { ArticleMeta } from '@/lib/supabase';

interface ArticleListProps {
  articles: ArticleMeta[];  
}

const ArticleList = ({ articles }: ArticleListProps) => {
  return (
    <ul>
      {articles.map(article => (
        <li key={article.id}>
          <Link
            href={`/articles/${article.slug}`}
            className="text-blue-600 hover:underline"
          >
            {article.title}
          </Link>
          <p>{article.description}</p>
        </li>
      ))}
    </ul>
  );
};

export default ArticleList;