"use client";
import ErrorState from '@/components/ui/ErrorState';
import { FileWarning, Banknote } from 'lucide-react';

export default function ComplianceFilingErrorPage() {
    return (
        <ErrorState
            colorScheme="amber"
            illustration={
                <div className="text-amber-500 mb-8 flex items-center justify-center">
                    <FileWarning size={80} strokeWidth={1.5} />
                </div>
            }
            title="EPFO/ESIC Filing Failed"
            description="Kaarya could not sync the compliance return files to the government portal. The API gateway might be down or credentials might have expired."
            primaryAction={{ label: 'Retry Filing Sync', onClick: () => console.log('Sync'), icon: <RefreshCcw size={16} /> }}
            secondaryAction={{ label: 'Download ECR for Manual Upload', onClick: () => console.log('Download ECR'), icon: <Banknote size={16} /> }}
            technicalDetails="Target: unifiedportal-epfo.epfindia.gov.in. Error Code: 503 Bad Gateway (Target Upstream Unavailable). Operation: Bulk ECR Upload."
        />
    );
}

// Inline missing lucide icon
function RefreshCcw(props: any) {
    return <svg xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 2v6h6" /><path d="M21 12A9 9 0 0 0 6 5.3L3 8" /><path d="M21 22v-6h-6" /><path d="M3 12a9 9 0 0 0 15 6.7l3-2.7" /></svg>;
}
