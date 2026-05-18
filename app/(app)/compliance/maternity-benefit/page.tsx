"use client";

import { useState } from "react";
import {
    Baby,
    CheckCircle,
    AlertTriangle,
    Plus,
    Download,
    Calendar,
    Heart,
    Shield,
} from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";

// ─── Static palette ───────────────────────────────────────────────────────────
type MaternityStatus = "Active" | "Upcoming" | "Closed";
type KpiColor = "pink" | "amber" | "emerald" | "teal";

const STATUS_BADGE: Record<MaternityStatus, BadgeVariant> = {
    Active: "danger",
    Upcoming: "warning",
    Closed: "success",
};

const KPI_RING: Record<KpiColor, string> = {
    pink: "border-pink-500/20",
    amber: "border-amber-500/20",
    emerald: "border-emerald-500/20",
    teal: "border-teal-500/20",
};

const KPI_TEXT: Record<KpiColor, string> = {
    pink: "text-pink-400",
    amber: "text-amber-400",
    emerald: "text-emerald-400",
    teal: "text-teal-400",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
interface MaternityEmployee {
    id: string;
    name: string;
    emp: string;
    dueDate: string;
    stage: string;
    daysUsed: number;
    daysAllotted: number;
    medBonus: string;
    status: MaternityStatus;
}

const EMPLOYEES: MaternityEmployee[] = [
    { id: "m1", name: "Ananya Sharma", emp: "EMP-112", dueDate: "15 Apr 2024", stage: "Pre-Birth Leave", daysUsed: 42, daysAllotted: 182, medBonus: "₹3,500", status: "Active" },
    { id: "m2", name: "Kavita Joshi", emp: "EMP-234", dueDate: "28 May 2024", stage: "Pre-Birth Leave", daysUsed: 0, daysAllotted: 182, medBonus: "₹3,500", status: "Upcoming" },
    { id: "m3", name: "Rekha Nair", emp: "EMP-089", dueDate: "01 Jan 2024", stage: "Returning", daysUsed: 182, daysAllotted: 182, medBonus: "₹3,500", status: "Closed" },
];

const KPI_DATA: { label: string; val: string; color: KpiColor; icon: typeof Baby }[] = [
    { label: "On Maternity Leave", val: "02", color: "pink", icon: Baby },
    { label: "Upcoming (30 days)", val: "01", color: "amber", icon: Calendar },
    { label: "Medical Bonus Pending", val: "₹7,000", color: "emerald", icon: Heart },
    { label: "Compliance Status", val: "100%", color: "teal", icon: Shield },
];

const RIGHTS = [
    { title: "Paid Leave", desc: "26 weeks (1st 2 children) / 12 weeks (3rd child). Fully paid at average wages.", color: "pink", icon: Baby },
    { title: "Medical Bonus", desc: "₹3,500 if no pre/post-natal care provided by employer. Payable within 48 hours of delivery.", color: "amber", icon: Heart },
    { title: "Crèche Facility", desc: "Mandatory for establishments with 50+ workers. 4 nursing breaks per day. Non-compliance = ₹5,000 fine.", color: "teal", icon: Shield },
];

const CHECKLIST = [
    { check: "Maternity Register maintained (Form A)", ok: true },
    { check: "Muster roll displayed on notice board", ok: true },
    { check: "Crèche facility available (if >50 employees)", ok: true },
    { check: "Medical bonus payable within 48 hrs of delivery", ok: false },
    { check: "No dismissal during maternity period", ok: true },
    { check: "Annual return submitted (Form 11)", ok: true },
];

// ─── Static color maps for rights cards ───────────────────────────────────────
type RightColor = "pink" | "amber" | "teal";

const RIGHT_BORDER: Record<RightColor, string> = {
    pink: "border-pink-500/20",
    amber: "border-amber-500/20",
    teal: "border-teal-500/20",
};

const RIGHT_ICON_TEXT: Record<RightColor, string> = {
    pink: "text-pink-400",
    amber: "text-amber-400",
    teal: "text-teal-400",
};

const RIGHT_TITLE_TEXT: Record<RightColor, string> = {
    pink: "text-pink-400",
    amber: "text-amber-400",
    teal: "text-teal-400",
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function MaternityBenefit() {
    const [selected, setSelected] = useState<string | null>(null);

    return (
        <Page
            title="Maternity Benefit Act, 1961"
            subtitle="Track maternity leave (182 days), medical bonus (₹3,500), nursing breaks, and crèche facilities compliance."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Compliance", href: "/compliance/dashboard" },
                { label: "Maternity Benefit" },
            ]}
            maxWidth="1280px"
            actions={
                <Button
                    variant="primary"
                    icon={<Plus size={16} aria-hidden="true" />}
                >
                    Initiate Maternity Leave
                </Button>
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

                {/* Statutory rights */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {RIGHTS.map((r) => {
                        const color = r.color as RightColor;
                        const Icon = r.icon;
                        return (
                            <Card key={r.title} padding="md" className={RIGHT_BORDER[color]}>
                                <div className="mb-2 flex items-center gap-2">
                                    <Icon size={14} className={RIGHT_ICON_TEXT[color]} aria-hidden="true" />
                                    <h3 className={`text-xs font-black uppercase tracking-widest ${RIGHT_TITLE_TEXT[color]}`}>{r.title}</h3>
                                </div>
                                <p className="text-[10px] leading-relaxed text-slate-400">{r.desc}</p>
                            </Card>
                        );
                    })}
                </div>

                {/* Employee list */}
                <Card padding="none">
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1A2A3A] bg-[#060B14]/60 p-4">
                        <h2 className="text-xs font-black uppercase tracking-widest text-white">Maternity Cases</h2>
                    </div>
                    <div className="divide-y divide-[#1A2A3A]">
                        {EMPLOYEES.map((e) => {
                            const pct = Math.round((e.daysUsed / e.daysAllotted) * 100);
                            return (
                                <div
                                    key={e.id}
                                    onClick={() => setSelected(selected === e.id ? null : e.id)}
                                    className={`cursor-pointer p-5 transition-all ${selected === e.id ? "bg-pink-500/5" : "hover:bg-[#1A2A3A]/30"}`}
                                >
                                    <div className="flex flex-col gap-4 md:flex-row md:items-center">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-500/20 text-xs font-black text-pink-400">
                                                    {e.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                                                </div>
                                                <div>
                                                    <div className="text-xs font-black text-white">{e.name}</div>
                                                    <div className="text-[10px] text-slate-500">{e.emp} • Due: {e.dueDate}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="mb-1 flex justify-between text-[10px] font-bold text-slate-400">
                                                <span>{e.stage}</span>
                                                <span>{e.daysUsed}/{e.daysAllotted} days ({pct}%)</span>
                                            </div>
                                            <div
                                                className="h-1.5 overflow-hidden rounded-full border border-[#1A2A3A] bg-[#060B14]"
                                                role="progressbar"
                                                aria-valuenow={pct}
                                                aria-valuemin={0}
                                                aria-valuemax={100}
                                                aria-label={`${e.name} maternity leave: ${pct}%`}
                                            >
                                                <div className="h-full rounded-full bg-pink-500 transition-all duration-500" style={{ width: `${pct}%` }} />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-black text-amber-400">{e.medBonus}</span>
                                            <Badge variant={STATUS_BADGE[e.status]}>{e.status}</Badge>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                aria-label={`Download ${e.name} maternity details`}
                                                icon={<Download size={14} aria-hidden="true" />}
                                                onClick={(ev) => ev.stopPropagation()}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Card>

                {/* Compliance checklist */}
                <Card padding="md">
                    <h2 className="mb-4 text-xs font-black uppercase tracking-widest text-white">Maternity Act Compliance Checklist</h2>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        {CHECKLIST.map((c) => (
                            <div
                                key={c.check}
                                className={`flex items-center gap-3 rounded-xl border p-3 ${c.ok ? "border-emerald-500/10 bg-emerald-500/5" : "border-amber-500/20 bg-amber-500/5"}`}
                            >
                                {c.ok ? (
                                    <CheckCircle size={14} className="shrink-0 text-emerald-500" aria-hidden="true" />
                                ) : (
                                    <AlertTriangle size={14} className="shrink-0 text-amber-400" aria-hidden="true" />
                                )}
                                <span className="text-[10px] font-bold text-slate-300">{c.check}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </Page>
    );
}
