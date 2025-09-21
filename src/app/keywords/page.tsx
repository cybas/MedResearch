'use client';
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export default function KeywordsPage() {
    return (
        <>
            <Breadcrumbs items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Keywords' }]} />
            <div className="flex items-center justify-center h-96">
                <p className="text-muted-foreground">Keywords page content goes here.</p>
            </div>
        </>
    );
}
