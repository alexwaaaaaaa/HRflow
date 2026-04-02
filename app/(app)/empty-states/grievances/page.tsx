"use client";
import EmptyState from '@/components/ui/EmptyState';
import { HandshakeIcon, MessageSquare } from 'lucide-react';

function IllustrationGrievances() {
    return (
        <svg width="180" height="160" viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Two hands shaking */}
            <path d="M25 90 Q50 70 80 80 L100 80 Q130 70 155 90" stroke="#1A2A3A" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M60 80 L90 60 L120 80" stroke="#1A2A3A" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="90" cy="58" r="22" fill="#0D1928" stroke="#1A2A3A" strokeWidth="2" />
            {/* Peace symbol - stylized */}
            <circle cx="90" cy="58" r="14" fill="none" stroke="#6366f1" strokeWidth="2" opacity="0.7" />
            <line x1="90" y1="44" x2="90" y2="72" stroke="#6366f1" strokeWidth="2" opacity="0.7" />
            <line x1="90" y1="58" x2="80" y2="70" stroke="#6366f1" strokeWidth="2" opacity="0.7" />
            <line x1="90" y1="58" x2="100" y2="70" stroke="#6366f1" strokeWidth="2" opacity="0.7" />
            {/* Ground */}
            <rect x="30" y="108" width="120" height="6" rx="3" fill="#0D1928" />
        </svg>
    );
}
export default function NoGrievancesPage() {
    return (
        <EmptyState
            illustration={<IllustrationGrievances />}
            badge="POSH & Grievances"
            badgeColor="emerald"
            title="Workplace harmony — no grievances!"
            description="Your team has a healthy, safe work environment. All POSH, workplace conflict, and employee grievance channels are active and ready if ever needed."
            primaryAction={{ label: 'View Grievance Policy', href: '/compliance/posh-report', icon: <HandshakeIcon size={16} /> }}
            secondaryAction={{ label: 'Raise a Concern', href: '/helpdesk/raise', icon: <MessageSquare size={16} /> }}
            tips={['Ensure your POSH policy and Internal Complaints Committee is visible to all employees.', 'Anonymous grievance reporting is available via the Employee Self-Service portal.', 'Kaarya maintains strict confidentiality for all POSH-related filings.']}
        />
    );
}
