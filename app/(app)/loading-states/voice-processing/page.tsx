"use client";
import LoadingState from '@/components/ui/LoadingState';
import { Mic } from 'lucide-react';

export default function VoiceProcessingPage() {
    return (
        <LoadingState
            variant="ripple"
            colorScheme="sky"
            icon={<Mic size={32} />}
            title="Processing Voice Command"
            description="Transcribing audio and converting intent into system actions via NLP."
            estimatedTimeLeft="~1.5 seconds"
        />
    );
}
