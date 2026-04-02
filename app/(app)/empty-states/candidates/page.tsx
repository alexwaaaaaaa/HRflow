"use client";
import EmptyState from '@/components/ui/EmptyState';
import { UserSearch, PlusCircle } from 'lucide-react';

function IllustrationCandidates() {
    return (
        <svg width="180" height="160" viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Funnel */}
            <path d="M25 25 L155 25 L115 75 L115 140 L65 140 L65 75 Z" fill="#0D1928" stroke="#1A2A3A" strokeWidth="2" />
            <line x1="25" y1="45" x2="155" y2="45" stroke="#1A2A3A" strokeWidth="1.5" strokeDasharray="5 4" />
            <line x1="42" y1="65" x2="138" y2="65" stroke="#1A2A3A" strokeWidth="1.5" strokeDasharray="5 4" />
            {/* Person silhouettes (empty) */}
            <circle cx="90" cy="108" r="12" fill="#131B2B" stroke="#2A3A4A" strokeWidth="1.5" strokeDasharray="3 2" />
            <path d="M75 130 Q90 125 105 130" stroke="#2A3A4A" strokeWidth="1.5" fill="none" strokeDasharray="3 2" />
            {/* Magnifier */}
            <circle cx="138" cy="38" r="10" fill="none" stroke="#6366f1" strokeWidth="2" />
            <line x1="145" y1="45" x2="153" y2="53" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
    );
}
export default function NoCandidatesPage() {
    return (
        <EmptyState
            illustration={<IllustrationCandidates />}
            badge="Recruitment (ATS)"
            badgeColor="violet"
            title="Candidate pipeline is empty"
            description="Your talent acquisition engine is ready to fire. Create your first job opening, publish it to job boards, and start building your candidate funnel."
            primaryAction={{ label: 'Post a Job', href: '/recruitment/jobs', icon: <PlusCircle size={16} /> }}
            secondaryAction={{ label: 'Source Candidates', href: '/recruitment/sourcing', icon: <UserSearch size={16} /> }}
            tips={['Connect your job board accounts (Naukri, LinkedIn, Indeed) for automatic candidate sync.', 'Use AI resume parsing to automatically screen and score incoming applications.', 'Set up automated interview scheduling to reduce time-to-hire by 40%.']}
        />
    );
}
