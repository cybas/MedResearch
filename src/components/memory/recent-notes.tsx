'use client';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const recentNotes = [
    { id: 'mem1', title: 'Nanopolymer Carriers Improve Delivery...', note: 'Key takeaway: 35% improvement in intratumoral concentration is a significant step forward...', time: '3h ago' },
    { id: 'mem2', title: 'PEG-PLA Nanoparticle Doxorubicin vs...', note: 'Note to self: check primary completion date and compare against our own pipeline timelines.', time: '1d ago' },
    { id: 'mem4', title: 'Biodegradable Polymers for Targeted...', note: 'Excellent review. Need to extract the references on PLA-based systems for the project brief.', time: '2d ago' },
];

type RecentNotesProps = {
    onOpenItem: (id: string) => void;
}

export function RecentNotes({ onOpenItem }: RecentNotesProps) {
    return (
        <Card className="shadow-card">
            <CardHeader>
                <CardTitle className="text-xl">Recent Notes</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {recentNotes.map(note => (
                        <div key={note.id} className="cursor-pointer" onClick={() => onOpenItem(note.id)}>
                            <div className="flex items-start justify-between">
                                <p className="text-sm font-medium line-clamp-1 flex-1 pr-2">{note.title}</p>
                                <span className="text-xs text-muted-foreground whitespace-nowrap">{note.time}</span>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2 mt-1 border-l-2 pl-2">
                                {note.note}
                            </p>
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter>
                <Button variant="link" className="w-full">View all notes</Button>
            </CardFooter>
        </Card>
    );
}
