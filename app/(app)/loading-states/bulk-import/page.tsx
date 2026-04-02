"use client";
import LoadingState from '@/components/ui/LoadingState';
import { Database } from 'lucide-react';

export default function BulkImportProcessingPage() {
    return (
        <LoadingState
            variant="spinner"
            colorScheme="sky"
            icon={<Database size={24} />}
            title="Importing Employee Roster"
            description="Parsing 842 rows of CSV data. We are mapping custom fields, validating email domains, and performing duplicate checks."
            estimatedTimeLeft="~45 seconds"
        />
    );
}
