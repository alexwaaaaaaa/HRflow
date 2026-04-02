"use client";
import ErrorState from '@/components/ui/ErrorState';
import { FileWarning, Upload } from 'lucide-react';

export default function InvalidFormatPage() {
    return (
        <ErrorState
            colorScheme="amber"
            illustration={
                <div className="text-amber-500 mb-8 flex items-center justify-center">
                    <FileWarning size={80} strokeWidth={1.5} />
                </div>
            }
            title="Invalid File Format"
            description="We couldn't process this file. For resumes and documents, we only accept PDF, DOCX, or PNG/JPEG formats."
            primaryAction={{ label: 'Select Another File', onClick: () => console.log('File picker'), icon: <Upload size={16} /> }}
            technicalDetails="MIME Type Rejected: 'application/x-zip-compressed'. Allowed MIME types constraint: ['application/pdf', 'image/jpeg', 'image/png']. Parser exception on magic bytes reading."
        />
    );
}
