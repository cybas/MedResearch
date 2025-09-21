'use client';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { globalStopwords, synonymSuggestions } from "@/lib/keywords-data";

export function SynonymsAndExclusions() {
    return (
        <Card className="shadow-card">
            <CardHeader>
                <CardTitle className="text-xl">Synonyms & Exclusions</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="synonyms">
                    <TabsList className="grid w-full grid-cols-2 h-9">
                        <TabsTrigger value="synonyms">Synonyms</TabsTrigger>
                        <TabsTrigger value="stopwords">Stopwords</TabsTrigger>
                    </TabsList>
                    <TabsContent value="synonyms" className="mt-4">
                        <div className="space-y-2">
                             {synonymSuggestions.map(({ term, expansion }) => (
                                <div key={term} className="text-sm p-2 rounded-md bg-secondary/50 flex items-center justify-between">
                                    <span>{term} ↔ {expansion}</span>
                                    <Button size="sm" variant="outline" className="h-7">Add</Button>
                                </div>
                            ))}
                        </div>
                        <Button variant="link" className="w-full mt-2">Manage All</Button>
                    </TabsContent>
                    <TabsContent value="stopwords" className="mt-4">
                        <p className="text-sm text-muted-foreground mb-2">Global words to exclude from all semantic and phrase matches.</p>
                         <div className="flex flex-wrap gap-2 mb-4">
                            {globalStopwords.map(word => (
                                <Badge key={word} variant="secondary" className="pl-2.5 pr-1 py-1 text-sm font-normal">
                                    {word}
                                    <button className="ml-1 rounded-full p-0.5 hover:bg-background">
                                        <X className="h-3 w-3" />
                                    </button>
                                </Badge>
                            ))}
                        </div>
                        <Input placeholder="Add a stopword..." />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
