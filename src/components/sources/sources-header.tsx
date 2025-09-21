'use client';
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

type SourcesHeaderProps = {
    onAddSource: () => void;
};

export function SourcesHeader({ onAddSource }: SourcesHeaderProps) {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Sources</h1>
                <p className="text-muted-foreground mt-1">
                    Whitelist journals, domains, authors, and feeds. Control crawl, parsing, and schedules.
                </p>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="secondary">
                    Import CSV
                </Button>
                <Button onClick={onAddSource}>
                    Add Source
                </Button>
                 <Button variant="outline" size="icon" aria-label="Export">
                    <Upload className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
