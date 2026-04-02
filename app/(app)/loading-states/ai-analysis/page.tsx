"use client";
import LoadingState from '@/components/ui/LoadingState';
import { BrainCircuit } from 'lucide-react';

export default function AiAnalysisPage() {
    return (
        <LoadingState
            variant="ripple"
            colorScheme="indigo"
            icon={<BrainCircuit size={32} />}
            title="AI Analysis in Progress"
            description="Our machine learning models are analyzing 1,450 candidate resumes to find the best match for the Engineering Manager role."
            estimatedTimeLeft="~1.2 mins"
        />
    );
}
