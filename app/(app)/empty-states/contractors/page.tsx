"use client";
import EmptyState from '@/components/ui/EmptyState';
import { Briefcase, UserPlus } from 'lucide-react';

function IllustrationContractor() {
    return (
        <svg width="180" height="160" viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Briefcase */}
            <rect x="30" y="60" width="120" height="85" rx="10" fill="#0D1928" stroke="#1A2A3A" strokeWidth="2" />
            <path d="M65 60 L65 45 Q65 35 90 35 Q115 35 115 45 L115 60" fill="none" stroke="#1A2A3A" strokeWidth="2" />
            <line x1="30" y1="95" x2="150" y2="95" stroke="#1A2A3A" strokeWidth="1.5" />
            <rect x="78" y="88" width="24" height="14" rx="5" fill="#131B2B" stroke="#6366f1" strokeWidth="1.5" />
            {/* Dashed person outlines */}
            <circle cx="65" cy="130" r="10" fill="none" stroke="#2A3A4A" strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="90" cy="130" r="10" fill="none" stroke="#2A3A4A" strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="115" cy="130" r="10" fill="none" stroke="#2A3A4A" strokeWidth="1.5" strokeDasharray="3 2" />
        </svg>
    );
}
export default function NoContractorPage() {
    return (
        <EmptyState
            illustration={<IllustrationContractor />}
            badge="Contractor Management"
            badgeColor="orange"
            title="No contractor data added yet"
            description="Manage your extended workforce seamlessly. Add contractors, freelancers, and gig workers alongside your permanent employees in a unified system."
            primaryAction={{ label: 'Add Contractor', href: '/employees/new', icon: <UserPlus size={16} /> }}
            secondaryAction={{ label: 'Manage Contracts', href: '/documents/repository', icon: <Briefcase size={16} /> }}
            tips={['Contractors can be added with a different employment type — no payroll processing needed.', 'Attach their contracts, NDAs, and SOW documents to their profile.', 'Track contractor milestones and invoice approvals from the Finance module.']}
        />
    );
}
