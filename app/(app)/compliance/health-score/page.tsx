"use client";

import {
    TrendingUp,
    Download,
    Target,
} from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";

// ─── Static palette ───────────────────────────────────────────────────────────
type ScoreColor = "emerald" | "amber" | "rose";

const SCORE_TEXT: Record<ScoreColor, string> = {
    emerald: "text-emerald-500",
    amber: "text-amber-500",
    rose: "text-rose-500",
};

const SCORE_BADGE: Record<ScoreColor, BadgeVariant> = {
    emerald: "success",
    amber: "warning",
    rose: "danger",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
interface CategoryRow {
    label: string;
    score: number;
    status: string;
    color: ScoreColor;
    detail: string;
}

const CATEGORIES: CategoryRow[] = [
    { label: "PF & ESIC Compliance", score: 98, status: "Optimal", color: "emerald", detail: "0 discrepancies in current FY." },
    { label: "Tax Deductions (TDS/PT)", score: 92, status: "Good", color: "emerald", detail: "Minor delay in Q2 TDS filing." },
    { label: "State Labour Laws (S&E, LWF)", score: 75, status: "Action Needed", color: "amber", detail: "Maharashtra Shop Act renewal pending." },
    { label: "Workplace Safety & POSH", score: 100, status: "Optimal", color: "emerald", detail: "Annual returns filed successfully." },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ComplianceHealthScore() {
    return (
        <Page
            title="Compliance Health Score"
            subtitle="Algorithmic risk assessment across all labour and tax laws."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Compliance", href: "/compliance/dashboard" },
                { label: "Health Score" },
            ]}
            maxWidth="1100px"
            actions={
                <Button
                    variant="secondary"
                    icon={<Download size={16} aria-hidden="true" />}
                >
                    Export Detailed Audit
                </Button>
            }
        >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                {/* Score visual */}
                <div className="space-y-6 lg:col-span-5">
                    <Card padding="lg" className="relative flex min-h-[400px] flex-col items-center justify-center overflow-hidden text-center">
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent" />
                        <div className="relative z-10 space-y-6">
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Overall Score</h2>
                            <div className="relative mx-auto flex h-48 w-48 items-center justify-center">
                                <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100" aria-hidden="true">
                                    <circle cx="50" cy="50" r="45" fill="none" stroke="#1A2A3A" strokeWidth="6" />
                                    <circle
                                        cx="50" cy="50" r="45" fill="none" stroke="#10b981" strokeWidth="6"
                                        strokeDasharray="283" strokeDashoffset="17"
                                        className="drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span
                                        className="text-6xl font-black tracking-tighter text-white drop-shadow-lg"
                                        aria-label="Compliance health score: 94 out of 100"
                                    >
                                        94
                                    </span>
                                    <span className="mt-1 text-[10px] font-black uppercase tracking-widest text-emerald-500">Excellent</span>
                                </div>
                            </div>
                            <div className="mx-auto inline-flex items-center gap-4 rounded-2xl border border-[#1A2A3A] bg-[#060B14] px-6 py-3">
                                <TrendingUp size={16} className="text-emerald-500" aria-hidden="true" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">
                                    +2 Points since last month
                                </span>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Breakdown */}
                <div className="space-y-6 lg:col-span-7">
                    <Card padding="lg">
                        <h3 className="mb-8 border-b border-[#1A2A3A] pb-4 text-xs font-black uppercase tracking-[0.2em] text-white">
                            Category-wise Analysis
                        </h3>
                        <div className="space-y-6">
                            {CATEGORIES.map((cat) => (
                                <div
                                    key={cat.label}
                                    className="flex flex-col gap-2 rounded-2xl border border-[#1A2A3A] bg-[#060B14] p-4 transition-colors hover:border-slate-700"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Target size={16} className={SCORE_TEXT[cat.color]} aria-hidden="true" />
                                            <span className="text-xs font-bold uppercase tracking-tight text-white">{cat.label}</span>
                                        </div>
                                        <span className={`text-[10px] font-black uppercase tracking-widest ${SCORE_TEXT[cat.color]}`}>
                                            {cat.score}/100
                                        </span>
                                    </div>
                                    <div className="flex items-end justify-between pl-7">
                                        <p className="text-[10px] font-medium italic text-slate-500">{cat.detail}</p>
                                        <Badge variant={SCORE_BADGE[cat.color]}>{cat.status}</Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
