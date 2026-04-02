"use client";
import EmptyState from '@/components/ui/EmptyState';
import { Upload, FolderOpen } from 'lucide-react';

function IllustrationDocuments() {
    return (
        <svg width="180" height="160" viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Folder back */}
            <path d="M25 65 L25 140 Q25 148 33 148 L147 148 Q155 148 155 140 L155 65 Z" fill="#0D1928" stroke="#1A2A3A" strokeWidth="2" />
            <path d="M25 65 L25 55 Q25 47 33 47 L80 47 L90 60 L147 60 Q155 60 155 68 L155 65 Z" fill="#131B2B" stroke="#1A2A3A" strokeWidth="2" />
            {/* Docs inside */}
            <rect x="50" y="82" width="80" height="50" rx="6" fill="#060D1A" stroke="#1A2A3A" strokeWidth="1.5" />
            <rect x="60" y="95" width="50" height="5" rx="2.5" fill="#1A2A3A" />
            <rect x="60" y="105" width="38" height="5" rx="2.5" fill="#1A2A3A" />
            {/* Upload arrow */}
            <path d="M90 108 L90 90 M84 96 L90 90 L96 96" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export default function NoDocumentsPage() {
    return (
        <EmptyState
            illustration={<IllustrationDocuments />}
            badge="Document Hub"
            badgeColor="sky"
            title="No documents uploaded yet"
            description="Centralize your HR documents in one secure place. Upload offer letters, policies, ID proofs, and any other company or employee documents."
            primaryAction={{ label: 'Upload Document', href: '/documents/upload', icon: <Upload size={16} /> }}
            secondaryAction={{ label: 'Create Category', href: '/documents/categories', icon: <FolderOpen size={16} /> }}
            tips={[
                'Organize documents by category (Policies, Contracts, ID Proofs) for easy discovery.',
                'Enable expiry tracking for time-sensitive documents like visas or certifications.',
                'Use bulk upload to migrate existing documents from Google Drive or SharePoint.',
            ]}
        />
    );
}
