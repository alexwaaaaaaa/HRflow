"use client";
import SuccessState from '@/components/ui/SuccessState';
import { Share2, Download } from 'lucide-react';

export default function CertificateEarnedPage() {
    return (
        <SuccessState
            title="Certificate Unlocked"
            description="You are now a 'Kaarya Certified Payroll Expert'. This badge has been added to your internal profile and can be shared externally."
            metrics={[
                { label: 'Issued On', value: '12 Nov 2024' },
                { label: 'Valid Until', value: '12 Nov 2026' },
                { label: 'Credential ID', value: 'KRY-991A' }
            ]}
            primaryAction={{ label: 'Share to LinkedIn', onClick: () => console.log('Share LinkedIn'), icon: <Share2 size={16} /> }}
            secondaryAction={{ label: 'Download PDF', onClick: () => console.log('Download certificate'), icon: <Download size={16} /> }}
            confetti={true}
        />
    );
}
