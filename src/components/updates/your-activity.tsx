'use client';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function YourActivity() {
    return (
        <Card className="shadow-card">
            <CardHeader>
                <CardTitle className="text-xl">Your Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="text-sm">
                    <span className="font-semibold">This week:</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                        <p className="text-2xl font-bold">32</p>
                        <p className="text-xs text-muted-foreground">Viewed</p>
                    </div>
                     <div>
                        <p className="text-2xl font-bold">9</p>
                        <p className="text-xs text-muted-foreground">Saved</p>
                    </div>
                     <div>
                        <p className="text-2xl font-bold">6</p>
                        <p className="text-xs text-muted-foreground">Asked AI</p>
                    </div>
                </div>
                 <Button variant="link" className="w-full !mt-4">View Activity</Button>
            </CardContent>
        </Card>
    );
}
