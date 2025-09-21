'use client';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { recentErrorsData } from "@/lib/sources-data";

export function RecentErrors() {
    return (
        <Card className="shadow-card">
            <CardHeader>
                <CardTitle className="text-xl">Recent Errors</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {recentErrorsData.map(error => (
                        <div key={error.id}>
                            <div className="flex items-start justify-between">
                                <Badge variant="destructive">{error.code}</Badge>
                                <span className="text-xs text-muted-foreground">{error.time}</span>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                                <p className="text-sm font-medium">{error.source}</p>
                                <div className="flex gap-1">
                                    <Button variant="ghost" size="sm" className="h-7 text-xs">View Logs</Button>
                                    <Button variant="ghost" size="sm" className="h-7 text-xs">Retry</Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter>
                <Button variant="link" className="w-full">View all logs</Button>
            </CardFooter>
        </Card>
    );
}
