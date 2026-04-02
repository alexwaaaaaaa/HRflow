"use client";
import LoadingState from '@/components/ui/LoadingState';
import { ScanFace } from 'lucide-react';

export default function FaceRecognitionPage() {
    return (
        <LoadingState
            variant="ripple"
            colorScheme="emerald"
            icon={<ScanFace size={32} />}
            title="Biometric Verification"
            description="Comparing live camera feed against stored geometric hashes to authenticate your identity for clock-in."
        />
    );
}
