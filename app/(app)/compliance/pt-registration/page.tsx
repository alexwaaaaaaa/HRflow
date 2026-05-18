"use client";

import { useState } from "react";
import {
    CheckCircle,
    AlertTriangle,
    Plus,
    Download,
    Upload,
    MapPin,
    RefreshCw,
} from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";

// ─── Static palette ───────────────────────────────────────────────────────────
type StateStatus = "Active" | "Not Registered";

const STATE_BADGE: Record<StateStatus, BadgeVariant> = {
    Active: "success",
    "Not Registered": "danger",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
interface StateReg {
    state: string;
    registrationNo: string;
    status: StateStatus;
    employeeCount: number;
    deadline: string;
    amount: string;
}

const STATES: StateReg[] = [
    { state: "Maharashtra", registrationNo: "MH/PT/1234567/2018", status: "Active", employeeCount: 190, deadline: "31 Mar", amount: "₹2,500/month" },
    { state: "Karnataka", registrationNo: "KA/PT/9876543/2019", status: "Active", employeeCount: 48, deadline: "30 Apr", amount: "₹208.33/month" },
    { state: "Telangana", registrationNo: "", status: "Not Registered", employeeCount: 7, deadline: "N/A", amount: "₹200/month" },
];

const PT_SLABS = [
    { state: "Maharashtra", slab: ">₹10,000/month", tax: "₹200 (Feb: ₹300)", frequency: "Monthly" },
    { state: "Karnataka", slab: ">₹15,000/month", tax: "₹200", frequency: "Monthly" },
    { state: "Telangana", slab: ">₹15,000/month", tax: "₹200", frequency: "Monthly" },
];

const DOCS_REQUIRED = [
    "PAN / TAN of the business",
    "GST Registration Certificate",
    "Proof of business address in state",
    "List of employees and salaries",
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PTRegistration() {
    const [activeState, setActiveState] = useState(0);

    const current = STATES[activeState]!;

    return (
        <Page
            title="Professional Tax Registration"
            subtitle="Manage state-wise PT registrations, certificates (PTRC/PTEC), and renewal tracking."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Compliance", href: "/compliance/dashboard" },
                { label: "PT Registration" },
            ]}
            maxWidth="1280px"
            actions={
                <>
                    <Button
                        variant="secondary"
                        icon={<RefreshCw size={14} aria-hidden="true" />}
                    >
                        Sync State Portal
                    </Button>
                    <Button
                        variant="primary"
                        icon={<Plus size={16} aria-hidden="true" />}
                    >
                        Add State Registration
                    </Button>
                </>
            }
        >
            <div className="space-y-6">
                {/* KPI cards */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <Card padding="md" className="border-emerald-500/20">
                        <div className="mb-2 text-[9px] font-black uppercase tracking-widest text-slate-500">Active Registrations</div>
                        <div className="text-3xl font-black text-emerald-400">2</div>
                        <div className="mt-1 text-[10px] text-slate-500">Maharashtra, Karnataka</div>
                    </Card>
                    <Card padding="md" className="border-rose-500/20">
                        <div className="mb-2 text-[9px] font-black uppercase tracking-widest text-slate-500">Unregistered States</div>
                        <div className="text-3xl font-black text-rose-400">1</div>
                        <div className="mt-1 text-[10px] text-slate-500">Telangana needs registration</div>
                    </Card>
                    <Card padding="md" className="border-amber-500/20">
                        <div className="mb-2 text-[9px] font-black uppercase tracking-widest text-slate-500">Monthly PT Liability</div>
                        <div className="text-3xl font-black text-amber-400">₹2,708</div>
                        <div className="mt-1 text-[10px] text-slate-500">Across all registered states</div>
                    </Card>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* State list */}
                    <div className="space-y-3 lg:col-span-1">
                        <div className="px-1 text-[10px] font-black uppercase tracking-widest text-slate-500">States with Employees</div>
                        {STATES.map((s, i) => (
                            <button
                                key={s.state}
                                onClick={() => setActiveState(i)}
                                className={`w-full rounded-2xl border p-4 text-left transition-all ${
                                    activeState === i
                                        ? "border-violet-500/30 bg-violet-500/10"
                                        : "border-[#1A2A3A] bg-[#0D1928] hover:border-slate-600"
                                }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-2">
                                        <MapPin size={14} className={activeState === i ? "text-violet-400" : "text-slate-600"} aria-hidden="true" />
                                        <span className="text-sm font-black text-white">{s.state}</span>
                                    </div>
                                    <Badge variant={STATE_BADGE[s.status]}>{s.status}</Badge>
                                </div>
                                <div className="mt-2 text-[10px] text-slate-500">{s.employeeCount} employees • {s.amount}</div>
                                {s.registrationNo && (
                                    <div className="mt-1 font-mono text-[9px] text-slate-600">{s.registrationNo}</div>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Detail panel */}
                    <div className="space-y-5 lg:col-span-2">
                        {current.status === "Not Registered" ? (
                            <Card padding="md" className="border-rose-500/20">
                                <div className="mb-4 flex items-center gap-3">
                                    <AlertTriangle size={20} className="text-rose-400" aria-hidden="true" />
                                    <h2 className="text-sm font-black text-rose-400">Registration Required</h2>
                                </div>
                                <p className="mb-6 text-xs leading-relaxed text-slate-400">
                                    Your company has <b className="text-white">{current.employeeCount} employees</b> in {current.state}.
                                    Professional Tax registration is mandatory as per the {current.state} Professions, Trades, Callings and
                                    Employments Act.
                                </p>
                                <div className="mb-6 space-y-3">
                                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Documents Required</div>
                                    {DOCS_REQUIRED.map((d) => (
                                        <div key={d} className="flex items-center gap-2 text-xs text-slate-300">
                                            <CheckCircle size={12} className="text-slate-500" aria-hidden="true" /> {d}
                                        </div>
                                    ))}
                                </div>
                                <Button variant="danger" icon={<Plus size={16} aria-hidden="true" />}>Initiate Registration</Button>
                            </Card>
                        ) : (
                            <>
                                <Card padding="md">
                                    <h2 className="mb-4 border-b border-[#1A2A3A] pb-3 text-xs font-black uppercase tracking-widest text-white">
                                        Registration Details — {current.state}
                                    </h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { label: "Registration No.", val: current.registrationNo },
                                            { label: "Status", val: current.status },
                                            { label: "Tax Slab", val: current.amount },
                                            { label: "Monthly Deadline", val: current.deadline },
                                        ].map((r) => (
                                            <div key={r.label} className="rounded-xl border border-[#1A2A3A] bg-[#060B14] p-3">
                                                <div className="mb-1 text-[9px] font-black uppercase tracking-widest text-slate-500">{r.label}</div>
                                                <div className="text-xs font-black text-white">{r.val}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 flex gap-3">
                                        <Button variant="outline" size="sm" icon={<Download size={12} aria-hidden="true" />}>
                                            Download Certificate (PTRC)
                                        </Button>
                                        <Button variant="secondary" size="sm" icon={<Upload size={12} aria-hidden="true" />}>
                                            Upload Renewal
                                        </Button>
                                    </div>
                                </Card>

                                {/* PT Slab reference */}
                                <Card padding="md">
                                    <h2 className="mb-4 text-xs font-black uppercase tracking-widest text-white">PT Slab Reference</h2>
                                    <div className="overflow-x-auto">
                                        <table className="w-full" aria-label="PT slab reference">
                                            <thead>
                                                <tr className="border-b border-[#1A2A3A]">
                                                    {["State", "Threshold", "PT Amount", "Frequency"].map((h) => (
                                                        <th key={h} scope="col" className="pb-2 pr-4 text-left text-[9px] font-black uppercase tracking-widest text-slate-500">
                                                            {h}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {PT_SLABS.map((p) => (
                                                    <tr key={p.state} className="border-b border-[#1A2A3A]/50">
                                                        <td className="py-2 pr-4 text-xs font-bold text-white">{p.state}</td>
                                                        <td className="py-2 pr-4 text-xs text-slate-400">{p.slab}</td>
                                                        <td className="py-2 pr-4 text-xs font-black text-violet-400">{p.tax}</td>
                                                        <td className="py-2 text-xs text-slate-500">{p.frequency}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </Card>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Page>
    );
}
