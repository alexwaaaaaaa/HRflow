"use client";
import SuccessState from '@/components/ui/SuccessState';
import { Download, Calendar } from 'lucide-react';

export default function ComplianceFiledPage() {
    return (
        <SuccessState
            title="EPFO Returns Filed Successfully"
            description="Your Electronic Challan Cum Return (ECR) for the current month has been successfully uploaded to the unified portal and verified."
            metrics={[
                { label: 'TRRN Number', value: '1102430091823' },
                { label: 'Amount Remitted', value: '₹ 4,12,050' },
                { label: 'Filing Date', value: '12 Nov 2024' }
            ]}
            primaryAction={{ label: 'Download Acknowledgment', onClick: () => console.log('Download PDF'), icon: <Download size={16} /> }}
            secondaryAction={{ label: 'View Calendar', href: '/compliance/calendar', icon: <Calendar size={16} /> }}
            confetti={false}
        />
    );
}
