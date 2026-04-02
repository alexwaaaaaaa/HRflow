"use client";
import LoadingState from '@/components/ui/LoadingState';

export default function CareerGeneratingPage() {
    return (
        <LoadingState
            variant="progress"
            colorScheme="rose"
            title="Generating Career Path Matrix"
            description="Mapping 42 distinct skills across 6 seniority levels. Checking logical progression between internal bands."
            progress={88}
            steps={[
                { label: 'Ingesting Competency Framework', completed: true },
                { label: 'Generating Nodes & Edges', completed: true },
                { label: 'Applying Weighting Factors', active: true },
                { label: 'Publishing to Knowledge Graph', active: false }
            ]}
        />
    );
}
