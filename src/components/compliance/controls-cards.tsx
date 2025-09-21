'use client';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { Check } from "lucide-react";

const controls = [
    { 
        title: "Access Controls", 
        points: ["SSO (SAML/OIDC)", "MFA", "Role-based permissions", "Session timeouts"],
        action: <Button asChild variant="secondary" size="sm"><Link href="/settings?tab=roles">Manage Roles</Link></Button>
    },
    { 
        title: "Encryption", 
        points: ["TLS 1.2+ in transit", "AES-256 at rest", "Key rotation policy (90d)", "Secrets stored in vault"],
    },
    { 
        title: "Data Retention", 
        points: ["Default 365d audit log retention", "Soft-delete for 30 days", "Hard-delete on request"],
        action: <Button asChild variant="link" size="sm" className="p-0 h-auto"><Link href="/settings?tab=data">Change retention policy</Link></Button>
    },
    { 
        title: "Incident Response", 
        points: ["24/7 on-call security team", "Breach notification target < 72h"],
        action: <Button variant="secondary" size="sm">View Playbook</Button>
    },
     { 
        title: "Consent & Legal", 
        points: ["Opt-in for all email alerts", "One-click unsubscribe", "Cookie policy available"],
    },
];

const processors = [
    { name: "Google Cloud", purpose: "Cloud Infrastructure", region: "Regional", dpa: true },
    { name: "SendGrid", purpose: "Email Delivery", region: "US", dpa: true },
    { name: "Slack", purpose: "Webhook Notifications", region: "US", dpa: true },
]

export function ControlsCards() {
    return (
        <div className="space-y-6">
            {controls.map(control => (
                <Card key={control.title} className="shadow-card">
                    <CardHeader className="flex-row items-center justify-between">
                        <CardTitle className="text-xl">{control.title}</CardTitle>
                        {control.action}
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-muted-foreground">
                            {control.points.map(point => (
                                <li key={point} className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-green-600" />
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            ))}
            <Card className="shadow-card">
                <CardHeader className="flex-row items-center justify-between">
                    <CardTitle className="text-xl">Third-Party Processors</CardTitle>
                    <Button asChild variant="secondary" size="sm"><Link href="/settings?tab=integrations">Manage</Link></Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableBody>
                            {processors.map(p => (
                                <TableRow key={p.name}>
                                    <TableCell className="font-medium">{p.name}</TableCell>
                                    <TableCell>{p.purpose}</TableCell>
                                    <TableCell>{p.region}</TableCell>
                                    <TableCell className="text-right">{p.dpa ? "DPA/SCC" : ""}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
