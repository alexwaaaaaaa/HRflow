"use client";
import EmptyState from '@/components/ui/EmptyState';
import { CalendarHeart, Plus } from 'lucide-react';

function IllustrationLifeEvents() {
    return (
        <svg width="180" height="160" viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Calendar */}
            <rect x="25" y="30" width="130" height="120" rx="12" fill="#0D1928" stroke="#1A2A3A" strokeWidth="2" />
            <rect x="25" y="30" width="130" height="38" rx="12" fill="#131B2B" />
            <rect x="25" y="52" width="130" height="16" fill="#131B2B" />
            <circle cx="55" cy="24" r="7" fill="#0D1928" stroke="#6366f1" strokeWidth="2.5" />
            <circle cx="125" cy="24" r="7" fill="#0D1928" stroke="#6366f1" strokeWidth="2.5" />
            {/* Empty cells */}
            {[[0, 0], [1, 0], [2, 0], [3, 0], [0, 1], [1, 1], [2, 1], [3, 1], [0, 2], [1, 2], [2, 2], [3, 2]].map(([col, row]) => (
                <rect key={`${col}-${row}`} x={42 + col * 28} y={78 + row * 22} width="18" height="14" rx="4" fill="#131B2B" stroke="#1A2A3A" strokeWidth="1" />
            ))}
            {/* Heart on one cell */}
            <path d="M76 84 Q78 81 80 84 Q82 81 84 84 Q84 87 80 91 Q76 87 76 84 Z" fill="#6366f1" opacity="0.7" />
            {/* Stars */}
            <circle cx="152" cy="45" r="3" fill="#f59e0b" opacity="0.5" />
            <circle cx="28" cy="145" r="2" fill="#a78bfa" opacity="0.4" />
        </svg>
    );
}
export default function NoLifeEventsPage() {
    return (
        <EmptyState
            illustration={<IllustrationLifeEvents />}
            badge="Life Events"
            badgeColor="pink"
            title="No life events recorded yet"
            description="Celebrate your employees' biggest moments. Track marriages, new additions to the family, work anniversaries, and other milestones to build a people-first culture."
            primaryAction={{ label: 'Add Life Event', href: '/employees', icon: <Plus size={16} /> }}
            secondaryAction={{ label: 'View Anniversary Board', href: '/engagement/rr/anniversary', icon: <CalendarHeart size={16} /> }}
            tips={['Kaarya auto-detects work anniversaries and birthdays from employee records.', 'Configure automated gifts, e-cards, or recognition rewards for life events.', 'Life event data helps HR tailor benefits like paternity/maternity leave automatically.']}
        />
    );
}
