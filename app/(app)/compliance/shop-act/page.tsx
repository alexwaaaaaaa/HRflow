"use client";

import {
    FileCheck,
    MapPin,
    Plus,
    CheckCircle,
    AlertCircle,
    Download,
    ExternalLink,
    Users,
} from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─── Static palette ───────────────────────────────────────────────────────────
type BranchStatus = "active" | "expired";

// ─── Data ─────────────────────────────────────────────────────────────────────
interface BranchRow {
    id: string;
    loc: string;
    reg: string;
    valid: string;
    hc: string;
    status: BranchStatus;
}

const BRANCHES: BranchRow[] = [
    { id: "b1", loc: "HQ - Koramangala, BLR", reg: "SE/KA/09/22301", valid: "Lifetime", hc: "Max 150", status: "active" },
    { id: "b2", loc: "Sales Office - Andheri, MH", reg: "27293881023 (Intimation)", valid: "Not Req", hc: "0-9 Emp", status: "active" },
    { id: "b3", loc: "Support Center - Noida, UP", reg: "UP/GBN/SE/9912", valid: "31-Dec-2023", hc: "Max 50", status: "expired" },
];

const COLUMNS: Column<BranchRow>[] = [
    {
        key: "loc",
        label: "Branch Location",
        render: (r) => (
            <div className="flex items-center gap-2 text-xs font-black text-white">
                <MapPin size={12} className={r.status === "active" ? "text-emerald-500" : "text-rose-500"} aria-hidden="true" />
                {r.loc}
            </div>
        ),
        sortable: true,
        sortValue: (r) => r.loc,
    },
    {
        key: "reg",
        label: "Reg No. / Form C",
        render: (r) => <span className="font-mono text-xs text-slate-400">{r.reg}</span>,
    },
    {
        key: "valid",
        label: "Validity",
        render: (r) => (
            r.status === "expired" ? (
                <span className="flex animate-pulse items-center gap-1 text-[10px] font-black uppercase tracking-widest text-rose-500">
                    <AlertCircle size={12} aria-hidden="true" /> Expired: {r.valid}
                </span>
            ) : (
                <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-emerald-500">
                    <CheckCircle size={12} aria-hidden="true" /> {r.valid}
                </span>
            )
        ),
    },
    {
        key: "hc",
        label: "Headcount Allowed",
        render: (r) => (
            <span className="flex items-center gap-1 text-xs font-bold text-slate-300">
                <Users size={12} className="text-slate-500" aria-hidden="true" /> {r.hc}
            </span>
        ),
    },
    {
        key: "cert",
        label: "Certificate",
        align: "center",
        render: (r) => (
            r.status === "expired" ? (
                <Button variant="danger" size="sm">Renew</Button>
            ) : (
                <Button variant="ghost" size="sm" aria-label="Download certificate" icon={<Download size={16} aria-hidden="true" />} />
            )
        ),
    },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ShopAct() {
    return (
        <Page
            title="Shops & Establishments Act"
            subtitle="S&E Registrations, Renewals, and localized leave/holiday compliance."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Compliance", href: "/compliance/dashboard" },
                { label: "Shop Act" },
            ]}
            maxWidth="1280px"
        >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                {/* Branch registrations */}
                <div className="space-y-6 lg:col-span-3">
                    <Card padding="none">
                        <div className="flex items-center justify-between border-b border-[#1A2A3A] bg-[#060B14]/50 p-6">
                            <h2 className="text-sm font-black uppercase tracking-widest text-white">S&E Certificates by Branch</h2>
                            <Button
                                variant="secondary"
                                size="sm"
                                icon={<Plus size={14} aria-hidden="true" />}
                            >
                                Add New
                            </Button>
                        </div>
                        <div className="p-4">
                            <DataTable<BranchRow>
                                data={BRANCHES}
                                columns={COLUMNS}
                                rowKey={(r) => r.id}
                                searchable
                                searchPlaceholder="Search Branch..."
                                aria-label="S&E certificates by branch"
                                emptyTitle="No branches found"
                            />
                        </div>
                        <div className="flex items-center justify-center gap-2 border-t border-[#1A2A3A] bg-[#060B14] p-4 text-center text-[10px] font-black italic uppercase tracking-widest text-cyan-500">
                            Note: Shop Act Certificate must be prominently displayed at every branch premises.
                        </div>
                    </Card>
                </div>

                {/* Regional leave rules */}
                <Card padding="md">
                    <h3 className="mb-4 flex items-center gap-2 border-b border-[#1A2A3A] pb-4 text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                        <FileCheck size={14} className="text-cyan-500" aria-hidden="true" /> S&E Local Leave Rules
                    </h3>
                    <p className="mb-4 text-[10px] font-medium italic leading-relaxed text-slate-400">
                        S&E Act governs minimum leave encashment and carry-forward rules which must reflect in the HRFlow Leave Module.
                    </p>
                    <div className="space-y-2">
                        {[
                            { state: "Karnataka", rule: "1 Earned Leave per 20 days worked. Max carry forward: 30." },
                            { state: "Maharashtra", rule: "15 days of Paid Leave. Max carry forward: 45." },
                        ].map((r) => (
                            <div key={r.state} className="rounded-lg border border-[#1A2A3A] bg-[#060B14] p-3">
                                <div className="text-[10px] font-black uppercase tracking-widest text-white">{r.state}</div>
                                <div className="mt-1 text-[9px] font-bold text-slate-500">{r.rule}</div>
                            </div>
                        ))}
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        className="mt-4 w-full"
                        iconRight={<ExternalLink size={12} aria-hidden="true" />}
                    >
                        Sync with Leave Module
                    </Button>
                </Card>
            </div>
        </Page>
    );
}
