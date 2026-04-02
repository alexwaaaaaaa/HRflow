"use client";
import ErrorState from '@/components/ui/ErrorState';
import { BrainCircuit, Cpu } from 'lucide-react';

export default function AiErrorPage() {
    return (
        <ErrorState
            colorScheme="rose"
            illustration={
                <div className="text-rose-500 mb-8 flex items-center justify-center relative">
                    <BrainCircuit size={80} strokeWidth={1.5} />
                    <div className="absolute inset-0 bg-rose-500/20 rounded-full blur-xl -z-10 animate-pulse" />
                </div>
            }
            title="AI Processing Limit Exceeded"
            description="Kaarya AI engine is currently overloaded or you have exceeded your organisation's monthly AI token quota. Please try standard processing modes."
            primaryAction={{ label: 'Upgrade AI Quota', href: '/settings/billing', icon: <Cpu size={16} /> }}
            technicalDetails="Provider: OpenAI (gpt-4-turbo). Error: 429 Too Many Requests. Rate limit reached for requests per minute. Reset expected in 52s."
        />
    );
}
