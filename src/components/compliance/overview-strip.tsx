'use client';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const kpis = [
    { label: 'HIPAA', value: 'Ready', variant: 'secondary' as const, color: 'bg-green-500' },
    { label: 'GDPR', value: 'Ready', variant: 'secondary' as const, color: 'bg-green-500' },
    { label: 'Data Residency', value: 'Regional', tooltip: 'Data is processed and stored in your selected region (India). Change this in Settings.' },
    { label: 'Encryption', value: 'At Rest & In Transit' },
];

export function OverviewStrip() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {kpis.map(kpi => (
                <Card key={kpi.label} className="shadow-card">
                    <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground">{kpi.label}</p>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="text-lg font-semibold mt-1 flex items-center gap-2">
                                        {kpi.variant ? (
                                             <Badge variant={kpi.variant} className="flex items-center gap-1.5 !text-base !font-semibold px-2 py-0.5">
                                                <span className={`w-2 h-2 rounded-full ${kpi.color}`}></span>
                                                {kpi.value}
                                            </Badge>
                                        ) : (
                                            <span>{kpi.value}</span>
                                        )}
                                    </div>
                                </TooltipTrigger>
                                {kpi.tooltip && <TooltipContent><p>{kpi.tooltip}</p></TooltipContent>}
                            </Tooltip>
                        </TooltipProvider>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
