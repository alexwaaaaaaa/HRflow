"use client";
import SuccessState from '@/components/ui/SuccessState';
import { Target, TrendingUp } from 'lucide-react';

export default function OkrUpdatedPage() {
    return (
        <SuccessState
            title="OKR Progress Updated"
            description="Your check-in for 'Launch V2 Mobile App' has been saved. Your key result progress is now at 85% and your manager has been notified."
            metrics={[
                { label: 'Current Progress', value: '85%' },
                { label: 'Status', value: 'On Track' },
                { label: 'Confidence', value: 'High' }
            ]}
            primaryAction={{ label: 'View Team OKRs', href: '/okr/team', icon: <Target size={16} /> }}
            secondaryAction={{ label: 'Back to My OKRs', href: '/okr/my-okrs', icon: <TrendingUp size={16} /> }}
        />
    );
}
