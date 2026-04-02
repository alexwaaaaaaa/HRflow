"use client";
import EmptyState from '@/components/ui/EmptyState';
import { Target, PlusCircle } from 'lucide-react';

function IllustrationOKR() {
    return (
        <svg width="180" height="160" viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Concentric circles (target) */}
            <circle cx="90" cy="80" r="62" fill="#060D1A" stroke="#1A2A3A" strokeWidth="1.5" />
            <circle cx="90" cy="80" r="46" fill="#060D1A" stroke="#1A2A3A" strokeWidth="1.5" />
            <circle cx="90" cy="80" r="30" fill="#060D1A" stroke="#1A2A3A" strokeWidth="1.5" />
            <circle cx="90" cy="80" r="14" fill="#6366f1" opacity="0.2" stroke="#6366f1" strokeWidth="1.5" />
            {/* Arrow */}
            <line x1="150" y1="20" x2="92" y2="78" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M150 20 L138 26 L144 38 Z" fill="#6366f1" opacity="0.8" />
            {/* Dashed progress marks */}
            <circle cx="90" cy="80" r="5" fill="#6366f1" />
        </svg>
    );
}

export default function NoOKRsPage() {
    return (
        <EmptyState
            illustration={<IllustrationOKR />}
            badge="OKRs & Goals"
            badgeColor="rose"
            title="No OKRs defined yet"
            description="Great companies run on clear goals. Set company-level objectives, cascade them to teams and individuals, and track progress in real time."
            primaryAction={{ label: 'Create First OKR', href: '/okr/create', icon: <PlusCircle size={16} /> }}
            secondaryAction={{ label: 'View Company OKRs', href: '/okr/company', icon: <Target size={16} /> }}
            tips={[
                'Start with 3-5 company-level objectives per quarter.',
                'Cascade company OKRs to departments, then to individual contributors.',
                'Set weekly check-in reminders to keep teams on track.',
            ]}
        />
    );
}
