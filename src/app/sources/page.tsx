'use client';
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export default function SourcesPage() {
    return (
        <>
            <Breadcrumbs items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Sources' }]} />
            <div className="flex items-center justify-center h-96">
                <p className="text-muted-foreground">Sources page content goes here.</p>
            </div>
        </>
    );
}
