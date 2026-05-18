"use client";

import { useState } from "react";
import {
    ShieldAlert,
    FileText,
    CheckSquare,
    FileSignature,
} from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─── Static palette ───────────────────────────────────────────────────────────
type ContractorStatus = "Clear" | "Hold Payment";

const STATUS_BADGE: Record<ContractorStatus, BadgeVariant> = {
    Clear: "success",
    "Hold Payment": "danger",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
interface ContractorRow {
    id: string;
    name: string;
    lic: string;
    pf: string;
    esi: string;
    wage: string;
    status: ContractorStatus;
}

const CONTRACTORS: ContractorRow[] = [
    { id: "c1", name: "A-Z Facility Management", lic: "Valid", pf: "Verified", esi: "Verified", wage: "Signed", status: "Clear" },
    { id: "c2", name: "SecureForce Guards Pvt Ltd", lic: "Valid", pf: "Pending", esi: "Pending", wage: "Unsigned", status: "Hold Payment" },
    { id: "c3", name: "Elite IT Staffing", lic: "Exempt (<20)", pf: "Verified", esi: "Exempt", wage: "Signed", status: "Clear" },
];

const PF_VARIANT: Record<string, BadgeVariant> = {
    Verified: "success",
    Pending: "danger",
    Exempt: "neutral",
};

const CONTRACTOR_COLUMNS: Column<ContractorRow>[] = [
    {
        key: "name",
        label: "Contractor / Agency",
        render: (r) => <span className="text-xs font-black text-white">{r.name}</span>,
        sortable: true,
        sortValue: (r) => r.name,
    },
    {
        key: "lic",
        label: "Labor License",
        align: "center",
        render: (r) => <span className="text-[10px] text-slate-400 font-bold">{r.lic}</span>,
    },
    {
        key: "pf",
        label: "PF Challan",
        align: "center",
        render: (r) => <Badge variant={PF_VARIANT[r.pf] ?? "neutral"}>{r.pf}</Badge>,
    },
    {
        key: "esi",
        label: "ESIC Challan",
        align: "center",
        render: (r) => <Badge variant={PF_VARIANT[r.esi] ?? "neutral"}>{r.esi}</Badge>,
    },
    {
        key: "wage",
        label: "Wage Register",
        align: "center",
        render: (r) => <span className="text-[10px] text-slate-400 font-bold">{r.wage}</span>,
    },
    {
        key: "status",
        label: "Action",
        align: "center",
        render: (r) => <Badge variant={STATUS_BADGE[r.status]}>{r.status}</Badge>,
    },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ContractLabour() {
    const [activeTab, setActiveTab] = useState<"principal" | "contractors">("principal");

    return (
        <Page
            title="Contract Labour (CLRA)"
            subtitle="Manage Principal Employer RC and verify Contractor Licenses/Challans."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Compliance", href: "/compliance/dashboard" },
                { label: "Contract Labour" },
            ]}
            maxWidth="1280px"
        >
            <div className="space-y-6">
                {/* Tab switcher */}
                <div className="flex gap-1 rounded-xl border border-[#1A2A3A] bg-[#0D1928] p-1 w-max">
                    <Button
                        variant={activeTab === "principal" ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => setActiveTab("principal")}
                    >
                        Principal Employer (PE)
                    </Button>
                    <Button
                        variant={activeTab === "contractors" ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => setActiveTab("contractors")}
                    >
                        Contractor Verification
                    </Button>
                </div>

                {activeTab === "principal" ? (
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                        <div className="space-y-6 lg:col-span-3">
                            {/* RC Summary */}
                            <Card padding="lg" className="relative overflow-hidden border-yellow-500/20">
                                <div className="absolute right-0 top-0 p-8 opacity-10">
                                    <FileSignature size={120} className="text-yellow-500" aria-hidden="true" />
                                </div>
                                <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
                                    <div>
                                        <h2 className="text-xs font-black uppercase tracking-widest text-yellow-500 mb-1">
                                            Registration Certificate (Form I)
                                        </h2>
                                        <div className="text-2xl font-black text-white">RC/MH/LC/2023/991</div>
                                        <p className="mt-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                            <CheckSquare size={14} className="text-emerald-500" aria-hidden="true" />
                                            Valid for up to 200 Contract Workers
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            icon={<FileText size={14} aria-hidden="true" />}
                                        >
                                            Download Certificate
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                        >
                                            Apply for Amendment
                                        </Button>
                                    </div>
                                </div>
                            </Card>

                            {/* Annual Return */}
                            <Card padding="lg">
                                <h2 className="mb-4 text-sm font-black uppercase tracking-widest text-white">
                                    Annual Return (Form XXV)
                                </h2>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                    {[
                                        { label: "Filing Period", val: "Jan - Dec 2023" },
                                        { label: "Status", val: "Filed" },
                                        { label: "Date of Filing", val: "10 Feb 2024" },
                                    ].map((s) => (
                                        <div key={s.label} className="space-y-1">
                                            <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">{s.label}</div>
                                            <div className="text-sm font-black text-slate-300">{s.val}</div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>

                        {/* Liability sidebar */}
                        <Card padding="md" className="border-rose-500/20">
                            <h3 className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-rose-500">
                                <ShieldAlert size={14} aria-hidden="true" /> Principal Employer Liability
                            </h3>
                            <p className="text-[10px] font-medium italic leading-relaxed text-slate-400">
                                Under Section 21 of CLRA, if the contractor fails to pay wages, PF, or ESI, the Principal
                                Employer is legally bound to clear the dues. Always audit contractor challans monthly.
                            </p>
                        </Card>
                    </div>
                ) : (
                    <Card padding="none">
                        <div className="flex items-center justify-between border-b border-[#1A2A3A] bg-[#060B14]/50 p-6">
                            <h2 className="text-sm font-black uppercase tracking-widest text-white">
                                Contractor Monthly Compliance Audit
                            </h2>
                            <Badge variant="warning">Audit Month: Mar 2024</Badge>
                        </div>
                        <div className="p-4">
                            <DataTable<ContractorRow>
                                data={CONTRACTORS}
                                columns={CONTRACTOR_COLUMNS}
                                rowKey={(r) => r.id}
                                aria-label="Contractor compliance audit"
                                emptyTitle="No contractors found"
                            />
                        </div>
                    </Card>
                )}
            </div>
        </Page>
    );
}
