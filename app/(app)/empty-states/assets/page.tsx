"use client";
import EmptyState from '@/components/ui/EmptyState';
import { Monitor, PlusCircle } from 'lucide-react';

function IllustrationAssets() {
    return (
        <svg width="180" height="160" viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="30" y="35" width="120" height="85" rx="8" fill="#0D1928" stroke="#1A2A3A" strokeWidth="2" />
            <rect x="40" y="45" width="100" height="65" rx="4" fill="#060D1A" />
            {/* Screen content placeholder */}
            <rect x="55" y="60" width="70" height="6" rx="3" fill="#1A2A3A" />
            <rect x="65" y="73" width="50" height="6" rx="3" fill="#1A2A3A" />
            <rect x="60" y="86" width="60" height="6" rx="3" fill="#1A2A3A" />
            {/* Stand */}
            <rect x="80" y="120" width="20" height="12" rx="2" fill="#131B2B" stroke="#1A2A3A" strokeWidth="1.5" />
            <rect x="65" y="132" width="50" height="8" rx="4" fill="#1A2A3A" />
            {/* Tag */}
            <rect x="125" y="28" width="32" height="20" rx="4" fill="#131B2B" stroke="#6366f1" strokeWidth="1.5" />
            <text x="128" y="42" fontSize="10" fill="#6366f1" fontWeight="bold">NEW</text>
        </svg>
    );
}
export default function NoAssetsPage() {
    return (
        <EmptyState
            illustration={<IllustrationAssets />}
            badge="IT Asset Management"
            badgeColor="sky"
            title="No assets assigned yet"
            description="Track every laptop, phone, badge and peripheral in your organisation. Assign assets to employees during onboarding and manage their lifecycle."
            primaryAction={{ label: 'Assign Asset', href: '/it/assets', icon: <PlusCircle size={16} /> }}
            secondaryAction={{ label: 'View Asset Register', href: '/it/assets', icon: <Monitor size={16} /> }}
            tips={['Automate asset assignment as part of the onboarding workflow.', 'Trigger asset retrieval checklists when an employee submits their resignation.', 'Track warranties and service schedules from the asset detail page.']}
        />
    );
}
