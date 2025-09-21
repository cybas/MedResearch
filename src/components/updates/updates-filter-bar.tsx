'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Search, ListFilter, Lock, Globe } from "lucide-react";
import { FilterChip } from './filter-chip';

type UpdatesFilterBarProps = {
    resultCount: number;
};

export function UpdatesFilterBar({ resultCount }: UpdatesFilterBarProps) {
    return (
        <div className="sticky top-0 z-10 bg-background/80 py-4 backdrop-blur-sm -mx-6 px-6">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <div className="relative flex-1 min-w-[250px] lg:max-w-md">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search titles, abstracts, and summaries…" className="pl-8 h-9" />
                </div>
                
                <div className="flex items-center gap-2 flex-wrap">
                    <Select defaultValue="7d">
                        <SelectTrigger className="w-auto min-w-[140px] h-9">
                            <SelectValue placeholder="Timeframe" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="24h">Last 24 hours</SelectItem>
                            <SelectItem value="7d">Last 7 days</SelectItem>
                            <SelectItem value="30d">Last 30 days</SelectItem>
                            <SelectItem value="custom">Custom Range</SelectItem>
                        </SelectContent>
                    </Select>

                    <FilterChip label="Type" />
                    <FilterChip label="Keywords" />

                    <ToggleGroup type="single" defaultValue="all" aria-label="Access" className="h-9">
                        <ToggleGroupItem value="all" aria-label="All" className="text-xs px-2.5">
                            All
                        </ToggleGroupItem>
                        <ToggleGroupItem value="open" aria-label="Open Access" className="text-xs px-2.5">
                            Open
                        </ToggleGroupItem>
                        <ToggleGroupItem value="paywalled" aria-label="Paywalled" className="text-xs px-2.5">
                            <Lock className="h-3 w-3 mr-1.5" /> Paywalled
                        </ToggleGroupItem>
                    </ToggleGroup>
                </div>
                
                <div className="flex-grow"></div>

                <div className="flex items-center gap-4">
                    <Select defaultValue="relevance">
                        <SelectTrigger className="w-auto h-9">
                            <ListFilter className="h-4 w-4 mr-2 text-muted-foreground" />
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="relevance">Relevance</SelectItem>
                            <SelectItem value="newest">Newest</SelectItem>
                            <SelectItem value="source">Source</SelectItem>
                            <SelectItem value="most_saved">Most Saved</SelectItem>
                        </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground whitespace-nowrap">{resultCount} results</p>
                </div>
            </div>
        </div>
    );
}
