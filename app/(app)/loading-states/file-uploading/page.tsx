"use client";
import LoadingState from '@/components/ui/LoadingState';
import { UploadCloud } from 'lucide-react';

export default function FileUploadingPage() {
    return (
        <LoadingState
            variant="spinner"
            colorScheme="sky"
            icon={<UploadCloud size={24} />}
            title="Uploading Document..."
            description="Securely transferring file 'Employee_Handbook_2024.pdf' to scalable S3 storage via an encrypted channel."
            estimatedTimeLeft="~8 seconds"
        />
    );
}
