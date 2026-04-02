"use client";
import EmptyState from '@/components/ui/EmptyState';
import { Megaphone, PlusCircle } from 'lucide-react';

function IllustrationAnnouncements() {
    return (
        <svg width="180" height="160" viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Megaphone body */}
            <path d="M35 65 L35 105 L70 105 L130 130 L130 40 L70 65 Z" fill="#0D1928" stroke="#1A2A3A" strokeWidth="2" />
            {/* Speaker cone */}
            <rect x="25" y="62" width="45" height="46" rx="6" fill="#131B2B" stroke="#1A2A3A" strokeWidth="1.5" />
            {/* Sound waves */}
            <path d="M138 65 Q148 85 138 105" stroke="#6366f1" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.8" />
            <path d="M145 58 Q160 85 145 112" stroke="#6366f1" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" />
            <path d="M152 50 Q172 85 152 120" stroke="#6366f1" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.25" />
        </svg>
    );
}
export default function NoAnnouncementsPage() {
    return (
        <EmptyState
            illustration={<IllustrationAnnouncements />}
            badge="Announcements"
            badgeColor="amber"
            title="No announcements posted yet"
            description="Keep your team informed and aligned. Broadcast company updates, policy changes, event invitations, and important HR announcements to everyone in one place."
            primaryAction={{ label: 'Post Announcement', href: '/engagement/rr/feed', icon: <PlusCircle size={16} /> }}
            secondaryAction={{ label: 'View Announcement Feed', href: '/engagement/rr/feed', icon: <Megaphone size={16} /> }}
            tips={['Target announcements to specific departments, locations, or employee groups.', 'Pin important announcements to the top of the feed for maximum visibility.', 'Enable read receipts to confirm employees have seen critical communications.']}
        />
    );
}
