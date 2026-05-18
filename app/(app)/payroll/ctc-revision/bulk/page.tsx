"use client";

import Link from "next/link";
import { UploadCloud, FileText, CheckCircle2, Download } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function BulkSalaryRevision() {
    return (
        <Page
            title="Bulk CTC Revision Import"
            subtitle="Upload a CSV/Excel file to schedule mass salary increments."
            breadcrumbs={[
                { label: "Payroll", href: "/payroll" },
                { label: "CTC Revision", href: "/payroll/ctc-revision" },
                { label: "Bulk Upload" },
            ]}
            maxWidth="800px"
        >
            <div className="space-y-6">
                <Card padding="lg">
                    {/* Upload Zone */}
                    <div className="mb-6 cursor-pointer rounded-xl border-2 border-dashed border-[#1A2A3A] p-12 text-center transition-all hover:border-[#00E5A0] hover:bg-[rgba(0,229,160,0.05)]">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#1A2A3A]">
                            <UploadCloud size={24} className="text-[#8899AA]" aria-hidden="true" />
                        </div>
                        <p className="mb-2 text-base font-semibold text-white">Click to upload file</p>
                        <p className="text-sm text-[#8899AA]">
                            Supports .xlsx and .csv files up to 10MB. Download the template below if needed.
                        </p>
                    </div>

                    {/* Template Download */}
                    <div className="flex items-center justify-between rounded-lg border border-[#1A2A3A] bg-[#060B14] p-4">
                        <div className="flex items-center gap-3">
                            <FileText size={20} className="text-[#0066FF]" aria-hidden="true" />
                            <div>
                                <p className="text-sm font-medium text-white">hrflow_bulk_revision_template.xlsx</p>
                                <p className="text-xs text-[#8899AA]">Headers: Emp_ID, New_CTC, Effective_Date, Reason</p>
                            </div>
                        </div>
                        <Button variant="secondary" size="sm" icon={<Download size={12} aria-hidden="true" />}>
                            Download Template
                        </Button>
                    </div>
                </Card>

                {/* Validation Rules */}
                <Card
                    variant="bare"
                    className="rounded-2xl border border-dashed border-[rgba(255,184,0,0.3)] bg-[rgba(255,184,0,0.05)] p-6"
                >
                    <div className="mb-4 flex items-start gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[rgba(255,184,0,0.1)]">
                            <CheckCircle2 size={16} className="text-[#FFB800]" aria-hidden="true" />
                        </div>
                        <div>
                            <h3 className="mb-2 text-base font-semibold text-white">Validation Rules</h3>
                            <p className="text-sm text-[#8899AA]">
                                The system will automatically validate the uploaded data against the following rules:
                            </p>
                        </div>
                    </div>

                    <ul className="ml-11 flex flex-col gap-3">
                        <li className="flex items-center gap-3">
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#445566]" aria-hidden="true" />
                            <span className="text-sm text-[#E5E7EB]">
                                New CTC must be greater than current CTC (unless Reason = &quot;Correction&quot;).
                            </span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#445566]" aria-hidden="true" />
                            <span className="text-sm text-[#E5E7EB]">
                                Effective Date must follow <code>DD-MM-YYYY</code> format.
                            </span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#445566]" aria-hidden="true" />
                            <span className="text-sm text-[#E5E7EB]">Rows with invalid Emp_IDs will be flagged.</span>
                        </li>
                    </ul>
                </Card>

                <div className="flex justify-end">
                    <Button disabled>Validate Data</Button>
                </div>

                <div className="text-center">
                    <Link href="/payroll/ctc-revision" className="text-sm text-[#8899AA] hover:text-white">
                        ← Back to Pipeline
                    </Link>
                </div>
            </div>
        </Page>
    );
}
