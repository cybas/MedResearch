'use client';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoreVertical, Search } from "lucide-react";

const collections = [
    { name: 'All', count: 42 },
    { name: 'Highlights', count: 9 },
    { name: 'Pinned', count: 3 },
    { name: 'To Read', count: 12 },
    { name: 'Project Onco-Nano', count: 7, color: 'bg-blue-500' },
    { name: 'Competitor Watch', count: 5, color: 'bg-yellow-500' },
];

const tags = [
    { name: 'Oncology', count: 28 },
    { name: 'Polymer Drug Delivery', count: 15 },
    { name: 'CAR-T', count: 9 },
    { name: 'PEG-PLA', count: 7 },
    { name: 'Doxorubicin', count: 5 },
    { name: 'Preclinical', count: 4 },
];

export function CollectionsAndTags() {
    return (
        <Card className="shadow-card">
            <CardHeader>
                <CardTitle className="text-xl">Collections & Tags</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="collections">
                    <TabsList className="grid w-full grid-cols-2 h-9">
                        <TabsTrigger value="collections">Collections</TabsTrigger>
                        <TabsTrigger value="tags">Tags</TabsTrigger>
                    </TabsList>
                    <TabsContent value="collections" className="mt-4 space-y-2">
                        {collections.map(c => (
                            <Button key={c.name} variant="ghost" className="w-full justify-start h-auto py-2">
                                {c.color && <div className={`w-2 h-2 rounded-full ${c.color} mr-2`}></div>}
                                <span className="flex-1 text-left font-normal">{c.name}</span>
                                <span className="text-muted-foreground text-xs">{c.count}</span>
                            </Button>
                        ))}
                         <Button variant="secondary" className="w-full mt-2">New Collection</Button>
                    </TabsContent>
                    <TabsContent value="tags" className="mt-4 space-y-3">
                         <div className="relative">
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search tags..." className="pl-8 h-9" />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {tags.map(t => (
                                <Button key={t.name} variant="secondary" size="sm" className="h-auto">
                                    {t.name}
                                    <span className="text-muted-foreground ml-1.5 text-xs">{t.count}</span>
                                </Button>
                            ))}
                        </div>
                        <Button variant="link" className="w-full">Manage all tags</Button>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
