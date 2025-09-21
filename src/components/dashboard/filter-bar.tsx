'use client';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, ListFilter } from "lucide-react";

export function FilterBar() {
    const [keywords, setKeywords] = useState(["Oncology", "CAR-T"]);

    const removeKeyword = (keywordToRemove: string) => {
        setKeywords(keywords.filter(keyword => keyword !== keywordToRemove));
    };

    return (
        <div className="sticky top-0 z-10 -mx-4 -mt-4 mb-4 bg-background/80 p-4 backdrop-blur-sm sm:rounded-lg sm:shadow-sm">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <Select defaultValue="7days">
                    <SelectTrigger className="w-auto min-w-[140px] h-9">
                        <SelectValue placeholder="Timeframe" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="24h">Last 24 hours</SelectItem>
                        <SelectItem value="7days">Last 7 days</SelectItem>
                        <SelectItem value="30days">Last 30 days</SelectItem>
                        <SelectItem value="all">All time</SelectItem>
                    </SelectContent>
                </Select>

                <Select defaultValue="all">
                    <SelectTrigger className="w-auto min-w-[120px] h-9">
                        <SelectValue placeholder="Source Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Sources</SelectItem>
                        <SelectItem value="journals">Journals</SelectItem>
                        <SelectItem value="trials">Trials</SelectItem>
                        <SelectItem value="preprints">Preprints</SelectItem>
                        <SelectItem value="news">News</SelectItem>
                    </SelectContent>
                </Select>

                <div className="flex items-center gap-2">
                    {keywords.map(keyword => (
                        <Badge key={keyword} variant="secondary" className="pl-2.5 pr-1 py-1 text-sm font-normal">
                            {keyword}
                            <button onClick={() => removeKeyword(keyword)} className="ml-1 rounded-full p-0.5 hover:bg-background">
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    ))}
                </div>

                <div className="flex items-center space-x-2">
                    <Checkbox id="paywalled" defaultChecked={false} />
                    <Label htmlFor="paywalled" className="text-sm font-medium">Show paywalled</Label>
                </div>
                
                <div className="flex-grow"></div>

                <div className="flex items-center gap-4">
                     <Select defaultValue="relevance">
                        <SelectTrigger className="w-auto h-9">
                            <ListFilter className="h-4 w-4 mr-2 text-muted-foreground" />
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="relevance">Sort by: Relevance</SelectItem>
                            <SelectItem value="newest">Sort by: Newest</SelectItem>
                            <SelectItem value="source">Sort by: Source</SelectItem>
                        </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground whitespace-nowrap">10 results</p>
                </div>

            </div>
        </div>
    );
}
