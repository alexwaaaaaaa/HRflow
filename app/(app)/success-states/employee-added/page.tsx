"use client";
import SuccessState from '@/components/ui/SuccessState';
import { UserPlus, Settings } from 'lucide-react';

export default function EmployeeAddedSuccessPage() {
    return (
        <SuccessState
            title="Employee successfully onboarded!"
            description="The new employee profile has been created and an invitation email has been sent. They can now log in and complete their profile."
            metrics={[
                { label: 'Employee ID', value: 'EMP-2094' },
                { label: 'Role', value: 'Software Engineer' },
                { label: 'Department', value: 'Engineering' }
            ]}
            primaryAction={{ label: 'Add Another Employee', href: '/employees/new', icon: <UserPlus size={16} /> }}
            secondaryAction={{ label: 'Assign IT Assets', href: '/it/assets/assign', icon: <Settings size={16} /> }}
        />
    );
}
