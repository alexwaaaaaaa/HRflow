"use client";
import LoadingState from '@/components/ui/LoadingState';
import { Sparkles } from 'lucide-react';

export default function AiCopilotPage() {
    return (
        <LoadingState
            variant="ripple"
            colorScheme="indigo"
            icon={<Sparkles size={32} />}
            title="Kaarya AI is Thinking..."
            description="Processing your prompt: 'Write an empathetic rejection email for a Senior Product Manager role'. Synthesizing company tone."
        />
    );
}
