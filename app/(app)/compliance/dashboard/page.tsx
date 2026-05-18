"use client";

import {
    ShieldCheck,
    AlertTriangle,
    Scale,
    CalendarDays,
    FileSignature,
    ArrowRight,
    BookOpen,
} from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";

// ─────────────────────────────────────────────────────────────────────────────
// Static palette (module scope)
//
// IMPORTANT — Tailwind v4 JIT only compiles class names it can statically see.
// Template-literal class names like `border-${color}-500/20` are a time bomb:
// they appear to work in dev (because the bare classes are referenced
// elsewhere in the codebase) but break in production where the JIT cannot
// trace them. Every class string below is a literal so the compiler picks it
// up reliably. Do NOT inline `border-${kpi.color}-500/20` patterns again.
// ─────────────────────────────────────────────────────────────────────────────

type PaletteKey = "emerald" | "amber" | "blue" | "rose";

const palette: Record<PaletteKey, { ring: string; text: string; chip: string }> = {
    emerald: {
        ring: "border-emerald-500/20 hover:border-emerald-500/50",
        text: "text-emerald-500",
        chip: "bg-emerald-500/10",
    },
    amber: {
        ring: "border-amber-500/20 hover:border-amber-500/50",
        text: "text-amber-500",
        chip: "bg-amber-500/10",
    },
    blue: {
        ring: "border-blue-500/20 hover:border-blue-500/50",
        text: "text-blue-500",
        chip: "bg-blue-500/10",
    },
    rose: {
        ring: "border-rose-500/20 hover:border-rose-500/50",
        text: "text-rose-500",
        chip: "bg-rose-500/10",
    },
};

// ─────────────────────────────────────────────────────────────────────────────
// Static page data
// ─────────────────────────────────────────────────────────────────────────────

interface KpiTile {
    label: string;
    val: string;
    text: string;
    color: PaletteKey;
    icon: typeof ShieldCheck;
}

const KPI_DATA: KpiTile[] = [
    {
        label: "Overall Health Score",
        val: "94/100",
        text: "Low Risk",
        color: "emerald",
        icon: ShieldCheck,
    },
    {
        label: "Upcoming Deadlines",
        val: "03",
        text: "Within 7 Days",
        color: "amber",
        icon: CalendarDays,
    },
    {
        label: "Pending Challans",
        val: "₹14.2L",
        text: "PF & ESIC",
        color: "blue",
        icon: FileSignature,
    },
    {
        label: "Regulatory Alerts",
        val: "01",
        text: "New Labour Code",
        color: "rose",
        icon: AlertTriangle,
    },
];

type FilingStatus = "Pending" | "Upcoming" | "Filed";

interface FilingRow {
    date: string;
    act: string;
    desc: string;
    status: FilingStatus;
}

const FILING_ROWS: FilingRow[] = [
    {
        date: "15 Apr",
        act: "EPF & MP Act, 1952",
        desc: "PF Remittance & Return (ECR)",
        status: "Pending",
    },
    {
        date: "15 Apr",
        act: "ESI Act, 1948",
        desc: "ESIC Contribution Filing",
        status: "Pending",
    },
    {
        date: "25 Apr",
        act: "Professional Tax",
        desc: "PT Return Filing (Maharashtra)",
        status: "Upcoming",
    },
    {
        date: "30 Apr",
        act: "Income Tax Act",
        desc: "TDS Challan (224 / 281)",
        status: "Upcoming",
    },
    {
        date: "05 Apr",
        act: "Labour Welfare",
        desc: "LWF Contribution (Bi-annual)",
        status: "Filed",
    },
];

const STATUS_BADGE: Record<FilingStatus, BadgeVariant> = {
    Pending: "warning",
    Upcoming: "info",
    Filed: "success",
};

interface ActStatusRow {
    act: string;
    pct: number;
    status: string;
}

const ACT_STATUS_ROWS: ActStatusRow[] = [
    { act: "EPFO (Provident Fund)", pct: 85, status: "Action Needed" },
    { act: "ESIC (State Insurance)", pct: 100, status: "Fully Compliant" },
    { act: "Income Tax (TDS/Form 16)", pct: 90, status: "On Track" },
    { act: "PT & LWF", pct: 100, status: "Fully Compliant" },
    { act: "Shop & Establishment Act", pct: 60, status: "Renewal Due" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Pure helpers (module scope)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Maps an act-wise compliance percentage to a palette key.
 *
 *   pct === 100 → emerald (success / fully compliant)
 *   pct >   70  → amber   (warning / on track but action needed)
 *   else        → rose    (danger / overdue or below threshold)
 */
function statusKey(pct: number): PaletteKey {
    if (pct === 100) return "emerald";
    if (pct > 70) return "amber";
    return "rose";
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function ComplianceDashboard() {
    return (
        <Page
            title="Statutory & compliance control"
            subtitle="Unified command centre for Indian labour laws and tax filings"
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Compliance", href: "/compliance/dashboard" },
                { label: "Dashboard" },
            ]}
            maxWidth="1280px"
            actions={
                <>
                    <Button variant="secondary" icon={<BookOpen size={14} aria-hidden="true" />}>
                        Latest gazette
                    </Button>
                    <Button icon={<Scale size={14} aria-hidden="true" />}>
                        Inspector ready mode
                    </Button>
                </>
            }
        >
            <div className="space-y-6">
                {/* KPI tiles */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {KPI_DATA.map((kpi) => {
                        const tone = palette[kpi.color];
                        const Icon = kpi.icon;
                        return (
                            <Card
                                key={kpi.label}
                                padding="lg"
                                className={`group relative overflow-hidden transition-all ${tone.ring}`}
                            >
                                <div className="mb-4 flex items-start justify-between">
                                    <div
                                        className={`rounded-xl border bg-[#060B14] p-2.5 shadow-inner ${tone.ring} ${tone.text}`}
                                    >
                                        <Icon size={22} aria-hidden="true" />
                                    </div>
                                </div>
                                <div>
                                    <div className="text-3xl font-black tracking-tighter text-white drop-shadow-md">
                                        {kpi.val}
                                    </div>
                                    <div className="mt-1 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                                        {kpi.label}
                                    </div>
                                    <div
                                        className={`mt-2 text-[10px] font-bold uppercase tracking-widest ${tone.text}`}
                                    >
                                        {kpi.text}
                                    </div>
                                </div>
                                <div
                                    aria-hidden="true"
                                    className={`absolute -bottom-6 -right-6 h-24 w-24 rounded-full blur-2xl transition-transform duration-700 group-hover:scale-150 ${tone.chip}`}
                                />
                            </Card>
                        );
                    })}
                </div>

                {/* Calendar + act-wise status */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Filing calendar */}
                    <Card padding="lg" className="flex h-[480px] flex-col lg:col-span-2">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-sm font-black uppercase tracking-widest text-white">
                                Filing calendar (April &apos;24)
                            </h2>
                            <Button
                                variant="ghost"
                                size="sm"
                                iconRight={<ArrowRight size={14} aria-hidden="true" />}
                            >
                                View full
                            </Button>
                        </div>

                        <ul
                            role="list"
                            aria-label="April 2024 filings"
                             
                            tabIndex={0}
                            className="flex-1 space-y-3 overflow-y-auto pr-2"
                        >
                            {FILING_ROWS.map((item) => {
                                const [day, month] = item.date.split(" ");
                                return (
                                    <li
                                        key={`${item.date}-${item.desc}`}
                                        className="group flex gap-4 rounded-xl border border-[#1A2A3A] bg-[#060B14] p-4 transition-colors hover:border-slate-700 focus-within:ring-2 focus-within:ring-[#00e5a0]"
                                    >
                                        <div className="flex min-w-[50px] flex-col items-center justify-center border-r border-[#1A2A3A] pr-4">
                                            <span className="text-lg font-black leading-none text-white">
                                                {day}
                                            </span>
                                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                                                {month}
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between gap-3">
                                                <h3 className="text-xs font-black uppercase tracking-tighter text-slate-300">
                                                    {item.desc}
                                                </h3>
                                                <Badge variant={STATUS_BADGE[item.status]}>
                                                    {item.status}
                                                </Badge>
                                            </div>
                                            <p className="mt-1 text-[10px] font-bold italic tracking-wide text-slate-400">
                                                {item.act}
                                            </p>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </Card>

                    {/* Act-wise status */}
                    <Card padding="lg" className="flex h-[480px] flex-col">
                        <h2 className="mb-6 border-b border-[#1A2A3A] pb-4 text-sm font-black uppercase tracking-widest text-white">
                            Act-wise status
                        </h2>

                        <div className="flex-1 space-y-5">
                            {ACT_STATUS_ROWS.map((row) => {
                                const tone = palette[statusKey(row.pct)];
                                return (
                                    <div key={row.act} className="space-y-2">
                                        <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter">
                                            <span className="text-slate-300">{row.act}</span>
                                            <span className={tone.text}>{row.pct}%</span>
                                        </div>
                                        <div
                                            className="h-1.5 overflow-hidden rounded-full border border-[#1A2A3A] bg-[#060B14] shadow-inner"
                                            role="progressbar"
                                            aria-valuenow={row.pct}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                            aria-label={`${row.act} compliance: ${row.pct}%`}
                                        >
                                            <div
                                                className={`h-full rounded-full bg-current transition-all duration-1000 ${tone.text}`}
                                                style={{ width: `${row.pct}%` }}
                                            />
                                        </div>
                                        <div className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400">
                                            {row.status}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
