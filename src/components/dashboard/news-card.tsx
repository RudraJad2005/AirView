import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { NewsArticle } from '@/types';
import { ArrowRight } from 'lucide-react';

interface NewsCardProps {
  article: NewsArticle;
}

export function NewsCard({ article }: NewsCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="aspect-video relative">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover"
            data-ai-hint={article.dataAiHint}
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow pt-4">
        <CardTitle className="text-lg font-semibold leading-snug">
          <Link href={article.link} className="hover:underline">
            {article.title}
          </Link>
        </CardTitle>
      </CardContent>
      <CardFooter className="flex justify-between items-center text-sm text-muted-foreground pt-0">
        <span>{article.source} &bull; {article.publishedDate}</span>
        <Button variant="ghost" size="icon" asChild>
          <Link href={article.link}>
            <ArrowRight className="h-4 w-4" />
            <span className="sr-only">Read more</span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
