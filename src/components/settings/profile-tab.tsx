'use client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export function ProfileTab() {
  return (
    <div className="grid gap-6">
        <Card>
            <CardHeader>
                <CardTitle>User Profile</CardTitle>
                <CardDescription>Manage your personal information and preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                        <Image src="https://picsum.photos/seed/user-avatar/80/80" alt="User avatar" data-ai-hint="person" width={80} height={80} />
                        <AvatarFallback>DR</AvatarFallback>
                    </Avatar>
                    <Button variant="outline">Upload new photo</Button>
                </div>
                 <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" defaultValue="Dr. Anita Rao" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" defaultValue="dr.rao@med.org" readOnly disabled />
                    </div>
                </div>
            </CardContent>
            <CardFooter className="justify-end">
                <Button>Save Profile</Button>
            </CardFooter>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>Manage your security settings.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">Security settings will be displayed here.</p>
            </CardContent>
        </Card>
    </div>
  );
}
