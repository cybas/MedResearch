'use client';
import { useSearchParams } from 'next/navigation';
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SettingsHeader } from '@/components/settings/settings-header';
import { SettingsTabs } from '@/components/settings/settings-tabs';
import { ProfileTab } from '@/components/settings/profile-tab';
import { OrganizationTab } from '@/components/settings/organization-tab';
import { RolesTab } from '@/components/settings/roles-tab';
import { NotificationsTab } from '@/components/settings/notifications-tab';
import { ApiTab } from '@/components/settings/api-tab';
import { AppearanceTab } from '@/components/settings/appearance-tab';
import { DataTab } from '@/components/settings/data-tab';
import { IntegrationsTab } from '@/components/settings/integrations-tab';

export default function SettingsPage() {
    const searchParams = useSearchParams();
    const currentTab = searchParams.get('tab') || 'profile';

    return (
        <>
            <Breadcrumbs items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Settings' }]} />
            <main className="py-8">
                <SettingsHeader />
                <div className="mt-8">
                    <SettingsTabs currentTab={currentTab} />
                    <div className="mt-6">
                        {currentTab === 'profile' && <ProfileTab />}
                        {currentTab === 'org' && <OrganizationTab />}
                        {currentTab === 'roles' && <RolesTab />}
                        {currentTab === 'notifications' && <NotificationsTab />}
                        {currentTab === 'api' && <ApiTab />}
                        {currentTab === 'appearance' && <AppearanceTab />}
                        {currentTab === 'data' && <DataTab />}
                        {currentTab === 'integrations' && <IntegrationsTab />}
                    </div>
                </div>
            </main>
        </>
    );
}
