'use client';
import { Button } from "@/components/ui/button";

export function UpdatesHeader() {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Latest Updates</h1>
                <p className="text-muted-foreground mt-1 max-w-2xl">
                    All new items from your monitored sources—journals, clinical trials, preprints, and news.
                </p>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="secondary">
                    Create Digest
                </Button>
            </div>
        </div>
    );
}
