'use client';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SourcesHeader } from '@/components/sources/sources-header';
import { SourcesFilterBar } from '@/components/sources/sources-filter-bar';
import { MySourcesTable } from '@/components/sources/my-sources-table';
import { CrawlHealth } from '@/components/sources/crawl-health';
import { RecentErrors } from '@/components/sources/recent-errors';
import { EditSourceDrawer } from '@/components/sources/edit-source-drawer';
import { sources, type Source } from '@/lib/sources-data';
import { useState, useMemo } from 'react';

export default function SourcesPage() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    
    const drawerState = useMemo(() => {
        const drawer = searchParams.get('drawer');
        const id = searchParams.get('id');
        const isOpen = drawer === 'new' || drawer === 'edit';
        const mode = drawer === 'edit' ? 'edit' : 'new';
        return { isOpen, mode, id };
    }, [searchParams]);

    const handleSetDrawer = (open: boolean, mode: 'new' | 'edit' = 'new', id?: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (open) {
            params.set('drawer', mode);
            if (mode === 'edit' && id) {
                params.set('id', id);
            }
        } else {
            params.delete('drawer');
            params.delete('id');
        }
        router.push(`${pathname}?${params.toString()}`);
    };

    const selectedSource = useMemo(() => {
        if (drawerState.mode === 'edit' && drawerState.id) {
            return sources.find(s => s.id === drawerState.id) || null;
        }
        return null;
    }, [drawerState]);
    
    return (
        <>
            <Breadcrumbs items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Sources' }]} />
            <main className="py-8">
                <SourcesHeader onAddSource={() => handleSetDrawer(true, 'new')} />
                <SourcesFilterBar selectedCount={selectedRows.length} />

                <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 lg:gap-6">
                    <div className="lg:col-span-8">
                        <MySourcesTable 
                            onEditSource={(id) => handleSetDrawer(true, 'edit', id)}
                            selectedRows={selectedRows}
                            setSelectedRows={setSelectedRows}
                            onAddSource={() => handleSetDrawer(true, 'new')}
                        />
                    </div>
                    <div className="lg:col-span-4 mt-6 lg:mt-0 space-y-6">
                        <CrawlHealth />
                        <RecentErrors />
                    </div>
                </div>
            </main>
            <EditSourceDrawer 
                open={drawerState.isOpen}
                onOpenChange={(open) => {
                    if (!open) {
                        handleSetDrawer(false);
                    }
                }}
                source={selectedSource}
                mode={drawerState.mode}
            />
        </>
    );
}
