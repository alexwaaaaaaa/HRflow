"use client";
import EmptyState from '@/components/ui/EmptyState';
import { Star, Heart } from 'lucide-react';

function IllustrationRecognition() {
    return (
        <svg width="180" height="160" viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Trophy */}
            <path d="M65 30 L115 30 L115 80 Q115 110 90 118 Q65 110 65 80 Z" fill="#0D1928" stroke="#1A2A3A" strokeWidth="2" />
            <path d="M55 40 Q55 68 65 75" stroke="#1A2A3A" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M125 40 Q125 68 115 75" stroke="#1A2A3A" strokeWidth="2" fill="none" strokeLinecap="round" />
            <rect x="75" y="118" width="30" height="8" rx="2" fill="#1A2A3A" />
            <rect x="65" y="126" width="50" height="10" rx="5" fill="#1A2A3A" stroke="#2A3A4A" strokeWidth="1.5" />
            {/* Star in trophy */}
            <path d="M90 50 L93 60 L103 60 L95 66 L98 76 L90 70 L82 76 L85 66 L77 60 L87 60 Z" fill="#6366f1" opacity="0.5" stroke="#6366f1" strokeWidth="1" />
            {/* Sparkles */}
            <circle cx="40" cy="45" r="4" fill="#f59e0b" opacity="0.5" />
            <circle cx="145" cy="55" r="3" fill="#f59e0b" opacity="0.5" />
            <path d="M148 35 L150 40 L155 42 L150 44 L148 49 L146 44 L141 42 L146 40 Z" fill="#f59e0b" opacity="0.3" />
        </svg>
    );
}

export default function NoRecognitionsPage() {
    return (
        <EmptyState
            illustration={<IllustrationRecognition />}
            badge="Rewards & Recognition"
            badgeColor="amber"
            title="No recognitions given yet"
            description="A word of appreciation can change everything. Be the first to recognise a colleague's hard work, celebrate a milestone, or give a spot award."
            primaryAction={{ label: 'Give Recognition', href: '/engagement/rr/give', icon: <Star size={16} /> }}
            secondaryAction={{ label: 'View R&R Feed', href: '/engagement/rr/feed', icon: <Heart size={16} /> }}
            tips={[
                'Spot awards and kudos can be given anytime — no approval needed.',
                'Managers can give digital badges linked to company values.',
                'Set up auto-recognition triggers for birthdays, work anniversaries, and milestones.',
            ]}
        />
    );
}
