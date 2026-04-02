"use client";
import ErrorState from '@/components/ui/ErrorState';
import { WifiOff, RefreshCw } from 'lucide-react';

export default function NetworkErrorPage() {
    return (
        <ErrorState
            colorScheme="orange"
            illustration={<div className="text-orange-500 mb-8"><WifiOff size={80} strokeWidth={1.5} /></div>}
            title="Connection Lost"
            description="We couldn't reach the server. Please check your internet connection and verify that your VPN is configured correctly if you're working remotely."
            primaryAction={{ label: 'Retry Connection', onClick: () => window.location.reload(), icon: <RefreshCw size={16} /> }}
            technicalDetails="TypeError: Failed to fetch\n    at Client._callee$ (http.js:122)\nSTATUS_CODE: ERR_INTERNET_DISCONNECTED"
        />
    );
}
