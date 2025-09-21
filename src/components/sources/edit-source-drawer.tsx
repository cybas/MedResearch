'use client';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetDescription,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Source } from "@/lib/sources-data";
import { useEffect, useState } from "react";

type EditSourceDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  source: Source | null;
  mode: 'new' | 'edit';
};

const defaultSource: Partial<Source> = {
  id: '', name: '', type: 'Journal', method: 'Crawler', schedule: 'Daily', status: 'Active',
};

export function EditSourceDrawer({ open, onOpenChange, source, mode }: EditSourceDrawerProps) {
  const [localSource, setLocalSource] = useState<Partial<Source>>(source || defaultSource);

  useEffect(() => {
    if (open) {
      setLocalSource(mode === 'edit' && source ? { ...source } : { ...defaultSource, id: `src-${Date.now()}` });
    }
  }, [open, source, mode]);

  const handleValueChange = (field: keyof Source, value: any) => {
    setLocalSource(prev => ({ ...prev, [field]: value }));
  }

  const title = mode === 'edit' ? "Edit Source" : "Add New Source";
  const description = mode === 'edit' ? `Editing "${source?.name}"` : "Configure a new source to monitor.";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg p-0 flex flex-col">
        <SheetHeader className="p-6 border-b">
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        
        <Tabs defaultValue="basics" className="flex-1 flex flex-col min-h-0">
          <TabsList className="mx-6 mt-4">
            <TabsTrigger value="basics">Basics</TabsTrigger>
            <TabsTrigger value="scope">Scope</TabsTrigger>
            <TabsTrigger value="crawl">Crawl</TabsTrigger>
            <TabsTrigger value="parsing">Parsing</TabsTrigger>
            <TabsTrigger value="auth">Auth</TabsTrigger>
            <TabsTrigger value="rules">Rules</TabsTrigger>
            <TabsTrigger value="test">Test</TabsTrigger>
          </TabsList>
          <ScrollArea className="flex-1">
            <div className="p-6 space-y-6">
              <TabsContent value="basics" className="mt-0 space-y-6">
                <div>
                  <Label>Source Type</Label>
                  <RadioGroup value={localSource.type} onValueChange={(v) => handleValueChange('type', v)} className="mt-2 grid grid-cols-3 gap-2">
                    {['Journal', 'Domain', 'Author', 'Feed', 'Trials'].map(type => (
                      <Label key={type} className="flex items-center gap-2 border rounded-md p-2 hover:bg-secondary cursor-pointer [&:has([data-state=checked])]:border-primary">
                          <RadioGroupItem value={type} id={`type-${type}`}/>
                          <span className="capitalize text-sm">{type}</span>
                      </Label>
                    ))}
                  </RadioGroup>
                </div>

                {localSource.type === 'Journal' && (
                    <div>
                        <Label>Journal Name</Label>
                        <Select>
                            <SelectTrigger><SelectValue placeholder="Select a journal..." /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="nejm">NEJM</SelectItem>
                                <SelectItem value="lancet">The Lancet</SelectItem>
                                <SelectItem value="nature">Nature Medicine</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                )}
                {localSource.type === 'Domain' && (
                    <div>
                        <Label>Domain URL</Label>
                        <Input placeholder="https://domain.tld" />
                    </div>
                )}
                {localSource.type === 'Author' && (
                    <div>
                        <Label>Author Name</Label>
                        <Input placeholder="Full name, e.g. 'Anita Rao'" />
                    </div>
                )}
                {localSource.type === 'Feed' && (
                     <div>
                        <Label>Feed URL</Label>
                        <Input placeholder="RSS/Atom feed URL" />
                    </div>
                )}
                {localSource.type === 'Trials' && (
                    <div className="p-4 border rounded-md bg-secondary/50">
                        <p className="font-medium text-sm">ClinicalTrials.gov Filter</p>
                        <p className="text-xs text-muted-foreground mt-1">Prebuilt filter builder for trials is coming soon.</p>
                    </div>
                )}
                 <div>
                    <Label>Method</Label>
                    <RadioGroup defaultValue="Crawler" className="mt-2 flex gap-4">
                        <div className="flex items-center space-x-2"><RadioGroupItem value="Crawler" id="crawler" /><Label htmlFor="crawler">Crawler</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="API" id="api" /><Label htmlFor="api">API</Label></div>
                    </RadioGroup>
                </div>
                 <div>
                    <Label>Status</Label>
                    <Select value={localSource.status} onValueChange={(v) => handleValueChange('status', v)}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Paused">Paused</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
              </TabsContent>
               <TabsContent value="scope" className="mt-0 space-y-6">
                <div>
                    <Label>Apply to Groups</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="secondary">Oncology</Badge>
                        <Badge variant="secondary">Nanopolymers</Badge>
                        <Badge>+ Add Group</Badge>
                    </div>
                </div>
                 <div>
                    <Label>Exclude Groups</Label>
                    <Input placeholder="Select groups to exclude..." />
                </div>
              </TabsContent>
              <TabsContent value="crawl" className="mt-0 space-y-6">
                 <div>
                    <Label>Schedule</Label>
                     <Select defaultValue="Daily">
                        <SelectTrigger><SelectValue/></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Realtime">Realtime</SelectItem>
                            <SelectItem value="Hourly">Hourly</SelectItem>
                             <SelectItem value="Daily">Daily</SelectItem>
                            <SelectItem value="Weekly">Weekly</SelectItem>
                            <SelectItem value="Paused">Paused</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="respect-robots">Respect robots.txt</Label>
                  <Switch id="respect-robots" defaultChecked />
                </div>
                 <div>
                    <Label>Include URL Patterns</Label>
                    <Input placeholder="/blog/.*" />
                </div>
                 <div>
                    <Label>Exclude URL Patterns</Label>
                    <Input placeholder="/careers/.*" />
                </div>
              </TabsContent>
              <TabsContent value="parsing" className="mt-0 space-y-6">
                  <div>
                      <Label>Content Types</Label>
                      <div className="flex gap-4 mt-2">
                        <div className="flex items-center gap-2"><Switch defaultChecked/> HTML</div>
                        <div className="flex items-center gap-2"><Switch defaultChecked/> PDF</div>
                        <div className="flex items-center gap-2"><Switch/> JSON</div>
                      </div>
                  </div>
                   <div className="flex items-center justify-between">
                        <Label>Detect Paywalls</Label>
                        <Switch defaultChecked />
                    </div>
              </TabsContent>
              <TabsContent value="auth" className="mt-0 space-y-6">
                <div>
                    <Label>Auth Method</Label>
                    <Select defaultValue="None">
                        <SelectTrigger><SelectValue/></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="None">None</SelectItem>
                            <SelectItem value="Login">Login Session</SelectItem>
                            <SelectItem value="API Key">API Key / Bearer</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
              </TabsContent>
              <TabsContent value="rules" className="mt-0 space-y-6">
                 <div>
                    <Label>Auto-tag items from this source</Label>
                    <Input placeholder="Add tags..." />
                 </div>
              </TabsContent>
               <TabsContent value="test" className="mt-0 space-y-6">
                <div className="p-4 border rounded-md bg-secondary/50">
                    <p className="font-medium text-sm">Test Results</p>
                    <p className="text-xs text-muted-foreground mt-2">Click "Run Test" to see sample results from this source.</p>
                </div>
                <Button>Run Test</Button>
              </TabsContent>
            </div>
          </ScrollArea>
        </Tabs>
        
        <SheetFooter className="p-4 border-t bg-background flex-row justify-end">
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button onClick={() => onOpenChange(false)}>Save</Button>
            </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
