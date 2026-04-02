"use client";
import ErrorState from '@/components/ui/ErrorState';
import { UploadCloud, RefreshCcw } from 'lucide-react';

export default function UploadFailedPage() {
    return (
        <ErrorState
            colorScheme="rose"
            illustration={
                <div className="text-rose-500 mb-8 flex flex-col items-center justify-center relative">
                    <UploadCloud size={80} strokeWidth={1.5} className="opacity-50" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-rose-500 font-bold text-2xl">X</div>
                </div>
            }
            title="Upload Failed"
            description="The connection was interrupted while uploading your files to the server. Your data was not saved."
            primaryAction={{ label: 'Retry Upload', onClick: () => console.log('Retry upload'), icon: <RefreshCcw size={16} /> }}
            technicalDetails="Request Timeout: 30000ms exceeded. S3 Multipart Upload aborted. UploadId: 'upload_bZ9x1sKq...'"
        />
    );
}
