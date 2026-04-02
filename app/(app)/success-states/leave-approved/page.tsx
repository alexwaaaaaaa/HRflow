"use client";
import SuccessState from '@/components/ui/SuccessState';
import { CalendarCheck, ArrowRight } from 'lucide-react';

export default function LeaveApprovedPage() {
    return (
        <SuccessState
            title="Leave Request Approved"
            description="You have successfully approved Rahul Sharma's Annual Leave request. Both the employee and the department calendar have been updated."
            metrics={[
                { label: 'Duration', value: '4 Days' },
                { label: 'Dates', value: '12 Nov - 15 Nov' },
                { label: 'Deducted From', value: 'Annual Leave' }
            ]}
            primaryAction={{ label: 'View Team Calendar', href: '/leave/calendar', icon: <CalendarCheck size={16} /> }}
            secondaryAction={{ label: 'Next Pending Request', href: '/leave/approvals', icon: <ArrowRight size={16} /> }}
            confetti={false}
        />
    );
}
