"use client";
import EmptyState from '@/components/ui/EmptyState';
import { MessageSquare, Heart } from 'lucide-react';

function IllustrationFeedback() {
    return (
        <svg width="180" height="160" viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Chat bubble 1 */}
            <rect x="20" y="30" width="100" height="55" rx="12" fill="#0D1928" stroke="#1A2A3A" strokeWidth="2" />
            <path d="M30 85 L25 100 L50 85 Z" fill="#0D1928" stroke="#1A2A3A" strokeWidth="2" />
            <rect x="35" y="48" width="65" height="6" rx="3" fill="#1A2A3A" />
            <rect x="35" y="60" width="48" height="6" rx="3" fill="#1A2A3A" />
            {/* Chat bubble 2 */}
            <rect x="60" y="95" width="100" height="50" rx="12" fill="#131B2B" stroke="#1A2A3A" strokeWidth="2" />
            <path d="M150 145 L155 158 L132 145 Z" fill="#131B2B" stroke="#1A2A3A" strokeWidth="2" />
            <rect x="75" y="110" width="65" height="6" rx="3" fill="#1A2A3A" />
            <rect x="75" y="122" width="45" height="6" rx="3" fill="#1A2A3A" />
            {/* Heart */}
            <path d="M88 50 Q92 44 98 50 Q104 44 108 50 Q108 56 98 64 Q88 56 88 50 Z" fill="#6366f1" opacity="0.5" />
        </svg>
    );
}
export default function NoFeedbackPage() {
    return (
        <EmptyState
            illustration={<IllustrationFeedback />}
            badge="Continuous Feedback"
            badgeColor="rose"
            title="No feedback given or received"
            description="Feedback is the breakfast of champions. Share real-time kudos, constructive feedback, or request a 360° review from your peers and manager."
            primaryAction={{ label: 'Give Feedback', href: '/feedback/give', icon: <MessageSquare size={16} /> }}
            secondaryAction={{ label: 'Request Feedback', href: '/feedback/request', icon: <Heart size={16} /> }}
            tips={['Continuous feedback is 3x more effective than annual reviews alone.', 'Use competency-based feedback frameworks for structured, actionable insights.', 'Anonymous peer feedback is available for team-level sentiment reviews.']}
        />
    );
}
