"use client";
import ErrorState from '@/components/ui/ErrorState';
import { LogIn, Clock } from 'lucide-react';

export default function SessionTimeoutPage() {
    return (
        <ErrorState
            colorScheme="rose"
            illustration={
                <div className="text-rose-500 mb-8 relative">
                    <Clock size={80} strokeWidth={1.5} />
                    <div className="absolute top-0 right-0 w-4 h-4 rounded-full bg-rose-500 animate-ping" />
                </div>
            }
            title="Session Expired"
            description="For your security, your session has timed out due to inactivity. Please log in again to continue working."
            primaryAction={{ label: 'Log In Again', href: '/login', icon: <LogIn size={16} /> }}
            technicalDetails="JWT token validation failed. Error: TokenExpiredError. ExpiredAt: 2024-11-20T14:30:00Z. Client inactivity duration: >30m."
        />
    );
}
