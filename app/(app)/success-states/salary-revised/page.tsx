"use client";
import SuccessState from '@/components/ui/SuccessState';
import { FileText, UserCircle } from 'lucide-react';

export default function SalaryRevisedPage() {
    return (
        <SuccessState
            title="Salary Revised Successfully"
            description="The compensation structure for Anjali Sharma has been updated. The new CTC will be effective from the next payroll cycle."
            metrics={[
                { label: 'Previous CTC', value: '₹ 12,00,000' },
                { label: 'New CTC', value: '₹ 14,50,000' },
                { label: 'Effective Date', value: '01 Jan 2025' }
            ]}
            primaryAction={{ label: 'View Employee Profile', href: '/employees/1', icon: <UserCircle size={16} /> }}
            secondaryAction={{ label: 'Download Increment Letter', onClick: () => console.log('Download Letter'), icon: <FileText size={16} /> }}
            confetti={true}
        />
    );
}
