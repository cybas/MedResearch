'use client';
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

type KeywordsHeaderProps = {
    onAddKeyword: () => void;
};

export function KeywordsHeader({ onAddKeyword }: KeywordsHeaderProps) {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Keywords</h1>
                <p className="text-muted-foreground mt-1">
                    Create, group, and tune your monitored queries.
                </p>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="secondary" onClick={onAddKeyword}>
                    Import CSV
                </Button>
                <Button onClick={onAddKeyword}>
                    Add Keyword
                </Button>
                 <Button variant="outline" size="icon" aria-label="Export">
                    <Upload className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
