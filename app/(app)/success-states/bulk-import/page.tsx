"use client";
import SuccessState from '@/components/ui/SuccessState';
import { Users, FileDown } from 'lucide-react';

export default function BulkImportCompletePage() {
    return (
        <SuccessState
            title="Bulk Roster Import Complete"
            description="The employee CSV file was successfully parsed and integrated into Kaarya. Welcome emails have been scheduled for all valid records."
            metrics={[
                { label: 'Records Processed', value: '850' },
                { label: 'Successfully Added', value: '842' },
                { label: 'Skipped (Errors)', value: '8' }
            ]}
            primaryAction={{ label: 'View Employee Directory', href: '/employees', icon: <Users size={16} /> }}
            secondaryAction={{ label: 'Download Error Log', onClick: () => console.log('Download Errors'), icon: <FileDown size={16} /> }}
            confetti={false}
        />
    );
}
