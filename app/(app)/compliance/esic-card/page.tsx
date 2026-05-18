"use client";

import { useState } from "react";
import {
    CreditCard,
    Download,
    Clock,
    AlertTriangle,
    Eye,
    Printer,
    RefreshCw,
    Shield,
} from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─── Static palette ───────────────────────────────────────────────────────────
type CardStatus = "Active" | "Card Not Generated" | "Renewal Due";

const STATUS_BADGE: Record<CardStatus, BadgeVariant> = {
    Active: "success",
    "Card Not Generated": "warning",
    "Renewal Due": "danger",
};

// ─── KPI palette ──────────────────────────────────────────────────────────────
type KpiColor = "teal" | "amber" | "rose" | "blue";

const KPI_RING: Record<KpiColor, string> = {
    teal: "border-teal-500/20",
    amber: "border-amber-500/20",
    rose: "border-rose-500/20",
    blue: "border-blue-500/20",
};

const KPI_TEXT: Record<KpiColor, string> = {
    teal: "text-teal-400",
    amber: "text-amber-400",
    rose: "text-rose-400",
    blue: "text-blue-400",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
interface EsicEmployee {
    id: string;
    name: string;
    emp: string;
    ipNum: string;
    dispensary: string;
    validTill: string;
    status: CardStatus;
    nominee: string;
    family: number;
}

const EMPLOYEES: EsicEmployee[] = [
    { id: "e1", name: "Rahul Kumar Sharma", emp: "EMP-001", ipNum: "3112345678901", dispensary: "ESI Dispensary, Airoli", validTill: "Mar 2025", status: "Active", nominee: "Sunita Sharma (Wife)", family: 3 },
    { id: "e2", name: "Priya Mehta", emp: "EMP-002", ipNum: "3112345678902", dispensary: "ESI Dispensary, Bandra", validTill: "Mar 2025", status: "Active", nominee: "Ramesh Mehta (Father)", family: 2 },
    { id: "e3", name: "Anil Gupta", emp: "EMP-045", ipNum: "3112345678903", dispensary: "ESI Dispensary, Kurla", validTill: "Mar 2025", status: "Card Not Generated", nominee: "N/A", family: 0 },
    { id: "e4", name: "Sunita Patel", emp: "EMP-067", ipNum: "3112345678904", dispensary: "ESI Dispensary, Andheri", validTill: "Mar 2025", status: "Active", nominee: "Raj Patel (Husband)", family: 4 },
    { id: "e5", name: "Vikram Singh", emp: "EMP-099", ipNum: "3112345678905", dispensary: "ESI Dispensary, Airoli", validTill: "Expired", status: "Renewal Due", nominee: "Meena Singh (Wife)", family: 3 },
];

const KPI_DATA: { label: string; val: string; color: KpiColor; icon: typeof CreditCard }[] = [
    { label: "Active Cards", val: "138", color: "teal", icon: CreditCard },
    { label: "Not Generated", val: "04", color: "amber", icon: Clock },
    { label: "Renewal Due", val: "02", color: "rose", icon: AlertTriangle },
    { label: "Family Members", val: "312", color: "blue", icon: Shield },
];

// ─── Sub-components (module scope) ────────────────────────────────────────────
function ActionCell({ emp }: { emp: EsicEmployee }) {
    return (
        <div className="flex justify-center gap-2">
            <Button variant="ghost" size="sm" aria-label={`View ${emp.name}`} icon={<Eye size={14} aria-hidden="true" />} />
            <Button variant="ghost" size="sm" aria-label={`Download card for ${emp.name}`} icon={<Download size={14} aria-hidden="true" />} />
            <Button variant="ghost" size="sm" aria-label={`Print card for ${emp.name}`} icon={<Printer size={14} aria-hidden="true" />} />
        </div>
    );
}

const COLUMNS: Column<EsicEmployee>[] = [
    {
        key: "employee",
        label: "Employee",
        render: (e) => (
            <div>
                <div className="text-xs font-bold text-white">{e.name}</div>
                <div className="text-[10px] text-slate-500">{e.emp}</div>
            </div>
        ),
        sortable: true,
        sortValue: (e) => e.name,
    },
    {
        key: "ipNum",
        label: "IP Number",
        render: (e) => <span className="font-mono text-xs text-slate-300">{e.ipNum}</span>,
    },
    {
        key: "dispensary",
        label: "Dispensary",
        render: (e) => <span className="max-w-[140px] truncate text-[10px] text-slate-400">{e.dispensary}</span>,
        hideOnMobile: true,
    },
    {
        key: "family",
        label: "Family",
        align: "center",
        render: (e) => <span className="text-xs font-black text-slate-300">{e.family || "—"}</span>,
    },
    {
        key: "validTill",
        label: "Valid Till",
        render: (e) => (
            <span className={`text-xs font-bold ${e.validTill === "Expired" ? "text-rose-400" : "text-slate-300"}`}>
                {e.validTill}
            </span>
        ),
    },
    {
        key: "status",
        label: "Status",
        render: (e) => <Badge variant={STATUS_BADGE[e.status]}>{e.status}</Badge>,
    },
    {
        key: "actions",
        label: "",
        align: "center",
        render: (e) => <ActionCell emp={e} />,
    },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ESICCard() {
    const [selected, setSelected] = useState<string[]>([]);

    const toggleSelect = (id: string) =>
        setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

    return (
        <Page
            title="ESIC Card Management"
            subtitle="Generate, download, and track ESIC Pehchan Cards for insured persons (IPs) and their families."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Compliance", href: "/compliance/dashboard" },
                { label: "ESIC Card" },
            ]}
            maxWidth="1280px"
            actions={
                <>
                    <Button
                        variant="secondary"
                        icon={<RefreshCw size={14} aria-hidden="true" />}
                    >
                        Sync with ESIC
                    </Button>
                    <Button
                        variant="primary"
                        disabled={selected.length === 0}
                        icon={<Printer size={16} aria-hidden="true" />}
                    >
                        Print Cards ({selected.length})
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
                                <Icon size={16} className={`mb-2 ${KPI_TEXT[k.color]}`} aria-hidden="true" />
                                <div className={`text-2xl font-black tabular-nums ${KPI_TEXT[k.color]}`}>{k.val}</div>
                                <div className="mt-1 text-[9px] font-black uppercase tracking-widest text-slate-500">{k.label}</div>
                            </Card>
                        );
                    })}
                </div>

                {/* Card preview */}
                <Card padding="md" className="border-teal-500/20 bg-gradient-to-br from-teal-900/40 to-[#0D1928]">
                    <h2 className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-teal-400">ESIC Pehchan Card Preview</h2>
                    <div className="max-w-xl rounded-2xl border border-teal-500/30 bg-gradient-to-r from-teal-800/30 to-slate-900/70 p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="mb-1 text-[9px] font-black uppercase tracking-widest text-teal-400">
                                    Employees' State Insurance Corporation of India
                                </div>
                                <div className="text-lg font-black text-white">Rahul Kumar Sharma</div>
                                <div className="mt-1 text-[10px] text-slate-400">
                                    IP No: <span className="font-mono text-teal-300">3112345678901</span>
                                </div>
                                <div className="text-[10px] text-slate-400">Dispensary: ESI Dispensary, Airoli</div>
                                <div className="text-[10px] text-slate-400">Family Members: 3 | Valid: Mar 2025</div>
                            </div>
                            <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-teal-500/30 bg-teal-500/20">
                                <Shield size={28} className="text-teal-400" aria-hidden="true" />
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Table */}
                <Card padding="none">
                    <div className="border-b border-[#1A2A3A] bg-[#060B14]/60 p-4">
                        <h2 className="text-xs font-black uppercase tracking-widest text-white">Employee ESIC Cards</h2>
                    </div>
                    <div className="p-4">
                        <DataTable<EsicEmployee>
                            data={EMPLOYEES}
                            columns={COLUMNS}
                            rowKey={(e) => e.id}
                            onRowClick={(e) => toggleSelect(e.id)}
                            searchable
                            searchPlaceholder="Search employee..."
                            aria-label="ESIC card management"
                            emptyTitle="No employees found"
                        />
                    </div>
                </Card>
            </div>
        </Page>
    );
}
