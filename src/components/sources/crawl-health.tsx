'use client';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts";
import { crawlHealthData } from "@/lib/sources-data";

const chartConfig = {
  API: {
    label: 'API',
    color: 'hsl(var(--chart-1))',
  },
  Crawler: {
    label: 'Crawler',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function CrawlHealth() {
    return (
        <Card className="shadow-card">
            <CardHeader>
                <CardTitle className="text-xl">Crawl Health</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                    {crawlHealthData.kpis.map(kpi => (
                        <div key={kpi.name}>
                            <p className="text-muted-foreground">{kpi.name}</p>
                            <p className="font-semibold text-lg">{kpi.value}</p>
                        </div>
                    ))}
                </div>
                <div className="h-[150px] w-full">
                    <ChartContainer config={chartConfig} className="w-full h-full">
                        <AreaChart 
                            data={crawlHealthData.chartData} 
                            margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
                            accessibilityLayer
                        >
                            <defs>
                                <linearGradient id="colorApi" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--color-API)" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="var(--color-API)" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorCrawler" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--color-Crawler)" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="var(--color-Crawler)" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                            <ChartTooltip 
                                content={<ChartTooltipContent indicator="dot" />} 
                                cursor={false} 
                            />
                            <Legend 
                                verticalAlign="top" 
                                align="right" 
                                iconType="circle" 
                                wrapperStyle={{ fontSize: '12px', paddingBottom: '16px' }}
                            />
                            <Area type="monotone" dataKey="API" stroke="var(--color-API)" fill="url(#colorApi)" />
                            <Area type="monotone" dataKey="Crawler" stroke="var(--color-Crawler)" fill="url(#colorCrawler)" />
                        </AreaChart>
                    </ChartContainer>
                </div>
            </CardContent>
        </Card>
    );
}
