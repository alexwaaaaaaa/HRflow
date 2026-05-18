"use client";

import { CheckCircle2, Clock, FileText, UploadCloud, AlertCircle, MessageCircle } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function ClaimStatusTrackingPage() {
    return (
        <Page
            title="Claim Status Tracker"
            subtitle="Real-time updates directly from your TPA (Third Party Administrator)."
            breadcrumbs={[
                { label: "Finance", href: "/finance/dashboard" },
                { label: "Claims", href: "/finance/insurance/claims" },
                { label: "Track (CLM-881554)" },
            ]}
            maxWidth="1000px"
            actions={
                <div className="text-right">
                    <div className="text-sm font-medium text-[#8899AA] mb-1">Claim ID</div>
                    <div className="font-mono text-xl text-indigo-400 font-bold">CLM-881554</div>
                </div>
            }
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    {/* Summary Card */}
                    <Card padding="lg">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                                <p className="text-[#8899AA] text-xs mb-1">Patient</p>
                                <p className="text-white text-sm font-medium">Ananya Sharma</p>
                            </div>
                            <div>
                                <p className="text-[#8899AA] text-xs mb-1">Type</p>
                                <p className="text-white text-sm font-medium">Reimbursement (OPD)</p>
                            </div>
                            <div>
                                <p className="text-[#8899AA] text-xs mb-1">Hospital/Clinic</p>
                                <p className="text-white text-sm font-medium">Fortis Clinic, BLR</p>
                            </div>
                            <div>
                                <p className="text-[#8899AA] text-xs mb-1">Amount Claimed</p>
                                <p className="text-amber-400 text-sm font-bold">₹12,500</p>
                            </div>
                        </div>
                    </Card>

                    {/* Timeline */}
                    <Card padding="lg">
                        <h2 className="text-lg font-bold text-white mb-8">Live Timeline</h2>
                        <ol className="relative border-l-2 border-[#1A2A3A] ml-4 space-y-8" aria-label="Claim progress timeline">
                            <li className="relative pl-8">
                                <div className="absolute -left-[11px] top-0.5 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center ring-4 ring-[#0D1928]" aria-hidden="true">
                                    <CheckCircle2 size={12} className="text-[#0B1221]" />
                                </div>
                                <div className="text-xs text-[#8899AA] font-mono mb-1">02 Sep 2025 · 09:14 AM</div>
                                <h3 className="text-sm font-bold text-white mb-1">Claim Initiated</h3>
                                <p className="text-xs text-[#8899AA]">Reimbursement form and initial bills submitted to TPA via HRFlow portal.</p>
                            </li>

                            <li className="relative pl-8">
                                <div className="absolute -left-[11px] top-0.5 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center ring-4 ring-[#0D1928]" aria-hidden="true">
                                    <CheckCircle2 size={12} className="text-[#0B1221]" />
                                </div>
                                <div className="text-xs text-[#8899AA] font-mono mb-1">04 Sep 2025 · 11:30 AM</div>
                                <h3 className="text-sm font-bold text-white mb-1">Document Verification</h3>
                                <p className="text-xs text-[#8899AA]">Initial documents verified. Query raised by TPA.</p>
                                <div className="mt-3 p-3 bg-pink-500/10 border border-pink-500/20 rounded-lg">
                                    <div className="flex items-center gap-2 text-pink-400 text-xs font-medium mb-1 border-b border-pink-500/20 pb-2">
                                        <AlertCircle size={16} aria-hidden="true" /> TPA Query: Missing Information
                                    </div>
                                    <p className="text-xs text-white/90 mt-2">Please upload the original doctor&apos;s prescription indicating the necessity of the diagnostic tests claimed.</p>
                                    <div className="mt-3">
                                        <Button variant="danger" size="sm" icon={<UploadCloud size={12} />}>Upload PDF Response (Completed)</Button>
                                    </div>
                                </div>
                            </li>

                            <li className="relative pl-8" aria-current="step">
                                <div className="absolute -left-[11px] top-0.5 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center ring-4 ring-[#0D1928]" aria-hidden="true">
                                    <div className="w-2 h-2 bg-[#0B1221] rounded-full animate-pulse" />
                                </div>
                                <Badge variant="warning" className="mb-1">In Progress</Badge>
                                <h3 className="text-sm font-bold text-white mb-1">Medical Assessment</h3>
                                <p className="text-xs text-[#8899AA]">TPA medical team is reviewing the submitted doctor&apos;s prescription against the policy terms and diagnostic bills.</p>
                                <div className="mt-4 flex items-center gap-2 text-xs text-[#8899AA]">
                                    <Clock size={16} aria-hidden="true" /> Expected SLA: 3 Working Days
                                </div>
                            </li>

                            <li className="relative pl-8 opacity-40">
                                <div className="absolute -left-[11px] top-0.5 w-5 h-5 bg-[#1A2A3A] rounded-full ring-4 ring-[#0D1928]" aria-hidden="true" />
                                <h3 className="text-sm font-bold text-white mb-1">Final Approval &amp; Payout</h3>
                                <p className="text-xs text-[#8899AA]">Approved amount will be transferred directly to your registered salary bank account via NEFT.</p>
                            </li>
                        </ol>
                    </Card>
                </div>

                {/* Support Sidebar */}
                <div className="md:col-span-1">
                    <Card padding="lg" className="sticky top-8">
                        <h3 className="text-lg font-bold text-white mb-4">Support &amp; Actions</h3>
                        <div className="space-y-3">
                            <Button variant="secondary" className="w-full justify-between" icon={<FileText size={20} className="text-indigo-400" />}>
                                <span className="flex-1 text-left">View Uploaded Docs</span>
                                <span className="text-xs text-[#8899AA] bg-[#0D1928] px-2 py-1 rounded">3 Files</span>
                            </Button>
                            <Button variant="secondary" className="w-full justify-start" icon={<UploadCloud size={20} className="text-emerald-400" />}>
                                Upload Additional Bill
                            </Button>
                            <Button variant="secondary" className="w-full justify-start" icon={<MessageCircle size={20} className="text-pink-400" />}>
                                Message TPA Agent
                            </Button>
                        </div>
                        <div className="mt-8 pt-6 border-t border-[#1A2A3A] text-center">
                            <p className="text-xs text-[#8899AA] mb-2">TPA Helpline (Star Health)</p>
                            <p className="text-lg font-mono font-bold text-white tracking-widest">1800-425-2255</p>
                            <p className="text-[10px] bg-[#1A2A3A] inline-block px-2 py-1 rounded text-[#8899AA] mt-2">Mention ID: CLM-881554</p>
                        </div>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
