"use client";

import {
    CheckCircle,
    Clock,
    ShieldAlert,
    XCircle,
} from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─── Static palette ───────────────────────────────────────────────────────────
type BlockerType = "critical" | "warning";

const BLOCKER_BADGE: Record<BlockerType, BadgeVariant> = {
    critical: "danger",
    warning: "warning",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
interface NominationRow {
    id: string;
    name: string;
    uan: string;
    status: string;
    days: number;
    type: BlockerType;
}

const ROWS: NominationRow[] = [
    { id: "n1", name: "Sanjay Dutt", uan: "100456789020", status: "Aadhar DB Not Seeded", days: 45, type: "critical" },
    { id: "n2", name: "Karan Singh", uan: "100456789021", status: "Pending e-Sign by Emp", days: 12, type: "warning" },
    { id: "n3", name: "Sneha Patil", uan: "100456789022", status: "Profile Photo Missing", days: 5, type: "warning" },
    { id: "n4", name: "Vikram Das", uan: "100456789023", status: "Aadhar Name Mismatch", days: 60, type: "critical" },
];

const COLUMNS: Column<NominationRow>[] = [
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
        key: "status",
        label: "Blocker/Status",
        render: (r) => <Badge variant={BLOCKER_BADGE[r.type]}>{r.status}</Badge>,
    },
    {
        key: "days",
        label: "Days Overdue",
        render: (r) => (
            <span className={`text-xs font-black tabular-nums ${r.days > 30 ? "text-rose-500" : "text-slate-400"}`}>
                {r.days} Days
            </span>
        ),
    },
    {
        key: "action",
        label: "Action",
        align: "center",
        render: () => <Button variant="outline" size="sm">Notify</Button>,
    },
];

const FLOW_STEPS = [
    "Login to UAN Member Portal.",
    "Update Profile Photo & Address in View Profile.",
    "Go to Manage > e-Nomination.",
    "Add Family Details (Aadhar, Photo mandatory for nominees).",
    "Allocate PF/EPS share %.",
    "Authenticate via Aadhar Virtual ID OTP (e-Sign).",
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PFNomination() {
    return (
        <Page
            title="PF e-Nomination Tracker"
            subtitle="Track Aadhar-based e-Nomination status across all active UANs."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Compliance", href: "/compliance/dashboard" },
                { label: "PF Nomination" },
            ]}
            maxWidth="1280px"
        >
            <div className="space-y-6">
                {/* KPI strip */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <Card padding="md" className="flex items-center justify-between">
                        <div>
                            <div className="mb-1 text-[10px] font-black uppercase tracking-widest text-emerald-500">e-Nomination Complete</div>
                            <div className="text-3xl font-black text-white">218</div>
                        </div>
                        <CheckCircle size={32} className="text-emerald-500/50" aria-hidden="true" />
                    </Card>
                    <Card padding="md" className="flex items-center justify-between border-amber-500/30">
                        <div>
                            <div className="mb-1 text-[10px] font-black uppercase tracking-widest text-amber-500">Pending Submission</div>
                            <div className="text-3xl font-black tabular-nums text-amber-500">84</div>
                        </div>
                        <Clock size={32} className="animate-pulse text-amber-500/50" aria-hidden="true" />
                    </Card>
                    <Card padding="md" className="flex items-center justify-between border-rose-500/30">
                        <div>
                            <div className="mb-1 text-[10px] font-black uppercase tracking-widest text-rose-500">Aadhar Profile Mismatch</div>
                            <div className="text-3xl font-black tabular-nums text-rose-500">10</div>
                        </div>
                        <XCircle size={32} className="text-rose-500/50" aria-hidden="true" />
                    </Card>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Defaulters list */}
                    <div className="space-y-6 lg:col-span-2">
                        <Card padding="none">
                            <div className="flex items-center justify-between border-b border-[#1A2A3A] bg-[#060B14]/50 p-6">
                                <h2 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-white">
                                    <ShieldAlert size={16} className="text-amber-500" aria-hidden="true" /> Pending Action List
                                </h2>
                                <Button variant="secondary" size="sm">Send Reminder</Button>
                            </div>
                            <div className="p-4">
                                <DataTable<NominationRow>
                                    data={ROWS}
                                    columns={COLUMNS}
                                    rowKey={(r) => r.id}
                                    searchable
                                    searchPlaceholder="Search Details..."
                                    aria-label="PF nomination pending actions"
                                    emptyTitle="No pending nominations"
                                />
                            </div>
                            <div className="border-t border-[#1A2A3A] bg-[#060B14]/50 p-4 text-center text-[10px] font-bold italic uppercase tracking-widest text-slate-500">
                                Note: Employers cannot file e-nomination. It must be initiated via Member Portal.
                            </div>
                        </Card>
                    </div>

                    {/* How-to guide */}
                    <Card padding="md" className="flex flex-col">
                        <h3 className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-rose-500">Nomination Flow (For Emp)</h3>
                        <div className="flex-1 rounded-2xl border border-[#1A2A3A] bg-[#060B14]/50 p-4">
                            <ol className="space-y-4 text-[10px] font-medium leading-relaxed text-slate-300">
                                {FLOW_STEPS.map((step, i) => (
                                    <li key={i} className="flex gap-3">
                                        <span className="font-black text-rose-500">{i + 1}.</span>
                                        {step}
                                    </li>
                                ))}
                            </ol>
                        </div>
                        <Button variant="outline" className="mt-6 w-full">Share Guide via Email</Button>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
