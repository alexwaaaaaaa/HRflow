"use client";
import EmptyState from '@/components/ui/EmptyState';
import { ScanSearch, PlusCircle } from 'lucide-react';

function IllustrationBGV() {
    return (
        <svg width="180" height="160" viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="80" cy="75" r="48" fill="#0D1928" stroke="#1A2A3A" strokeWidth="2" />
            <circle cx="80" cy="75" r="35" fill="#060D1A" stroke="#1A2A3A" strokeWidth="1.5" />
            {/* Person */}
            <circle cx="80" cy="65" r="12" fill="#131B2B" />
            <path d="M58 90 Q80 80 102 90 L102 100 Q80 96 58 100Z" fill="#131B2B" />
            {/* Magnifier handle */}
            <line x1="118" y1="113" x2="145" y2="140" stroke="#6366f1" strokeWidth="5" strokeLinecap="round" />
            <circle cx="80" cy="75" r="48" fill="none" stroke="#6366f1" strokeWidth="2" opacity="0.4" />
        </svg>
    );
}
export default function NoBGVPage() {
    return (
        <EmptyState
            illustration={<IllustrationBGV />}
            badge="Background Verification"
            badgeColor="rose"
            title="No BGV checks initiated yet"
            description="Protect your organisation with thorough background checks. Initiate verification for new hires directly from the recruitment offer or from the BGV module."
            primaryAction={{ label: 'Initiate BGV', href: '/bgv/dashboard', icon: <PlusCircle size={16} /> }}
            secondaryAction={{ label: 'View BGV Vendors', href: '/bgv/vendors', icon: <ScanSearch size={16} /> }}
            tips={['Connect with AuthBridge, IDfy, or Springverify for automated BGV workflows.', 'Trigger BGV automatically when a candidate accepts an offer letter.', 'Track verification status in real-time from the BGV Status Tracker.']}
        />
    );
}
