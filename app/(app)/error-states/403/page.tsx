"use client";
import ErrorState from '@/components/ui/ErrorState';
import { Lock, ArrowLeft } from 'lucide-react';

export default function ForbiddenErrorPage() {
    return (
        <ErrorState
            errorCode="403"
            colorScheme="red"
            title="Access Denied"
            description="You don't have the necessary permissions to view this module. If you believe this is a mistake, contact your system administrator."
            primaryAction={{ label: 'Request Access', onClick: () => console.log('Request access modal'), icon: <Lock size={16} /> }}
            secondaryAction={{ label: 'Go Back', onClick: () => window.history.back(), icon: <ArrowLeft size={16} /> }}
            technicalDetails="User RBAC Role: 'Employee'. Required ACL: ['hr_admin', 'payroll_admin']. Route middleware trigger: FORBIDDEN."
        />
    );
}
