"use client";
import EmptyState from '@/components/ui/EmptyState';
import { TicketPlus, BookOpen } from 'lucide-react';

function IllustrationTickets() {
    return (
        <svg width="180" height="160" viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="50" width="140" height="75" rx="10" fill="#0D1928" stroke="#1A2A3A" strokeWidth="2" />
            <circle cx="20" cy="87" r="10" fill="#060D1A" stroke="#1A2A3A" strokeWidth="2" />
            <circle cx="160" cy="87" r="10" fill="#060D1A" stroke="#1A2A3A" strokeWidth="2" />
            <line x1="20" y1="87" x2="160" y2="87" stroke="#1A2A3A" strokeWidth="1.5" strokeDasharray="5 4" />
            <rect x="50" y="60" width="80" height="24" rx="6" fill="#131B2B" stroke="#1A2A3A" strokeWidth="1.5" />
            <rect x="60" y="67" width="50" height="5" rx="2.5" fill="#1A2A3A" />
            <rect x="60" y="75" width="35" height="5" rx="2.5" fill="#1A2A3A" />
            {/* Smiley */}
            <circle cx="90" cy="130" r="18" fill="#0D1928" stroke="#6366f1" strokeWidth="2" />
            <circle cx="84" cy="127" r="2" fill="#6366f1" />
            <circle cx="96" cy="127" r="2" fill="#6366f1" />
            <path d="M84 134 Q90 139 96 134" stroke="#6366f1" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
    );
}

export default function NoTicketsPage() {
    return (
        <EmptyState
            illustration={<IllustrationTickets />}
            badge="Helpdesk"
            badgeColor="sky"
            title="No support tickets raised"
            description="Your team is thriving and self-sufficient! No helpdesk tickets have been submitted. Employees can raise IT, HR, or admin requests anytime."
            primaryAction={{ label: 'Raise a Ticket', href: '/helpdesk/raise', icon: <TicketPlus size={16} /> }}
            secondaryAction={{ label: 'Browse Knowledge Base', href: '/helpdesk/kb', icon: <BookOpen size={16} /> }}
            tips={[
                'Publish your knowledge base articles to help employees self-serve common issues.',
                'Configure SLA rules so tickets are automatically escalated after a threshold.',
                'You can categorize tickets by IT, HR, Finance, and Admin for faster routing.',
            ]}
        />
    );
}
