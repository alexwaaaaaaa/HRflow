"use client";

import {
    Clock,
    ShieldCheck,
    ShieldAlert,
    Fingerprint,
    CreditCard,
    Users,
    Banknote,
} from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { type BadgeVariant } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─── Static palette ───────────────────────────────────────────────────────────
type DocType = "Aadhar" | "Bank A/C" | "PAN Card";

const DOC_COLOR: Record<DocType, string> = {
    Aadhar: "text-violet-500",
    "Bank A/C": "text-emerald-500",
    "PAN Card": "text-blue-500",
};

const DOC_ICON: Record<DocType, typeof Fingerprint> = {
    Aadhar: Fingerprint,
    "Bank A/C": Banknote,
    "PAN Card": CreditCard,
};

// ─── Data ─────────────────────────────────────────────────────────────────────
interface KycRow {
    id: string;
    name: string;
    uan: string;
    doc: DocType;
    date: string;
}

const KYC_ROWS: KycRow[] = [
    { id: "k1", name: "Sanjay Dutt", uan: "100456789020", doc: "Aadhar", date: "Today, 10:42 AM" },
    { id: "k2", name: "Karan Singh", uan: "100456789021", doc: "Bank A/C", date: "Yesterday" },
    { id: "k3", name: "Sneha Patil", uan: "100456789022", doc: "PAN Card", date: "14 Apr 24" },
    { id: "k4", name: "Vikram Das", uan: "100456789023", doc: "Bank A/C", date: "12 Apr 24" },
];

const COLUMNS: Column<KycRow>[] = [
    {
        key: "employee",
        label: "Employee",
        render: (r) => (
            <div>
                <div className="text-xs font-black text-white">{r.name}</div>
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500">UAN: {r.uan}</div>
            </div>
        ),
        sortable: true,
        sortValue: (r) => r.name,
    },
    {
        key: "doc",
        label: "Document Type",
        render: (r) => {
            const Icon = DOC_ICON[r.doc];
            return (
                <div className="flex items-center gap-2">
                    <div className={`rounded-lg border border-[#1A2A3A] bg-[#060B14] p-1.5 ${DOC_COLOR[r.doc]}`}>
                        <Icon size={12} aria-hidden="true" />
                    </div>
                    <span className="text-xs font-bold text-slate-300">{r.doc}</span>
                </div>
            );
        },
    },
    {
        key: "date",
        label: "Uploaded On",
        render: (r) => <span className="text-xs font-bold text-slate-400">{r.date}</span>,
    },
    {
        key: "approve",
        label: "Approve",
        align: "center",
        render: () => (
            <input
                type="checkbox"
                className="h-4 w-4 cursor-pointer rounded border-[#1A2A3A] bg-[#060B14] text-emerald-500 focus:ring-emerald-500/50"
                aria-label="Approve KYC"
            />
        ),
    },
];

// ─── KPI data ─────────────────────────────────────────────────────────────────
interface KpiItem {
    label: string;
    val: string | number;
    variant: BadgeVariant;
    icon: typeof Users;
    iconClass: string;
}

const KPI_ITEMS: KpiItem[] = [
    { label: "Total Members", val: 312, variant: "info", icon: Users, iconClass: "text-slate-600" },
    { label: "100% Verified", val: 285, variant: "success", icon: ShieldCheck, iconClass: "text-emerald-500/50" },
    { label: "Pending Approval", val: 22, variant: "warning", icon: Clock, iconClass: "text-amber-500/50 animate-pulse" },
    { label: "Missing / Rejected", val: "05", variant: "danger", icon: ShieldAlert, iconClass: "text-rose-500/50" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function EPFOKYCVerification() {
    return (
        <Page
            title="Member KYC Verification"
            subtitle="Approve and digitally sign employee KYC updates (Aadhar, PAN, Bank)."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Compliance", href: "/compliance/dashboard" },
                { label: "KYC Verification" },
            ]}
            maxWidth="1280px"
        >
            <div className="space-y-6">
                {/* KPI strip */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                    {KPI_ITEMS.map((k) => {
                        const Icon = k.icon;
                        return (
                            <Card key={k.label} padding="md" className="flex items-center justify-between">
                                <div>
                                    <div className="mb-1 text-[10px] font-black uppercase tracking-widest text-slate-500">{k.label}</div>
                                    <div className="text-2xl font-black text-white">{k.val}</div>
                                </div>
                                <Icon size={24} className={k.iconClass} aria-hidden="true" />
                            </Card>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Pending approvals */}
                    <div className="space-y-6 lg:col-span-2">
                        <Card padding="none">
                            <div className="flex items-center justify-between border-b border-[#1A2A3A] bg-[#060B14]/50 p-6">
                                <h2 className="text-sm font-black uppercase tracking-widest text-white">Pending Employer Approval</h2>
                            </div>
                            <div className="p-4">
                                <DataTable<KycRow>
                                    data={KYC_ROWS}
                                    columns={COLUMNS}
                                    rowKey={(r) => r.id}
                                    searchable
                                    searchPlaceholder="Search UAN/Name..."
                                    aria-label="KYC pending approvals"
                                    emptyTitle="No pending KYC approvals"
                                />
                            </div>
                            <div className="flex items-center justify-between border-t border-[#1A2A3A] bg-[#060B14] p-4">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Selected: 0</span>
                                <Button variant="primary" disabled>Sign with DSC &amp; Approve</Button>
                            </div>
                        </Card>
                    </div>

                    {/* DSC & guidelines */}
                    <div className="space-y-6">
                        <Card padding="md" className="relative overflow-hidden border-blue-500/30 bg-gradient-to-br from-[#0D1928] to-[#1A2A3A]">
                            <h3 className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-blue-500">Digital Signature (DSC)</h3>
                            <div className="relative z-10 space-y-4">
                                <div className="rounded-xl border border-[#1A2A3A] bg-[#060B14]/80 p-4 text-center">
                                    <div className="text-sm font-black uppercase tracking-tight text-white">Active Token Detected</div>
                                    <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                        HR Director (Valid till 2025)
                                    </div>
                                </div>
                                <p className="text-center text-[10px] font-medium italic leading-relaxed text-slate-400">
                                    Approving KYC requires the physical DSC token to be plugged in and the e-Signer utility running on
                                    this machine.
                                </p>
                            </div>
                            <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-blue-500/5 blur-2xl" />
                        </Card>

                        <Card padding="md">
                            <h3 className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Urgent Actions Required</h3>
                            <div className="space-y-3">
                                <div className="rounded-xl border border-l-2 border-rose-500/20 border-l-rose-500 bg-rose-500/5 p-3">
                                    <h4 className="text-xs font-bold text-slate-200">Invalid Bank Details / IFSC (03)</h4>
                                    <p className="mt-1 text-[10px] italic text-slate-500">Employees need to re-submit latest cheque copy.</p>
                                </div>
                                <div className="rounded-xl border border-l-2 border-amber-500/20 border-l-amber-500 bg-amber-500/5 p-3">
                                    <h4 className="text-xs font-bold text-slate-200">Aadhar Name Mismatch (02)</h4>
                                    <p className="mt-1 text-[10px] italic text-slate-500">Joint Declaration form submission pending.</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </Page>
    );
}
