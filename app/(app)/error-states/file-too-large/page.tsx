"use client";
import ErrorState from '@/components/ui/ErrorState';
import { HardDrive, UploadCloud } from 'lucide-react';

export default function FileTooLargePage() {
    return (
        <ErrorState
            colorScheme="amber"
            illustration={
                <div className="text-amber-500 mb-8 flex items-center justify-center relative">
                    <HardDrive size={80} strokeWidth={1.5} />
                    <div className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full border-2 border-[#060D1A]">MAX 10MB</div>
                </div>
            }
            title="File Too Large"
            description="The document you're trying to upload exceeds the maximum allowed file size of 10MB. Please compress the file and try again."
            primaryAction={{ label: 'Compress & Retry', onClick: () => console.log('Retry upload modal'), icon: <UploadCloud size={16} /> }}
            technicalDetails="File Name: 'employee_handbook_v5_highres.pdf'. File Size: 24.5MB (25,690,112 bytes). Form limit: 10485760 bytes. Rejection point: Multer/S3 Buffer."
        />
    );
}
