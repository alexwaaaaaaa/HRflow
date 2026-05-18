"use client";

import { FileCheck, Download, Mail, Printer, ShieldCheck, Clock } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

interface ReadinessStep {
    label: string;
    status: string;
    icon: typeof ShieldCheck;
    color: string;
}

const READINESS_STEPS: ReadinessStep[] = [
    { label: "Asset Clearance", status: "Verified", icon: ShieldCheck, color: "text-emerald-500" },
    { label: "Notice Period", status: "Completed", icon: Clock, color: "text-blue-500" },
    { label: "Finance Dues", status: "Settled", icon: FileCheck, color: "text-emerald-500" },
];

export default function RelievingLetter() {
    return (
        <Page
            title="Relieving Letter"
            subtitle="Generate formal relieving documents upon successful handover."
            breadcrumbs={[
                { label: "FnF", href: "/fnf/dashboard" },
                { label: "Relieving Letter" },
            ]}
            maxWidth="1400px"
            actions={
                <>
                    <Button variant="secondary" icon={<Printer size={14} aria-hidden="true" />}>
                        Print
                    </Button>
                    <Button variant="secondary" icon={<Download size={14} aria-hidden="true" />}>
                        Download PDF
                    </Button>
                </>
            }
        >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-6">
                {/* Left: Validation & Issuance */}
                <div className="space-y-6 lg:col-span-2">
                    <Card padding="lg">
                        <h3 className="mb-6 border-b border-[#1A2A3A] pb-4 text-xs font-bold uppercase tracking-widest text-[#445566]">
                            Issuance Readiness
                        </h3>
                        <div className="space-y-3">
                            {READINESS_STEPS.map((step) => {
                                const Icon = step.icon;
                                return (
                                    <div
                                        key={step.label}
                                        className="flex items-center justify-between rounded-xl border border-[#1A2A3A] bg-[#060B14] p-4"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Icon size={18} className={step.color} aria-hidden="true" />
                                            <span className="text-[11px] font-bold uppercase tracking-tight text-[#8899AA]">
                                                {step.label}
                                            </span>
                                        </div>
                                        <span className={`text-[9px] font-black uppercase tracking-widest ${step.color}`}>
                                            {step.status}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-6 space-y-4 border-t border-[#1A2A3A] pt-4">
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#445566]">
                                Email Recipient
                            </label>
                            <div className="flex items-center gap-3 rounded-xl border border-[#1A2A3A] bg-[#060B14] p-3.5 text-xs font-bold text-[#8899AA]">
                                <Mail size={16} className="text-blue-500" aria-hidden="true" />
                                arnab.das@personal.com
                            </div>
                            <Button
                                variant="primary"
                                icon={<Mail size={18} aria-hidden="true" />}
                                className="w-full"
                            >
                                Issue &amp; Send Email
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* Right: Document Preview */}
                <div className="lg:col-span-4">
                    <div className="relative min-h-[700px] rounded-3xl bg-white p-12 font-serif text-[#1e293b] shadow-2xl">
                        {/* Letterhead */}
                        <div className="mb-10 flex items-start justify-between border-b border-[#1e293b]/10 pb-6">
                            <div className="space-y-1">
                                <p className="text-lg font-black tracking-tight font-sans">HRFlow Solutions</p>
                                <p className="text-[9px] font-bold uppercase tracking-[0.25em] font-sans text-[#64748b]">
                                    Relieving Certificate
                                </p>
                            </div>
                            <p className="text-right text-[10px] font-bold font-sans text-[#64748b]">HF/REL/771/2024</p>
                        </div>

                        <div className="space-y-8 text-sm leading-relaxed">
                            <p className="text-right font-sans font-bold">April 24, 2024</p>

                            <div className="space-y-1">
                                <p className="font-sans text-xs font-black uppercase text-[#64748b]">To,</p>
                                <p className="font-sans text-base font-black">Arnab Das</p>
                                <p className="font-sans text-xs text-[#64748b]">Emp ID: EMP-771</p>
                            </div>

                            <p className="border-b border-[#1e293b]/5 pb-4 text-center font-sans text-xs font-black uppercase tracking-widest underline underline-offset-4 decoration-[#1e293b]/10">
                                Relieving Letter
                            </p>

                            <p>Dear Arnab,</p>

                            <p>
                                With reference to your resignation dated March 12, 2024, we would like to inform you that you
                                are relieved from the services of <b>HRFlow Solutions Pvt. Ltd.</b> effective at the close of
                                business hours on <b>April 24, 2024</b>.
                            </p>

                            <p>
                                We confirm that you have completed all handover processes and returned all company-owned
                                assets. Your Full and Final settlement has been processed and disbursed as of today.
                            </p>

                            <p>
                                We appreciate your time spent with the company and thank you for your contributions. We wish
                                you success in your future endeavors.
                            </p>

                            <div className="pt-20 space-y-2">
                                <p className="font-sans text-[10px] font-black uppercase tracking-widest text-[#64748b]">
                                    For HRFlow Solutions Pvt. Ltd.
                                </p>
                                <div className="h-px w-48 bg-[#1e293b]/20" />
                                <p className="font-sans text-xs font-bold">Human Resources Manager</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
}
