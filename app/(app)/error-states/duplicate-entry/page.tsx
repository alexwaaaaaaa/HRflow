"use client";
import ErrorState from '@/components/ui/ErrorState';
import { CopyX, Edit3 } from 'lucide-react';

export default function DuplicateEntryPage() {
    return (
        <ErrorState
            colorScheme="red"
            illustration={
                <div className="text-red-500 mb-8 flex flex-col items-center justify-center gap-1">
                    <div className="flex -space-x-4">
                        <div className="w-16 h-20 border-2 border-red-500 rounded flex items-center justify-center bg-red-500/10">ID</div>
                        <div className="w-16 h-20 border-2 border-red-500 rounded flex items-center justify-center bg-red-500/20 shadow-[-5px_0_15px_-5px_rgba(239,68,68,0.5)]">ID</div>
                    </div>
                </div>
            }
            title="Duplicate Entry Found"
            description="A record with this identifier already exists in the system. Employee codes, email addresses, and tax IDs must be completely unique."
            primaryAction={{ label: 'Edit Current Entry', onClick: () => window.history.back(), icon: <Edit3 size={16} /> }}
            secondaryAction={{ label: 'View Existing Record', onClick: () => console.log('Go to existing'), icon: <CopyX size={16} /> }}
            technicalDetails="SQL Error: 23505 (UniqueViolation). Detail: Key (email)=('test@example.com') already exists. Constraint: pk_employee_email."
        />
    );
}
