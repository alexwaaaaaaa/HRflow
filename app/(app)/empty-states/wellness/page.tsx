"use client";
import EmptyState from '@/components/ui/EmptyState';
import { HeartPulse, Activity } from 'lucide-react';

function IllustrationWellness() {
    return (
        <svg width="180" height="160" viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Heart */}
            <path d="M90 130 Q35 90 35 60 Q35 35 60 35 Q75 35 90 50 Q105 35 120 35 Q145 35 145 60 Q145 90 90 130 Z" fill="#0D1928" stroke="#1A2A3A" strokeWidth="2" />
            {/* Pulse line */}
            <polyline points="48,80 60,80 70,55 80,100 92,45 104,90 115,80 132,80" stroke="#6366f1" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
            {/* Glow */}
            <circle cx="90" cy="80" r="45" fill="#6366f1" opacity="0.04" />
        </svg>
    );
}
export default function NoWellnessPage() {
    return (
        <EmptyState
            illustration={<IllustrationWellness />}
            badge="Employee Wellness"
            badgeColor="rose"
            title="No wellness data collected yet"
            description="A healthy employee is a productive employee. Enable wellness score tracking, connect mental health resources, and monitor your team's overall wellbeing."
            primaryAction={{ label: 'Enable Wellness Tracking', href: '/finance/wellness', icon: <HeartPulse size={16} /> }}
            secondaryAction={{ label: 'View Wellness Dashboard', href: '/finance/wellness', icon: <Activity size={16} /> }}
            tips={['Integrate with corporate health insurance providers for real-time claim data.', 'Schedule quarterly wellness check-ins and Employee Assistance Program (EAP) sessions.', 'Trend analysis reveals burnout risk before it becomes a retention problem.']}
        />
    );
}
