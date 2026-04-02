"use client";
import LoadingState from '@/components/ui/LoadingState';

export default function WellnessCalcPage() {
    return (
        <LoadingState
            variant="metrics"
            colorScheme="amber"
            title="Calculating Financial Wellness"
            description="Simulating compounding scenarios for your EPF corpus, emergency fund runway, and investment tax deductions under Section 80C."
        />
    );
}
