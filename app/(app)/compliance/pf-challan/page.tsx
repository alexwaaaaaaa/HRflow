"use client";

import {
    Download,
    CheckCircle,
    UploadCloud,
    FileCheck,
    Info,
} from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ─── Data ─────────────────────────────────────────────────────────────────────
const STATS = [
    { label: "Total Employees", val: "245" },
    { label: "Excluded Employees", val: "12" },
    { label: "Gross Wages", val: "₹1,24,50,000" },
    { label: "EPF Wages", val: "₹84,20,500" },
];

const BREAKDOWN = [
    { acc: "A/C 1 (EPF)", emp: "₹10,10,460", er: "₹3,09,874", adm: "-", total: "₹13,20,334" },
    { acc: "A/C 2 (EPF Admin)", emp: "-", er: "-", adm: "₹42,103", total: "₹42,103" },
    { acc: "A/C 10 (EPS)", emp: "-", er: "₹7,00,586", adm: "-", total: "₹7,00,586" },
    { acc: "A/C 21 (EDLI)", emp: "-", er: "₹42,103", adm: "-", total: "₹42,103" },
    { acc: "A/C 22 (EDLI Admin)", emp: "-", er: "-", adm: "₹0", total: "₹0" },
];

const HISTORY = [
    { month: "Feb 2024", trrn: "1052203011452", amount: "₹20,85,410", date: "14 Mar 24" },
    { month: "Jan 2024", trrn: "1052202088710", amount: "₹20,42,100", date: "12 Feb 24" },
    { month: "Dec 2023", trrn: "1052201044321", amount: "₹19,95,000", date: "14 Jan 24" },
    { month: "Nov 2023", trrn: "1052112099881", amount: "₹19,50,200", date: "15 Dec 23" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PFChallan() {
    return (
        <Page
            title="PF Challan Management"
            subtitle="Generate, verify, and remit EPF contributions (TRRN)."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Compliance", href: "/compliance/dashboard" },
                { label: "PF Challan" },
            ]}
            maxWidth="1280px"
            actions={
                <>
                    <Button variant="outline" size="sm">March 2024</Button>
                    <Button
                        variant="primary"
                        icon={<UploadCloud size={16} aria-hidden="true" />}
                    >
                        Generate New Challan
                    </Button>
                </>
            }
        >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Challan summary */}
                <div className="space-y-6 lg:col-span-2">
                    <Card padding="lg">
                        <div className="mb-8 flex items-start justify-between">
                            <div>
                                <h2 className="text-sm font-black uppercase tracking-widest text-white">Active Challan Status</h2>
                                <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">Generated: 12 Apr 2024</p>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-black tracking-tighter text-amber-500">TRRN: 1052204000185</div>
                                <div className="mt-1 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Awaiting Payment</div>
                            </div>
                        </div>

                        <div className="mb-8 grid grid-cols-2 gap-6 lg:grid-cols-4">
                            {STATS.map((s) => (
                                <div key={s.label} className="space-y-1">
                                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">{s.label}</div>
                                    <div className="text-lg font-black tracking-tighter text-white tabular-nums">{s.val}</div>
                                </div>
                            ))}
                        </div>

                        <div className="rounded-2xl border border-[#1A2A3A] bg-[#060B14] p-6">
                            <h3 className="mb-4 border-b border-[#1A2A3A] pb-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                                Contribution Breakdown
                            </h3>
                            <div className="space-y-4">
                                {BREAKDOWN.map((row) => (
                                    <div key={row.acc} className="flex items-center justify-between border-b border-[#1A2A3A]/50 pb-2 text-xs last:border-0 last:pb-0">
                                        <span className="w-32 font-black uppercase tracking-tighter text-slate-300">{row.acc}</span>
                                        <span className="w-24 text-right font-bold tabular-nums text-slate-500">{row.emp}</span>
                                        <span className="w-24 text-right font-bold tabular-nums text-slate-500">{row.er}</span>
                                        <span className="w-24 text-right font-bold tabular-nums text-slate-500">{row.adm}</span>
                                        <span className="w-28 text-right font-black tabular-nums text-white">{row.total}</span>
                                    </div>
                                ))}
                                <div className="flex items-center justify-between border-t-2 border-[#1A2A3A] pt-4 text-sm">
                                    <span className="font-black uppercase tracking-widest text-amber-500">Total Remittance</span>
                                    <span className="text-xl font-black tracking-tighter text-amber-500 tabular-nums drop-shadow-lg">₹21,05,126</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <Button
                                variant="primary"
                                className="flex-1"
                                icon={<FileCheck size={16} aria-hidden="true" />}
                            >
                                Pay via EPFO Portal
                            </Button>
                            <Button
                                variant="outline"
                                icon={<Download size={16} aria-hidden="true" />}
                            >
                                Export Draft
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* History & alerts */}
                <div className="space-y-6">
                    <Card padding="md" className="flex h-[400px] flex-col">
                        <h3 className="mb-4 border-b border-[#1A2A3A] pb-4 text-xs font-black uppercase tracking-[0.2em] text-white">
                            Challan Archive
                        </h3>
                        <div className="flex-1 space-y-3 overflow-y-auto pr-2">
                            {HISTORY.map((item) => (
                                <div
                                    key={item.trrn}
                                    className="cursor-pointer rounded-xl border border-[#1A2A3A] bg-[#060B14] p-4 transition-colors hover:border-slate-700"
                                >
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="text-xs font-black uppercase tracking-widest text-slate-300">{item.month}</span>
                                        <Badge variant="success">
                                            <CheckCircle size={10} aria-hidden="true" /> Paid
                                        </Badge>
                                    </div>
                                    <div className="flex items-end justify-between">
                                        <div>
                                            <div className="mb-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-500">TRRN: {item.trrn}</div>
                                            <div className="text-[9px] font-medium italic text-slate-600">Paid on {item.date}</div>
                                        </div>
                                        <span className="text-xs font-black tabular-nums text-slate-400">{item.amount}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <div className="flex gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 shadow-lg">
                        <Info size={18} className="mt-0.5 shrink-0 text-amber-500" aria-hidden="true" />
                        <p className="text-[10px] font-medium italic leading-relaxed tracking-tight text-slate-400">
                            Statutory deadline for PF remittance is the 15th of the following month. Late payments attract penal damages
                            under section 14B up to 25% p.a.
                        </p>
                    </div>
                </div>
            </div>
        </Page>
    );
}
