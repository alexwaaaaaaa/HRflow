"use client";
import SuccessState from '@/components/ui/SuccessState';
import { Play, Download } from 'lucide-react';

export default function PayrollApprovedPage() {
    return (
        <SuccessState
            title="Payroll Approved"
            description="The payroll cycle for October 2024 has been successfully approved by the Finance Director. It is now queued for disbursement."
            metrics={[
                { label: 'Total Employees', value: '142' },
                { label: 'Net Pay', value: '₹ 84,50,000' },
                { label: 'TDS Deducted', value: '₹ 8,24,000' }
            ]}
            primaryAction={{ label: 'Run Disbursement', href: '/payroll/disburse', icon: <Play size={16} /> }}
            secondaryAction={{ label: 'Download Bank Advice', onClick: () => console.log('Download Bank Advice'), icon: <Download size={16} /> }}
        />
    );
}
