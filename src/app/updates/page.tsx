'use client';
import React, { useState } from 'react';
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { UpdatesHeader } from "@/components/updates/updates-header";
import { UpdatesFilterBar } from "@/components/updates/updates-filter-bar";
import { ArticleFeed } from "@/components/updates/article-feed";
import { QuickFilters } from "@/components/updates/quick-filters";
import { TrendingTopics } from "@/components/updates/trending-topics";
import { YourActivity } from "@/components/updates/your-activity";
import type { Article } from '@/lib/data';
import { AskAiDrawer } from '@/components/dashboard/ask-ai-drawer'; // Reusing for now

export default function UpdatesPage() {
    const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

    const handleAskAi = (article: Article) => {
        setSelectedArticle(article);
        setIsAiDrawerOpen(true);
    };

    return (
        <>
            <Breadcrumbs items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Updates' }]} />
            <main className="py-8">
                <UpdatesHeader />
                <UpdatesFilterBar resultCount={58} />
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 lg:gap-6">
                    <div className="lg:col-span-8">
                        <ArticleFeed onAskAi={handleAskAi} />
                    </div>
                    <div className="lg:col-span-4 mt-6 lg:mt-0 space-y-6">
                        <QuickFilters />
                        <TrendingTopics />
                        <YourActivity />
                    </div>
                </div>
            </main>
            {/* Using the dashboard's Ask AI drawer as a placeholder for the detail drawer */}
            <AskAiDrawer open={isAiDrawerOpen} onOpenChange={setIsAiDrawerOpen} article={selectedArticle} />
        </>
    );
}
