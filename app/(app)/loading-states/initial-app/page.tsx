"use client";
import LoadingState from '@/components/ui/LoadingState';
import { Layers } from 'lucide-react';

export default function InitialLoadingPage() {
    return (
        <LoadingState
            variant="ripple"
            colorScheme="indigo"
            icon={<Layers size={32} />}
            title="Starting Kaarya OS..."
            description="Securely connecting to your organizational workspace and establishing an encrypted session."
            estimatedTimeLeft="~2 seconds"
        />
    );
}
