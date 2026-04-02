"use client";
import EmptyState from '@/components/ui/EmptyState';
import { BarChart3, PlusCircle } from 'lucide-react';

function IllustrationReports() {
    return (
        <svg width="180" height="160" viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="25" y="20" width="130" height="120" rx="10" fill="#0D1928" stroke="#1A2A3A" strokeWidth="2" />
            {/* Bars */}
            <rect x="45" y="95" width="20" height="30" rx="4" fill="#1A2A3A" />
            <rect x="75" y="70" width="20" height="55" rx="4" fill="#1A2A3A" />
            <rect x="105" y="50" width="20" height="75" rx="4" fill="#1A2A3A" />
            {/* Dotted line */}
            <line x1="35" y1="130" x2="145" y2="130" stroke="#2A3A4A" strokeWidth="1.5" />
            <line x1="35" y1="110" x2="145" y2="110" stroke="#1A2A3A" strokeWidth="1" strokeDasharray="4 3" />
            <line x1="35" y1="90" x2="145" y2="90" stroke="#1A2A3A" strokeWidth="1" strokeDasharray="4 3" />
            <line x1="35" y1="70" x2="145" y2="70" stroke="#1A2A3A" strokeWidth="1" strokeDasharray="4 3" />
            {/* No data indicator */}
            <circle cx="90" cy="42" r="18" fill="#131B2B" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3 2" />
            <text x="82" y="49" fontSize="16" fill="#6366f1" opacity="0.5">?</text>
        </svg>
    );
}
export default function NoReportsPage() {
    return (
        <EmptyState
            illustration={<IllustrationReports />}
            badge="Reports & Analytics"
            badgeColor="violet"
            title="No reports generated yet"
            description="Data is your superpower. Generate HR analytics, headcount trends, payroll cost reports, or build a custom report from scratch in minutes."
            primaryAction={{ label: 'Build a Report', href: '/reports/builder', icon: <PlusCircle size={16} /> }}
            secondaryAction={{ label: 'View Dashboard', href: '/reports/dashboard', icon: <BarChart3 size={16} /> }}
            tips={['Start with pre-built MIS and payroll cost reports for instant insights.', 'Schedule reports to be delivered to your inbox weekly or monthly.', 'Export all reports as PDF, Excel, or directly to Tally.']}
        />
    );
}
