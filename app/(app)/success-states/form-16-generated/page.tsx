"use client";
import SuccessState from '@/components/ui/SuccessState';
import { Send, DownloadCloud } from 'lucide-react';

export default function Form16GeneratedPage() {
    return (
        <SuccessState
            title="Form 16 Generated"
            description="Part A and Part B of Form 16 have been digitally signed and stitched together for all eligible employees for FY 2023-24."
            metrics={[
                { label: 'Eligible Employees', value: '412' },
                { label: 'Generated', value: '412 / 412' },
                { label: 'Digital Signatures', value: 'Valid' }
            ]}
            primaryAction={{ label: 'Publish to Employees', onClick: () => console.log('Publish'), icon: <Send size={16} /> }}
            secondaryAction={{ label: 'Download Master Zip', onClick: () => console.log('Download Zip'), icon: <DownloadCloud size={16} /> }}
        />
    );
}
