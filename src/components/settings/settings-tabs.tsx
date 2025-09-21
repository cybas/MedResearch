'use client';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { User, Building, Shield, Bell, Code, Palette, Database, Puzzle } from 'lucide-react';

const tabs = [
  { name: 'Profile', href: 'profile', icon: User },
  { name: 'Organization', href: 'org', icon: Building },
  { name: 'Roles & Permissions', href: 'roles', icon: Shield },
  { name: 'Notifications', href: 'notifications', icon: Bell },
  { name: 'API & Webhooks', href: 'api', icon: Code },
  { name: 'Appearance', href: 'appearance', icon: Palette },
  { name: 'Data & Privacy', href: 'data', icon: Database },
  { name: 'Integrations', href: 'integrations', icon: Puzzle },
];

export function SettingsTabs({ currentTab }: { currentTab: string }) {
  return (
    <div className="border-b">
      <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
        {tabs.map((tab) => (
          <Link
            key={tab.name}
            href={`/settings?tab=${tab.href}`}
            className={cn(
              'group inline-flex items-center gap-2 py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap',
              currentTab === tab.href
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
            )}
            aria-current={currentTab === tab.href ? 'page' : undefined}
          >
            <tab.icon className="w-4 h-4" />
            {tab.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
