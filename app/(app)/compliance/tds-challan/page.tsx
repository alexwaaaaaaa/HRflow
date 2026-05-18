"use client";

import { useState } from "react";
import {
    Calculator,
    Download,
    UploadCloud,
    CheckCircle,
    Clock,
    AlertTriangle,
    Info,
    FileText,
    CreditCard,
    Filter,
} from "lucide-react";
import Link from "next/link";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─── Static palette ───────────────────────────────────────────────────────────
type TdsStatus = "Unpaid" | "Paid";

const STATUS_BADGE: Record<TdsStatus, BadgeVariant> = {
    Unpaid: "danger",
    Paid: "success",
};

type KpiColor = "sky" | "emerald" | "rose" | "slate";

const KPI_RING: Record<KpiColor, string> = {
    sky: "border-sky-500/20",
    emerald: "border-emerald-500/20",
    rose: "border-rose-500/20",
    slate: "border-[#1A2A3A]",
};

const KPI_TEXT: Record<KpiColor, string> = {
    sky: "text-sky-400",
    emerald: "text-emerald-400",
    rose: "text-rose-400",
    slate: "text-slate-300",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
interface TdsSection {
    id: string;
    section: string;
    desc: string;
    tax: string;
    cess: string;
    total: string;
    status: TdsStatus;
}

const SECTIONS: TdsSection[] = [
    { id: "s1", section: "192", desc: "Salaries", tax: "14,50,000", cess: "58,000", total: "15,08,000", status: "Unpaid" },
    { id: "s2", section: "192A", desc: "Premature PF Withdrawal", tax: "12,500", cess: "500", total: "13,000", status: "Unpaid" },
    { id: "s3", section: "194C", desc: "Contractors & Sub-contractors", tax: "28,500", cess: "1,140", total: "29,640", status: "Paid" },
    { id: "s4", section: "194J", desc: "Professional / Technical Fees", tax: "45,000", cess: "1,800", total: "46,800", status: "Paid" },
    { id: "s5", section: "194I(a)", desc: "Rent – Plant & Machinery", tax: "10,000", cess: "400", total: "10,400", status: "Unpaid" },
];

const HISTORY = [
    { month: "Feb 2024", challanNo: "CH29381023", bsr: "0001234", amount: "₹14,80,000" },
    { month: "Jan 2024", challanNo: "CH29281891", bsr: "0001234", amount: "₹14,20,000" },
    { month: "Dec 2023", challanNo: "CH29181320", bsr: "0001234", amount: "₹13,90,000" },
];

const KPI_DATA: { label: string; val: string; color: KpiColor; icon: typeof Calculator }[] = [
    { label: "Total TDS Liability", val: "₹15,67,840", color: "sky", icon: Calculator },
    { label: "Paid This Month", val: "₹86,440", color: "emerald", icon: CheckCircle },
    { label: "Due: 7th April", val: "₹14,81,400", color: "rose", icon: Clock },
    { label: "Interest Accrued", val: "₹0", color: "slate", icon: AlertTriangle },
];

const COLUMNS: Column<TdsSection>[] = [
    {
        key: "section",
        label: "Section / Nature",
        render: (r) => (
            <div>
                <div className="text-xs font-black text-white">{r.section}</div>
                <div className="text-[10px] font-bold text-slate-500">{r.desc}</div>
            </div>
        ),
    },
    {
        key: "tax",
        label: "Tax (₹)",
        align: "right",
        render: (r) => <span className="text-xs font-bold tabular-nums text-slate-300">{r.tax}</span>,
    },
    {
        key: "cess",
        label: "Surcharge+Cess(₹)",
        align: "right",
        render: (r) => <span className="text-xs font-bold tabular-nums text-slate-400">{r.cess}</span>,
    },
    {
        key: "total",
        label: "Total (₹)",
        align: "right",
        render: (r) => <span className="text-xs font-black tabular-nums text-white">{r.total}</span>,
    },
    {
        key: "status",
        label: "Status",
        render: (r) => <Badge variant={STATUS_BADGE[r.status]}>{r.status}</Badge>,
    },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function TDSChallan() {
    const [_selected, setSelected] = useState<string[]>([]);

    return (
        <Page
            title="TDS Challan (ITNS 281)"
            subtitle="Generate section-wise ITNS 281 challans and pay via TIN 2.0 portal."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Compliance", href: "/compliance/dashboard" },
                { label: "TDS Challan" },
            ]}
            maxWidth="1280px"
            actions={
                <>
                    <Button variant="outline" size="sm">March 2024</Button>
                    <Button
                        variant="primary"
                        icon={<UploadCloud size={16} aria-hidden="true" />}
                    >
                        Pay Selected via TIN 2.0
                    </Button>
                </>
            }
        >
            <div className="space-y-6">
                {/* KPI strip */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {KPI_DATA.map((k) => {
                        const Icon = k.icon;
                        return (
                            <Card key={k.label} padding="md" className={`relative overflow-hidden ${KPI_RING[k.color]}`}>
                                <div className="mb-2 text-[10px] font-black uppercase tracking-widest text-slate-500">{k.label}</div>
                                <div className={`text-2xl font-black tracking-tight tabular-nums ${KPI_TEXT[k.color]}`}>{k.val}</div>
                                <Icon size={16} className={`absolute right-4 top-4 opacity-20 ${KPI_TEXT[k.color]}`} aria-hidden="true" />
                            </Card>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Section table */}
                    <div className="space-y-4 lg:col-span-2">
                        <Card padding="none">
                            <div className="flex items-center justify-between border-b border-[#1A2A3A] bg-[#060B14]/60 p-4">
                                <h2 className="text-xs font-black uppercase tracking-widest text-white">Section-wise Liability — March 2024</h2>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    aria-label="Filter sections"
                                    icon={<Filter size={14} aria-hidden="true" />}
                                />
                            </div>
                            <div className="p-4">
                                <DataTable<TdsSection>
                                    data={SECTIONS}
                                    columns={COLUMNS}
                                    rowKey={(r) => r.id}
                                    onRowClick={(r) => r.status === "Unpaid" && setSelected((p) => p.includes(r.id) ? p.filter((x) => x !== r.id) : [...p, r.id])}
                                    aria-label="TDS section-wise liability"
                                    emptyTitle="No sections found"
                                />
                            </div>
                        </Card>

                        <div className="flex gap-3 rounded-xl border border-sky-500/20 bg-sky-500/5 p-4">
                            <Info size={16} className="mt-0.5 shrink-0 text-sky-500" aria-hidden="true" />
                            <p className="text-[10px] leading-relaxed text-slate-400">
                                TDS for salary (Sec 192) is due by <b className="text-sky-400">7th of the following month</b>. Late deductions attract 1% per month; late payments attract 1.5% per month u/s 201(1A).
                            </p>
                        </div>
                    </div>

                    {/* Right panel */}
                    <div className="space-y-6">
                        {/* Challan history */}
                        <Card padding="md" className="flex max-h-[320px] flex-col">
                            <h3 className="mb-4 flex items-center justify-between border-b border-[#1A2A3A] pb-3 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                                Challan History
                                <Button variant="ghost" size="sm" aria-label="Download challan history" icon={<Download size={12} aria-hidden="true" />} />
                            </h3>
                            <div className="flex-1 space-y-3 overflow-y-auto pr-1">
                                {HISTORY.map((h) => (
                                    <div key={h.challanNo} className="cursor-pointer rounded-xl border border-[#1A2A3A] bg-[#060B14] p-3 transition-colors hover:border-slate-600">
                                        <div className="mb-1 flex items-center justify-between">
                                            <span className="text-xs font-black text-slate-300">{h.month}</span>
                                            <Badge variant="success">Acknowledged</Badge>
                                        </div>
                                        <div className="font-mono text-[10px] text-slate-500">{h.challanNo} | BSR {h.bsr}</div>
                                        <div className="mt-1 text-xs font-black tabular-nums text-slate-400">{h.amount}</div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* BSR import */}
                        <Card padding="md">
                            <h3 className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-white">Import BSR Data from Bank</h3>
                            <div className="flex flex-col items-center gap-3 rounded-xl border-2 border-dashed border-[#1A2A3A] p-6 text-center">
                                <CreditCard size={24} className="text-slate-600" aria-hidden="true" />
                                <p className="text-[10px] font-medium text-slate-500">Upload challan counterfoil or bank confirmation slip</p>
                                <Button variant="outline" size="sm">Browse File</Button>
                            </div>
                        </Card>

                        {/* Navigate */}
                        <div className="grid grid-cols-2 gap-3">
                            <Link href="/compliance/tds-return-24q">
                                <Card padding="md" className="cursor-pointer border-indigo-500/20 transition-all hover:border-indigo-500/50">
                                    <FileText size={18} className="mb-2 text-indigo-500" aria-hidden="true" />
                                    <div className="text-xs font-black text-white">Form 24Q</div>
                                    <div className="mt-0.5 text-[9px] text-slate-500">Salary Returns</div>
                                </Card>
                            </Link>
                            <Link href="/compliance/tds-return-26q">
                                <Card padding="md" className="cursor-pointer border-purple-500/20 transition-all hover:border-purple-500/50">
                                    <FileText size={18} className="mb-2 text-purple-500" aria-hidden="true" />
                                    <div className="text-xs font-black text-white">Form 26Q</div>
                                    <div className="mt-0.5 text-[9px] text-slate-500">Non-Salary Returns</div>
                                </Card>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
}
