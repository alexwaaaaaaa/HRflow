"use client";
import LoadingState from '@/components/ui/LoadingState';

export default function AttendanceProcessingPage() {
    return (
        <LoadingState
            variant="metrics"
            colorScheme="indigo"
            title="Processing Attendance Logs"
            description="Normalizing raw biometric punches against assigned shift rosters to calculate daily attendance and overtime."
            estimatedTimeLeft="~35 seconds"
        />
    );
}
