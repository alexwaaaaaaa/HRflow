"use client";
import ErrorState from '@/components/ui/ErrorState';
import { ShieldAlert, Users } from 'lucide-react';

export default function PermissionDeniedPage() {
    return (
        <ErrorState
            colorScheme="red"
            illustration={
                <div className="text-red-500 mb-8 relative flex items-center justify-center">
                    <ShieldAlert size={80} strokeWidth={1} />
                    <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl -z-10" />
                </div>
            }
            title="Permission Denied"
            description="You don't have the required role or department access to perform this specific action or view this specific record."
            primaryAction={{ label: 'Request Escalation', onClick: () => console.log('Escalate'), icon: <ShieldAlert size={16} /> }}
            secondaryAction={{ label: 'View My Roles', href: '/settings/roles', icon: <Users size={16} /> }}
            technicalDetails="Action: 'salary_component.update'. Resource ID: 'SC_1042'. User Roles: ['HR_Generalist']. Required Policy: Effect='Allow', Action='salary_component.*'."
        />
    );
}
