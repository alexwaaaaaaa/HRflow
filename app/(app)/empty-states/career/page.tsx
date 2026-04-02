"use client";
import EmptyState from '@/components/ui/EmptyState';
import { Compass, TrendingUp } from 'lucide-react';

function IllustrationCareer() {
    return (
        <svg width="180" height="160" viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Winding path */}
            <path d="M30 140 Q30 110 60 100 Q90 90 90 70 Q90 50 120 40 Q150 30 155 15" stroke="#1A2A3A" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="6 4" />
            {/* Steps / milestones */}
            <circle cx="30" cy="140" r="8" fill="#0D1928" stroke="#6366f1" strokeWidth="2" />
            <circle cx="60" cy="100" r="8" fill="#0D1928" stroke="#6366f1" strokeWidth="2" opacity="0.7" />
            <circle cx="90" cy="70" r="8" fill="#0D1928" stroke="#6366f1" strokeWidth="2" opacity="0.5" />
            <circle cx="120" cy="40" r="8" fill="#0D1928" stroke="#1A2A3A" strokeWidth="2" opacity="0.3" strokeDasharray="3 2" />
            <circle cx="150" cy="18" r="8" fill="#0D1928" stroke="#1A2A3A" strokeWidth="2" opacity="0.2" strokeDasharray="3 2" />
            {/* Flag at end */}
            <line x1="155" y1="10" x2="155" y2="0" stroke="#6366f1" strokeWidth="2" opacity="0.3" />
            <path d="M155 0 L168 6 L155 12 Z" fill="#6366f1" opacity="0.3" />
            {/* Person at start */}
            <circle cx="30" cy="148" r="6" fill="#6366f1" opacity="0.8" />
        </svg>
    );
}
export default function NoCareerPathPage() {
    return (
        <EmptyState
            illustration={<IllustrationCareer />}
            badge="Career Intelligence"
            badgeColor="indigo"
            title="No career path defined yet"
            description="Help employees see their future at your company. Define role ladders, skills frameworks, and career milestones to boost retention and internal mobility."
            primaryAction={{ label: 'Explore Career AI', href: '/ai/smart-onboarding', icon: <Compass size={16} /> }}
            secondaryAction={{ label: 'View Performance Framework', href: '/performance/competency', icon: <TrendingUp size={16} /> }}
            tips={['AI-powered career path suggestions are based on skills, performance history, and market data.', 'Transparent promotion criteria significantly boost employee trust and retention.', 'Internal mobility can reduce hiring costs by up to 60% in high-growth companies.']}
        />
    );
}
