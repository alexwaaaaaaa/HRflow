"use client";

import { useState } from "react";
import { AlertOctagon, User, BookOpen, UploadCloud, RefreshCw, Building2, CheckCircle2 } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// migrated: immersive-ui

const EMPLOYEE_FIELDS = [
    { label: "Department", value: "Marketing" },
    { label: "Grade / Band", value: "M2 - Manager" },
    { label: "Gross Monthly", value: "₹85,000" },
] as const;

export default function PayrollErrorDetailPage() {
    const [resolved, setResolved] = useState(false);

    return (
        <Page
            title="PAN Name Mismatch"
            subtitle="Income Tax Dept validation failed — resolve to unblock payroll"
            breadcrumbs={[
                { label: "Payroll", href: "/payroll/dashboard" },
                { label: "Exceptions", href: "/payroll-exception" },
                { label: "Error Detail" },
            ]}
            maxWidth="900px"
            actions={
                <Badge variant="danger">Critical Error</Badge>
            }
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Error Detail */}
                <div className="md:col-span-2 space-y-6">
                    {/* The Discrepancy */}
                    <Card padding="lg" className="border-[#FF4444]/40 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-[#FF4444]" aria-hidden="true" />
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-10 h-10 rounded-full bg-[#FF4444]/10 flex items-center justify-center shrink-0" aria-hidden="true">
                                <AlertOctagon size={18} className="text-[#FF4444]" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">Income Tax Dept Validation Failed</h3>
                                <p className="text-sm text-[#8899AA] mt-1">The name linked to the provided PAN does not exactly match the legal name in the HRFlow system. Direct deposit and TDS filing will fail.</p>
                            </div>
                        </div>

                        <div className="bg-[#060B14] border border-[#1A2A3A] rounded-lg p-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                                <div className="hidden md:block absolute left-1/2 top-2 bottom-2 w-px bg-[#1A2A3A] -translate-x-1/2" aria-hidden="true" />

                                <div className="space-y-3">
                                    <p className="text-xs font-semibold text-[#8899AA] uppercase tracking-wider flex items-center gap-2">
                                        <Building2 size={13} aria-hidden="true" /> HRFlow System Data
                                    </p>
                                    <div className="p-3 bg-[#1A2A3A]/30 rounded border border-[#1A2A3A]">
                                        <p className="font-mono text-[#8899AA] text-xs mb-1">PAN Number: <span className="text-white">ABCDE1234F</span></p>
                                        <p className="font-mono text-[#8899AA] text-xs">Legal Name: <span className="font-bold text-[#FF4444] bg-[#FF4444]/10 px-1 rounded">SONIA DAS</span></p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <p className="text-xs font-semibold text-[#0066FF] uppercase tracking-wider flex items-center gap-2">
                                        <BookOpen size={13} aria-hidden="true" /> NSDL / Tax Dept Data
                                    </p>
                                    <div className="p-3 bg-[#0066FF]/5 rounded border border-[#0066FF]/20">
                                        <p className="font-mono text-[#8899AA] text-xs mb-1">PAN Number: <span className="text-white">ABCDE1234F</span></p>
                                        <p className="font-mono text-[#8899AA] text-xs">Valid Name: <span className="font-bold text-[#00E5A0]">SONIYA D</span></p>
                                    </div>
                                    <p className="text-[10px] text-[#8899AA] italic text-right">Source: Auto-fetched via API on 05 Mar 2025</p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Resolution Area */}
                    <Card padding="lg" className={resolved ? "border-[#00E5A0]/50" : ""}>
                        <h3 className="text-lg font-semibold text-white mb-5">Resolution Actions</h3>

                        {!resolved ? (
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="correction-strategy" className="block text-sm font-medium text-[#8899AA] mb-2">
                                        Correction Strategy
                                    </label>
                                    <select
                                        id="correction-strategy"
                                        className="w-full bg-[#060B14] border border-[#1A2A3A] text-white rounded-lg px-4 py-3 outline-none focus:border-[#0066FF]"
                                    >
                                        <option>Update HR System Name to match PAN</option>
                                        <option>Request Employee to update PAN (Exclude from Run)</option>
                                        <option>Update PAN Number (Typo fix)</option>
                                    </select>
                                </div>

                                <div className="bg-[#060B14] border border-[#1A2A3A] rounded-lg p-4 pb-5">
                                    <p className="block text-sm font-medium text-[#8899AA] mb-3">Sync Name to &apos;SONIYA D&apos;</p>
                                    <p className="text-xs text-[#8899AA] mb-4 leading-relaxed">This will permanently change the legal name on record in the HR core database and automatically generate an updated CTC letter.</p>

                                    <label
                                        htmlFor="proof-upload"
                                        className="flex items-center justify-center w-full p-4 border-2 border-dashed border-[#334155] rounded-xl hover:bg-[#1A2A3A]/30 hover:border-[#8899AA] cursor-pointer transition-colors"
                                    >
                                        <div className="flex flex-col items-center gap-2">
                                            <UploadCloud size={24} className="text-[#8899AA]" aria-hidden="true" />
                                            <span className="text-sm font-medium text-[#c8d8e8]">Upload supporting ID proof (Aadhaar/PAN Card)</span>
                                        </div>
                                        <input id="proof-upload" type="file" className="sr-only" accept="image/*,application/pdf" />
                                    </label>
                                </div>

                                <div className="flex items-center gap-3 pt-4">
                                    <Button
                                        className="flex-1"
                                        icon={<RefreshCw size={14} aria-hidden="true" />}
                                        onClick={() => setResolved(true)}
                                    >
                                        Apply Fix &amp; Recalculate This Record
                                    </Button>
                                    <Button variant="outline">Hold Payroll</Button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-8 text-center">
                                <div className="w-16 h-16 rounded-full bg-[#00E5A0]/10 flex items-center justify-center mb-4" aria-hidden="true">
                                    <CheckCircle2 size={32} className="text-[#00E5A0]" />
                                </div>
                                <h4 className="text-xl font-bold text-white mb-2">Conflict Resolved</h4>
                                <p className="text-[#8899AA] text-sm max-w-sm">Legal name updated to &quot;SONIYA D&quot;. The payroll record has been successfully recalculated and cleared from the exception list.</p>
                                <Button variant="ghost" className="mt-6">Return to Dashboard</Button>
                            </div>
                        )}
                    </Card>
                </div>

                {/* Employee Context Panel */}
                <div className="md:col-span-1">
                    <Card padding="md" className="sticky top-6">
                        <h4 className="text-sm font-semibold text-[#8899AA] uppercase tracking-wider mb-5">Employee Profile</h4>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-[#1A2A3A] flex items-center justify-center border border-[#334155]" aria-hidden="true">
                                <User size={22} className="text-[#8899AA]" />
                            </div>
                            <div>
                                <h5 className="font-bold text-white text-lg leading-tight mb-0.5">Sonia Das</h5>
                                <p className="text-xs text-[#8899AA] font-mono">EMP450</p>
                            </div>
                        </div>

                        <dl className="space-y-3">
                            {EMPLOYEE_FIELDS.map((f) => (
                                <div key={f.label} className="bg-[#060B14] p-3 rounded border border-[#1A2A3A]">
                                    <dt className="text-[10px] text-[#8899AA] uppercase tracking-wider mb-1">{f.label}</dt>
                                    <dd className="text-sm font-medium text-white">{f.value}</dd>
                                </div>
                            ))}
                            <div className="bg-[#060B14] p-3 rounded border border-[#1A2A3A]">
                                <dt className="text-[10px] text-[#8899AA] uppercase tracking-wider mb-1">Status</dt>
                                <dd className="mt-0.5">
                                    <Badge variant="danger" dot>Payroll Blocked</Badge>
                                </dd>
                            </div>
                        </dl>

                        <Button variant="outline" className="w-full mt-6">View Full Profile</Button>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
