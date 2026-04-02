"use client";
import EmptyState from '@/components/ui/EmptyState';
import { UserPlus, Upload } from 'lucide-react';

function IllustrationEmployees() {
    return (
        <svg width="180" height="160" viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="90" cy="160" r="60" fill="#1A2A3A" opacity="0.5" />
            {/* Person 1 */}
            <circle cx="60" cy="70" r="20" fill="#1A2A3A" stroke="#2A3A4A" strokeWidth="2" />
            <circle cx="60" cy="64" r="9" fill="#334155" />
            <path d="M38 95 Q60 85 82 95 L82 110 Q60 105 38 110Z" fill="#1A2A3A" stroke="#2A3A4A" strokeWidth="1.5" />
            {/* Person 2 */}
            <circle cx="120" cy="70" r="20" fill="#1A2A3A" stroke="#2A3A4A" strokeWidth="2" />
            <circle cx="120" cy="64" r="9" fill="#334155" />
            <path d="M98 95 Q120 85 142 95 L142 110 Q120 105 98 110Z" fill="#1A2A3A" stroke="#2A3A4A" strokeWidth="1.5" />
            {/* Center dashed */}
            <circle cx="90" cy="70" r="26" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="82" y1="70" x2="98" y2="70" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="90" y1="62" x2="90" y2="78" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
    );
}

export default function NoEmployeesPage() {
    return (
        <EmptyState
            illustration={<IllustrationEmployees />}
            badge="Employee Directory"
            title="No employees onboarded yet"
            description="Your workforce is waiting to be built. Add your first employee or import an existing roster to get started with Kaarya."
            primaryAction={{ label: 'Add First Employee', href: '/employees/new', icon: <UserPlus size={16} /> }}
            secondaryAction={{ label: 'Bulk Import via CSV', href: '/settings/data/import', icon: <Upload size={16} /> }}
            tips={[
                'You can bulk import employees using a CSV file via Settings → Data Import.',
                'Set up your company profile and departments before adding employees.',
                'Invite employees via email — they can complete their own onboarding.',
            ]}
        />
    );
}
