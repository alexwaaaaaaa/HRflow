"use client";
import SuccessState from '@/components/ui/SuccessState';
import { Heart, Activity } from 'lucide-react';

export default function RecognitionSentPage() {
    return (
        <SuccessState
            title="Kudos Sent Successfully!"
            description="Your spot recognition for Anita Desai has been published to the company feed. 500 Kaarya Points have been credited to her reward wallet."
            metrics={[
                { label: 'Recipient', value: 'Anita Desai' },
                { label: 'Points Sent', value: '500 pts' },
                { label: 'Category', value: 'Customer Obsession' }
            ]}
            primaryAction={{ label: 'View R&R Feed', href: '/engagement/rr/feed', icon: <Activity size={16} /> }}
            secondaryAction={{ label: 'Send Another Kudos', href: '/engagement/rr/give', icon: <Heart size={16} /> }}
            confetti={true}
        />
    );
}
