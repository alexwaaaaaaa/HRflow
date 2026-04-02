"use client";
import EmptyState from '@/components/ui/EmptyState';
import { ClipboardList, Send } from 'lucide-react';

function IllustrationSurveys() {
    return (
        <svg width="180" height="160" viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="35" y="20" width="110" height="130" rx="10" fill="#0D1928" stroke="#1A2A3A" strokeWidth="2" />
            {/* Clipboard top */}
            <rect x="65" y="13" width="50" height="16" rx="4" fill="#131B2B" stroke="#1A2A3A" strokeWidth="1.5" />
            {/* Question items */}
            {[50, 70, 90, 110].map((y, i) => (
                <g key={i}>
                    <rect x="50" y={y} width="8" height="8" rx="2" fill={i === 0 ? '#6366f1' : '#1A2A3A'} stroke="#2A3A4A" strokeWidth="1" />
                    <rect x="65" y={y + 1} width={i === 3 ? 40 : 60} height="5" rx="2.5" fill="#1A2A3A" />
                </g>
            ))}
            {/* Star rating */}
            {[0, 1, 2, 3, 4].map(i => (
                <text key={i} x={52 + i * 16} y={140} fontSize="14" fill={i < 2 ? '#f59e0b' : '#1A2A3A'}>★</text>
            ))}
        </svg>
    );
}
export default function NoSurveysPage() {
    return (
        <EmptyState
            illustration={<IllustrationSurveys />}
            badge="Surveys & Feedback"
            badgeColor="amber"
            title="No survey responses yet"
            description="Hear your employees' voices. Launch a pulse survey, exit interview, or satisfaction poll and start collecting real-time sentiment data."
            primaryAction={{ label: 'Launch a Survey', href: '/settings/forms', icon: <Send size={16} /> }}
            secondaryAction={{ label: 'View Form Builder', href: '/settings/forms', icon: <ClipboardList size={16} /> }}
            tips={['Short pulse surveys (3-5 questions) get significantly higher response rates.', 'Anonymous surveys yield more honest responses — enable this in the form settings.', 'Schedule quarterly eNPS surveys to track employee satisfaction trends over time.']}
        />
    );
}
