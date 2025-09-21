'use client';
import React, { useState } from 'react';
import { WelcomeStrip } from '@/components/dashboard/welcome-strip';
import { FilterBar } from '@/components/dashboard/filter-bar';
import { LatestUpdates } from '@/components/dashboard/latest-updates';
import { SavedMemory } from '@/components/dashboard/saved-memory';
import { AskAiDrawer } from '@/components/dashboard/ask-ai-drawer';
import type { Article } from '@/lib/data';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';

export default function DashboardPage() {
    const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

    const handleAskAi = (article: Article) => {
        setSelectedArticle(article);
        setIsAiDrawerOpen(true);
    };

    return (
        <>
            <Breadcrumbs items={[{ label: 'Dashboard' }]} />
            <main className="py-8">
                <WelcomeStrip />
                <div className="mt-8">
                    <FilterBar />
                </div>
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 lg:gap-6">
                    <div className="lg:col-span-8">
                        <LatestUpdates onAskAi={handleAskAi} />
                    </div>
                    <div className="lg:col-span-4 mt-6 lg:mt-0">
                        <SavedMemory />
                    </div>
                </div>
            </main>
            <AskAiDrawer open={isAiDrawerOpen} onOpenChange={setIsAiDrawerOpen} article={selectedArticle} />
        </>
    );
}
