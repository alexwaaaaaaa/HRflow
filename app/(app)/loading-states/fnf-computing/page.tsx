"use client";
import LoadingState from '@/components/ui/LoadingState';

export default function FnfComputingPage() {
    return (
        <LoadingState
            variant="progress"
            colorScheme="rose"
            title="Computing FnF Settlement"
            description="Calculating final dues tailored for Notice Period recoveries, Leave Encashment, and Gratuity for EMP-1032."
            progress={72}
            steps={[
                { label: 'Revoking System Access', completed: true },
                { label: 'Calculating Leave Encashment', completed: true },
                { label: 'Checking Asset Recoveries', active: true },
                { label: 'Generating Final Payslip', active: false }
            ]}
        />
    );
}
