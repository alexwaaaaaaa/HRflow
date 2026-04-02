"use client";
import LoadingState from '@/components/ui/LoadingState';
import { ShieldCheck } from 'lucide-react';

export default function BgvRunningPage() {
    return (
        <LoadingState
            variant="ripple"
            colorScheme="emerald"
            icon={<ShieldCheck size={32} />}
            title="Verifying Background Data"
            description="Connecting with AuthBridge API to cross-reference employment history, academic records, and identity proofs."
        />
    );
}
