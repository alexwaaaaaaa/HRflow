"use client";

import {
    Download,
    CheckCircle,
    FileCheck,
} from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ─── Data ─────────────────────────────────────────────────────────────────────
interface MemberRow {
    id: string;
    name: string;
    uan: string;
    eps: string;
}

const MEMBERS: MemberRow[] = [
    { id: "m1", name: "Arnab Das", uan: "100456789012", eps: "Yes" },
    { id: "m2", name: "Rahul Nair", uan: "100456789013", eps: "Yes" },
    { id: "m3", name: "Sonia Gill", uan: "100456789014", eps: "No" },
    { id: "m4", name: "Priya Iyer", uan: "100456789015", eps: "Yes" },
    { id: "m5", name: "Anil Gupta", uan: "100456789016", eps: "Yes" },
    { id: "m6", name: "Neha Sharma", uan: "100456789017", eps: "Yes" },
    { id: "m7", name: "Vikram Singh", uan: "100456789018", eps: "Yes" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PFAnnualReturns() {
    return (
        <Page
            title="PF Annual Returns (Form 3A / 6A)"
            subtitle="Consolidated annual statements for establishment and members."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Compliance", href: "/compliance/dashboard" },
                { label: "PF Returns" },
            ]}
            maxWidth="1280px"
            actions={
                <>
                    <div className="flex items-center rounded-xl border border-[#1A2A3A] bg-[#0D1928] px-4 py-2 text-sm font-bold text-slate-300">
                        FY 2023-2024
                    </div>
                    <Button
                        variant="primary"
                        icon={<Download size={16} aria-hidden="true" />}
                    >
                        Generate Master ZIP
                    </Button>
                </>
            }
        >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Left panel */}
                <div className="space-y-6">
                    <Card padding="lg">
                        <h2 className="mb-6 border-b border-[#1A2A3A] pb-4 text-xs font-black uppercase tracking-widest text-slate-500">
                            Financial Year Status
                        </h2>
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-[#060B14] p-4 shadow-inner">
                                <CheckCircle size={20} className="text-emerald-500" aria-hidden="true" />
                                <div>
                                    <div className="text-xs font-black uppercase text-white">All 12 ECRs Filed</div>
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Apr &apos;23 - Mar &apos;24</div>
                                </div>
                                <span className="ml-auto text-xs font-black text-emerald-500">100%</span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                                    <span>Total Members</span>
                                    <span className="text-white">312</span>
                                </div>
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                                    <span>Total Setup Mismatch</span>
                                    <span className="text-rose-500">0</span>
                                </div>
                            </div>
                            <div className="border-t border-[#1A2A3A] pt-6">
                                <div className="border-l-2 border-slate-700 pl-3 text-[10px] font-bold italic leading-relaxed text-slate-500">
                                    &ldquo;Note: Form 3A/6A are largely obsolete for exempted establishments post ECR implementation, but remain available here for Legacy Audit compliance and specific member requests.&rdquo;
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card padding="md" className="relative overflow-hidden border-[#1A2A3A] bg-gradient-to-br from-[#0D1928] to-[#1A2A3A]/50">
                        <h3 className="mb-2 text-xs font-black uppercase tracking-tight text-white">Form 6A (Consolidated)</h3>
                        <p className="mb-4 text-[10px] font-medium text-slate-400">Consolidated annual contribution statement of the establishment.</p>
                        <Button
                            variant="ghost"
                            className="w-full"
                            icon={<FileCheck size={16} aria-hidden="true" />}
                        >
                            Download Form 6A
                        </Button>
                    </Card>
                </div>

                {/* Form 3A list */}
                <div className="space-y-6 lg:col-span-2">
                    <Card padding="none" className="flex h-[600px] flex-col">
                        <div className="flex items-center justify-between border-b border-[#1A2A3A] bg-[#060B14]/50 p-6">
                            <div>
                                <h3 className="text-sm font-black uppercase tracking-widest text-white">Individual Form 3A</h3>
                                <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">Member-wise annual contribution cards</p>
                            </div>
                        </div>
                        <div className="flex-1 space-y-3 overflow-y-auto p-6">
                            {MEMBERS.map((emp) => (
                                <div
                                    key={emp.id}
                                    className="flex items-center justify-between rounded-xl border border-[#1A2A3A] bg-[#060B14] p-4 transition-colors hover:border-slate-700"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#1A2A3A] bg-[#0D1928] text-xs font-black text-slate-400">
                                            {emp.name.split(" ").map((n) => n[0]).join("")}
                                        </div>
                                        <div>
                                            <div className="text-sm font-black text-white">{emp.name}</div>
                                            <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500">UAN: {emp.uan}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="hidden sm:block">
                                            <span className="mb-0.5 block text-[8px] font-black uppercase tracking-widest text-slate-500">EPS Eligibility</span>
                                            <Badge variant={emp.eps === "Yes" ? "success" : "neutral"}>{emp.eps}</Badge>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            icon={<Download size={14} aria-hidden="true" />}
                                        >
                                            F-3A
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
