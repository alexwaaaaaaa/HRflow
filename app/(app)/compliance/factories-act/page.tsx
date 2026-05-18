"use client";

import {
    ClipboardCheck,
    AlertTriangle,
    Calendar,
    Building,
    FileSignature,
    CheckCircle,
} from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─── Static palette ───────────────────────────────────────────────────────────
type RegisterStatus = "Updated" | "Pending Entry";

const REGISTER_BADGE: Record<RegisterStatus, BadgeVariant> = {
    Updated: "success",
    "Pending Entry": "danger",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
interface RegisterRow {
    id: string;
    name: string;
    frequency: string;
    status: RegisterStatus;
}

const REGISTERS: RegisterRow[] = [
    { id: "r1", name: "Register of Adult Workers (Form 12)", frequency: "Daily / Live", status: "Updated" },
    { id: "r2", name: "Register of Leave with Wages (Form 15)", frequency: "Monthly", status: "Updated" },
    { id: "r3", name: "Register of Accidents (Form 26)", frequency: "Incident Based", status: "Pending Entry" },
];

const REGISTER_COLUMNS: Column<RegisterRow>[] = [
    {
        key: "name",
        label: "Register Name",
        render: (r) => <span className="text-xs font-black text-white">{r.name}</span>,
    },
    {
        key: "frequency",
        label: "Frequency",
        render: (r) => <span className="text-xs font-bold text-slate-400">{r.frequency}</span>,
    },
    {
        key: "status",
        label: "Status",
        render: (r) => (
            <Badge variant={REGISTER_BADGE[r.status]}>
                {r.status === "Updated" ? <CheckCircle size={10} aria-hidden="true" /> : <AlertTriangle size={10} aria-hidden="true" />}
                {r.status}
            </Badge>
        ),
    },
    {
        key: "action",
        label: "Action",
        align: "center",
        render: (r) => (
            r.status === "Pending Entry" ? (
                <Button variant="danger" size="sm">Log</Button>
            ) : (
                <Button variant="ghost" size="sm">View</Button>
            )
        ),
    },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function FactoriesAct() {
    return (
        <Page
            title="Factories Act (1948)"
            subtitle="Manage factory licenses, safety audits, and statutory registers for manufacturing units."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Compliance", href: "/compliance/dashboard" },
                { label: "Factories Act" },
            ]}
            maxWidth="1280px"
        >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                <div className="space-y-6 lg:col-span-3">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* License Renewal */}
                        <Card padding="lg" className="border-orange-500/30">
                            <div className="mb-6 flex items-start justify-between">
                                <div className="flex items-center gap-2">
                                    <Building size={18} className="text-orange-500" aria-hidden="true" />
                                    <h2 className="text-sm font-black uppercase tracking-widest text-white">Pune Plant - MIDC</h2>
                                </div>
                                <Badge variant="warning">Renewal Due</Badge>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between rounded-xl border border-[#1A2A3A] bg-[#060B14] p-3 text-xs">
                                    <span className="font-bold text-slate-500">License No.</span>
                                    <span className="font-mono text-white">FAC/MH/PN/88212</span>
                                </div>
                                <div className="flex justify-between rounded-xl border border-rose-500/20 bg-rose-500/5 p-3 text-xs">
                                    <span className="font-bold text-rose-500">Validity Expires</span>
                                    <span className="font-black text-rose-500">31-Dec-2024</span>
                                </div>
                            </div>
                            <Button
                                variant="primary"
                                className="mt-6 w-full"
                                icon={<FileSignature size={14} aria-hidden="true" />}
                            >
                                Initiate Renewal Form 2
                            </Button>
                        </Card>

                        {/* Safety Audit */}
                        <Card padding="lg" className="border-emerald-500/20">
                            <div className="mb-6 flex items-start justify-between">
                                <div className="flex items-center gap-2">
                                    <ClipboardCheck size={18} className="text-emerald-500" aria-hidden="true" />
                                    <h2 className="text-sm font-black uppercase tracking-widest text-white">Safety Audit (HSE)</h2>
                                </div>
                                <Badge variant="success">Compliant</Badge>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between rounded-xl border border-[#1A2A3A] bg-[#060B14] p-3 text-xs">
                                    <span className="font-bold text-slate-500">Last Audit Date</span>
                                    <span className="font-bold text-white">15-Feb-2024</span>
                                </div>
                                <div className="flex justify-between rounded-xl border border-[#1A2A3A] bg-[#060B14] p-3 text-xs">
                                    <span className="font-bold text-slate-500">Next Scheduled</span>
                                    <span className="font-bold text-emerald-400">15-Feb-2025</span>
                                </div>
                            </div>
                            <Button variant="outline" className="mt-6 w-full">View Report</Button>
                        </Card>
                    </div>

                    {/* Statutory Registers */}
                    <Card padding="none">
                        <div className="flex items-center justify-between border-b border-[#1A2A3A] bg-[#060B14]/50 p-6">
                            <h2 className="text-sm font-black uppercase tracking-widest text-white">
                                Mandatory Registers (Form 11-29)
                            </h2>
                            <Button variant="outline" size="sm">Export All PDF</Button>
                        </div>
                        <div className="p-4">
                            <DataTable<RegisterRow>
                                data={REGISTERS}
                                columns={REGISTER_COLUMNS}
                                rowKey={(r) => r.id}
                                aria-label="Factories Act statutory registers"
                                emptyTitle="No registers found"
                            />
                        </div>
                    </Card>
                </div>

                {/* Annual Returns sidebar */}
                <Card padding="lg" className="relative overflow-hidden border-orange-500/30 bg-gradient-to-br from-orange-500/20 to-[#0D1928]">
                    <Calendar size={100} className="absolute -bottom-6 -right-6 text-orange-500 opacity-10" aria-hidden="true" />
                    <div className="relative z-10">
                        <h3 className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-orange-400">Annual Return</h3>
                        <div className="mb-1 text-2xl font-black text-white">Form 21</div>
                        <p className="mb-6 text-[10px] font-medium italic leading-relaxed text-slate-300">
                            Consolidated half-yearly / annual return filing to the Chief Inspector of Factories.
                        </p>
                        <div className="mb-4 flex items-center justify-between rounded-xl border border-[#1A2A3A] bg-[#060B14] p-3">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Due Date</span>
                            <span className="text-xs font-black text-white">31 Jan 2025</span>
                        </div>
                        <Button variant="outline" className="w-full">Prepare Form 21</Button>
                    </div>
                </Card>
            </div>
        </Page>
    );
}
