'use client';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { savedMemoryItems, type SavedMemoryItem } from "@/lib/data";
import { MemoryCard } from './memory-card';

type LibraryListProps = {
    onOpenItem: (id: string) => void;
    selectedRows: string[];
    setSelectedRows: React.Dispatch<React.SetStateAction<string[]>>;
}

export function LibraryList({ onOpenItem, selectedRows, setSelectedRows }: LibraryListProps) {
    
    const handleSelectRow = (id: string, checked: boolean) => {
        setSelectedRows(prev => checked ? [...prev, id] : prev.filter(rowId => rowId !== id));
    };

    if (savedMemoryItems.length === 0) {
        return (
            <Card className="shadow-card">
                <CardContent className="py-20 flex flex-col items-center justify-center text-center">
                    <h3 className="text-lg font-semibold">Nothing saved yet.</h3>
                    <p className="text-muted-foreground mt-1">Save articles from the Updates feed to build your library.</p>
                    <div className="flex gap-2 mt-4">
                        <Button>Go to Updates</Button>
                        <Button variant="secondary">Go to Keywords</Button>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="space-y-4">
            {savedMemoryItems.map(item => (
                 <div key={item.id} className="flex items-start gap-4 group">
                     <Checkbox 
                        className="mt-6 opacity-0 group-hover:opacity-100 data-[state=checked]:opacity-100 transition-opacity"
                        checked={selectedRows.includes(item.id)}
                        onCheckedChange={(checked) => handleSelectRow(item.id, Boolean(checked))}
                    />
                    <div className="flex-1">
                        <MemoryCard 
                            item={item} 
                            onOpen={() => onOpenItem(item.id)} 
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
