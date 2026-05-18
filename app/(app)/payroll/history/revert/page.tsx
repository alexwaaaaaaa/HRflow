"use client";

import { AlertTriangle, RefreshCcw, Lock, CheckCircle2 } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function RevertPayroll() {
    return (
        <Page
            title="Revert Payroll Batch (Nov 2024)"
            subtitle="Delete the generated payroll register and unlock attendance to make corrections."
            breadcrumbs={[
                { label: "Payroll", href: "/payroll" },
                { label: "History", href: "/payroll/history" },
                { label: "Revert" },
            ]}
            maxWidth="800px"
        >
            <div className="space-y-6">
                {/* Critical Warning */}
                <Card
                    variant="bare"
                    className="rounded-2xl border border-red-500/30 bg-red-500/5 p-6"
                >
                    <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-500/10">
                            <AlertTriangle size={24} className="text-red-400" aria-hidden="true" />
                        </div>
                        <div>
                            <h2 className="mb-2 text-base font-semibold text-red-400">Critical Warning</h2>
                            <p className="mb-4 text-sm leading-relaxed text-white">
                                Reverting payroll is a destructive action that unpacks the currently locked batch. It will delete all generated payslips for Nov 2024 and remove the bank payout file.
                            </p>
                            <ul className="flex flex-col gap-2 text-sm text-[#8899AA]">
                                <li>• Employees who have already received their payslip via email will see an invalid link.</li>
                                <li>• Pending arrears and LOP values will be un-consumed and sent back to the draft queue.</li>
                                <li>• Make sure bank disbursement has <strong className="text-white">NOT</strong> been initiated.</li>
                            </ul>
                        </div>
                    </div>
                </Card>

                {/* Reversion Scope */}
                <Card padding="lg">
                    <h3 className="mb-4 text-base font-semibold text-white">Reversion Scope (842 Employees)</h3>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <CheckCircle2 size={18} className="text-[#00E5A0]" aria-hidden="true" />
                            <span className="text-sm text-[#E5E7EB]">Payslips deleted from Employee Portal</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <CheckCircle2 size={18} className="text-[#00E5A0]" aria-hidden="true" />
                            <span className="text-sm text-[#E5E7EB]">Attendance &amp; LOP tracking unlocked for November</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <CheckCircle2 size={18} className="text-[#00E5A0]" aria-hidden="true" />
                            <span className="text-sm text-[#E5E7EB]">Arrears &amp; Variable Pay inputs marked as &quot;Draft&quot;</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Lock size={18} className="text-[#8899AA]" aria-hidden="true" />
                            <span className="text-sm text-[#8899AA]">Statutory Challans (PF/PT/TDS) remain untouched unless regenerated</span>
                        </div>
                    </div>
                </Card>

                {/* Reason Form */}
                <Card padding="lg">
                    <label htmlFor="revert-reason" className="mb-2 block text-sm font-medium text-white">
                        Reason for Reversion
                    </label>
                    <textarea
                        id="revert-reason"
                        rows={4}
                        placeholder="E.g., Missed 5 employee increments, need to adjust basic salary before payout..."
                        className="w-full resize-none rounded-lg border border-[#1A2A3A] bg-[#0D1928] p-3 text-sm text-white outline-none focus:border-[#00e5a0]"
                    />

                    <div className="mt-6 flex justify-end gap-3">
                        <Button variant="outline" href="/payroll/history">Cancel</Button>
                        <Button variant="danger" icon={<RefreshCcw size={14} aria-hidden="true" />}>
                            Confirm Revert Batch
                        </Button>
                    </div>
                </Card>
            </div>
        </Page>
    );
}
