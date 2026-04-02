"use client";
import LoadingState from '@/components/ui/LoadingState';

export default function ReportGeneratingPage() {
    return (
        <LoadingState
            variant="spinner"
            colorScheme="emerald"
            title="Compiling Report Data"
            description="Aggregating performance scores across 4 divisions. Complex matrix queries may take up to a minute to resolve."
        />
    );
}
