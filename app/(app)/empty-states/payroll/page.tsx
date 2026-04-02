"use client";
import EmptyState from '@/components/ui/EmptyState';
import { Play, Settings } from 'lucide-react';

function IllustrationPayroll() {
    return (
        <svg width="180" height="160" viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="35" y="30" width="110" height="100" rx="10" fill="#0D1928" stroke="#1A2A3A" strokeWidth="2" />
            <rect x="50" y="50" width="80" height="8" rx="4" fill="#1A2A3A" />
            <rect x="50" y="65" width="55" height="6" rx="3" fill="#1A2A3A" />
            <rect x="50" y="77" width="65" height="6" rx="3" fill="#1A2A3A" />
            <rect x="50" y="89" width="40" height="6" rx="3" fill="#1A2A3A" />
            <rect x="50" y="108" width="80" height="10" rx="5" fill="#6366f1" opacity="0.3" />
            {/* Rupee coin */}
            <circle cx="148" cy="40" r="18" fill="#0D1928" stroke="#6366f1" strokeWidth="2" />
            <text x="141" y="47" fontSize="18" fill="#6366f1" fontWeight="bold">₹</text>
            {/* Sparkles */}
            <circle cx="40" cy="35" r="3" fill="#6366f1" opacity="0.6" />
            <circle cx="155" cy="115" r="2" fill="#a78bfa" opacity="0.6" />
        </svg>
    );
}

export default function NoPayrollPage() {
    return (
        <EmptyState
            illustration={<IllustrationPayroll />}
            badge="Payroll Engine"
            badgeColor="violet"
            title="No payroll run processed yet"
            description="Your first payroll cycle is just a few steps away. Configure your salary components, verify employee data, and run your maiden payroll."
            primaryAction={{ label: 'Start Payroll Run', href: '/payroll', icon: <Play size={16} /> }}
            secondaryAction={{ label: 'Configure Components', href: '/payroll-settings', icon: <Settings size={16} /> }}
            tips={[
                'Ensure all employees have valid bank account details before running payroll.',
                'Set up salary components (Basic, HRA, PF, etc.) in Payroll Settings first.',
                'You can always do a dry run in simulation mode before finalising.',
            ]}
        />
    );
}
