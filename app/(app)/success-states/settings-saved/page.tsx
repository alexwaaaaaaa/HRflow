"use client";
import SuccessState from '@/components/ui/SuccessState';
import { Settings, Home } from 'lucide-react';

export default function SettingsSavedPage() {
    return (
        <SuccessState
            title="Settings Saved Successfully"
            description="Your organisation profile, branding configuration, and global preferences have been updated. Changes are now live across all modules."
            primaryAction={{ label: 'Continue Configuring', href: '/settings', icon: <Settings size={16} /> }}
            secondaryAction={{ label: 'Return to Dashboard', href: '/', icon: <Home size={16} /> }}
        />
    );
}
