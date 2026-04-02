"use client";
import LoadingState from '@/components/ui/LoadingState';

export default function SalaryComputingPage() {
    return (
        <LoadingState
            variant="progress"
            colorScheme="emerald"
            title="Recalculating Salary"
            description="Applying mid-month increment and prorating components. Calculating arrears for the previous two months."
            progress={25}
            steps={[
                { label: 'Applying Arrears logic', active: true },
                { label: 'Prorating Basic Pay', active: false },
                { label: 'Adjusting PF/PT limits', active: false }
            ]}
        />
    );
}
