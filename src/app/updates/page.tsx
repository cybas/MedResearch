'use client';
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export default function UpdatesPage() {
    return (
        <>
            <Breadcrumbs items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Updates' }]} />
            <div className="flex items-center justify-center h-96">
                <p className="text-muted-foreground">Updates page content goes here.</p>
            </div>
        </>
    );
}
