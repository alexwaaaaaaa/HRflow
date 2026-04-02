"use client";
import ErrorState from '@/components/ui/ErrorState';
import { Database, RefreshCw } from 'lucide-react';

export default function SyncFailedPage() {
    return (
        <ErrorState
            colorScheme="orange"
            illustration={
                <div className="text-orange-500 mb-8 flex flex-col items-center justify-center relative">
                    <Database size={80} strokeWidth={1.5} />
                    <div className="absolute top-[40%] text-orange-400 font-bold bg-[#060D1A] px-1 rounded">ERR</div>
                </div>
            }
            title="Biometric Device Sync Failed"
            description="Kaarya could not pull attendance logs from the configured biometric devices. The latest punches from today might not be visible yet."
            primaryAction={{ label: 'Force Manual Sync', onClick: () => console.log('Force sync'), icon: <RefreshCw size={16} /> }}
            technicalDetails="Integration: eSSL Push API. Device IP: 192.168.1.104. Status: Timeout waiting for ping response. Last seen: 4 hours ago."
        />
    );
}
