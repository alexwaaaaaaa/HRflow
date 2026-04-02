"use client";
import EmptyState from '@/components/ui/EmptyState';
import { BookOpen, Compass } from 'lucide-react';

function IllustrationLMS() {
    return (
        <svg width="180" height="160" viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Book */}
            <rect x="40" y="30" width="100" height="110" rx="8" fill="#0D1928" stroke="#1A2A3A" strokeWidth="2" />
            <rect x="40" y="30" width="10" height="110" rx="4" fill="#1A2A3A" />
            <rect x="58" y="52" width="65" height="6" rx="3" fill="#1A2A3A" />
            <rect x="58" y="64" width="50" height="5" rx="2.5" fill="#1A2A3A" />
            <rect x="58" y="75" width="58" height="5" rx="2.5" fill="#1A2A3A" />
            <rect x="58" y="86" width="42" height="5" rx="2.5" fill="#1A2A3A" />
            {/* Graduation cap */}
            <ellipse cx="90" cy="42" rx="30" ry="8" fill="#6366f1" opacity="0.6" />
            <rect x="82" y="28" width="16" height="14" rx="2" fill="#6366f1" opacity="0.4" />
            <line x1="120" y1="42" x2="120" y2="55" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="120" cy="57" r="3" fill="#6366f1" opacity="0.8" />
            {/* Progress bar */}
            <rect x="58" y="105" width="65" height="8" rx="4" fill="#1A2A3A" />
            <rect x="58" y="105" width="0" height="8" rx="4" fill="#6366f1" />
        </svg>
    );
}

export default function NoCoursesPage() {
    return (
        <EmptyState
            illustration={<IllustrationLMS />}
            badge="Learning & Development"
            badgeColor="amber"
            title="No courses enrolled yet"
            description="The path to mastery starts here. Browse the course library, discover learning paths curated by your HR team, or request a custom training."
            primaryAction={{ label: 'Browse Course Library', href: '/lms/library', icon: <BookOpen size={16} /> }}
            secondaryAction={{ label: 'Explore Learning Paths', href: '/lms/learning-path', icon: <Compass size={16} /> }}
            tips={[
                'Ask your manager to assign a learning path aligned with your role.',
                'Complete courses and earn badges for your Kaarya profile.',
                'Track your learning hours and certifications in the LMS dashboard.',
            ]}
        />
    );
}
