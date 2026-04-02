"use client";
import ErrorState from '@/components/ui/ErrorState';
import { Fingerprint, FingerprintIcon as FingerprintFace } from 'lucide-react';

export default function BiometricErrorPage() {
    return (
        <ErrorState
            colorScheme="red"
            illustration={
                <div className="text-red-500 mb-8 relative flex items-center justify-center">
                    <Fingerprint size={80} strokeWidth={1.5} />
                    <div className="absolute inset-0 border-t-2 border-red-500 animate-pulse rounded-full" />
                </div>
            }
            title="Biometric Mismatch"
            description="Authentication via WebAuthn or device biometric failed. We could not verify your identity. Please log in using your password and 2FA instead."
            primaryAction={{ label: 'Use Password & 2FA', href: '/login', icon: <FingerprintFace size={16} /> }}
            technicalDetails="WebAuthn Error: NotAllowedError. The operation either timed out or was not allowed. Platform Authenticator assertion rejected."
        />
    );
}
