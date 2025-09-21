'use client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export function DataTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Data & Privacy</CardTitle>
        <CardDescription>
          Manage data retention, exports, and legal documents.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Data & Privacy settings will be displayed here.</p>
      </CardContent>
    </Card>
  );
}
