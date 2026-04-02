"use client";
import EmptyState from '@/components/ui/EmptyState';
import { PlusCircle, Calendar } from 'lucide-react';

function IllustrationLeave() {
    return (
        <svg width="180" height="160" viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="30" y="25" width="120" height="110" rx="12" fill="#0D1928" stroke="#1A2A3A" strokeWidth="2" />
            <rect x="30" y="25" width="120" height="32" rx="12" fill="#1A2A3A" />
            <rect x="30" y="45" width="120" height="12" fill="#1A2A3A" />
            <circle cx="55" cy="20" r="6" fill="#0D1928" stroke="#6366f1" strokeWidth="2.5" />
            <circle cx="125" cy="20" r="6" fill="#0D1928" stroke="#6366f1" strokeWidth="2.5" />
            {/* Grid lines */}
            {[0, 1, 2, 3].map(col => [0, 1, 2].map(row => (
                <rect key={`${col}-${row}`} x={45 + col * 26} y={72 + row * 22} width="16" height="14" rx="4" fill="#131B2B" stroke="#1A2A3A" strokeWidth="1" />
            )))}
            {/* One highlighted cell */}
            <rect x="97" y="94" width="16" height="14" rx="4" fill="#6366f1" opacity="0.4" stroke="#6366f1" strokeWidth="1" />
            {/* Calendar icon in center */}
            <circle cx="90" cy="95" r="28" fill="#060D1A" opacity="0.6" />
            <text x="78" y="102" fontSize="24" fill="#334155">📅</text>
        </svg>
    );
}

export default function NoLeaveApplicationsPage() {
    return (
        <EmptyState
            illustration={<IllustrationLeave />}
            badge="Leave Management"
            badgeColor="sky"
            title="No leave applications yet"
            description="All hands on deck! No leave requests have been submitted. You can apply for leave or configure your leave policies and types for this calendar year."
            primaryAction={{ label: 'Apply for Leave', href: '/my-leave', icon: <PlusCircle size={16} /> }}
            secondaryAction={{ label: 'Configure Leave Types', href: '/leave/dashboard', icon: <Calendar size={16} /> }}
            tips={[
                'Set up leave types (Annual, Sick, Casual) and allocate balances at the start of the year.',
                'Enable auto-approval for leaves below a threshold to reduce manager workload.',
                'Connect leave calendar with Google/Outlook for team visibility.',
            ]}
        />
    );
}
