'use client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export function ApiTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>API & Webhooks</CardTitle>
        <CardDescription>
          Manage API keys and configure webhooks for integrations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">API & Webhook settings will be displayed here.</p>
      </CardContent>
    </Card>
  );
}
