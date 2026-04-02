"use client";
import SuccessState from '@/components/ui/SuccessState';
import { Wallet, Landmark } from 'lucide-react';

export default function EwaDisbursedPage() {
    return (
        <SuccessState
            title="EWA Salary Advanced"
            description="Your Earned Wage Access request has been approved and instantly disbursed. The funds should reflect in your salary account within 30 minutes via IMPS."
            metrics={[
                { label: 'Amount Approved', value: '₹ 15,000' },
                { label: 'Transaction Fee', value: '₹ 0 (Waived)' },
                { label: 'Deduction Date', value: 'Next Payroll' }
            ]}
            primaryAction={{ label: 'View Bank Details', href: '/employees/me/finances', icon: <Landmark size={16} /> }}
            secondaryAction={{ label: 'Return to EWA Dashboard', href: '/finance/ewa', icon: <Wallet size={16} /> }}
            confetti={false}
        />
    );
}
