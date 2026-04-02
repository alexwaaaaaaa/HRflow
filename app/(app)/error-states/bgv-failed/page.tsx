"use client";
import ErrorState from '@/components/ui/ErrorState';
import { UserX, Search } from 'lucide-react';

export default function BgvFailedPage() {
    return (
        <ErrorState
            colorScheme="red"
            illustration={
                <div className="text-red-500 mb-8 relative flex flex-col items-center justify-center">
                    <UserX size={80} strokeWidth={1.5} />
                    <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl -z-10" />
                </div>
            }
            title="BGV Verification Failed"
            description="The background verification vendor returned a 'Red' status for this candidate. Discrepancies were found in their employment history or criminal record."
            primaryAction={{ label: 'View BGV Report', href: '/bgv/reports/123', icon: <Search size={16} /> }}
            secondaryAction={{ label: 'Withdraw Offer', onClick: () => console.log('Withdraw'), icon: <UserX size={16} /> }}
            technicalDetails="Vendor: AuthBridge. CaseID: VFN_88912. Discrepancy Type: 'Major'. Field: 'Employment Tenure - Previous Employer'. Status: RED."
        />
    );
}
