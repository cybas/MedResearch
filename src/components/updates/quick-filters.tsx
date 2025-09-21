'use client';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { sources } from "@/lib/sources-data";

export function QuickFilters() {
    return (
        <Card className="shadow-card">
            <CardHeader>
                <CardTitle className="text-xl">Quick Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h4 className="text-sm font-semibold mb-2">Top Sources</h4>
                    <div className="flex flex-wrap gap-2">
                        {sources.slice(0, 4).map(source => (
                            <Button key={source.id} variant="secondary" size="sm" className="h-auto">
                                {source.name}
                                <Badge variant="outline" className="ml-2 bg-background">{source.items7d}</Badge>
                            </Button>
                        ))}
                    </div>
                </div>
                <div>
                    <h4 className="text-sm font-semibold mb-2">Trial Phases</h4>
                    <div className="flex flex-wrap gap-2">
                        {['Phase I', 'Phase II', 'Phase III', 'Phase IV'].map(phase => (
                            <Button key={phase} variant="secondary" size="sm" className="h-auto">
                                {phase}
                                <Badge variant="outline" className="ml-2 bg-background">12</Badge>
                            </Button>
                        ))}
                    </div>
                </div>
                 <div>
                    <h4 className="text-sm font-semibold mb-2">Journals</h4>
                    <Button variant="outline" className="w-full justify-start text-muted-foreground">Search journals...</Button>
                </div>
                 <div>
                    <h4 className="text-sm font-semibold mb-2">Authors</h4>
                    <Button variant="outline" className="w-full justify-start text-muted-foreground">Search authors...</Button>
                </div>
            </CardContent>
        </Card>
    );
}
