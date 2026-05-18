"use client";

import { useState } from "react";
import {
    Download,
    CheckCircle,
    AlertTriangle,
    Info,
    Filter,
} from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─── Static palette ───────────────────────────────────────────────────────────
type VendorStatus = "OK" | "BSR Missing" | "PAN Invalid";

const STATUS_BADGE: Record<VendorStatus, BadgeVariant> = {
    OK: "success",
    "BSR Missing": "warning",
    "PAN Invalid": "danger",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
interface Vendor {
    id: string;
    name: string;
    pan: string;
    section: string;
    nature: string;
    amount: string;
    tds: string;
    status: VendorStatus;
}

const VENDORS: Vendor[] = [
    { id: "v1", name: "ABC Tech Solutions Pvt. Ltd.", pan: "AABCT1234H", section: "194C", nature: "IT Services Contract", amount: "5,00,000", tds: "10,000", status: "OK" },
    { id: "v2", name: "Sharma & Associates (CA)", pan: "BSHSA5678K", section: "194J", nature: "Professional Fee", amount: "1,50,000", tds: "15,000", status: "OK" },
    { id: "v3", name: "Prime Facility Management", pan: "CPFMT9012L", section: "194C", nature: "Housekeeping Contract", amount: "80,000", tds: "1,600", status: "BSR Missing" },
    { id: "v4", name: "Cloud Infra Pvt. Ltd.", pan: "DCILB3456M", section: "194J", nature: "Cloud Platform Fee", amount: "2,40,000", tds: "24,000", status: "OK" },
    { id: "v5", name: "Office Supplies Depot", pan: "INVALID_PAN", section: "194Q", nature: "Goods Purchase (>50L)", amount: "60,000", tds: "600", status: "PAN Invalid" },
];

const TDS_RATES = [
    { sec: "194C", rate: "1% / 2%", desc: "Contractor (Ind/Others)" },
    { sec: "194J", rate: "10%", desc: "Professional Fees" },
    { sec: "194I(a)", rate: "2%", desc: "Rent – Plant" },
    { sec: "194I(b)", rate: "10%", desc: "Rent – Land/Building" },
    { sec: "194Q", rate: "0.1%", desc: "Purchase of Goods" },
];

const COLUMNS: Column<Vendor>[] = [
    {
        key: "vendor",
        label: "Vendor / PAN",
        render: (r) => (
            <div>
                <div className="text-xs font-bold text-white">{r.name}</div>
                <div className={`font-mono text-[10px] ${r.status.includes("PAN") ? "text-rose-400" : "text-slate-500"}`}>{r.pan}</div>
            </div>
        ),
        sortable: true,
        sortValue: (r) => r.name,
    },
    {
        key: "section",
        label: "Sec. / Nature",
        render: (r) => (
            <div>
                <div className="text-xs font-black text-slate-300">{r.section}</div>
                <div className="text-[9px] text-slate-500">{r.nature}</div>
            </div>
        ),
    },
    {
        key: "amount",
        label: "Amount (₹)",
        align: "right",
        render: (r) => <span className="text-xs font-bold tabular-nums text-slate-300">{r.amount}</span>,
    },
    {
        key: "tds",
        label: "TDS (₹)",
        align: "right",
        render: (r) => <span className="text-xs font-black tabular-nums text-purple-400">{r.tds}</span>,
    },
    {
        key: "status",
        label: "Status",
        render: (r) => (
            <Badge variant={STATUS_BADGE[r.status]}>
                {r.status === "OK" ? <CheckCircle size={8} aria-hidden="true" /> : <AlertTriangle size={8} aria-hidden="true" />}
                {r.status}
            </Badge>
        ),
    },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function TDSReturn26Q() {
    const [quarter, setQuarter] = useState(3);
    const [filter, setFilter] = useState<"all" | "errors">("all");

    const filtered = filter === "errors" ? VENDORS.filter((v) => v.status !== "OK") : VENDORS;

    return (
        <Page
            title="Form 26Q — Non-Salary TDS Return"
            subtitle="Quarterly TDS statement for non-salary payments: contractors, professionals, rent, etc."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Compliance", href: "/compliance/dashboard" },
                { label: "TDS Return 26Q" },
            ]}
            maxWidth="1280px"
            actions={
                <>
                    <Button variant="secondary" size="sm">Resolve Errors (2)</Button>
                    <Button
                        variant="primary"
                        icon={<Download size={16} aria-hidden="true" />}
                    >
                        Generate FVU File
                    </Button>
                </>
            }
        >
            <div className="space-y-6">
                {/* Quarter selector */}
                <div className="flex gap-3 overflow-x-auto pb-1">
                    {["Q1 (Apr–Jun 23)", "Q2 (Jul–Sep 23)", "Q3 (Oct–Dec 23)", "Q4 (Jan–Mar 24)"].map((q, i) => (
                        <Button
                            key={q}
                            variant={quarter === i ? "primary" : "outline"}
                            size="sm"
                            onClick={() => setQuarter(i)}
                        >
                            {q}
                        </Button>
                    ))}
                </div>

                {/* KPI cards */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {[
                        { label: "Total Deductees", val: "15", variant: "purple" as BadgeVariant },
                        { label: "Gross Payment", val: "₹15.3L", variant: "info" as BadgeVariant },
                        { label: "Total TDS", val: "₹51,200", variant: "success" as BadgeVariant },
                        { label: "Errors to Fix", val: "2", variant: "danger" as BadgeVariant },
                    ].map((k) => (
                        <Card key={k.label} padding="md" className="relative overflow-hidden">
                            <div className="mb-2 text-[9px] font-black uppercase tracking-widest text-slate-500">{k.label}</div>
                            <div className="text-2xl font-black tracking-tight tabular-nums text-white">{k.val}</div>
                        </Card>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Vendor table */}
                    <div className="space-y-4 lg:col-span-2">
                        <Card padding="none">
                            <div className="flex items-center justify-between gap-4 border-b border-[#1A2A3A] bg-[#060B14]/60 p-4">
                                <h2 className="text-xs font-black uppercase tracking-widest text-white">Vendor / Deductee List</h2>
                                <Button
                                    variant={filter === "errors" ? "danger" : "outline"}
                                    size="sm"
                                    icon={<Filter size={11} aria-hidden="true" />}
                                    onClick={() => setFilter((f) => f === "all" ? "errors" : "all")}
                                >
                                    {filter === "errors" ? "Errors Only" : "Show All"}
                                </Button>
                            </div>
                            <div className="p-4">
                                <DataTable<Vendor>
                                    data={filtered}
                                    columns={COLUMNS}
                                    rowKey={(r) => r.id}
                                    searchable
                                    searchPlaceholder="Search PAN..."
                                    aria-label="TDS 26Q vendor list"
                                    emptyTitle="No vendors found"
                                />
                            </div>
                        </Card>
                    </div>

                    {/* Right panel */}
                    <div className="space-y-6">
                        {/* Error summary */}
                        <Card padding="md" className="border-rose-500/20">
                            <h3 className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-rose-400">Errors to Resolve</h3>
                            <div className="space-y-3">
                                <div className="flex gap-3 rounded-xl border border-rose-500/20 bg-[#060B14] p-3">
                                    <AlertTriangle size={14} className="mt-0.5 shrink-0 text-rose-500" aria-hidden="true" />
                                    <div>
                                        <div className="text-[10px] font-black text-rose-400">Office Supplies Depot</div>
                                        <div className="mt-0.5 text-[9px] text-slate-500">PAN invalid — update vendor PAN before filing</div>
                                    </div>
                                </div>
                                <div className="flex gap-3 rounded-xl border border-amber-500/20 bg-[#060B14] p-3">
                                    <AlertTriangle size={14} className="mt-0.5 shrink-0 text-amber-500" aria-hidden="true" />
                                    <div>
                                        <div className="text-[10px] font-black text-amber-400">Prime Facility Management</div>
                                        <div className="mt-0.5 text-[9px] text-slate-500">BSR code missing for Feb challan — import from bank</div>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* TDS rate reference */}
                        <Card padding="md">
                            <h3 className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-white">TDS Rate Reference</h3>
                            <table className="w-full" aria-label="TDS rate reference">
                                <tbody className="divide-y divide-[#1A2A3A]">
                                    {TDS_RATES.map((r) => (
                                        <tr key={r.sec}>
                                            <td className="py-2 pr-3 text-[10px] font-black text-purple-400">{r.sec}</td>
                                            <td className="py-2 pr-3 text-[10px] font-bold text-white">{r.rate}</td>
                                            <td className="py-2 text-[9px] text-slate-500">{r.desc}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Card>

                        <div className="flex gap-3 rounded-xl border border-purple-500/20 bg-purple-500/5 p-4">
                            <Info size={15} className="mt-0.5 shrink-0 text-purple-400" aria-hidden="true" />
                            <p className="text-[10px] leading-relaxed text-slate-400">
                                Filing due: <b className="text-purple-400">31st July</b> for Q1, <b className="text-purple-400">31st Oct</b> for Q2, <b className="text-purple-400">31st Jan</b> for Q3, <b className="text-purple-400">31st May</b> for Q4.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
}
