"use client";
import ErrorState from '@/components/ui/ErrorState';
import { CreditCard, History } from 'lucide-react';

export default function PaymentFailedPage() {
    return (
        <ErrorState
            colorScheme="red"
            illustration={
                <div className="text-red-500 mb-8 relative flex items-center justify-center">
                    <CreditCard size={80} strokeWidth={1} />
                    <div className="absolute w-full h-1 bg-red-500/80 rotate-45" />
                    <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl -z-10" />
                </div>
            }
            title="Payment Failed"
            description="Your recent transaction could not be processed. This might be due to insufficient funds, an expired card, or a bank decline."
            primaryAction={{ label: 'Update Billing Method', href: '/settings/billing', icon: <CreditCard size={16} /> }}
            secondaryAction={{ label: 'View Billing History', href: '/settings/billing/history', icon: <History size={16} /> }}
            technicalDetails="Stripe Charge ID: ch_1NjOpV2eZvKYlo2... Reason: 'do_not_honor'. Network status: decline. Please advise customer to contact issuing bank."
        />
    );
}
