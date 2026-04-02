"use client";
import LoadingState from '@/components/ui/LoadingState';

export default function DashboardSkeletonPage() {
    return (
        <LoadingState
            variant="skeleton"
            title="Loading Analytics Dashboard"
        />
    );
}
