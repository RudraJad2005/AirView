import { NewsCard } from './news-card';
import { getNewsArticles } from '@/lib/data';

export function LatestNews() {
  const articles = getNewsArticles();

  return (
    <div>
      <h3 className="text-2xl font-bold tracking-tight mb-4">Latest News</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
