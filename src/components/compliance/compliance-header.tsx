'use client';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export function ComplianceHeader() {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Compliance & Security</h1>
                <p className="text-muted-foreground mt-1">
                    Standards, controls, and auditability for medical research data.
                </p>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="secondary">
                    <Download className="mr-2 h-4 w-4" />
                    Export Compliance Report
                </Button>
                <Button variant="link">
                    View Audit Log
                </Button>
            </div>
        </div>
    );
}
