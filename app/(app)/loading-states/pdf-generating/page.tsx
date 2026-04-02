"use client";
import LoadingState from '@/components/ui/LoadingState';

export default function PdfGeneratingPage() {
    return (
        <LoadingState
            variant="metrics"
            colorScheme="rose"
            title="Generating PDF Document"
            description="Compiling the 'Annual Leave Policy 2024' into a secure PDF format. Optimising fonts and compressing images."
            estimatedTimeLeft="~10 seconds"
        />
    );
}
