"use client";

import React from "react";
import {
    ExternalLink,
    ShieldAlert,
    FileText,
    CheckCircle2,
    RefreshCw,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function Form26ASView() {
    return (
        <Page
            title="Form 26AS / Annual Information Statement (AIS)"
            subtitle="Access your consolidated tax statement directly from the Income Tax portal."
            breadcrumbs={[
                { label: "Tax", href: "/tax/dashboard" },
                { label: "Form 26AS" },
            ]}
            maxWidth="900px"
        >
            <div className="space-y-6">
                {/* Info Card */}
                <Card padding="lg" className="relative overflow-hidden">
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0066FF]/10 to-transparent pointer-events-none" aria-hidden="true" />
                    <div className="flex items-start space-x-6">
                        <div className="w-16 h-16 bg-[#0066FF]/10 rounded-2xl flex items-center justify-center shrink-0 text-[#0066FF] border border-[#0066FF]/20">
                            <FileText size={32} aria-hidden="true" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">Connect to IT Portal</h3>
                            <p className="text-sm text-[#8899AA] mb-6 leading-relaxed">
                                Form 26AS is a consolidated annual tax statement issued by the Income Tax Department. It contains
                                details of tax deducted on your behalf by employers, banks, and other deductors. HRFlow can redirect
                                you securely to download your latest statement.
                            </p>
                            <div className="flex space-x-4">
                                <Button icon={<ExternalLink size={16} />}>
                                    Login to e-Filing Portal
                                </Button>
                                <Button variant="secondary" icon={<RefreshCw size={16} />}>
                                    Fetch Summary (OTP required)
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Important Notes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card padding="lg">
                        <h4 className="flex items-center text-sm font-bold text-white mb-3">
                            <ShieldAlert size={16} className="text-[#FFB800] mr-2" aria-hidden="true" /> Why check Form 26AS?
                        </h4>
                        <ul className="text-sm text-[#8899AA] space-y-2 list-disc pl-4 marker:text-[#445566]">
                            <li>
                                Verify that the TDS deducted by your employer has been successfully deposited against your PAN.
                            </li>
                            <li>Check for any TDS deducted on interest income by your banks.</li>
                            <li>
                                Ensure no mismatch exists before filing your Income Tax Return to avoid notices.
                            </li>
                        </ul>
                    </Card>

                    <Card padding="lg">
                        <h4 className="flex items-center text-sm font-bold text-white mb-3">
                            <CheckCircle2 size={16} className="text-[#00E5A0] mr-2" aria-hidden="true" /> HRFlow Auto-Reconciliation
                        </h4>
                        <p className="text-[#8899AA] text-sm mb-4">
                            Your employer regularly runs backend reconciliations between HRFlow TDS records and TRACES portal data.
                        </p>
                        <div className="bg-[#00E5A0]/10 border border-[#00E5A0]/20 text-[#00E5A0] px-3 py-2 rounded-lg font-bold text-xs flex items-center">
                            Last matched on: 05 Feb 2025. No discrepancies found.
                        </div>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
