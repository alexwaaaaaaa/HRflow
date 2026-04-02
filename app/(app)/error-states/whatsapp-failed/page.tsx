"use client";
import ErrorState from '@/components/ui/ErrorState';
import { MessageCircleX, Settings } from 'lucide-react';

export default function WhatsappFailedPage() {
    return (
        <ErrorState
            colorScheme="amber"
            illustration={
                <div className="text-amber-500 mb-8 flex items-center justify-center relative">
                    <MessageCircleX size={80} strokeWidth={1.5} />
                </div>
            }
            title="WhatsApp Delivery Failed"
            description="We couldn't deliver the WhatsApp notification. This usually happens if the template hasn't been approved by Meta or if the recipient opted out."
            primaryAction={{ label: 'Review Templates', href: '/settings/whatsapp', icon: <Settings size={16} /> }}
            technicalDetails="WhatsApp Business API Error: 132001. Template name 'salary_slip_v2' does not exist in the approved library or language mismatch (en_US)."
        />
    );
}
