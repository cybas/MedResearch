'use client';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const logData = [
    { time: '10:04', actor: 'vedant', action: 'saved keyword', target: "'PEG-PLA'", status: 'OK' },
    { time: '09:57', actor: 'system', action: 'crawl', target: 'NEJM', status: 'OK' },
    { time: '09:52', actor: 'vedant', action: 'login', target: 'from 1.2.3.4', status: 'OK' },
    { time: '08:30', actor: 'system', action: 'export', target: 'Compliance Report', status: 'OK' },
    { time: '08:15', actor: 'system', action: 'crawl', target: 'nature.com', status: 'Warning' },
    { time: '08:01', actor: 'vedant', action: 'paused source', target: 'acmepharma.com', status: 'OK' },
];

export function AuditLog() {
    return (
        <Card className="shadow-card">
            <CardHeader>
                <CardTitle className="text-xl">Audit Log (Recent)</CardTitle>
            </CardHeader>
            <CardContent className="-mx-6 -mt-6">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px]">Time</TableHead>
                            <TableHead>Actor</TableHead>
                            <TableHead>Action</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {logData.map((log, i) => (
                            <TableRow key={i}>
                                <TableCell className="text-muted-foreground">{log.time}</TableCell>
                                <TableCell className="font-medium">{log.actor}</TableCell>
                                <TableCell>
                                    {log.action}
                                    <span className="text-muted-foreground ml-1 truncate">{log.target}</span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Badge variant={log.status === 'OK' ? 'secondary' : 'destructive'}>{log.status}</Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                <Button variant="link" className="w-full">Open full Audit Log</Button>
            </CardFooter>
        </Card>
    );
}
