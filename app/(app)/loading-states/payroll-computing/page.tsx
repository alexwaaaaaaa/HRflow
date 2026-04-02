"use client";
import LoadingState from '@/components/ui/LoadingState';

export default function PayrollComputingPage() {
    return (
        <LoadingState
            variant="progress"
            colorScheme="amber"
            title="Running Payroll Engine"
            description="Calculating gross pay, statutory deductions, tax liabilities, and net pay for the October 2024 cycle."
            progress={68}
            steps={[
                { label: 'Fetching Attendance Logs', completed: true },
                { label: 'Resolving Leave Balances', completed: true },
                { label: 'Computing Variable Pay', active: true },
                { label: 'Calculating Tax (TDS)', active: false },
                { label: 'Generating Registers', active: false }
            ]}
        />
    );
}
