"use client";
import EmptyState from '@/components/ui/EmptyState';
import { Wallet, TrendingUp } from 'lucide-react';

function IllustrationFinance() {
    return (
        <svg width="180" height="160" viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="25" y="45" width="130" height="85" rx="12" fill="#0D1928" stroke="#1A2A3A" strokeWidth="2" />
            <rect x="25" y="45" width="130" height="28" rx="12" fill="#131B2B" />
            <rect x="25" y="61" width="130" height="12" fill="#131B2B" />
            {/* Card chip */}
            <rect x="40" y="53" width="22" height="16" rx="3" fill="#1A2A3A" stroke="#2A3A4A" strokeWidth="1.5" />
            {/* Wallet clasp */}
            <circle cx="155" cy="88" r="10" fill="#060D1A" stroke="#1A2A3A" strokeWidth="2" />
            <circle cx="155" cy="88" r="4" fill="#6366f1" opacity="0.5" />
            {/* Amount display */}
            <text x="40" y="110" fontSize="11" fill="#445566" fontFamily="monospace">₹ 0.00</text>
            <rect x="40" y="116" width="100" height="4" rx="2" fill="#1A2A3A" />
            <rect x="40" y="124" width="70" height="4" rx="2" fill="#1A2A3A" />
        </svg>
    );
}
export default function NoFinancePage() {
    return (
        <EmptyState
            illustration={<IllustrationFinance />}
            badge="Financial Wellness"
            badgeColor="emerald"
            title="No finance activity yet"
            description="Enable salary advances, EWA (Earned Wage Access), flexi-pay, and loan management to empower your employees' financial health."
            primaryAction={{ label: 'Enable EWA', href: '/finance/ewa', icon: <Wallet size={16} /> }}
            secondaryAction={{ label: 'View Finance Dashboard', href: '/finance/dashboard', icon: <TrendingUp size={16} /> }}
            tips={['Earned Wage Access lets employees withdraw earned wages before payday.', 'Zero-interest salary advances can be repaid over flexible EMIs.', 'All finance activity is automatically synced to the payroll register.']}
        />
    );
}
