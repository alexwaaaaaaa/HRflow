"use client";

import {
    Clock,
    UserCheck,
    AlertCircle,
    FileText,
} from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─── Static palette ───────────────────────────────────────────────────────────
type ClaimStatus = "Pending Employer Approval" | "Approved & Settled" | "Rejected by Field Office";

const STATUS_BADGE: Record<ClaimStatus, BadgeVariant> = {
    "Pending Employer Approval": "warning",
    "Approved & Settled": "success",
    "Rejected by Field Office": "danger",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
interface ClaimRow {
    id: string;
    name: string;
    uan: string;
    form: string;
    doe: string;
    status: ClaimStatus;
}

const CLAIMS: ClaimRow[] = [
    { id: "c1", name: "Ritesh Kumar", uan: "100456789012", form: "Form 19 (PF Settlement)", doe: "31 Jan 2024", status: "Pending Employer Approval" },
    { id: "c2", name: "Simran Singh", uan: "100456789013", form: "Form 10C (EPS Withdrawal)", doe: "31 Jan 2024", status: "Pending Employer Approval" },
    { id: "c3", name: "David Raj", uan: "100456789014", form: "Form 31 (Advance)", doe: "Active", status: "Approved & Settled" },
    { id: "c4", name: "Kavita Iyer", uan: "100456789015", form: "Form 19 (PF Settlement)", doe: "15 Dec 2023", status: "Rejected by Field Office" },
];

const COLUMNS: Column<ClaimRow>[] = [
    {
        key: "employee",
        label: "Ex-Employee",
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
        key: "form",
        label: "Claim Form",
        render: (r) => <span className="text-xs font-bold text-slate-300">{r.form}</span>,
    },
    {
        key: "doe",
        label: "Date of Exit",
        render: (r) => (
            <span className={`text-xs font-bold ${r.doe === "Active" ? "text-emerald-500" : "text-slate-400"}`}>
                {r.doe}
            </span>
        ),
    },
    {
        key: "status",
        label: "Current Status",
        render: (r) => <Badge variant={STATUS_BADGE[r.status]}>{r.status}</Badge>,
    },
    {
        key: "action",
        label: "Employer Action",
        align: "center",
        render: (r) => (
            r.status === "Pending Employer Approval" ? (
                <Button variant="secondary" size="sm">Attest Request</Button>
            ) : (
                <span className="text-slate-600">-</span>
            )
        ),
    },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PFWithdrawal() {
    return (
        <Page
            title="Form 19 & 10C Withdrawals"
            subtitle="Approve and track final settlement claims of exited employees."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Compliance", href: "/compliance/dashboard" },
                { label: "PF Withdrawal" },
            ]}
            maxWidth="1280px"
        >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                {/* Claims table */}
                <div className="space-y-6 lg:col-span-3">
                    <Card padding="none">
                        <div className="flex items-center justify-between border-b border-[#1A2A3A] bg-[#060B14]/50 p-6">
                            <h2 className="text-sm font-black uppercase tracking-widest text-white">Active Claims Radar</h2>
                            <Badge variant="neutral">Last 60 Days</Badge>
                        </div>
                        <div className="p-4">
                            <DataTable<ClaimRow>
                                data={CLAIMS}
                                columns={COLUMNS}
                                rowKey={(r) => r.id}
                                aria-label="PF withdrawal claims"
                                emptyTitle="No active claims"
                            />
                        </div>
                        <div className="flex items-center justify-center gap-2 border-t border-[#1A2A3A] bg-[#060B14]/50 p-4 text-center text-[10px] font-bold italic uppercase tracking-widest text-amber-500">
                            <AlertCircle size={14} aria-hidden="true" /> Attestation must be completed within 15 days of online claim.
                        </div>
                    </Card>
                </div>

                {/* Prerequisites */}
                <Card padding="md">
                    <h3 className="mb-4 border-b border-[#1A2A3A] pb-4 text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                        Claim Prerequisites
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3 rounded-xl border border-[#1A2A3A] bg-[#060B14] p-4">
                            <Clock size={16} className="mt-0.5 shrink-0 text-amber-500" aria-hidden="true" />
                            <div>
                                <div className="text-xs font-black text-white">60-Day Waiting Period</div>
                                <p className="mt-1 text-[10px] font-medium italic leading-relaxed text-slate-500">
                                    Form 19/10C can only be filed online if 2 months have passed since Date of Exit (Non-employment).
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 rounded-xl border border-[#1A2A3A] bg-[#060B14] p-4">
                            <UserCheck size={16} className="mt-0.5 shrink-0 text-emerald-500" aria-hidden="true" />
                            <div>
                                <div className="text-xs font-black text-white">Date of Exit Must be Updated</div>
                                <p className="mt-1 text-[10px] font-medium italic leading-relaxed text-slate-500">
                                    Employer must update DOE and Reason of Exit in Unified Portal first.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 rounded-xl border border-[#1A2A3A] bg-[#060B14] p-4 opacity-70">
                            <FileText size={16} className="mt-0.5 shrink-0 text-slate-400" aria-hidden="true" />
                            <div>
                                <div className="text-xs font-black text-slate-300">Basic KYC verified via Aadhar</div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </Page>
    );
}
