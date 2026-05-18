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
    { label: "Covered Employees", val: "142" },
    { label: "Exempted (>₹21K)", val: "115" },
    { label: "Total Gross Wages", val: "₹1,24,50,000" },
    { label: "ESI Applicable Wages", val: "₹24,10,500" },
];

const HISTORY = [
    { month: "Feb 2024", ref: "03123048590123", amount: "₹94,100", date: "14 Mar 24" },
    { month: "Jan 2024", ref: "03123048598812", amount: "₹95,200", date: "12 Feb 24" },
    { month: "Dec 2023", ref: "03123048597334", amount: "₹92,500", date: "14 Jan 24" },
    { month: "Nov 2023", ref: "03123048596612", amount: "₹90,200", date: "15 Dec 23" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ESIChallan() {
    return (
        <Page
            title="ESIC Record & Challan"
            subtitle="Generate Monthly Contribution return and pay ESI challan."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Compliance", href: "/compliance/dashboard" },
                { label: "ESI Challan" },
            ]}
            maxWidth="1280px"
            actions={
                <>
                    <Button variant="outline" size="sm">March 2024</Button>
                    <Button
                        variant="primary"
                        icon={<UploadCloud size={16} aria-hidden="true" />}
                    >
                        Generate ESIC Excel
                    </Button>
                </>
            }
        >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Main Challan Summary */}
                <div className="space-y-6 lg:col-span-2">
                    <Card padding="lg">
                        <div className="mb-8 flex items-start justify-between">
                            <div>
                                <h2 className="text-sm font-black uppercase tracking-widest text-white">
                                    Active Statement Status
                                </h2>
                                <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                                    Generated: 12 Apr 2024
                                </p>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-black tracking-tighter text-emerald-500">Unpaid</div>
                                <div className="mt-1 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                                    Pending Remittance
                                </div>
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
                                Contribution Calculation
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between border-b border-[#1A2A3A] pb-2 text-xs">
                                    <span className="w-48 font-black uppercase tracking-tighter text-slate-300">Employee Share (0.75%)</span>
                                    <span className="font-bold tabular-nums text-slate-500">₹18,079</span>
                                </div>
                                <div className="flex items-center justify-between border-b border-[#1A2A3A] pb-2 text-xs">
                                    <span className="w-48 font-black uppercase tracking-tighter text-slate-300">Employer Share (3.25%)</span>
                                    <span className="font-bold tabular-nums text-slate-500">₹78,341</span>
                                </div>
                                <div className="flex items-center justify-between border-t-2 border-[#1A2A3A] pt-4 text-sm">
                                    <span className="font-black uppercase tracking-widest text-emerald-500">Total ESI Liability</span>
                                    <span className="text-xl font-black tracking-tighter text-emerald-500 tabular-nums drop-shadow-lg">₹96,420</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <Button
                                variant="primary"
                                className="flex-1"
                                icon={<FileCheck size={16} aria-hidden="true" />}
                            >
                                Pay via ESIC Portal
                            </Button>
                            <Button
                                variant="outline"
                                icon={<Download size={16} aria-hidden="true" />}
                            >
                                Draft .xls
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* History & Alerts */}
                <div className="space-y-6">
                    <Card padding="md" className="flex h-[400px] flex-col">
                        <h3 className="mb-4 flex items-center justify-between border-b border-[#1A2A3A] pb-4 text-xs font-black uppercase tracking-[0.2em] text-white">
                            Previous Payments
                        </h3>
                        <div className="flex-1 space-y-3 overflow-y-auto pr-2">
                            {HISTORY.map((item) => (
                                <div
                                    key={item.ref}
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
                                            <div className="mb-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                                                Ref: {item.ref}
                                            </div>
                                            <div className="text-[9px] font-medium italic text-slate-600">Paid on {item.date}</div>
                                        </div>
                                        <span className="text-xs font-black tabular-nums text-slate-400">{item.amount}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <div className="flex gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 shadow-lg">
                        <Info size={18} className="mt-0.5 shrink-0 text-emerald-500" aria-hidden="true" />
                        <p className="text-[10px] font-medium italic leading-relaxed tracking-tight text-slate-400">
                            ESIC statutory deadline is the 15th of the consequent month. Late payment attracts interest @ 12% p.a.
                        </p>
                    </div>
                </div>
            </div>
        </Page>
    );
}
