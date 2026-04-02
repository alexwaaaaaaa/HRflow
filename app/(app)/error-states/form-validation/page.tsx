"use client";
import ErrorState from '@/components/ui/ErrorState';
import { AlertCircle, ArrowLeft } from 'lucide-react';

export default function FormValidationPage() {
    return (
        <ErrorState
            colorScheme="orange"
            illustration={
                <div className="text-orange-500 mb-8 flex items-center justify-center">
                    <AlertCircle size={80} strokeWidth={1.5} />
                </div>
            }
            title="Validation Error"
            description="There were multiple issues with your submission. Please check the highlighted fields and ensure all mandatory data is provided."
            primaryAction={{ label: 'Return to Form', onClick: () => window.history.back(), icon: <ArrowLeft size={16} /> }}
            technicalDetails="Status 422 Unprocessable Entity.\nErrors: \n- $.employee.pan_number: Does not match regex ^[A-Z]{5}[0-9]{4}[A-Z]{1}$.\n- $.employee.bank_account: Must be between 9 and 18 digits."
        />
    );
}
