"use client";
import ErrorState from '@/components/ui/ErrorState';
import { RefreshCcw, HeadphonesIcon } from 'lucide-react';

export default function ServerErrorPage() {
    return (
        <ErrorState
            errorCode="500"
            colorScheme="red"
            title="Internal Server Error"
            description="Something went wrong on our end. Our engineering team has been notified and is looking into the issue."
            primaryAction={{ label: 'Try Again', onClick: () => window.location.reload(), icon: <RefreshCcw size={16} /> }}
            secondaryAction={{ label: 'Contact Support', href: '/helpdesk/raise', icon: <HeadphonesIcon size={16} /> }}
            technicalDetails="TypeError: Cannot read properties of undefined (reading 'company_id')\n    at Runtime.execute (/api/v1/payroll/calculate:45:12)"
        />
    );
}
