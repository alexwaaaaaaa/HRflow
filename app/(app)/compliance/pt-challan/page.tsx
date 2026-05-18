"use client";

import { useState } from "react";
import {
    CheckCircle,
    Download,
    ShieldAlert,
    MapPin,
} from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─── Static palette ───────────────────────────────────────────────────────────
type RegStatus = "Active" | "In-Progress" | "Exempt";

const REG_BADGE: Record<RegStatus, BadgeVariant> = {
    Active: "success",
    "In-Progress": "warning",
    Exempt: "neutral",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
interface RegRow {
    id: string;
    state: string;
    rc: string;
    ec: string;
    status: RegStatus;
}

const REG_ROWS: RegRow[] = [
    { id: "r1", state: "Karnataka (KA)", rc: "RC2900018820", ec: "EC2900018821", status: "Active" },
    { id: "r2", state: "Maharashtra (MH)", rc: "RC2700045512", ec: "EC2700045513", status: "Active" },
    { id: "r3", state: "Telangana (TG)", rc: "Pending Gov Review", ec: "Pending Gov Review", status: "In-Progress" },
    { id: "r4", state: "Tamil Nadu (TN)", rc: "Not Required (<5 Emp)", ec: "Not Required", status: "Exempt" },
];

const REG_COLUMNS: Column<RegRow>[] = [
    {
        key: "state",
        label: "State",
        render: (r) => <span className="text-xs font-black text-white">{r.state}</span>,
    },
    {
        key: "rc",
        label: "Registration Certificate (RC)",
        render: (r) => (
            <span className={`font-mono text-xs font-bold ${r.rc.includes("Pending") || r.rc.includes("Not") ? "text-[10px] uppercase tracking-widest text-slate-500" : "text-slate-300"}`}>
                {r.rc}
            </span>
        ),
    },
    {
        key: "ec",
        label: "Enrollment Certificate (EC)",
        render: (r) => (
            <span className={`font-mono text-xs font-bold ${r.ec.includes("Pending") || r.ec.includes("Not") ? "text-[10px] uppercase tracking-widest text-slate-500" : "text-slate-300"}`}>
                {r.ec}
            </span>
        ),
    },
    {
        key: "status",
        label: "Status",
        render: (r) => <Badge variant={REG_BADGE[r.status]}>{r.status}</Badge>,
    },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProfessionalTax() {
    const [activeTab, setActiveTab] = useState<"challan" | "registration">("challan");

    return (
        <Page
            title={activeTab === "challan" ? "Professional Tax (PT) Returns" : "PT Registration (RC/EC)"}
            subtitle={
                activeTab === "challan"
                    ? "State-wise PT deduction, challan generation, and payment."
                    : "Track PT Registration Certificates (RC) and Enrollment Certificates (EC) across states."
            }
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Compliance", href: "/compliance/dashboard" },
                { label: "PT Challan" },
            ]}
            maxWidth="1280px"
        >
            <div className="space-y-6">
                {/* Tab switcher */}
                <div className="flex gap-1 rounded-xl border border-[#1A2A3A] bg-[#0D1928] p-1 w-max">
                    <Button
                        variant={activeTab === "challan" ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => setActiveTab("challan")}
                    >
                        PT Challans
                    </Button>
                    <Button
                        variant={activeTab === "registration" ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => setActiveTab("registration")}
                    >
                        PT Registrations
                    </Button>
                </div>

                {activeTab === "challan" ? (
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                        <div className="space-y-6 lg:col-span-3">
                            <div className="flex items-center gap-4">
                                <Button variant="outline" size="sm">March 2024</Button>
                                <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">State-wise Summary</div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {/* Karnataka */}
                                <Card padding="lg" className="border-blue-500/20">
                                    <div className="mb-6 flex items-start justify-between">
                                        <div className="flex items-center gap-2">
                                            <MapPin size={18} className="text-blue-500" aria-hidden="true" />
                                            <h2 className="text-lg font-black uppercase tracking-widest text-white">Karnataka (KA)</h2>
                                        </div>
                                        <Badge variant="info">Monthly Filer</Badge>
                                    </div>
                                    <div className="mb-6 grid grid-cols-2 gap-4">
                                        <div>
                                            <div className="mb-1 text-[10px] font-black uppercase tracking-widest text-slate-500">Emp Count</div>
                                            <div className="text-xl font-black tabular-nums text-white">42</div>
                                        </div>
                                        <div>
                                            <div className="mb-1 text-[10px] font-black uppercase tracking-widest text-slate-500">PT Payable</div>
                                            <div className="text-xl font-black tabular-nums text-blue-500">₹8,400</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <Button variant="primary" className="flex-1">Pay via e-Prerana</Button>
                                        <Button variant="outline" size="sm" aria-label="Download PT challan" icon={<Download size={14} aria-hidden="true" />} />
                                    </div>
                                </Card>

                                {/* Maharashtra */}
                                <Card padding="lg" className="border-emerald-500/20">
                                    <div className="mb-6 flex items-start justify-between">
                                        <div className="flex items-center gap-2">
                                            <MapPin size={18} className="text-emerald-500" aria-hidden="true" />
                                            <h2 className="text-lg font-black uppercase tracking-widest text-white">Maharashtra (MH)</h2>
                                        </div>
                                        <Badge variant="success">Monthly Filer</Badge>
                                    </div>
                                    <div className="mb-6 grid grid-cols-2 gap-4">
                                        <div>
                                            <div className="mb-1 text-[10px] font-black uppercase tracking-widest text-slate-500">Emp Count</div>
                                            <div className="text-xl font-black tabular-nums text-white">35</div>
                                        </div>
                                        <div>
                                            <div className="mb-1 text-[10px] font-black uppercase tracking-widest text-slate-500">PT Payable</div>
                                            <div className="text-xl font-black tabular-nums text-emerald-500">₹10,500</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <Button variant="primary" className="flex-1">Pay via MahaGST</Button>
                                        <Button variant="outline" size="sm" aria-label="Download PT challan" icon={<Download size={14} aria-hidden="true" />} />
                                    </div>
                                </Card>

                                {/* Telangana */}
                                <Card padding="lg">
                                    <div className="mb-6 flex items-start justify-between">
                                        <div className="flex items-center gap-2">
                                            <MapPin size={18} className="text-slate-400" aria-hidden="true" />
                                            <h2 className="text-lg font-black uppercase tracking-widest text-slate-300">Telangana (TG)</h2>
                                        </div>
                                        <Badge variant="neutral">Monthly Filer</Badge>
                                    </div>
                                    <div className="mb-6 grid grid-cols-2 gap-4">
                                        <div>
                                            <div className="mb-1 text-[10px] font-black uppercase tracking-widest text-slate-500">Emp Count</div>
                                            <div className="text-xl font-black tabular-nums text-white">12</div>
                                        </div>
                                        <div>
                                            <div className="mb-1 text-[10px] font-black uppercase tracking-widest text-slate-500">PT Payable</div>
                                            <div className="text-xl font-black tabular-nums text-slate-300">₹2,400</div>
                                        </div>
                                    </div>
                                    <Button variant="secondary" className="w-full" disabled icon={<CheckCircle size={14} aria-hidden="true" />}>
                                        Paid (10 Apr)
                                    </Button>
                                </Card>
                            </div>
                        </div>

                        {/* Guidelines sidebar */}
                        <Card padding="md">
                            <h3 className="mb-4 border-b border-[#1A2A3A] pb-4 text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                                PT Deduction Logic
                            </h3>
                            <ul className="space-y-4 text-[10px] font-medium italic leading-relaxed text-slate-300">
                                <li className="flex gap-2">
                                    <span className="font-black text-rose-500">•</span>
                                    <span><strong>KA:</strong> ₹200/month for salary &gt; ₹25,000.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="font-black text-rose-500">•</span>
                                    <span><strong>MH:</strong> ₹200/month except Feb (₹300) for salary &gt; ₹10,000 (men) or ₹25,000 (women).</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="font-black text-rose-500">•</span>
                                    <span><strong>TG:</strong> Slab-based (₹150 to ₹200) for gross salary &gt; ₹15,000.</span>
                                </li>
                            </ul>
                            <div className="mt-4 flex items-start gap-2 rounded-xl border border-amber-500/30 bg-amber-500/5 p-3">
                                <ShieldAlert size={14} className="mt-0.5 shrink-0 text-amber-500" aria-hidden="true" />
                                <p className="text-[9px] font-bold uppercase leading-relaxed tracking-widest text-amber-500">
                                    PT laws vary drastically by State Govt. Verify slabs annually.
                                </p>
                            </div>
                        </Card>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                        <div className="space-y-6 lg:col-span-3">
                            <Card padding="none">
                                <div className="flex items-center justify-between border-b border-[#1A2A3A] bg-[#060B14]/50 p-6">
                                    <h2 className="text-sm font-black uppercase tracking-widest text-white">Registration Master</h2>
                                    <Button variant="secondary" size="sm">+ Add State Registration</Button>
                                </div>
                                <div className="p-4">
                                    <DataTable<RegRow>
                                        data={REG_ROWS}
                                        columns={REG_COLUMNS}
                                        rowKey={(r) => r.id}
                                        aria-label="PT registration master"
                                        emptyTitle="No registrations found"
                                    />
                                </div>
                            </Card>
                        </div>

                        {/* RC vs EC sidebar */}
                        <Card padding="md">
                            <h3 className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-slate-400">RC vs EC</h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="mb-1 text-[10px] font-black uppercase tracking-widest text-white">RC (Registration Cert.)</div>
                                    <p className="text-[10px] font-medium italic leading-relaxed text-slate-400">
                                        Required to deduct PT from employees&apos; salaries and remit to Govt.
                                    </p>
                                </div>
                                <div>
                                    <div className="mb-1 text-[10px] font-black uppercase tracking-widest text-amber-500">EC (Enrollment Cert.)</div>
                                    <p className="text-[10px] font-medium italic leading-relaxed text-slate-400">
                                        Required for the Company / Employer to pay its own PT (yearly).
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </Page>
    );
}
