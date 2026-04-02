"use client";
import SuccessState from '@/components/ui/SuccessState';
import { Gift, CalendarHeart } from 'lucide-react';

export default function LifeEventUpdatedPage() {
    return (
        <SuccessState
            title="Life Event Added Successfully"
            description="Your life event 'New Arrival - Baby Girl' has been added to your profile and shared on the company celebration board. Congratulations!"
            metrics={[
                { label: 'Event Type', value: 'Birth / Adoption' },
                { label: 'Date', value: '14 Nov 2024' },
                { label: 'Visibility', value: 'Company Wide' }
            ]}
            primaryAction={{ label: 'View Announcement', href: '/engagement/rr/anniversary', icon: <CalendarHeart size={16} /> }}
            secondaryAction={{ label: 'Claim Gift Voucher', onClick: () => console.log('Claim gift'), icon: <Gift size={16} /> }}
            confetti={true}
        />
    );
}
