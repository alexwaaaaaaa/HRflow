"use client";
import ErrorState from '@/components/ui/ErrorState';
import { Calculator, ArrowLeft } from 'lucide-react';

export default function PayrollErrorPage() {
    return (
        <ErrorState
            colorScheme="red"
            illustration={
                <div className="text-red-500 mb-8 flex items-center justify-center">
                    <div className="relative">
                        <Calculator size={80} strokeWidth={1.5} />
                        <div className="absolute -inset-4 border-2 border-red-500/20 rounded-[1rem] -rotate-6" />
                    </div>
                </div>
            }
            title="Payroll Calculation Error"
            description="A critical error occurred while executing the payroll engine. Gross and Net pay computations have been halted to prevent inaccurate disbursements."
            primaryAction={{ label: 'Review Payroll Logs', href: '/payroll/logs', icon: <Calculator size={16} /> }}
            secondaryAction={{ label: 'Go to Dashboard', href: '/payroll', icon: <ArrowLeft size={16} /> }}
            technicalDetails="EvalError: Formula syntax error in dynamic component 'Performance_Bonus_Multiplier'. Unresolved token '$.kpi_score' for Employee EMP-293."
        />
    );
}
