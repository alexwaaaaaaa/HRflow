"use client";
import EmptyState from '@/components/ui/EmptyState';
import { Flag, Target } from 'lucide-react';

function IllustrationGoals() {
    return (
        <svg width="180" height="160" viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Mountain */}
            <path d="M90 20 L145 140 L35 140 Z" fill="#0D1928" stroke="#1A2A3A" strokeWidth="2" />
            <path d="M90 20 L110 60 L70 60 Z" fill="#131B2B" stroke="#1A2A3A" strokeWidth="1.5" />
            {/* Flag */}
            <line x1="90" y1="20" x2="90" y2="5" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M90 5 L108 13 L90 21 Z" fill="#6366f1" opacity="0.8" />
            {/* Stars / milestones */}
            <circle cx="70" cy="100" r="4" fill="#1A2A3A" stroke="#2A3A4A" strokeWidth="1.5" strokeDasharray="2 1" />
            <circle cx="110" cy="90" r="4" fill="#1A2A3A" stroke="#2A3A4A" strokeWidth="1.5" strokeDasharray="2 1" />
        </svg>
    );
}
export default function NoGoalsPage() {
    return (
        <EmptyState
            illustration={<IllustrationGoals />}
            badge="Performance Goals"
            badgeColor="amber"
            title="No goals set for this cycle"
            description="Define what success looks like. Set SMART goals for yourself, your team, or the entire organisation and track progress through the performance cycle."
            primaryAction={{ label: 'Set a Goal', href: '/performance/cycle-setup', icon: <Flag size={16} /> }}
            secondaryAction={{ label: 'View Performance Cycle', href: '/performance/dashboard', icon: <Target size={16} /> }}
            tips={['Use the SMART framework — Specific, Measurable, Achievable, Relevant, Time-bound.', 'Link goals to company OKRs to create a clear line of sight from strategy to execution.', 'Set mid-cycle check-ins to review progress and adjust goals as needed.']}
        />
    );
}
