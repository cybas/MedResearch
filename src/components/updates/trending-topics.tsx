'use client';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowUp } from "lucide-react";

const trendingTopics = [
    { name: 'PEG-PLA', change: '+42%' },
    { name: 'CAR-T scaffold', change: '+19%' },
    { name: 'Glioblastoma inhibitors', change: '+15%' },
    { name: 'Doxorubicin delivery', change: '+11%' },
    { name: 'Biodegradable polymers', change: '+8%' },
];

export function TrendingTopics() {
    return (
        <Card className="shadow-card">
            <CardHeader>
                <CardTitle className="text-xl">Trending Topics (7d)</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3">
                    {trendingTopics.map(topic => (
                        <li key={topic.name} className="flex items-center justify-between text-sm">
                            <span className="font-medium">{topic.name}</span>
                            <div className="flex items-center gap-1 text-green-600">
                                <ArrowUp className="h-4 w-4" />
                                <span className="font-semibold">{topic.change}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}
