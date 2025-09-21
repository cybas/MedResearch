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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Info, PlusCircle, X } from "lucide-react";
import type { Keyword } from "@/lib/keywords-data";
import { allSources, synonymSuggestions } from "@/lib/keywords-data";
import { useEffect, useState } from "react";

type EditKeywordDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  keyword: Keyword | null;
  mode: 'new' | 'edit';
};

const defaultKeyword: Keyword = {
  id: '', label: '', match: 'phrase', group: 'Oncology', weight: 3, includePaywalled: false,
  sources: [], sourceScope: 'all', excludeSources: [], synonyms: [], stopwords: [],
  stats: { matches7d: 0, lastFetch: 'Never' }, status: 'active', language: ['English'],
  caseSensitive: false, alerts: { frequency: 'daily', threshold: 5, channels: { inApp: true } }
};

export function EditKeywordDrawer({ open, onOpenChange, keyword, mode }: EditKeywordDrawerProps) {
  const [localKeyword, setLocalKeyword] = useState<Keyword>(keyword || defaultKeyword);

  useEffect(() => {
    if (open) {
      setLocalKeyword(mode === 'edit' && keyword ? { ...keyword } : { ...defaultKeyword, id: `kw-${Date.now()}` });
    }
  }, [open, keyword, mode]);

  const handleValueChange = (field: keyof Keyword, value: any) => {
    setLocalKeyword(prev => ({ ...prev, [field]: value }));
  }

  const title = mode === 'edit' ? "Edit Keyword" : "Add New Keyword";
  const description = mode === 'edit' ? `Editing "${keyword?.label}"` : "Configure a new keyword to monitor.";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-[560px] p-0 flex flex-col">
        <SheetHeader className="p-6 border-b">
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        
        <Tabs defaultValue="basics" className="flex-1 flex flex-col min-h-0">
          <TabsList className="mx-6 mt-4">
            <TabsTrigger value="basics">Basics</TabsTrigger>
            <TabsTrigger value="sources">Sources</TabsTrigger>
            <TabsTrigger value="synonyms">Synonyms</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          <ScrollArea className="flex-1">
            <div className="p-6 space-y-6">
              <TabsContent value="basics" className="mt-0 space-y-6">
                <div>
                  <Label htmlFor="keyword-label">Keyword / Query</Label>
                  <Textarea id="keyword-label" value={localKeyword.label} onChange={e => handleValueChange('label', e.target.value)} placeholder="e.g., doxorubicin AND (nanopolymer OR nanoparticle)" />
                </div>
                <div>
                  <Label>Match Type</Label>
                  <RadioGroup value={localKeyword.match} onValueChange={(v) => handleValueChange('match', v)} className="mt-2 grid grid-cols-2 gap-2">
                    {['phrase', 'exact', 'boolean', 'semantic'].map(type => (
                      <Label key={type} className="flex items-center gap-2 border rounded-md p-2 hover:bg-secondary cursor-pointer [&:has([data-state=checked])]:border-primary">
                          <RadioGroupItem value={type} id={`match-${type}`}/>
                          <span className="capitalize">{type}</span>
                      </Label>
                    ))}
                  </RadioGroup>
                </div>
                {localKeyword.match === 'semantic' && (
                  <div>
                    <Label>Semantic Threshold</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        min={0.6} max={0.9} step={0.01}
                        value={[localKeyword.semanticThreshold || 0.78]}
                        onValueChange={v => handleValueChange('semanticThreshold', v[0])}
                      />
                      <span className="font-mono text-sm">{(localKeyword.semanticThreshold || 0.78).toFixed(2)}</span>
                    </div>
                  </div>
                )}
                 <div className="flex items-center justify-between">
                  <Label htmlFor="case-sensitive">Case-sensitive</Label>
                  <Switch id="case-sensitive" checked={localKeyword.caseSensitive} onCheckedChange={v => handleValueChange('caseSensitive', v)} />
                </div>
                <div>
                    <Label htmlFor="language">Language</Label>
                    <Select>
                        <SelectTrigger id="language"><SelectValue placeholder="Select languages..." /></SelectTrigger>
                        <SelectContent><SelectItem value="English">English</SelectItem></SelectContent>
                    </Select>
                </div>
                <div>
                  <Label>Weight</Label>
                  <Input type="number" min="1" max="5" value={localKeyword.weight} onChange={e => handleValueChange('weight', parseInt(e.target.value))} />
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1"><Info className="w-3 h-3"/> Higher weight ranks results higher in feeds.</p>
                </div>
                <div>
                    <Label htmlFor="group">Group</Label>
                    <Select value={localKeyword.group} onValueChange={v => handleValueChange('group', v)}>
                        <SelectTrigger id="group"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Oncology">Oncology</SelectItem>
                            <SelectItem value="Nanopolymers">Nanopolymers</SelectItem>
                            <SelectItem value="Clinical Trials">Clinical Trials</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="include-paywalled">Include paywalled results</Label>
                  <Switch id="include-paywalled" checked={localKeyword.includePaywalled} onCheckedChange={v => handleValueChange('includePaywalled', v)} />
                </div>
              </TabsContent>
              <TabsContent value="sources" className="mt-0 space-y-6">
                <div>
                    <Label>Scope</Label>
                    <RadioGroup defaultValue="all" className="mt-2">
                        <div className="flex items-center space-x-2"><RadioGroupItem value="all" id="scope-all" /><Label htmlFor="scope-all">All monitored sources</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="selected" id="scope-selected" /><Label htmlFor="scope-selected">Choose sources</Label></div>
                    </RadioGroup>
                </div>
                <div>
                    <Label>Sources</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {allSources.map(source => <Badge key={source} variant="secondary">{source}</Badge>)}
                        <Button variant="ghost" size="sm" className="h-auto"><PlusCircle className="mr-1.5 h-4 w-4" /> Add</Button>
                    </div>
                </div>
                <div>
                    <Label>Exclusions</Label>
                    <Input placeholder="Add domains or author IDs to exclude..." />
                </div>
              </TabsContent>
              <TabsContent value="synonyms" className="mt-0 space-y-6">
                 <div>
                    <Label>Smart Suggestions</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {synonymSuggestions.map(s => <Button key={s.term} variant="outline" size="sm">{s.term} ↔ {s.expansion}</Button>)}
                    </div>
                 </div>
                 <div>
                    <Label>Custom Synonyms</Label>
                    <div className="p-2 border rounded-md">
                        <div className="grid grid-cols-3 gap-2 text-sm font-medium px-2">
                            <span>Term</span><span>Expansions</span><span>Weight</span>
                        </div>
                        {/* Add table rows here */}
                        <Button variant="ghost" className="w-full mt-2"><PlusCircle className="mr-2 h-4 w-4"/>Add Synonym</Button>
                    </div>
                 </div>
              </TabsContent>
              <TabsContent value="alerts" className="mt-0 space-y-6">
                <div>
                    <Label>Frequency</Label>
                    <Select defaultValue="daily">
                        <SelectTrigger><SelectValue/></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="realtime">Realtime</SelectItem>
                            <SelectItem value="daily">Daily Digest</SelectItem>
                            <SelectItem value="weekly">Weekly Digest</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label>Trigger</Label>
                    <div className="flex items-center gap-2">
                        <span>Alert me when ≥</span>
                        <Input type="number" defaultValue={5} className="w-20" />
                        <span>new items are found.</span>
                    </div>
                </div>
                 <div>
                    <Label>Delivery</Label>
                    <div className="space-y-3">
                        <div className="flex items-center gap-2"><Switch defaultChecked/> In-app Notification</div>
                        <div className="flex items-center gap-2"><Switch/> Email Digest to <Input className="w-auto flex-1 ml-2" placeholder="dr.rao@med.org"/></div>
                        <div className="flex items-center gap-2"><Switch/> Webhook/Slack <Input className="w-auto flex-1 ml-2" placeholder="https://hooks.slack.com/..."/></div>
                    </div>
                </div>
              </TabsContent>
              <TabsContent value="advanced" className="mt-0 space-y-6">
                <div>
                    <Label>Stopwords/Exclusions</Label>
                    <Input placeholder="e.g., cosmetic, marketing" />
                    <p className="text-xs text-muted-foreground mt-1">Words to exclude from this specific query.</p>
                </div>
                <div>
                    <Label>Regex Pattern</Label>
                    <Input placeholder="Enter a valid regex pattern" />
                </div>
                 <div>
                    <Label>Auto-tag on match</Label>
                     <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="secondary">Oncology <button><X className="ml-1 h-3 w-3"/></button></Badge>
                        <Badge variant="secondary">Nanopolymers <button><X className="ml-1 h-3 w-3"/></button></Badge>
                        <Button variant="ghost" size="sm" className="h-auto"><PlusCircle className="mr-1.5 h-4 w-4" /> Add Tag</Button>
                    </div>
                </div>
              </TabsContent>
            </div>
          </ScrollArea>
        </Tabs>
        
        <SheetFooter className="p-4 border-t bg-background flex-row justify-between">
            <Button variant="outline">Test Query</Button>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button onClick={() => onOpenChange(false)}>Save</Button>
            </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
