"use client";
import ErrorState from '@/components/ui/ErrorState';
import { Settings, ExternalLink } from 'lucide-react';

export default function MaintenanceModePage() {
    return (
        <ErrorState
            colorScheme="amber"
            illustration={
                <div className="relative flex items-center justify-center mb-8">
                    <div className="text-amber-500 animate-spin-slow absolute">
                        <Settings size={96} strokeWidth={1} />
                    </div>
                    <div className="bg-[#060D1A] rounded-full p-2 z-10 w-16 h-16 flex items-center justify-center ring-4 ring-[#060D1A]">
                        <Settings size={40} className="text-amber-500 animate-spin-slow reverse" />
                    </div>
                </div>
            }
            title="System Maintenance"
            description="Kaarya is currently undergoing scheduled maintenance to upgrade our payroll engine. The system will be back online in approximately 45 minutes."
            primaryAction={{ label: 'Check Status Page', onClick: () => console.log('Status page'), icon: <ExternalLink size={16} /> }}
            technicalDetails="Deployment ID: dep_89xqw2. Maintenance Window: 02:00 IST to 03:00 IST. Next retry polling interval: 60s."
        />
    );
}
