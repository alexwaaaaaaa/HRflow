"use client";
import SuccessState from '@/components/ui/SuccessState';
import { HeartPulse, CheckSquare } from 'lucide-react';

export default function WellnessGoalSetPage() {
    return (
        <SuccessState
            title="Wellness Goal Pledged!"
            description="We've recorded your pledge for the '10K Steps Daily Challenge'. Completing this 30-day streak will earn you the Silver Runner Badge and 500 Kaarya Points."
            metrics={[
                { label: 'Challenge', value: '10K Steps A Day' },
                { label: 'Duration', value: '30 Days' },
                { label: 'Reward', value: '500 pts + Badge' }
            ]}
            primaryAction={{ label: 'Log Activity', onClick: () => console.log('Log actvity'), icon: <CheckSquare size={16} /> }}
            secondaryAction={{ label: 'View Leaderboard', href: '/finance/wellness', icon: <HeartPulse size={16} /> }}
            confetti={true}
        />
    );
}
