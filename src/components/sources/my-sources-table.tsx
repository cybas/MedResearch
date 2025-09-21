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
import { MoreHorizontal, Pencil, Play, Pause, RefreshCw, Trash2, FileText, Bot } from "lucide-react";
import Image from "next/image";
import { sources, type Source, type SourceHealth } from "@/lib/sources-data";

type MySourcesTableProps = {
    onEditSource: (id: string) => void;
    selectedRows: string[];
    setSelectedRows: React.Dispatch<React.SetStateAction<string[]>>;
    onAddSource: () => void;
}

const healthColor: Record<SourceHealth, string> = {
    'OK': 'bg-green-500',
    'Warning': 'bg-yellow-500',
    'Error': 'bg-red-500',
};

const statusVariant: Record<Source['status'], 'secondary' | 'outline'> = {
    'Active': 'secondary',
    'Paused': 'outline'
};


export function MySourcesTable({ onEditSource, selectedRows, setSelectedRows, onAddSource }: MySourcesTableProps) {
    const isAllSelected = selectedRows.length > 0 && selectedRows.length === sources.length;

    const handleSelectAll = (checked: boolean) => {
        setSelectedRows(checked ? sources.map(s => s.id) : []);
    };

    const handleSelectRow = (id: string, checked: boolean) => {
        setSelectedRows(prev => checked ? [...prev, id] : prev.filter(rowId => rowId !== id));
    };
    
    if (sources.length === 0) {
        return (
            <Card className="shadow-card">
                <CardContent className="py-20 flex flex-col items-center justify-center text-center">
                    <h3 className="text-lg font-semibold">No sources yet</h3>
                    <p className="text-muted-foreground mt-1">Get started by adding your first source.</p>
                    <Button className="mt-4" onClick={onAddSource}>Add Source</Button>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="shadow-card">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-xl">My Sources</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">27 sources · 4 warnings · 1 error</p>
                    </div>
                    <Button variant="secondary" onClick={onAddSource}>Add Source</Button>
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
                            <TableHead>Name</TableHead>
                            <TableHead>Scope</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead>Schedule</TableHead>
                            <TableHead>Last Fetch</TableHead>
                            <TableHead>Items (7d)</TableHead>
                            <TableHead>Health</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sources.map((source) => (
                            <TableRow key={source.id} className="group" onClick={() => onEditSource(source.id)} style={{cursor: 'pointer'}}>
                                <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
                                    <Checkbox 
                                        checked={selectedRows.includes(source.id)}
                                        onCheckedChange={(checked) => handleSelectRow(source.id, Boolean(checked))}
                                    />
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Image src={source.logo} alt={`${source.name} logo`} width={20} height={20} className="rounded-sm" />
                                        <div className="font-medium">{source.name}</div>
                                        <Badge variant="outline">{source.type}</Badge>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="secondary">{source.scope.join(', ')}</Badge>
                                </TableCell>
                                <TableCell>{source.method}</TableCell>
                                <TableCell>{source.schedule}</TableCell>
                                <TableCell>{source.lastFetch}</TableCell>
                                <TableCell>{source.items7d}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2.5 h-2.5 rounded-full ${healthColor[source.health]}`}></div>
                                        <span>{source.health}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-end gap-1">
                                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEditSource(source.id)}><Pencil className="h-4 w-4"/></Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            {source.status === 'Active' ? <Pause className="h-4 w-4"/> : <Play className="h-4 w-4"/>}
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8"><RefreshCw className="h-4 w-4"/></Button>
                                    </div>
                                    <div className="group-hover:opacity-0 transition-opacity">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4"/></Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => onEditSource(source.id)}><Pencil className="mr-2 h-4 w-4"/> Edit</DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    {source.status === 'Active' ? <><Pause className="mr-2 h-4 w-4"/> Pause</> : <><Play className="mr-2 h-4 w-4"/> Activate</>}
                                                </DropdownMenuItem>
                                                <DropdownMenuItem><RefreshCw className="mr-2 h-4 w-4"/> Fetch Now</DropdownMenuItem>
                                                <DropdownMenuItem><FileText className="mr-2 h-4 w-4"/> View Logs</DropdownMenuItem>
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
