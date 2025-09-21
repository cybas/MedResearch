'use client';
import { useState, useEffect } from 'react';
import { ArticleCard, ArticleCardSkeleton } from "./article-card";
import { articles, type Article } from "@/lib/data";
import { Button } from '@/components/ui/button';

type LatestUpdatesProps = {
    onAskAi: (article: Article) => void;
};

export function LatestUpdates({ onAskAi }: LatestUpdatesProps) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">Latest Updates</h2>
                <ArticleCardSkeleton />
                <ArticleCardSkeleton />
                <ArticleCardSkeleton />
            </div>
        );
    }

    if (articles.length === 0) {
        return (
            <div>
                 <h2 className="text-2xl font-bold tracking-tight">Latest Updates</h2>
                <div className="flex flex-col items-center justify-center text-center py-20 border-2 border-dashed rounded-lg mt-4">
                    <p className="text-lg font-medium text-muted-foreground">No updates in this timeframe.</p>
                    <Button variant="outline" className="mt-4">Broaden Filters</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Latest Updates</h2>
            {articles.map((article) => (
                <ArticleCard key={article.id} article={article} onAskAi={onAskAi} />
            ))}
        </div>
    );
}
