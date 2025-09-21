'use client';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import type { Article } from "@/lib/data";
import { BookOpen, Bot, Lock, Save } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

type ArticleCardProps = {
    article: Article;
    onAskAi: (article: Article) => void;
};

export function ArticleCard({ article, onAskAi }: ArticleCardProps) {
    const { toast } = useToast();
    const [isSaved, setIsSaved] = useState(false);

    const handleSave = () => {
        setIsSaved(!isSaved);
        toast({
            title: isSaved ? "Removed from Memory" : "Saved to Memory",
            description: `"${article.title}"`,
        });
    };

    return (
        <Card className="shadow-card rounded-[10px] overflow-hidden">
            <div className="p-4 sm:p-5">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Image 
                        src={article.source.logoUrl} 
                        alt={`${article.source.name} logo`} 
                        width={24} 
                        height={24} 
                        className="rounded-full"
                        data-ai-hint={article.source.logoHint}
                    />
                    <span className="font-medium text-foreground">{article.source.name}</span>
                    <span>·</span>
                    <span>{article.publishedDate}</span>
                    <span className="flex-grow"></span>
                    <Badge variant={article.access === 'Free' ? 'secondary' : 'outline'} className="flex items-center gap-1.5">
                        {article.access === 'Paywalled' && <Lock className="h-3 w-3" />}
                        {article.access}
                    </Badge>
                </div>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <h3 className="mt-3 text-lg font-semibold leading-tight line-clamp-2 cursor-pointer hover:text-primary transition-colors">
                                {article.title}
                            </h3>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{article.title}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                    {article.summary}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                    {article.tags.map(tag => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                    {article.trialId && <Badge variant="outline">ID: {article.trialId}</Badge>}
                </div>
            </div>
            
            <div className="bg-secondary/50 px-4 sm:px-5 py-2 flex justify-end items-center gap-2">
                 <Button variant="ghost" size="sm" onClick={handleSave} className={`${isSaved ? 'text-primary' : ''}`}>
                    <Save className={`mr-2 h-4 w-4 ${isSaved ? 'fill-primary' : ''}`} />
                    {isSaved ? 'Saved' : 'Save to Memory'}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onAskAi(article)}>
                    <Bot className="mr-2 h-4 w-4" />
                    Ask AI
                </Button>
                <Button variant="outline" size="sm" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Read Source
                    </a>
                </Button>
            </div>
        </Card>
    );
}

export function ArticleCardSkeleton() {
    return (
        <Card className="shadow-card rounded-[10px] overflow-hidden">
            <div className="p-4 sm:p-5">
                <div className="flex items-center gap-3">
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="h-4 w-[80px]" />
                    <Skeleton className="h-4 w-[50px]" />
                    <span className="flex-grow"></span>
                    <Skeleton className="h-6 w-[70px] rounded-full" />
                </div>
                <Skeleton className="mt-3 h-5 w-5/6" />
                <Skeleton className="mt-1 h-5 w-full" />
                <Skeleton className="mt-4 h-4 w-full" />
                <Skeleton className="mt-1 h-4 w-3/4" />
                <div className="mt-4 flex gap-2">
                    <Skeleton className="h-6 w-[120px] rounded-full" />
                    <Skeleton className="h-6 w-[80px] rounded-full" />
                    <Skeleton className="h-6 w-[100px] rounded-full" />
                </div>
            </div>
             <div className="bg-secondary/50 px-4 sm:px-5 py-3 flex justify-end items-center gap-2">
                <Skeleton className="h-8 w-24 rounded-md" />
                <Skeleton className="h-8 w-24 rounded-md" />
            </div>
        </Card>
    );
}
