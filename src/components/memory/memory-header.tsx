'use client';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Upload } from "lucide-react";

export function MemoryHeader() {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Memory</h1>
                <p className="text-muted-foreground mt-1">
                    Your saved research library with notes, highlights, and comparisons.
                </p>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="secondary">
                    New Collection
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" aria-label="Export">
                            <Upload className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>Export as CSV</DropdownMenuItem>
                        <DropdownMenuItem>Export as BibTeX</DropdownMenuItem>
                        <DropdownMenuItem>Export as RIS</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
