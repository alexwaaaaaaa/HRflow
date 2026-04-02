"use client";
import SuccessState from '@/components/ui/SuccessState';
import { TrendingUp, UserCheck } from 'lucide-react';

export default function CareerPathSetPage() {
    return (
        <SuccessState
            title="Career Matrix Active"
            description="The 'Engineering Individual Contributor (IC1-IC6)' career path has been finalised and published. Employees map now securely access their growth framework."
            metrics={[
                { label: 'Department', value: 'Engineering' },
                { label: 'Levels Mapped', value: '6 Levels' },
                { label: 'Skills Linked', value: '42 Core Skills' }
            ]}
            primaryAction={{ label: 'View Employee Mapping', href: '/performance/competency', icon: <UserCheck size={16} /> }}
            secondaryAction={{ label: 'Create Another Path', href: '/performance/career-path', icon: <TrendingUp size={16} /> }}
        />
    );
}
