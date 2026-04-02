"use client";
import SuccessState from '@/components/ui/SuccessState';
import { MailCheck, Users } from 'lucide-react';

export default function OfferLetterSentPage() {
    return (
        <SuccessState
            title="Offer Letter Dispatched"
            description="An offer letter for the role of Product Manager has been emailed to Rohan Gupta via DocuSign. We'll notify you once it’s viewed and signed."
            metrics={[
                { label: 'Candidate', value: 'Rohan Gupta' },
                { label: 'Offered CTC', value: '₹ 24,00,000' },
                { label: 'Joining Date', value: '15 Dec 2024' }
            ]}
            primaryAction={{ label: 'Track Offer Status', href: '/recruitment/offers', icon: <MailCheck size={16} /> }}
            secondaryAction={{ label: 'Return to candidates', href: '/recruitment', icon: <Users size={16} /> }}
            confetti={true}
        />
    );
}
