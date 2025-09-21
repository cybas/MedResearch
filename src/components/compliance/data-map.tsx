'use client';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Database, Server, Files, User, Bot, Mail, Webhook, Network } from "lucide-react";

const mapItems = [
    {
        category: "Inputs",
        items: [
            { icon: Files, label: "Journals/APIs" },
            { icon: Files, label: "ClinicalTrials.gov" },
            { icon: Files, label: "User Uploads (PDF)" },
        ]
    },
    {
        category: "Processing",
        items: [
            { icon: Server, label: "Crawler/API" },
            { icon: Bot, label: "Parser" },
            { icon: Bot, label: "Deduper" },
            { icon: Bot, label: "Summarizer" },
            { icon: Server, label: "Index" },
        ]
    },
    {
        category: "Storage",
        items: [
            { icon: Database, label: "Encrypted DB (Metadata)" },
            { icon: Database, label: "Encrypted Object Store (Originals)" },
            { icon: Database, label: "Vector Index (Embeddings)" },
        ]
    },
    {
        category: "Egress",
        items: [
            { icon: User, label: "UI" },
            { icon: Mail, label: "Email Digests" },
            { icon: Webhook, label: "Webhooks" },
        ]
    }
];

export function DataMap() {
    return (
        <Card className="shadow-card">
            <CardHeader className="flex-row items-center justify-between">
                <CardTitle className="text-xl flex items-center gap-2"><Network className="w-5 h-5"/>Data Map</CardTitle>
                <Select defaultValue="india" disabled>
                    <SelectTrigger className="w-[120px] h-8 text-xs">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="us">US</SelectItem>
                        <SelectItem value="eu">EU</SelectItem>
                        <SelectItem value="india">India</SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="space-y-4">
                {mapItems.map((section, index) => (
                    <div key={section.category}>
                        <h4 className="text-sm font-semibold mb-2">{section.category}</h4>
                        <div className="space-y-2 text-sm text-muted-foreground">
                            {section.items.map(item => (
                                <div key={item.label} className="flex items-center gap-2 p-2 bg-secondary/50 rounded-md">
                                    <item.icon className="h-4 w-4" />
                                    <span>{item.label}</span>
                                </div>
                            ))}
                        </div>
                        {index < mapItems.length - 1 && <div className="flex justify-center my-2"><ArrowRight className="h-4 w-4 text-muted-foreground transform rotate-90"/></div>}
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
