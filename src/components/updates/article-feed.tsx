'use client';
import { useState, useEffect } from 'react';
import { ArticleCard, ArticleCardSkeleton } from "@/components/dashboard/article-card";
import { articles, type Article } from "@/lib/data";
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Save, Mail, FileUp, CheckCircle } from 'lucide-react';

type ArticleFeedProps = {
    onAskAi: (article: Article) => void;
};

export function ArticleFeed({ onAskAi }: ArticleFeedProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [selectedRows, setSelectedRows] = useState<string[]>([]);

    const handleSelectRow = (id: string, checked: boolean) => {
        setSelectedRows(prev => checked ? [...prev, id] : prev.filter(rowId => rowId !== id));
    };

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    const BulkActionBar = () => (
        <div className="sticky top-[88px] z-10 bg-background border-b -mx-6 px-6 py-2 mb-4 shadow-sm">
             <div className="flex items-center gap-2">
                <Checkbox 
                    checked={selectedRows.length > 0}
                    onCheckedChange={(checked) => !checked && setSelectedRows([])}
                />
                <span className="text-sm font-medium">{selectedRows.length} selected</span>
                <div className="h-6 border-l mx-2"></div>
                <Button variant="outline" size="sm" className="h-8">
                    <Save className="mr-2 h-4 w-4"/> Save to Memory
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                    <Mail className="mr-2 h-4 w-4"/> Create Digest
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                    <CheckCircle className="mr-2 h-4 w-4"/> Mark Read
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                    <FileUp className="mr-2 h-4 w-4"/> Export CSV
                </Button>
            </div>
        </div>
    );

    if (isLoading) {
        return (
            <div className="space-y-4">
                <ArticleCardSkeleton />
                <ArticleCardSkeleton />
                <ArticleCardSkeleton />
            </div>
        );
    }

    if (articles.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center text-center py-20 border-2 border-dashed rounded-lg">
                <p className="text-lg font-medium text-muted-foreground">No updates found.</p>
                <p className="text-sm text-muted-foreground mt-1">Try clearing filters or extending the timeframe.</p>
                <Button variant="outline" className="mt-4">Clear Filters</Button>
            </div>
        );
    }

    return (
        <div className="space-y-4 relative">
            {selectedRows.length > 0 && <BulkActionBar />}
            {articles.map((article) => (
                <div key={article.id} className="flex items-start gap-4 group">
                     <Checkbox 
                        className="mt-6 opacity-0 group-hover:opacity-100 data-[state=checked]:opacity-100 transition-opacity"
                        checked={selectedRows.includes(article.id)}
                        onCheckedChange={(checked) => handleSelectRow(article.id, Boolean(checked))}
                    />
                    <div className="flex-1">
                        <ArticleCard article={article} onAskAi={onAskAi} />
                    </div>
                </div>
            ))}
        </div>
    );
}
