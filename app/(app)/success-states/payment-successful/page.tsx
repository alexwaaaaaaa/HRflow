"use client";
import SuccessState from '@/components/ui/SuccessState';
import { CreditCard, FileText } from 'lucide-react';

export default function PaymentSuccessfulPage() {
    return (
        <SuccessState
            title="Payment Successful"
            description="Your subscription for Kaarya Enterprise (Annual) has been renewed. The invoice has been sent to your registered billing email."
            metrics={[
                { label: 'Amount Paid', value: '₹ 14,50,000' },
                { label: 'Transaction ID', value: 'PAY-8821AB' },
                { label: 'Next Due', value: '14 Nov 2025' }
            ]}
            primaryAction={{ label: 'View Billing Overview', href: '/settings/billing', icon: <CreditCard size={16} /> }}
            secondaryAction={{ label: 'Download Invoice', onClick: () => console.log('Download invoice'), icon: <FileText size={16} /> }}
            confetti={true}
        />
    );
}
