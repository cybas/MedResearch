'use client';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical, Pencil, Palette, Settings, Trash2 } from "lucide-react";
import { keywordGroups } from "@/lib/keywords-data";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function GroupsAndDefaults() {
    return (
        <Card className="shadow-card">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">Groups & Defaults</CardTitle>
                    <Button variant="secondary">New Group</Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {keywordGroups.map(group => (
                        <div key={group.name} className="flex items-center p-2 rounded-md hover:bg-secondary">
                            <div className={`w-2 h-8 rounded-full ${group.color} mr-3`}></div>
                            <div className="flex-1">
                                <p className="font-semibold">{group.name} ({group.count})</p>
                                <p className="text-xs text-muted-foreground">
                                    Alerts: {group.defaults.alerts} · Sources: {group.defaults.sources.join(', ')}
                                </p>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4"/></Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem><Pencil className="mr-2 h-4 w-4"/> Rename</DropdownMenuItem>
                                    <DropdownMenuItem><Palette className="mr-2 h-4 w-4"/> Set Color</DropdownMenuItem>
                                    <DropdownMenuItem><Settings className="mr-2 h-4 w-4"/> Set Defaults</DropdownMenuItem>
                                    <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4"/> Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
