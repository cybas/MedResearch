'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown, Play, Pause, RefreshCw, Trash2 } from "lucide-react";

type SourcesFilterBarProps = {
    selectedCount: number;
};

export function SourcesFilterBar({ selectedCount }: SourcesFilterBarProps) {
    return (
        <div className="sticky top-0 z-10 bg-background/80 py-4 backdrop-blur-sm -mx-6 px-6">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <div className="relative flex-1 min-w-[250px]">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search sources..." className="pl-8 h-9" />
                </div>

                {selectedCount > 0 ? (
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{selectedCount} selected</span>
                        <Button variant="outline" size="sm" className="h-9">
                            <Play className="mr-2 h-4 w-4"/> Activate
                        </Button>
                        <Button variant="outline" size="sm" className="h-9">
                            <Pause className="mr-2 h-4 w-4"/> Pause
                        </Button>
                        <Button variant="outline" size="sm" className="h-9">
                            <RefreshCw className="mr-2 h-4 w-4"/> Re-crawl
                        </Button>
                        <Button variant="destructive-outline" size="sm" className="h-9">
                            <Trash2 className="mr-2 h-4 w-4"/> Delete
                        </Button>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 flex-wrap">
                        <FilterChip label="Type" />
                        <FilterChip label="Status" />
                        <FilterChip label="Health" />
                        <FilterChip label="Auth" />
                        <FilterChip label="Last Fetch" />
                    </div>
                )}
            </div>
        </div>
    );
}

function FilterChip({ label }: { label: string }) {
    return (
         <Button variant="outline" size="sm" className="h-9 text-muted-foreground font-normal">
            <span>{label}</span>
            <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
    )
}
