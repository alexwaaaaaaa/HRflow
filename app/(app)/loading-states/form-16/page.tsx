"use client";
import LoadingState from '@/components/ui/LoadingState';

export default function Form16GeneratingPage() {
    return (
        <LoadingState
            variant="progress"
            colorScheme="indigo"
            title="Stitching Form 16s"
            description="Merging Part A from TRACES with internally generated Part B, injecting digital signatures."
            progress={32}
            steps={[
                { label: 'Extracting Part A (Zip)', completed: true },
                { label: 'Generating PDF Part B', active: true },
                { label: 'Applying Digital Certificates', active: false }
            ]}
        />
    );
}
