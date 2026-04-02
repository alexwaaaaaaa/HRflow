"use client";
import SuccessState from '@/components/ui/SuccessState';
import { ShieldCheck, Activity } from 'lucide-react';

export default function FinancialWellnessEnrolledPage() {
    return (
        <SuccessState
            title="Enrollment Successful"
            description="You are successfully enrolled in the 'Kaarya Health & Financial Wellness' program. Your comprehensive insurance policy and tele-consultation access is now active."
            metrics={[
                { label: 'Plan Level', value: 'Gold Tier' },
                { label: 'Coverage', value: 'Self + Spouse' },
                { label: 'Start Date', value: '01 Dec 2024' }
            ]}
            primaryAction={{ label: 'View E-Card', onClick: () => console.log('View E-Cared'), icon: <ShieldCheck size={16} /> }}
            secondaryAction={{ label: 'Explore Benefits', href: '/finance/wellness', icon: <Activity size={16} /> }}
            confetti={true}
        />
    );
}
