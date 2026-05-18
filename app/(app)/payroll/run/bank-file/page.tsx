"use client";

import Link from "next/link";
import { ArrowLeft, Download, Eye, FileText, Info } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function BankFileDownload() {
    return (
        <Page
            title="Bank Transfer File Generated"
            subtitle="The ICICI Corporate Salary transfer file for November 2024 has been successfully generated."
            breadcrumbs={[
                { label: "Payroll", href: "/payroll" },
                { label: "Disburse", href: "/payroll/run/disburse" },
                { label: "Bank File" },
            ]}
            maxWidth="800px"
        >
            <div className="space-y-6">
                {/* Back link */}
                <Link
                    href="/payroll/run/disburse"
                    className="inline-flex items-center gap-1.5 text-sm text-[#8899AA] transition-colors hover:text-white"
                >
                    <ArrowLeft size={14} aria-hidden="true" /> Back to Disbursement Methods
                </Link>

                {/* File Details */}
                <Card padding="lg">
                    <div className="mb-6 flex items-center gap-4">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[rgba(0,229,160,0.1)]">
                            <FileText size={32} className="text-[#00E5A0]" aria-hidden="true" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Bank Transfer File Generated</h2>
                            <p className="text-sm text-[#8899AA]">
                                Please download and upload it to the ICICI Corporate portal to process the payouts.
                            </p>
                        </div>
                    </div>

                    <dl className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div>
                            <dt className="text-xs text-[#8899AA]">File Format</dt>
                            <dd className="mt-1 text-sm font-semibold text-white">ICICI 80-Column TXT Format</dd>
                        </div>
                        <div>
                            <dt className="text-xs text-[#8899AA]">Payment Processing Date</dt>
                            <dd className="mt-1 text-sm font-semibold text-white">28 Nov, 2024</dd>
                        </div>
                        <div>
                            <dt className="text-xs text-[#8899AA]">Total Amount</dt>
                            <dd className="mt-1 text-sm font-semibold text-[#00E5A0]">₹3,82,05,000</dd>
                        </div>
                        <div>
                            <dt className="text-xs text-[#8899AA]">Transactions</dt>
                            <dd className="mt-1 text-sm font-semibold text-white">844 Employees</dd>
                        </div>
                    </dl>

                    <div className="flex gap-3">
                        <Button className="flex-1" icon={<Download size={18} aria-hidden="true" />}>
                            Download ICICI_NOV24_SBT.txt
                        </Button>
                        <Button variant="secondary" icon={<Eye size={18} aria-hidden="true" />}>
                            Preview File
                        </Button>
                    </div>
                </Card>

                {/* Upload Instructions */}
                <Card
                    variant="bare"
                    className="rounded-2xl border border-[rgba(0,102,255,0.2)] bg-[rgba(0,102,255,0.05)] p-6"
                >
                    <div className="flex items-start gap-3">
                        <Info size={20} className="mt-0.5 shrink-0 text-[#0066FF]" aria-hidden="true" />
                        <div>
                            <h3 className="mb-3 text-sm font-semibold text-white">Upload Instructions</h3>
                            <ol className="flex flex-col gap-2 pl-4 text-sm leading-relaxed text-[#8899AA]">
                                <li>Login to your ICICI Corporate Internet Banking portal.</li>
                                <li>Navigate to <strong className="text-white">Transfers</strong> &gt; <strong className="text-white">Bulk Upload</strong> &gt; <strong className="text-white">Salary Transfer</strong>.</li>
                                <li>Select the source account (•••• 4521).</li>
                                <li>Upload the downloaded <code className="rounded bg-[#1A2A3A] px-1 text-xs">.txt</code> file and submit.</li>
                                <li>Approve the transaction using the Maker-Checker workflow on the portal.</li>
                            </ol>
                        </div>
                    </div>
                </Card>

                <div className="text-center">
                    <Link href="/payroll/run/disburse">
                        <Button variant="ghost">
                            I&apos;ve uploaded the file. Take me back to step 8.
                        </Button>
                    </Link>
                </div>
            </div>
        </Page>
    );
}
