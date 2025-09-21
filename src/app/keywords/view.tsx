'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { KeywordsHeader } from '@/components/keywords/keywords-header';
import { KeywordsFilterBar } from '@/components/keywords/keywords-filter-bar';
import { MyKeywordsTable } from '@/components/keywords/my-keywords-table';
import { GroupsAndDefaults } from '@/components/keywords/groups-and-defaults';
import { SynonymsAndExclusions } from '@/components/keywords/synonyms-and-exclusions';
import { EditKeywordDrawer } from '@/components/keywords/edit-keyword-drawer';
import { keywords as allKeywords } from '@/lib/keywords-data';
import { useState, useMemo, useEffect } from 'react';

export default function KeywordsView({ drawer, keywordId }: { drawer?: string, keywordId?: string }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    
    const drawerState = useMemo(() => {
        const isOpen = drawer === 'new' || drawer === 'edit';
        const mode = drawer === 'edit' ? 'edit' : 'new';
        return { isOpen, mode, id: keywordId };
    }, [drawer, keywordId]);

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

    const selectedKeyword = useMemo(() => {
        if (drawerState.mode === 'edit' && drawerState.id) {
            return allKeywords.find(k => k.id === drawerState.id) || null;
        }
        return null;
    }, [drawerState]);
    
    return (
        <>
            <Breadcrumbs items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Keywords' }]} />
            <main className="py-8">
                <KeywordsHeader onAddKeyword={() => handleSetDrawer(true, 'new')} />
                <KeywordsFilterBar selectedCount={selectedRows.length} />

                <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 lg:gap-6">
                    <div className="lg:col-span-8">
                        <MyKeywordsTable 
                            onEditKeyword={(id) => handleSetDrawer(true, 'edit', id)}
                            selectedRows={selectedRows}
                            setSelectedRows={setSelectedRows}
                            onAddKeyword={() => handleSetDrawer(true, 'new')}
                        />
                    </div>
                    <div className="lg:col-span-4 mt-6 lg:mt-0 space-y-6">
                        <GroupsAndDefaults />
                        <SynonymsAndExclusions />
                    </div>
                </div>
            </main>
            <EditKeywordDrawer 
                open={drawerState.isOpen}
                onOpenChange={(open) => {
                    if (!open) {
                        handleSetDrawer(false);
                    }
                }}
                keyword={selectedKeyword}
                mode={drawerState.mode}
            />
        </>
    );
}
