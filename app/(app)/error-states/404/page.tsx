"use client";
import ErrorState from '@/components/ui/ErrorState';
import { Home, Search } from 'lucide-react';

export default function NotFoundErrorPage() {
    return (
        <ErrorState
            errorCode="404"
            colorScheme="amber"
            title="Page not found"
            description="The page you're looking for doesn't exist or has been moved. Check the URL or navigate back to safety."
            primaryAction={{ label: 'Go to Dashboard', href: '/', icon: <Home size={16} /> }}
            secondaryAction={{ label: 'Global Search', onClick: () => console.log('Open search'), icon: <Search size={16} /> }}
            technicalDetails="Route segment /app/error-states/404 matched but valid layout/page tree not found in navigation manifest."
        />
    );
}
