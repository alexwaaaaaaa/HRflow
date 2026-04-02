"use client";
import SuccessState from '@/components/ui/SuccessState';
import { FolderCheck, Send } from 'lucide-react';

export default function FnFSettledPage() {
    return (
        <SuccessState
            title="FnF Settled Successfully"
            description="The Full & Final settlement for Employee EMP-1032 has been processed. Access rights have been revoked and the relieving letter is ready."
            metrics={[
                { label: 'Net Payable', value: '₹ 1,24,500' },
                { label: 'Notice Recovery', value: '₹ 0' },
                { label: 'Leaves Encashed', value: '12 Days' }
            ]}
            primaryAction={{ label: 'Email Relieving Letter', onClick: () => console.log('Send letter'), icon: <Send size={16} /> }}
            secondaryAction={{ label: 'View Settlement Archive', href: '/fnf/archive', icon: <FolderCheck size={16} /> }}
        />
    );
}
