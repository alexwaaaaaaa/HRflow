"use client";
import LoadingState from '@/components/ui/LoadingState';
import { RefreshCcw } from 'lucide-react';

export default function IntegrationSyncPage() {
    return (
        <LoadingState
            variant="spinner"
            colorScheme="sky"
            icon={<RefreshCcw size={24} />}
            title="Syncing with Slack"
            description="Updating organizational chart and provisioning Slack channels for the newly onboarded batch of 12 employees."
        />
    );
}
