'use client';
import {
    Sidebar,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel
} from "@/components/ui/sidebar";
import { Dna, Home, Tag, Book, Bell, FolderHeart, ShieldCheck, Settings, ChevronsRight } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const menuItems = [
    {
        group: "Main",
        items: [
            { href: "/dashboard", icon: Home, label: "Dashboard" },
            { href: "/keywords", icon: Tag, label: "Keywords" },
            { href: "/sources", icon: Book, label: "Sources" },
            { href: "/updates", icon: Bell, label: "Updates" },
            { href: "/memory", icon: FolderHeart, label: "Memory" },
        ]
    },
    {
        group: "General",
        items: [
            { href: "/compliance", icon: ShieldCheck, label: "Compliance" },
            { href: "/settings", icon: Settings, label: "Settings" },
        ]
    }
];

export function AppSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar variant="sidebar" collapsible="icon" side="left" className="border-r border-border/50"
            style={{ '--sidebar-width': '260px' } as React.CSSProperties}
        >
            <SidebarHeader>
                <div className="flex items-center gap-2 p-2">
                    <Dna className="text-primary w-8 h-8" />
                    <span className="text-xl font-semibold text-foreground">MedResearchAI</span>
                </div>
            </SidebarHeader>

            {menuItems.map((group) => (
                <SidebarGroup key={group.group}>
                    <SidebarGroupLabel>{group.group}</SidebarGroupLabel>
                    <SidebarMenu>
                        {group.items.map((item) => (
                            <SidebarMenuItem key={item.label}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={pathname === item.href}
                                    tooltip={item.label}
                                >
                                    <Link href={item.href}>
                                        <item.icon />
                                        <span>{item.label}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            ))}

            <SidebarFooter className="mt-auto">
                 <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Collapse">
                            <ChevronsRight />
                            <span>Collapse</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                 </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
