"use client";
import SuccessState from '@/components/ui/SuccessState';
import { FileUp, FolderOpen } from 'lucide-react';

export default function DocumentUploadedPage() {
    return (
        <SuccessState
            title="Document Uploaded"
            description="The 'Company Leave Policy 2024' document has been encrypted and securely stored in your repository. It is now accessible to all employees."
            metrics={[
                { label: 'File Type', value: 'PDF (2.4MB)' },
                { label: 'Category', value: 'HR Policies' },
                { label: 'Access', value: 'All Employees' }
            ]}
            primaryAction={{ label: 'Upload Another', href: '/documents/upload', icon: <FileUp size={16} /> }}
            secondaryAction={{ label: 'View Repository', href: '/documents/repository', icon: <FolderOpen size={16} /> }}
        />
    );
}
