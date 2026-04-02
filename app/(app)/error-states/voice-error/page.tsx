"use client";
import ErrorState from '@/components/ui/ErrorState';
import { MicOff, Mic } from 'lucide-react';

export default function VoiceErrorPage() {
    return (
        <ErrorState
            colorScheme="amber"
            illustration={
                <div className="text-amber-500 mb-8 flex items-center justify-center relative">
                    <MicOff size={80} strokeWidth={1.5} />
                </div>
            }
            title="Microphone Access Denied"
            description="We couldn't hear you. Please ensure your browser has permission to access the microphone so you can use Voice Commands."
            primaryAction={{ label: 'Try Again', onClick: () => console.log('Mic request'), icon: <Mic size={16} /> }}
            technicalDetails="DOMException: Permission denied at navigator.mediaDevices.getUserMedia. User clicked 'Block' or OS-level mic restrictions are active."
        />
    );
}
