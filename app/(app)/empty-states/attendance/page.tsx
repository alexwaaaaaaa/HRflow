"use client";
import EmptyState from '@/components/ui/EmptyState';
import { Fingerprint, Clock } from 'lucide-react';

function IllustrationAttendance() {
    return (
        <svg width="180" height="160" viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Clock face */}
            <circle cx="90" cy="75" r="52" fill="#0D1928" stroke="#1A2A3A" strokeWidth="2.5" />
            <circle cx="90" cy="75" r="44" fill="#060D1A" stroke="#1A2A3A" strokeWidth="1.5" />
            {/* Hour marks */}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => {
                const angle = (i * 30 - 90) * Math.PI / 180;
                const x1 = 90 + 36 * Math.cos(angle);
                const y1 = 75 + 36 * Math.sin(angle);
                const x2 = 90 + 40 * Math.cos(angle);
                const y2 = 75 + 40 * Math.sin(angle);
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1A2A3A" strokeWidth="2" strokeLinecap="round" />;
            })}
            {/* Hands - stopped at empty time */}
            <line x1="90" y1="75" x2="90" y2="45" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />
            <line x1="90" y1="75" x2="112" y2="75" stroke="#8899AA" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="90" cy="75" r="4" fill="#6366f1" />
            {/* Fingerprint waves */}
            <path d="M55 135 Q90 125 125 135" stroke="#6366f1" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" strokeDasharray="4 3" />
            <path d="M65 142 Q90 134 115 142" stroke="#6366f1" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.3" strokeDasharray="4 3" />
        </svg>
    );
}

export default function NoAttendancePage() {
    return (
        <EmptyState
            illustration={<IllustrationAttendance />}
            badge="Attendance & Shifts"
            badgeColor="emerald"
            title="No attendance data recorded"
            description="Clock is ticking, but no punches yet! Set up your biometric device integration or enable geo-fenced mobile attendance for your team."
            primaryAction={{ label: 'Setup Attendance', href: '/attendance', icon: <Fingerprint size={16} /> }}
            secondaryAction={{ label: 'Configure Shifts', href: '/attendance', icon: <Clock size={16} /> }}
            tips={[
                'Integrate with ZKTeco, eSSL or Mantra biometric devices via the Integrations panel.',
                'Enable geo-fenced mobile attendance for remote or field employees.',
                'Define shift rosters and auto-assign them to employee groups.',
            ]}
        />
    );
}
