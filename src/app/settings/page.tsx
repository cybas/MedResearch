'use client';
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export default function SettingsPage() {
    return (
        <>
            <Breadcrumbs items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Settings' }]} />
            <div className="flex items-center justify-center h-96">
                <p className="text-muted-foreground">Settings page content goes here.</p>
            </div>
        </>
    );
}
