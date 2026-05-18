"use client";

import {
    Plus,
    CheckCircle,
    Clock,
    ArrowRight,
    UploadCloud,
    BadgeAlert,
    AlertOctagon,
} from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─── Static palette ───────────────────────────────────────────────────────────
type AadharStatus = "Verified" | "Pending";

const AADHAR_BADGE: Record<AadharStatus, BadgeVariant> = {
    Verified: "success",
    Pending: "warning",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
interface JoinerRow {
    id: string;
    name: string;
    empId: string;
    doj: string;
    aadhar: AadharStatus;
}

const JOINERS: JoinerRow[] = [
    { id: "j1", name: "Ritesh Kumar", empId: "EMP-901", doj: "01 Apr 2024", aadhar: "Verified" },
    { id: "j2", name: "Simran Singh", empId: "EMP-902", doj: "01 Apr 2024", aadhar: "Verified" },
    { id: "j3", name: "David Raj", empId: "EMP-903", doj: "04 Apr 2024", aadhar: "Pending" },
    { id: "j4", name: "Kavita Iyer", empId: "EMP-904", doj: "05 Apr 2024", aadhar: "Verified" },
];

const RECENT_RUNS = [
    { date: "10 Mar 24", count: 12 },
    { date: "15 Feb 24", count: 5 },
    { date: "12 Jan 24", count: 28 },
];

const COLUMNS: Column<JoinerRow>[] = [
    {
        key: "employee",
        label: "Employee",
        render: (r) => (
            <div>
                <div className="text-xs font-black text-white">{r.name}</div>
                <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-slate-500">{r.empId}</div>
            </div>
        ),
        sortable: true,
        sortValue: (r) => r.name,
    },
    {
        key: "doj",
        label: "DOJ",
        render: (r) => <span className="text-xs font-bold text-slate-400">{r.doj}</span>,
    },
    {
        key: "aadhar",
        label: "Aadhar Status",
        render: (r) => (
            <Badge variant={AADHAR_BADGE[r.aadhar]}>
                {r.aadhar === "Verified" ? <CheckCircle size={10} aria-hidden="true" /> : <Clock size={10} aria-hidden="true" />}
                {r.aadhar}
            </Badge>
        ),
    },
    {
        key: "action",
        label: "Action",
        align: "center",
        render: (r) => (
            <Button
                variant="ghost"
                size="sm"
                disabled={r.aadhar !== "Verified"}
                aria-label={`Generate UAN for ${r.name}`}
                icon={<Plus size={18} aria-hidden="true" />}
            />
        ),
    },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function UANGeneration() {
    return (
        <Page
            title="UAN Bulk Generation"
            subtitle="Register new joiners and generate Universal Account Numbers."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Compliance", href: "/compliance/dashboard" },
                { label: "UAN Generation" },
            ]}
            maxWidth="1280px"
            actions={
                <Button
                    variant="primary"
                    icon={<UploadCloud size={16} aria-hidden="true" />}
                >
                    Upload Bulk TXT
                </Button>
            }
        >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Action area */}
                <div className="space-y-6 lg:col-span-2">
                    <Card padding="none">
                        <div className="flex items-center justify-between border-b border-[#1A2A3A] bg-[#060B14]/50 p-6">
                            <div>
                                <h2 className="text-sm font-black uppercase tracking-widest text-white">Pending UAN Generation</h2>
                                <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">Employees missing UAN</p>
                            </div>
                            <Badge variant="danger">08 Actionable</Badge>
                        </div>
                        <div className="p-4">
                            <DataTable<JoinerRow>
                                data={JOINERS}
                                columns={COLUMNS}
                                rowKey={(r) => r.id}
                                aria-label="Pending UAN generation"
                                emptyTitle="No pending UAN generations"
                            />
                        </div>
                        <div className="border-t border-[#1A2A3A] bg-[#060B14] p-4">
                            <Button
                                variant="ghost"
                                className="w-full"
                                iconRight={<ArrowRight size={16} aria-hidden="true" />}
                            >
                                Generate Bulk TXT for Verified
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* Guidelines & recent runs */}
                <div className="space-y-6">
                    <Card padding="md">
                        <h3 className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-slate-400">EPFO Prerequisites</h3>
                        <ul className="space-y-3 text-[10px] font-medium italic leading-relaxed text-slate-300">
                            <li className="flex items-start gap-2">
                                <BadgeAlert size={14} className="mt-0.5 shrink-0 text-amber-500" aria-hidden="true" />
                                Aadhar Verification is structurally mandatory for new UAN generation via portal.
                            </li>
                            <li className="flex items-start gap-2">
                                <BadgeAlert size={14} className="mt-0.5 shrink-0 text-amber-500" aria-hidden="true" />
                                Name must exactly match the Aadhar database to avoid rejection.
                            </li>
                            <li className="flex items-start gap-2">
                                <AlertOctagon size={14} className="mt-0.5 shrink-0 text-rose-500" aria-hidden="true" />
                                For re-hires/transfers, do NOT generate a new UAN. Use the Form-13 (Transfer) process.
                            </li>
                        </ul>
                    </Card>

                    <Card padding="md" className="flex h-[280px] flex-col">
                        <h3 className="mb-4 border-b border-[#1A2A3A] pb-4 text-xs font-black uppercase tracking-[0.2em] text-white">
                            Recent Generations
                        </h3>
                        <div className="flex-1 space-y-3 overflow-y-auto pr-2">
                            {RECENT_RUNS.map((run) => (
                                <div key={run.date} className="flex items-center justify-between rounded-xl border border-[#1A2A3A] bg-[#060B14] p-3">
                                    <div>
                                        <div className="text-xs font-black uppercase tracking-widest text-slate-300">{run.date}</div>
                                        <div className="text-[9px] font-bold uppercase tracking-widest text-slate-500">{run.count} UANs Issued</div>
                                    </div>
                                    <CheckCircle size={16} className="text-emerald-500" aria-hidden="true" />
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
