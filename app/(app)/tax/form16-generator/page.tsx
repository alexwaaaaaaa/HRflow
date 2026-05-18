"use client";

import React, { useState } from "react";
import { FileText, Download, CheckCircle2, ShieldCheck, Mail, RefreshCw } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// ── Sub-components (module-scope) ─────────────────────────────────────────────
function StepIndicator({
    num,
    label,
    active,
    done,
}: {
    num: number;
    label: string;
    active: boolean;
    done: boolean;
}) {
    return (
        <div className="flex-1 flex flex-col items-center relative">
            <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-base z-10 ${
                    done ? "bg-[#00E5A0] text-[#060B14]" : active ? "bg-[#1A2A3A] text-white" : "bg-[#1A2A3A] text-[#8899AA]"
                }`}
                aria-current={active ? "step" : undefined}
            >
                {done ? <CheckCircle2 size={24} aria-hidden="true" /> : num}
            </div>
            <div className={`text-sm font-semibold mt-3 ${active || done ? "text-white" : "text-[#8899AA]"}`}>{label}</div>
        </div>
    );
}

export default function Form16Generator() {
    const [status, setStatus] = useState<"idle" | "generating" | "signing" | "done">("idle");

    const handleGenerate = () => {
        setStatus("generating");
        setTimeout(() => setStatus("signing"), 2000);
        setTimeout(() => setStatus("done"), 4000);
    };

    return (
        <Page
            title="Form 16 Generator"
            subtitle="Generate and digitally sign Form 16 (Part A & Part B) for all employees"
            breadcrumbs={[
                { label: "Tax", href: "/tax/dashboard" },
                { label: "Form 16 Generator" },
            ]}
            maxWidth="1000px"
        >
            <Card padding="lg">
                {/* Stepper */}
                <ol className="flex gap-4 mb-10" aria-label="Form 16 generation steps">
                    <StepIndicator
                        num={1}
                        label="Data Verification"
                        active={status === "idle"}
                        done={status !== "idle"}
                    />
                    <StepIndicator
                        num={2}
                        label="Generation & Traces"
                        active={status === "generating" || status === "signing"}
                        done={status === "done"}
                    />
                    <StepIndicator
                        num={3}
                        label="Digital Sign & Distribute"
                        active={status === "done"}
                        done={false}
                    />
                </ol>

                {status === "idle" && (
                    <div className="text-center max-w-lg mx-auto">
                        <div className="w-16 h-16 bg-[#0066FF]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <FileText size={32} className="text-[#0066FF]" aria-hidden="true" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">Ready to generate Form 16</h3>
                        <p className="text-sm text-[#8899AA] leading-relaxed mb-8">
                            Payroll is finalized for FY 2024-25. 345 employees are eligible for Form 16. The generated PDFs will
                            automatically include Part A (Traces) and Part B (Annexure) digitally signed.
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-8 text-left">
                            <Card variant="bare" className="bg-[#060B14] border border-[#1A2A3A] rounded-lg p-4">
                                <div className="text-xs text-[#8899AA] mb-1">Company TAN</div>
                                <div className="text-sm font-semibold text-white">MUMK12345E</div>
                            </Card>
                            <Card variant="bare" className="bg-[#060B14] border border-[#1A2A3A] rounded-lg p-4">
                                <div className="text-xs text-[#8899AA] mb-1">Signatory Persona</div>
                                <div className="text-sm font-semibold text-white">Ananya Singh (Director)</div>
                            </Card>
                        </div>

                        <Button onClick={handleGenerate} className="w-64">
                            Start Generation Process
                        </Button>
                    </div>
                )}

                {status === "generating" && (
                    <div className="text-center max-w-lg mx-auto py-10">
                        <RefreshCw
                            size={48}
                            className="text-[#0066FF] animate-spin mx-auto mb-6"
                            aria-hidden="true"
                        />
                        <h3 className="text-lg font-semibold text-white mb-2">
                            Merging Part A from TRACES &amp; Generating Part B
                        </h3>
                        <p className="text-sm text-[#8899AA]">Processed 145 / 345 employees... Please wait.</p>
                    </div>
                )}

                {status === "signing" && (
                    <div className="text-center max-w-lg mx-auto py-10">
                        <ShieldCheck
                            size={48}
                            className="text-[#00E5A0] animate-pulse mx-auto mb-6"
                            aria-hidden="true"
                        />
                        <h3 className="text-lg font-semibold text-white mb-2">Applying Digital Signatures</h3>
                        <p className="text-sm text-[#8899AA]">Signing PDFs using DSC Token (Ananya Singh)...</p>
                    </div>
                )}

                {status === "done" && (
                    <div className="text-center max-w-lg mx-auto">
                        <div className="w-16 h-16 bg-[#00E5A0]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 size={32} className="text-[#00E5A0]" aria-hidden="true" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">Form 16 Generation Successful!</h3>
                        <p className="text-sm text-[#8899AA] leading-relaxed mb-8">
                            345 digitally signed Form 16 documents have been generated and are ready to be dispatched to employees.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Button variant="secondary" icon={<Download size={16} />}>
                                Download ZIP Archive
                            </Button>
                            <Button icon={<Mail size={16} />}>Email to all 345 Employees</Button>
                        </div>
                    </div>
                )}
            </Card>
        </Page>
    );
}
