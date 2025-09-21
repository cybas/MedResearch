'use client';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Folder, FileText, Star, BrainCircuit } from "lucide-react";
import { savedMemoryItems } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function SavedMemory() {
    return (
        <Card className="shadow-card rounded-[10px] h-full">
            <CardHeader className="pb-4">
                <CardTitle className="text-xl flex items-center gap-2">
                    <BrainCircuit className="w-5 h-5 text-primary" />
                    Saved Memory
                </CardTitle>
                <div className="relative mt-2">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Find in Memory..." className="pl-8 h-9" />
                </div>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="all">
                    <TabsList className="grid w-full grid-cols-3 h-9">
                        <TabsTrigger value="all" className="text-xs"><Folder className="w-4 h-4 mr-1.5"/>All</TabsTrigger>
                        <TabsTrigger value="highlights" className="text-xs"><Star className="w-4 h-4 mr-1.5"/>Highlights</TabsTrigger>
                        <TabsTrigger value="notes" className="text-xs"><FileText className="w-4 h-4 mr-1.5"/>My Notes</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all" className="mt-4 pr-2 -mr-2 max-h-[400px] overflow-y-auto">
                        {savedMemoryItems.length > 0 ? (
                            <div className="space-y-3">
                                {savedMemoryItems.map(item => (
                                    <div key={item.id} className="p-3 rounded-md hover:bg-secondary transition-colors">
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <Image src={item.source.logoUrl} alt="" width={16} height={16} className="rounded-full" data-ai-hint={item.source.logoHint} />
                                            <span>{item.source.name}</span>
                                            <span>·</span>
                                            <span>{item.savedDate}</span>
                                        </div>
                                        <p className="font-medium text-sm mt-1 line-clamp-1">{item.title}</p>
                                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.summary}</p>
                                        <div className="flex gap-1 mt-2">
                                            <Button variant="ghost" size="sm" className="h-7 text-xs">Open</Button>
                                            <Button variant="ghost" size="sm" className="h-7 text-xs">Compare</Button>
                                            <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive hover:text-destructive">Remove</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-10">
                                <p className="text-sm text-muted-foreground">Nothing saved yet.</p>
                                <p className="text-xs text-muted-foreground/80 mt-1">Click 'Save to Memory' on any update.</p>
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </CardContent>
            <CardFooter>
                 <Button variant="link" className="w-full">View all</Button>
            </CardFooter>
        </Card>
    );
}
