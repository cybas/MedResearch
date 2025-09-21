'use client';
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export default function CompliancePage() {
    return (
        <>
            <Breadcrumbs items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Compliance' }]} />
            <div className="flex items-center justify-center h-96">
                <p className="text-muted-foreground">Compliance page content goes here.</p>
            </div>
        </>
    );
}
