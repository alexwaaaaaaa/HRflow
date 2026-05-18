"use client";
import EmptyState from '@/components/ui/EmptyState';
import { Settings } from 'lucide-react';

function IllustrationNotifications() {
    return (
        <svg width="180" height="160" viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M90 20 Q90 20 90 20 L62 55 L50 60 L50 120 L130 120 L130 60 L118 55 Z" fill="#0D1928" stroke="#1A2A3A" strokeWidth="2" />
            <rect x="50" y="120" width="80" height="12" rx="4" fill="#0D1928" stroke="#1A2A3A" strokeWidth="2" />
            <circle cx="90" cy="143" r="8" fill="#0D1928" stroke="#1A2A3A" strokeWidth="2" />
            <line x1="90" y1="18" x2="90" y2="28" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="90" cy="15" r="5" fill="#1A2A3A" stroke="#6366f1" strokeWidth="2" />
            {/* ZZZ */}
            <text x="105" y="50" fontSize="12" fill="#445566" fontWeight="bold">z</text>
            <text x="113" y="42" fontSize="10" fill="#334155" fontWeight="bold">z</text>
            <text x="120" y="35" fontSize="8" fill="#1E293B" fontWeight="bold">z</text>
        </svg>
    );
}
export default function NoNotificationsPage() {
    return (
        <EmptyState
            illustration={<IllustrationNotifications />}
            badge="Notifications"
            badgeColor="sky"
            title="All caught up — inbox zero!"
            description="You have no new notifications. Kaarya will alert you for payroll approvals, leave requests, compliance deadlines, and much more."
            primaryAction={{ label: 'Notification Settings', href: '/settings/notifications', icon: <Settings size={16} /> }}
            tips={['Customise which events trigger email, push, or WhatsApp alerts in Notification Settings.', 'Critical alerts like payroll failures or compliance breaches are always sent regardless of settings.']}
        />
    );
}
