"use client";
import SuccessState from '@/components/ui/SuccessState';
import { BookOpen, Award } from 'lucide-react';

export default function CourseCompletedPage() {
    return (
        <SuccessState
            title="Course Completed!"
            description="Congratulations on completing 'Advanced Leadership & Management'. You've earned 5 learning credits and your manager has been notified of your achievement."
            metrics={[
                { label: 'Score', value: '94%' },
                { label: 'Time Spent', value: '4h 20m' },
                { label: 'Credits Earned', value: '+5' }
            ]}
            primaryAction={{ label: 'View Certificate', href: '/lms/certificates', icon: <Award size={16} /> }}
            secondaryAction={{ label: 'Browse More Courses', href: '/lms/library', icon: <BookOpen size={16} /> }}
            confetti={true}
        />
    );
}
