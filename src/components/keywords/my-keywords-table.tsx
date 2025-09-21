'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Play, Pause, Copy, Trash2, History } from "lucide-react";
import { keywords, type Keyword } from "@/lib/keywords-data";
import { useState } from "react";

type MyKeywordsTableProps = {
    onEditKeyword: (id: string) => void;
    selectedRows: string[];
    setSelectedRows: React.Dispatch<React.SetStateAction<string[]>>;
    onAddKeyword: () => void;
}

const matchTypeVariant: Record<Keyword['match'], 'default' | 'secondary' | 'outline' | 'destructive'> = {
    'exact': 'default',
    'phrase': 'secondary',
    'semantic': 'outline',
    'boolean': 'destructive'
};

const statusVariant: Record<Keyword['status'], 'secondary' | 'outline'> = {
    'active': 'secondary',
    'paused': 'outline'
};

export function MyKeywordsTable({ onEditKeyword, selectedRows, setSelectedRows, onAddKeyword }: MyKeywordsTableProps) {
    const isAllSelected = selectedRows.length === keywords.length;

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedRows(keywords.map(k => k.id));
        } else {
            setSelectedRows([]);
        }
    };

    const handleSelectRow = (id: string, checked: boolean) => {
        if (checked) {
            setSelectedRows(prev => [...prev, id]);
        } else {
            setSelectedRows(prev => prev.filter(rowId => rowId !== id));
        }
    };
    
    if (keywords.length === 0) {
        return (
            <Card className="shadow-card">
                <CardContent className="py-20 flex flex-col items-center justify-center text-center">
                    <h3 className="text-lg font-semibold">No keywords yet</h3>
                    <p className="text-muted-foreground mt-1">Get started by creating your first keyword.</p>
                    <Button className="mt-4" onClick={onAddKeyword}>Add Keyword</Button>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="shadow-card">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-xl">My Keywords</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">34 keywords · 7 new matches (7d)</p>
                    </div>
                    <Button variant="secondary" onClick={onAddKeyword}>Add Keyword</Button>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead padding="checkbox">
                                <Checkbox 
                                    checked={isAllSelected} 
                                    onCheckedChange={(checked) => handleSelectAll(Boolean(checked))}
                                />
                            </TableHead>
                            <TableHead>Keyword / Type</TableHead>
                            <TableHead>Group</TableHead>
                            <TableHead>Weight</TableHead>
                            <TableHead>Source Scope</TableHead>
                            <TableHead>Matches (7d)</TableHead>
                            <TableHead>Last Fetch</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {keywords.map((keyword) => (
                            <TableRow key={keyword.id} className="group" onClick={() => onEditKeyword(keyword.id)} style={{cursor: 'pointer'}}>
                                <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
                                    <Checkbox 
                                        checked={selectedRows.includes(keyword.id)}
                                        onCheckedChange={(checked) => handleSelectRow(keyword.id, Boolean(checked))}
                                    />
                                </TableCell>
                                <TableCell>
                                    <div className="font-medium">{keyword.label}</div>
                                    <Badge variant={matchTypeVariant[keyword.match]} className="capitalize mt-1">{keyword.match}</Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline">{keyword.group}</Badge>
                                </TableCell>
                                <TableCell>{keyword.weight}</TableCell>
                                <TableCell className="capitalize">
                                    {keyword.sourceScope === 'selected' ? `${keyword.sources.length} Selected` : 'All'}
                                </TableCell>
                                <TableCell>{keyword.stats.matches7d}</TableCell>
                                <TableCell>{keyword.stats.lastFetch}</TableCell>
                                <TableCell>
                                    <Badge variant={statusVariant[keyword.status]} className="capitalize flex items-center gap-1.5 w-fit">
                                        <div className={`w-2 h-2 rounded-full ${keyword.status === 'active' ? 'bg-green-500' : 'bg-muted-foreground'}`}></div>
                                        {keyword.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-end gap-1">
                                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEditKeyword(keyword.id)}><Pencil className="h-4 w-4"/></Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            {keyword.status === 'active' ? <Pause className="h-4 w-4"/> : <Play className="h-4 w-4"/>}
                                        </Button>
                                    </div>
                                    <div className="group-hover:opacity-0 transition-opacity">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4"/></Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => onEditKeyword(keyword.id)}><Pencil className="mr-2 h-4 w-4"/> Edit</DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    {keyword.status === 'active' ? <><Pause className="mr-2 h-4 w-4"/> Pause</> : <><Play className="mr-2 h-4 w-4"/> Activate</>}
                                                </DropdownMenuItem>
                                                <DropdownMenuItem><Copy className="mr-2 h-4 w-4"/> Duplicate</DropdownMenuItem>
                                                <DropdownMenuItem><History className="mr-2 h-4 w-4"/> View History</DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4"/> Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

// Augmenting TableCell props for custom padding
declare module "@radix-ui/react-table" {
    interface TableCellProps {
        padding?: 'checkbox';
    }
}

// Augmenting TableHead props
declare module "react" {
    interface ThHTMLAttributes<T> {
         padding?: 'checkbox';
    }
}
