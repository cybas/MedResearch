'use client';
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import type { SavedMemoryItem } from "@/lib/data";
import { Bot, GitCompareArrows, Lock, MoreVertical, Pencil, Pin, Star, Trash2 } from "lucide-react";

type MemoryCardProps = {
    item: SavedMemoryItem;
    onOpen: () => void;
};

export function MemoryCard({ item, onOpen }: MemoryCardProps) {
    return (
        <Card className="shadow-card rounded-[10px] overflow-hidden">
            <div className="p-4 sm:p-5">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Image 
                        src={item.source.logoUrl} 
                        alt={`${item.source.name} logo`} 
                        width={24} 
                        height={24} 
                        className="rounded-full"
                        data-ai-hint={item.source.logoHint}
                    />
                    <span className="font-medium text-foreground">{item.source.name}</span>
                    <span>·</span>
                    <span>Saved {item.savedDate}</span>
                    <span className="flex-grow"></span>
                     {item.access === 'Paywalled' && (
                        <Badge variant='outline' className="flex items-center gap-1.5 mr-2">
                            <Lock className="h-3 w-3" />
                            Paywalled
                        </Badge>
                     )}
                     <div className="flex items-center gap-2 text-primary">
                        {item.isPinned && <Pin className="h-4 w-4" aria-label="Pinned" />}
                        {item.isHighlighted && <Star className="h-4 w-4" aria-label="Highlighted" />}
                        {item.hasNotes && <Pencil className="h-4 w-4" aria-label="Has notes" />}
                     </div>
                </div>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <h3 onClick={onOpen} className="mt-3 text-lg font-semibold leading-tight line-clamp-2 cursor-pointer hover:text-primary transition-colors">
                                {item.title}
                            </h3>
                        </TooltipTrigger>
                        <TooltipContent><p>{item.title}</p></TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                    {item.summary}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags?.map(tag => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                </div>
            </div>
            
            <div className="bg-secondary/50 px-4 sm:px-5 py-2 flex justify-end items-center gap-1">
                <Button variant="ghost" size="sm" onClick={onOpen}>
                    Open
                </Button>
                <Button variant="ghost" size="sm">
                    <Bot className="mr-2 h-4 w-4" />
                    Ask AI
                </Button>
                 <Button variant="ghost" size="sm">
                    <GitCompareArrows className="mr-2 h-4 w-4" />
                    Compare
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4"/></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>Move to Collection</DropdownMenuItem>
                        <DropdownMenuItem>{item.isPinned ? 'Unpin' : 'Pin'}</DropdownMenuItem>
                        <DropdownMenuItem>{item.isHighlighted ? 'Remove Highlight' : 'Highlight'}</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4"/> Remove</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </Card>
    );
}
