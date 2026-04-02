"use client";
import ErrorState from '@/components/ui/ErrorState';
import { Unplug, Settings } from 'lucide-react';

export default function IntegrationFailedPage() {
    return (
        <ErrorState
            colorScheme="amber"
            illustration={
                <div className="text-amber-500 mb-8 flex items-center justify-center relative">
                    <Unplug size={80} strokeWidth={1.5} />
                    <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-2xl -z-10" />
                </div>
            }
            title="Integration Sync Failed"
            description="Kaarya lost connection with a third-party application. The sync has been paused until the connection is re-authenticated."
            primaryAction={{ label: 'Re-authenticate App', href: '/settings/integrations', icon: <Settings size={16} /> }}
            technicalDetails="Provider: Google Workspace. Endpoint: /admin/directory/v1/users. Response 401 Unauthorized: Invalid Credentials. Access token expired and refresh token revoked."
        />
    );
}
