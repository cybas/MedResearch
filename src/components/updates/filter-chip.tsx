'use client';
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export function FilterChip({ label }: { label: string }) {
    return (
         <Button variant="outline" size="sm" className="h-9 text-muted-foreground font-normal">
            <span>{label}</span>
            <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
    )
}
