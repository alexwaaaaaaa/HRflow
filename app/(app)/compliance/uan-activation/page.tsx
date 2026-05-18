"use client";

import { useState } from "react";
import {
    Zap,
    CheckCircle,
    Clock,
    AlertTriangle,
    Mail,
    Phone,
    UserCheck,
    ShieldCheck,
    RefreshCw,
    Filter,
} from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─── Static palette ───────────────────────────────────────────────────────────
type KraStatus = "Verified" | "Pending" | "Not Started";
type UanStatus = "Active" | "Inactive" | "Not Allotted";

const KRA_BADGE: Record<KraStatus, BadgeVariant> = {
    Verified: "success",
    Pending: "warning",
    "Not Started": "neutral",
};

const UAN_BADGE: Record<UanStatus, BadgeVariant> = {
    Active: "success",
    Inactive: "warning",
    "Not Allotted": "danger",
};

type KpiColor = "emerald" | "amber" | "rose" | "blue";

const KPI_RING: Record<KpiColor, string> = {
    emerald: "border-emerald-500/20",
    amber: "border-amber-500/20",
    rose: "border-rose-500/20",
    blue: "border-blue-500/20",
};

const KPI_TEXT: Record<KpiColor, string> = {
    emerald: "text-emerald-400",
    amber: "text-amber-400",
    rose: "text-rose-400",
    blue: "text-blue-400",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
interface EmpRow {
    id: string;
    name: string;
    emp: string;
    uan: string;
    mobile: string;
    email: string;
    kraStatus: KraStatus;
    uanStatus: UanStatus;
}

const EMPLOYEES: EmpRow[] = [
    { id: "e1", name: "Rohan Singh", emp: "EMP-288", uan: "100912345678", mobile: "9876543210", email: "rohan@co.in", kraStatus: "Verified", uanStatus: "Active" },
    { id: "e2", name: "Kavita Joshi", emp: "EMP-291", uan: "100912345679", mobile: "9823456789", email: "kavita@co.in", kraStatus: "Pending", uanStatus: "Inactive" },
    { id: "e3", name: "Malik Sayyed", emp: "EMP-305", uan: "100912345680", mobile: "9712345600", email: "malik@co.in", kraStatus: "Verified", uanStatus: "Inactive" },
    { id: "e4", name: "Shreya Nair", emp: "EMP-311", uan: "Not Allotted", mobile: "9654321870", email: "shreya@co.in", kraStatus: "Not Started", uanStatus: "Not Allotted" },
    { id: "e5", name: "Ankit Verma", emp: "EMP-320", uan: "100912345682", mobile: "9543210980", email: "ankit@co.in", kraStatus: "Verified", uanStatus: "Active" },
];

const KPI_DATA: { label: string; val: string; color: KpiColor; icon: typeof CheckCircle }[] = [
    { label: "Active UANs", val: "2", color: "emerald", icon: CheckCircle },
    { label: "Inactive UANs", val: "2", color: "amber", icon: Clock },
    { label: "Not Allotted", val: "1", color: "rose", icon: AlertTriangle },
    { label: "KYC Pending", val: "01", color: "blue", icon: ShieldCheck },
];

// ─── Sub-components (module scope) ────────────────────────────────────────────
function ActionCell({ emp, onActivate }: { emp: EmpRow; onActivate: (id: string) => void }) {
    if (emp.uanStatus === "Inactive") {
        return (
            <Button
                variant="ghost"
                size="sm"
                onClick={(ev) => { ev.stopPropagation(); onActivate(emp.id); }}
            >
                Activate
            </Button>
        );
    }
    if (emp.uanStatus === "Active") {
        return <UserCheck size={16} className="mx-auto text-emerald-500" aria-hidden="true" />;
    }
    return <span className="text-[9px] font-bold text-slate-600">Generate UAN First</span>;
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function UANActivation() {
    const [selected, setSelected] = useState<string[]>([]);

    const toggleSelect = (id: string) =>
        setSelected((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

    const columns: Column<EmpRow>[] = [
        {
            key: "employee",
            label: "Employee",
            render: (e) => (
                <div>
                    <div className="text-xs font-bold text-white">{e.name}</div>
                    <div className="text-[10px] font-bold text-slate-500">{e.emp}</div>
                </div>
            ),
            sortable: true,
            sortValue: (e) => e.name,
        },
        {
            key: "uan",
            label: "UAN Number",
            render: (e) => <span className="font-mono text-xs text-slate-300">{e.uan}</span>,
        },
        {
            key: "contact",
            label: "Mobile / Email",
            render: (e) => (
                <div>
                    <div className="flex items-center gap-1 text-[10px] text-slate-400">
                        <Phone size={10} className="text-slate-600" aria-hidden="true" /> {e.mobile}
                    </div>
                    <div className="mt-0.5 flex items-center gap-1 text-[10px] text-slate-500">
                        <Mail size={10} className="text-slate-600" aria-hidden="true" /> {e.email}
                    </div>
                </div>
            ),
            hideOnMobile: true,
        },
        {
            key: "kra",
            label: "KYC",
            render: (e) => <Badge variant={KRA_BADGE[e.kraStatus]}>{e.kraStatus}</Badge>,
        },
        {
            key: "uanStatus",
            label: "UAN Status",
            render: (e) => <Badge variant={UAN_BADGE[e.uanStatus]}>{e.uanStatus}</Badge>,
        },
        {
            key: "action",
            label: "Action",
            align: "center",
            render: (e) => <ActionCell emp={e} onActivate={toggleSelect} />,
        },
    ];

    return (
        <Page
            title="UAN Activation"
            subtitle="Activate UANs for new employees and send OTP-based self-service link to their mobile."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Compliance", href: "/compliance/dashboard" },
                { label: "UAN Activation" },
            ]}
            maxWidth="1280px"
            actions={
                <>
                    <Button
                        variant="secondary"
                        icon={<RefreshCw size={14} aria-hidden="true" />}
                    >
                        Sync EPFO Status
                    </Button>
                    <Button
                        variant="primary"
                        disabled={selected.length === 0}
                        icon={<Zap size={16} aria-hidden="true" />}
                    >
                        Send Activation Link ({selected.length})
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

                {/* Table */}
                <Card padding="none">
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1A2A3A] bg-[#060B14]/60 p-4">
                        <h2 className="text-xs font-black uppercase tracking-widest text-white">Employee UAN Status</h2>
                        <Button
                            variant="outline"
                            size="sm"
                            aria-label="Filter employees"
                            icon={<Filter size={13} aria-hidden="true" />}
                        />
                    </div>
                    <div className="p-4">
                        <DataTable<EmpRow>
                            data={EMPLOYEES}
                            columns={columns}
                            rowKey={(e) => e.id}
                            searchable
                            searchPlaceholder="Name / EmpID..."
                            aria-label="UAN activation status"
                            emptyTitle="No employees found"
                        />
                    </div>
                    <div className="border-t border-[#1A2A3A] bg-[#060B14]/60 p-3 text-center text-[10px] font-bold uppercase tracking-widest text-slate-600">
                        {selected.length} employee(s) selected for bulk activation
                    </div>
                </Card>

                {/* Info */}
                <div className="flex gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                    <Zap size={16} className="mt-0.5 shrink-0 text-amber-400" aria-hidden="true" />
                    <p className="text-[10px] leading-relaxed text-slate-400">
                        UAN activation requires employee&apos;s mobile number linked with Aadhaar. Post-activation, employees can
                        self-service on the EPFO Member Portal (passbook, claims, KYC update).
                    </p>
                </div>
            </div>
        </Page>
    );
}
