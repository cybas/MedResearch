import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function WelcomeStrip() {
    return (
        <Card className="bg-secondary border-none shadow-none">
            <CardContent className="p-4 sm:p-6 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold">Welcome back, Dr. Rao.</h2>
                    <p className="text-muted-foreground mt-1 text-sm">
                        7 new updates this week · Monitored: Oncology · Nanopolymers · Clinical Trials
                    </p>
                </div>
                <Button variant="link" className="hidden sm:inline-flex">Customize Dashboard</Button>
            </CardContent>
        </Card>
    );
}
