"use client";
import LoadingState from '@/components/ui/LoadingState';

export default function ExportProcessingPage() {
    return (
        <LoadingState
            variant="progress"
            colorScheme="amber"
            title="Compiling Data Export"
            description="Generating a massive dataset of 'All Time Payroll Register'. This requires joining multiple historical shards."
            progress={45}
            steps={[
                { label: 'Querying Historical Data', completed: true },
                { label: 'Formatting as XLSX', active: true },
                { label: 'Compressing to Zip', active: false }
            ]}
        />
    );
}
