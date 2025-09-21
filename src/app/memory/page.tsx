'use client';
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export default function MemoryPage() {
    return (
        <>
            <Breadcrumbs items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Memory' }]} />
            <div className="flex items-center justify-center h-96">
                <p className="text-muted-foreground">Memory page content goes here.</p>
            </div>
        </>
    );
}
