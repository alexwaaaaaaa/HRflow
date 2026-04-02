"use client";
import SuccessState from '@/components/ui/SuccessState';
import { AreaChart, Home } from 'lucide-react';

export default function SurveySubmittedPage() {
    return (
        <SuccessState
            title="Response Recorded"
            description="Thank you for participating in the Q3 Employee Pulse Survey. Your feedback is fully anonymous and helps us build a better workplace."
            primaryAction={{ label: 'View Company Results', href: '/engagement/surveys/results', icon: <AreaChart size={16} /> }}
            secondaryAction={{ label: 'Return Home', href: '/', icon: <Home size={16} /> }}
            confetti={true}
        />
    );
}
