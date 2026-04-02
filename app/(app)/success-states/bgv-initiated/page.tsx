"use client";
import SuccessState from '@/components/ui/SuccessState';
import { Search, History } from 'lucide-react';

export default function BgvInitiatedPage() {
    return (
        <SuccessState
            title="BGV Initiated Successfully"
            description="Background verification has been initiated with AuthBridge. The candidate will receive an email shortly with a secure link to upload their details."
            metrics={[
                { label: 'Candidate', value: 'EMP-1902' },
                { label: 'Vendor', value: 'AuthBridge' },
                { label: 'SLA Expected', value: '3-5 Days' }
            ]}
            primaryAction={{ label: 'Track BGV Status', href: '/bgv/dashboard', icon: <Search size={16} /> }}
            secondaryAction={{ label: 'Return to Offers', href: '/recruitment/offers', icon: <History size={16} /> }}
        />
    );
}
