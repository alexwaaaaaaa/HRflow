"use client";

import Link from "next/link";
import { ArrowLeft, RefreshCw, ShieldCheck, Building2 } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function NeftConfirm() {
    return (
        <Page
            title="Push to ICICI Portal"
            subtitle="You are about to initiate a direct API transfer to ICICI Bank."
            breadcrumbs={[
                { label: "Payroll", href: "/payroll" },
                { label: "Disburse", href: "/payroll/run/disburse" },
                { label: "NEFT Confirm" },
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

                {/* Header */}
                <div className="flex items-start gap-5">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[rgba(0,102,255,0.1)]">
                        <RefreshCw size={32} className="text-[#0066FF]" aria-hidden="true" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">Push to ICICI Portal</h2>
                        <p className="mt-1 text-sm leading-relaxed text-[#8899AA]">
                            This will create a pending transaction in your Corporate Internet Banking portal.
                            No funds will be deducted until your authorized signatory approves the transaction.
                        </p>
                    </div>
                </div>

                {/* Transfer Details */}
                <Card padding="lg">
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#1A2A3A] pb-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1A2A3A]">
                                <Building2 size={24} className="text-[#8899AA]" aria-hidden="true" />
                            </div>
                            <div>
                                <p className="text-xs text-[#8899AA]">Debit Account</p>
                                <p className="text-base font-semibold text-white">ICICI Current •••• 4521</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-[#8899AA]">Total Amount to Disburse</p>
                            <p className="text-2xl font-bold text-[#00E5A0]">₹3,82,05,000</p>
                            <p className="text-xs text-[#445566]">844 Transactions</p>
                        </div>
                    </div>

                    <div className="mb-6 flex items-start gap-3">
                        <ShieldCheck size={20} className="mt-0.5 shrink-0 text-[#00E5A0]" aria-hidden="true" />
                        <p className="text-sm leading-relaxed text-white">
                            By clicking &quot;Initiate Transfer&quot;, HRFlow will securely transmit the payout instructions
                            to the bank via API. No funds will be deducted until your authorized signatory approves
                            the transaction on the ICICI portal.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <Button className="flex-1">
                            Initiate Transfer to Bank
                        </Button>
                        <Button variant="outline" href="/payroll/run/disburse">Cancel</Button>
                    </div>
                </Card>

                <p className="text-center text-sm text-[#8899AA]">
                    API transfers are processed within seconds. Please ensure you have sufficient balance before
                    approving on the portal.
                </p>
            </div>
        </Page>
    );
}
