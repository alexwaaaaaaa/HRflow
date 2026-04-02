"use client";
import ErrorState from '@/components/ui/ErrorState';
import { DownloadCloud, Mail } from 'lucide-react';

export default function ExportFailedPage() {
    return (
        <ErrorState
            colorScheme="orange"
            illustration={
                <div className="text-orange-500 mb-8 flex items-center justify-center relative group">
                    <DownloadCloud size={80} strokeWidth={1.5} className="translate-y-2 opacity-50" />
                    <div className="absolute -top-4 text-orange-400 font-black text-xl line-through">DATA.CSV</div>
                </div>
            }
            title="Export Generation Failed"
            description="The requested report export could not be generated due to the immense volume of data or a runtime error. Try exporting a smaller date range."
            primaryAction={{ label: 'Refine Filters', onClick: () => window.history.back(), icon: <DownloadCloud size={16} /> }}
            secondaryAction={{ label: 'Send via Email when ready', onClick: () => console.log('Queue export'), icon: <Mail size={16} /> }}
            technicalDetails="OOM_ERROR: JS heap out of memory. Total rows requested: 852,900. Report Engine: XLSX-Populate. Suggested workaround: Use async background job Queue via BullMQ."
        />
    );
}
