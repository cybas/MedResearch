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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Article } from "@/lib/data";
import { BookOpen, Send, Paperclip, Bot } from "lucide-react";
import Image from "next/image";

type AskAiDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  article: Article | null;
};

const quickPrompts = [
    "Summarize methodology",
    "Compare with similar items in Memory",
    "List clinical endpoints",
    "Risks and contraindications",
];

export function AskAiDrawer({ open, onOpenChange, article }: AskAiDrawerProps) {
  if (!article) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg p-0 flex flex-col">
        <SheetHeader className="p-6 border-b text-left">
          <SheetTitle className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-primary" />
            Ask AI
          </SheetTitle>
           <SheetDescription className="!mt-4">
             <div className="flex items-start gap-3">
                 <Image src={article.source.logoUrl} alt="" width={24} height={24} className="rounded-full mt-0.5" data-ai-hint={article.source.logoHint} />
                 <div>
                    <p className="font-semibold text-foreground line-clamp-2">{article.title}</p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{article.summary}</p>
                    <Button variant="link" size="sm" asChild className="h-auto p-0 mt-2">
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <BookOpen className="mr-1.5 h-3 w-3"/>
                            Open source
                        </a>
                    </Button>
                 </div>
             </div>
          </SheetDescription>
        </SheetHeader>
        
        <ScrollArea className="flex-1">
            <div className="p-6 text-sm space-y-4">
                <div className="p-3 bg-secondary rounded-lg">
                    <p className="font-medium">Quick Prompts:</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {quickPrompts.map(prompt => (
                            <Button key={prompt} variant="outline" size="sm" className="h-auto py-1 px-2.5 text-xs">{prompt}</Button>
                        ))}
                    </div>
                </div>

                <div className="bg-blue-500/10 p-3 rounded-lg text-blue-800 dark:text-blue-200">
                    <p className="font-medium">AI has access to the article text/abstract and your Memory.</p>
                </div>

                 <div className="flex gap-3">
                    <Avatar>
                        <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <div className="bg-secondary p-3 rounded-lg rounded-tl-none">
                        <p>Hello Dr. Rao! How can I help you with this article on <span className="font-semibold">Nanopolymer Carriers</span>?</p>
                    </div>
                </div>
            </div>
        </ScrollArea>
        
        <SheetFooter className="p-4 border-t bg-background">
            <div className="relative w-full">
                <Input placeholder="Ask a follow-up question..." className="pr-20" />
                <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center">
                    <Button variant="ghost" size="icon" aria-label="Attach file">
                        <Paperclip className="h-4 w-4" />
                    </Button>
                     <Button type="submit" size="icon" aria-label="Send message">
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2 px-2">
                AI summaries are for informational purposes and are not a substitute for professional medical advice.
            </p>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

// Dummy Avatar component for the chat UI
const Avatar = ({children}: {children: React.ReactNode}) => (
    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm shrink-0">
        {children}
    </div>
)
const AvatarFallback = ({children}: {children: React.ReactNode}) => <>{children}</>
