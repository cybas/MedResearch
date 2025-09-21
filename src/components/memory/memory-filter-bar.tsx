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
import { Search, ListFilter, Lock, Tag, Folder, FileUp, Trash2, GitCompareArrows } from "lucide-react";

type MemoryFilterBarProps = {
    resultCount: number;
    selectedCount: number;
};

export function MemoryFilterBar({ resultCount, selectedCount }: MemoryFilterBarProps) {
    if (selectedCount > 0) {
        return <BulkActionsBar count={selectedCount} />
    }

    return (
        <div className="sticky top-0 z-10 bg-background/80 py-4 backdrop-blur-sm -mx-6 px-6">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <div className="relative flex-1 min-w-[250px] lg:max-w-md">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search titles, abstracts, and notes…" className="pl-8 h-9" />
                </div>
                
                <div className="flex items-center gap-2 flex-wrap">
                    <FilterChip label="Collections" />
                    <FilterChip label="Tags" />
                    <FilterChip label="Type" />
                     <Button variant="outline" size="sm" className="h-9 text-muted-foreground font-normal">
                        <Lock className="h-3 w-3 mr-1.5" />
                        Access
                    </Button>
                </div>
                
                <div className="flex-grow"></div>

                <div className="flex items-center gap-4">
                    <Select defaultValue="recent">
                        <SelectTrigger className="w-auto h-9">
                            <ListFilter className="h-4 w-4 mr-2 text-muted-foreground" />
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="recent">Sort by: Recent</SelectItem>
                            <SelectItem value="title">Sort by: Title</SelectItem>
                            <SelectItem value="source">Sort by: Source</SelectItem>
                            <SelectItem value="most_notes">Sort by: Most Notes</SelectItem>
                            <SelectItem value="most_viewed">Sort by: Most Viewed</SelectItem>
                        </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground whitespace-nowrap">{resultCount} items</p>
                </div>
            </div>
        </div>
    );
}

function FilterChip({ label }: { label: string }) {
    return (
         <Button variant="outline" size="sm" className="h-9 text-muted-foreground font-normal">
            <span>{label}</span>
        </Button>
    )
}

function BulkActionsBar({ count }: { count: number }) {
    return (
        <div className="sticky top-0 z-10 bg-background/80 py-3 backdrop-blur-sm -mx-6 px-6 border-b">
            <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{count} selected</span>
                <div className="h-6 border-l mx-2"></div>
                <Button variant="outline" size="sm" className="h-8">
                    <Tag className="mr-2 h-4 w-4"/> Add Tags
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                    <Folder className="mr-2 h-4 w-4"/> Move to Collection
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                    <GitCompareArrows className="mr-2 h-4 w-4"/> Compare
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                    <FileUp className="mr-2 h-4 w-4"/> Export
                </Button>
                 <Button variant="destructive-outline" size="sm" className="h-8">
                    <Trash2 className="mr-2 h-4 w-4"/> Remove
                </Button>
            </div>
        </div>
    );
}
