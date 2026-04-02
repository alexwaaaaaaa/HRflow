"use client";
import SuccessState from '@/components/ui/SuccessState';
import { DownloadCloud, Mail } from 'lucide-react';

export default function DataExportReadyPage() {
    return (
        <SuccessState
            title="Data Export Ready"
            description="The 'Annual Payroll Register 2023-24' has been successfully compiled and is ready for download. For security, this link will expire in 24 hours."
            metrics={[
                { label: 'Format', value: 'Excel (.xlsx)' },
                { label: 'File Size', value: '14.2 MB' },
                { label: 'Rows', value: '12,450' }
            ]}
            primaryAction={{ label: 'Download Now', onClick: () => console.log('Download export'), icon: <DownloadCloud size={16} /> }}
            secondaryAction={{ label: 'Email as Attachment', onClick: () => console.log('Email export'), icon: <Mail size={16} /> }}
        />
    );
}
