'use client';
import { useState, useMemo } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { MemoryHeader } from '@/components/memory/memory-header';
import { MemoryFilterBar } from '@/components/memory/memory-filter-bar';
import { LibraryList } from '@/components/memory/library-list';
import { CollectionsAndTags } from '@/components/memory/collections-and-tags';
import { RecentNotes } from '@/components/memory/recent-notes';
import { savedMemoryItems, type SavedMemoryItem } from '@/lib/data';
import { ItemDetailDrawer } from '@/components/memory/item-detail-drawer';

export default function MemoryPage() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    
    const [selectedRows, setSelectedRows] = useState<string[]>([]);

    const drawerState = useMemo(() => {
        const drawer = searchParams.get('drawer');
        const id = searchParams.get('id');
        const isOpen = drawer === 'item';
        return { isOpen, id };
    }, [searchParams]);

    const handleSetDrawer = (open: boolean, id?: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (open && id) {
            params.set('drawer', 'item');
            params.set('id', id);
        } else {
            params.delete('drawer');
            params.delete('id');
        }
        router.push(`${pathname}?${params.toString()}`);
    };
    
    const selectedItem = useMemo(() => {
        if (drawerState.isOpen && drawerState.id) {
            return savedMemoryItems.find(item => item.id === drawerState.id) || null;
        }
        return null;
    }, [drawerState.id, drawerState.isOpen]);

    return (
        <>
            <Breadcrumbs items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Memory' }]} />
            <main className="py-8">
                <MemoryHeader />
                <MemoryFilterBar resultCount={savedMemoryItems.length} selectedCount={selectedRows.length} />
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 lg:gap-6">
                    <div className="lg:col-span-8">
                        <LibraryList 
                            onOpenItem={(id) => handleSetDrawer(true, id)}
                            selectedRows={selectedRows}
                            setSelectedRows={setSelectedRows}
                        />
                    </div>
                    <div className="lg:col-span-4 mt-6 lg:mt-0 space-y-6">
                        <CollectionsAndTags />
                        <RecentNotes onOpenItem={(id) => handleSetDrawer(true, id)} />
                    </div>
                </div>
            </main>
            <ItemDetailDrawer 
                open={drawerState.isOpen}
                onOpenChange={(open) => {
                    if (!open) {
                        handleSetDrawer(false);
                    }
                }}
                item={selectedItem}
            />
        </>
    );
}
