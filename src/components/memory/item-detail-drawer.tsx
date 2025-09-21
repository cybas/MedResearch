'use client';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { SavedMemoryItem } from "@/lib/data";
import { BookOpen, Bot, Folder, MoreVertical, Pin } from "lucide-react";
import Image from "next/image";

type ItemDetailDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: SavedMemoryItem | null;
};


export function ItemDetailDrawer({ open, onOpenChange, item }: ItemDetailDrawerProps) {
  if (!item) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg p-0 flex flex-col">
        <SheetHeader className="p-6 pb-2 border-b text-left">
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-3">
                 <Image src={item.source.logoUrl} alt="" width={24} height={24} className="rounded-full" data-ai-hint={item.source.logoHint} />
                 <span className="text-sm font-medium">{item.source.name}</span>
                 <span className="text-sm text-muted-foreground">{item.savedDate}</span>
             </div>
             <div className="flex items-center">
                <Button variant="ghost" size="icon"><Pin className="w-4 h-4"/></Button>
                <Button variant="ghost" size="icon"><Folder className="w-4 h-4"/></Button>
                <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4"/></Button>
             </div>
          </div>
          <SheetTitle className="text-lg !mt-2">{item.title}</SheetTitle>
           <SheetDescription className="!mt-2">
                <Button variant="link" size="sm" asChild className="h-auto p-0">
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <BookOpen className="mr-1.5 h-3 w-3"/>
                        Open source
                    </a>
                </Button>
          </SheetDescription>
        </SheetHeader>
        
        <Tabs defaultValue="summary" className="flex-1 flex flex-col min-h-0">
            <TabsList className="mx-6 mt-4">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="abstract">Abstract</TabsTrigger>
                <TabsTrigger value="highlights">Highlights</TabsTrigger>
                <TabsTrigger value="citations">Citations</TabsTrigger>
            </TabsList>
            <ScrollArea className="flex-1">
                <div className="p-6 text-sm">
                    <TabsContent value="summary">
                        <p>{item.summary}</p>
                    </TabsContent>
                     <TabsContent value="notes">
                        <p>User notes will be displayed here.</p>
                    </TabsContent>
                    <TabsContent value="abstract">
                        <p>The abstract of the article would be shown here if available.</p>
                    </TabsContent>
                    <TabsContent value="highlights">
                        <p>Key highlights from the article would be listed here.</p>
                    </TabsContent>
                    <TabsContent value="citations">
                        <p>Citation information (DOI, BibTeX, etc.) would be available here.</p>
                    </TabsContent>
                </div>
            </ScrollArea>
        </Tabs>

        <SheetFooter className="p-4 border-t bg-background">
            <div className="w-full space-y-2">
                <Button className="w-full">
                    <Bot className="mr-2 h-4 w-4" />
                    Ask AI
                </Button>
                <p className="text-xs text-muted-foreground text-center px-2">
                    AI summaries are for informational purposes and are not a substitute for professional medical advice.
                </p>
            </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
