"use client";
import EmptyState from '@/components/ui/EmptyState';
import { ShieldCheck, RefreshCw } from 'lucide-react';

function IllustrationCompliance() {
    return (
        <svg width="180" height="160" viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Shield */}
            <path d="M90 18 L145 42 L145 90 Q145 130 90 148 Q35 130 35 90 L35 42 Z" fill="#0D1928" stroke="#1A2A3A" strokeWidth="2" />
            <path d="M90 28 L135 48 L135 90 Q135 122 90 138 Q45 122 45 90 L45 48 Z" fill="#060D1A" stroke="#1A2A3A" strokeWidth="1.5" />
            {/* Check */}
            <path d="M68 88 L82 102 L112 72" stroke="#6366f1" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            {/* Stars */}
            <circle cx="150" cy="30" r="3" fill="#6366f1" opacity="0.8" />
            <circle cx="30" cy="120" r="2" fill="#a78bfa" opacity="0.6" />
            <circle cx="160" cy="100" r="2" fill="#6366f1" opacity="0.4" />
        </svg>
    );
}

export default function NoCompliancePage() {
    return (
        <EmptyState
            illustration={<IllustrationCompliance />}
            badge="Compliance"
            badgeColor="emerald"
            title="You're fully compliant — nothing due!"
            description="Zero pending statutory obligations. Your PF, ESIC, PT, TDS, and LWF filings are all up to date. Check back at the start of next month."
            primaryAction={{ label: 'View Compliance Calendar', href: '/compliance/calendar', icon: <ShieldCheck size={16} /> }}
            secondaryAction={{ label: 'Refresh Status', href: '/compliance', icon: <RefreshCw size={16} /> }}
            tips={[
                'Set up automated reminders for upcoming statutory due dates.',
                'Kaarya will alert you 15, 7 and 3 days before any compliance deadline.',
                'You can also export all filings for the year as a compliance report.',
            ]}
        />
    );
}
