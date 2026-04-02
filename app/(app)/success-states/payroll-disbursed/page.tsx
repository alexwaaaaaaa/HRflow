"use client";
import SuccessState from '@/components/ui/SuccessState';
import { FileText, PieChart } from 'lucide-react';

export default function PayrollDisbursedPage() {
    return (
        <SuccessState
            title="Salary Disbursement Complete"
            description="Integration with your corporate banking partner completed successfully. Funds have been initiated for transfer and salary slips have been emailed to all 142 employees."
            metrics={[
                { label: 'Transaction ID', value: 'TXN-998271A' },
                { label: 'Success Rate', value: '100%' },
                { label: 'Emails Sent', value: '142 / 142' }
            ]}
            primaryAction={{ label: 'View Payroll Register', href: '/payroll/reports', icon: <FileText size={16} /> }}
            secondaryAction={{ label: 'View Analytics', href: '/payroll/dashboard', icon: <PieChart size={16} /> }}
            confetti={true}
        />
    );
}
