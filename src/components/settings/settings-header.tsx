'use client';
import { Button } from "@/components/ui/button";

export function SettingsHeader() {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground mt-1">
                    Profile, organization, roles, alerts, API, and data controls.
                </p>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="secondary">Reset Changes</Button>
                <Button disabled>Save All</Button>
            </div>
        </div>
    );
}
