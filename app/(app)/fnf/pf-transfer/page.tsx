"use client";

import {
    ArrowRight, ShieldCheck, Download, CheckCircle, Info,
    Landmark as Bank, FileText, Send,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function PFTransfer() {
    return (
        <Page
            title="EPF Transfer Support (Form 13)"
            subtitle="Coordinate transfer of PF balance from previous account to current member ID."
            breadcrumbs={[
                { label: "FnF", href: "/fnf/dashboard" },
                { label: "PF Transfer" },
            ]}
            maxWidth="1200px"
        >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-6">
                {/* Transfer Details */}
                <div className="space-y-6 lg:col-span-4">
                    <Card padding="lg">
                        <div className="space-y-8">
                            {/* Comparison View */}
                            <div className="relative grid grid-cols-2 gap-0">
                                <div className="z-10 space-y-4 rounded-l-2xl border border-r-0 border-[#1A2A3A] bg-[#060B14] p-6">
                                    <h3 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-rose-500">
                                        <Bank size={14} aria-hidden="true" /> Previous Establishment
                                    </h3>
                                    <div className="space-y-3">
                                        <p className="text-[10px] font-bold uppercase text-[#445566]">Member ID: MH/BAN/001928/88</p>
                                        <p className="text-sm font-black uppercase tracking-tight text-white">Google India Pvt. Ltd.</p>
                                        <p className="text-[10px] font-bold uppercase text-[#445566]">DL/CPM/0029/982</p>
                                    </div>
                                </div>
                                <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-4 border-[#0D1928] bg-blue-600 text-white">
                                        <ArrowRight size={20} aria-hidden="true" />
                                    </div>
                                </div>
                                <div className="z-10 space-y-4 rounded-r-2xl border border-l-0 border-[#1A2A3A] bg-[#060B14] p-6 text-right">
                                    <h3 className="flex items-center justify-end gap-2 text-[10px] font-bold uppercase tracking-widest text-emerald-500">
                                        Present Establishment <Bank size={14} aria-hidden="true" />
                                    </h3>
                                    <div className="space-y-3">
                                        <p className="text-[10px] font-bold uppercase text-[#445566]">Member ID: DL/CPM/0029/982</p>
                                        <p className="text-sm font-black uppercase tracking-tight text-white">HRFlow Solutions Pvt. Ltd.</p>
                                        <p className="text-[10px] font-bold uppercase text-[#445566]">MH/BAN/001928/88</p>
                                    </div>
                                </div>
                            </div>

                            {/* Form 13 */}
                            <div className="space-y-4">
                                <h3 className="border-l-4 border-blue-500 pl-3 text-xs font-bold uppercase tracking-widest text-[#445566]">
                                    Transfer Application (Form 13)
                                </h3>
                                <div className="flex items-center justify-between rounded-2xl border border-[#1A2A3A] bg-[#060B14] p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="rounded-xl bg-blue-500/10 p-3 text-blue-500">
                                            <FileText size={20} aria-hidden="true" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black uppercase tracking-tight text-white">Form 13 - Revised (EPFO)</p>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-[#445566]">
                                                Digital transfer claim authorization letter
                                            </p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        icon={<Download size={14} aria-hidden="true" />}
                                    >
                                        Pre-fill Form
                                    </Button>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 rounded-2xl border border-amber-500/20 bg-[#060B14] p-4">
                                <Info size={20} className="mt-0.5 shrink-0 text-amber-500" aria-hidden="true" />
                                <div>
                                    <h4 className="text-[11px] font-black uppercase text-white">Attestation Requirement</h4>
                                    <p className="mt-1 text-[10px] font-medium uppercase leading-relaxed text-[#445566]">
                                        The transfer claim must be attested by either the previous or the present employer.
                                        Online attestation through DSC (Digital Signature) is the preferred method for faster
                                        processing.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Transfer Status & Actions */}
                <div className="space-y-6 lg:col-span-2">
                    <Card padding="lg" variant="elevated">
                        <h2 className="mb-6 text-center text-xs font-bold uppercase tracking-widest text-[#445566]">
                            Action Hub
                        </h2>
                        <div className="space-y-6">
                            <Button
                                variant="primary"
                                icon={<Send size={20} aria-hidden="true" />}
                                className="w-full"
                            >
                                Initiate OTCP Transfer
                            </Button>
                            <p className="text-center text-[10px] text-[#445566]">Online Transfer Claim Portal</p>

                            <div className="space-y-4 border-t border-[#1A2A3A] pt-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                                        <CheckCircle size={16} aria-hidden="true" />
                                    </div>
                                    <p className="text-[10px] font-bold uppercase tracking-tight text-[#8899AA]">
                                        UAN Verified (100XXX)
                                    </p>
                                </div>
                                <div className="flex items-center gap-3 opacity-30">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#1A2A3A] bg-[#060B14] text-[#445566]">
                                        <CheckCircle size={16} aria-hidden="true" />
                                    </div>
                                    <p className="text-[10px] font-bold uppercase tracking-tight text-[#445566]">
                                        Claim Apprv. (Pending)
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card padding="md">
                        <h3 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400">
                            <ShieldCheck size={14} aria-hidden="true" /> Trust Compliance
                        </h3>
                        <p className="text-[10px] font-bold leading-relaxed text-[#445566]">
                            HRFlow Solutions is an Exempted PF Trust. Transfers to/from non-exempted establishments may
                            take 15–20 additional days for ledger synchronization.
                        </p>
                        <Badge variant="success" className="mt-3">Exempted Trust</Badge>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
