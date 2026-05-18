"use client";

import { Download, AlertTriangle, Calendar, CheckCircle2 } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ─── Types & static data ──────────────────────────────────────────────────────

type RegStatus = "danger" | "warning" | "upcoming" | "success";

interface ComplianceRegister {
    title: string;
    entity: string;
    due: string;
    status: RegStatus;
}

const REGISTERS: ComplianceRegister[] = [
    { title: "Form T (Maternity Benefit)", entity: "Acme Tech (Parent)", due: "Overdue (Oct 15)", status: "danger" },
    { title: "Form 24Q (TDS Q2)", entity: "Acme Logistics", due: "Due in 2 days (Oct 31)", status: "warning" },
    { title: "Form A-1 (PF Return)", entity: "Acme Retail", due: "Nov 15, 2025", status: "upcoming" },
    { title: "Form III (LWF Return)", entity: "Acme Tech (Parent)", due: "Completed (Oct 10)", status: "success" },
];

const STATUS_BADGE: Record<RegStatus, "danger" | "warning" | "neutral" | "success"> = {
    danger: "danger",
    warning: "warning",
    upcoming: "neutral",
    success: "success",
};

const STATUS_ICON_CLS: Record<RegStatus, string> = {
    danger: "bg-red-500/10 border-red-500/30 text-red-400",
    warning: "bg-amber-500/10 border-amber-500/30 text-amber-400",
    upcoming: "bg-[#1A2A3A] border-[#2A3A4A] text-[#8899AA]",
    success: "bg-emerald-500/10 border-emerald-500/30 text-emerald-500",
};

const STATUS_ROW_CLS: Record<RegStatus, string> = {
    danger: "bg-red-500/5",
    warning: "",
    upcoming: "",
    success: "",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusIcon({ status }: { status: RegStatus }) {
    const cls = `p-3 rounded-xl border ${STATUS_ICON_CLS[status]}`;
    if (status === "danger" || status === "warning") {
        return (
            <div className={cls}>
                <AlertTriangle size={20} aria-hidden="true" />
            </div>
        );
    }
    if (status === "success") {
        return (
            <div className={cls}>
                <CheckCircle2 size={20} aria-hidden="true" />
            </div>
        );
    }
    return (
        <div className={cls}>
            <Calendar size={20} aria-hidden="true" />
        </div>
    );
}

// Donut ring — static SVG, no Math.random
const RISK_SCORE = 75;
const CIRCUMFERENCE = 2 * Math.PI * 56; // ~351.86

function RiskDonut({ score }: { score: number }) {
    const offset = CIRCUMFERENCE * (1 - score / 100);
    return (
        <div className="flex flex-col items-center justify-center py-4">
            <div
                className="relative flex h-32 w-32 items-center justify-center"
                role="img"
                aria-label={`Group compliance risk score: ${score}% compliant`}
            >
                <svg className="h-full w-full -rotate-90" viewBox="0 0 128 128">
                    <circle cx="64" cy="64" r="56" className="fill-none stroke-[#1A2A3A]" strokeWidth="12" />
                    <circle
                        cx="64"
                        cy="64"
                        r="56"
                        className="fill-none stroke-amber-500"
                        strokeWidth="12"
                        strokeDasharray={CIRCUMFERENCE}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-white">{score}%</span>
                    <span className="text-[10px] font-bold uppercase tracking-wide text-[#8899AA]">Compliant</span>
                </div>
            </div>
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function EntityCompliancePage() {
    return (
        <Page
            title="Group Compliance Calendar"
            subtitle="Track statutory deadlines and generated registers across all legal entities"
            breadcrumbs={[
                { label: "Multi-Entity", href: "/multi-entity/list" },
                { label: "Compliance" },
            ]}
            maxWidth="1200px"
            actions={
                <Button variant="secondary" icon={<Download size={14} />}>
                    Download Group Audit Log
                </Button>
            }
        >
            <div className="grid gap-6 md:grid-cols-3">
                {/* Deadlines list */}
                <div className="space-y-6 md:col-span-2">
                    <Card padding="none">
                        <div className="flex items-center justify-between border-b border-[#1A2A3A] bg-[#060D1A] px-4 py-3">
                            <h2 className="text-sm font-bold text-white">Upcoming Deadlines</h2>
                            <label htmlFor="entity-filter" className="sr-only">
                                Filter by entity
                            </label>
                            <select
                                id="entity-filter"
                                className="rounded border border-[#2A3A4A] bg-[#0D1928] px-2 py-1 text-xs text-[#AABBCC] outline-none"
                            >
                                <option>All Entities</option>
                                <option>Acme Tech (Parent)</option>
                                <option>Acme Retail</option>
                            </select>
                        </div>

                        <ul role="list" className="divide-y divide-[#1A2A3A]">
                            {REGISTERS.map((reg) => (
                                <li
                                    key={reg.title}
                                    className={`flex items-center justify-between gap-4 p-5 transition-colors hover:bg-[#131B2B]/50 ${STATUS_ROW_CLS[reg.status]}`}
                                >
                                    <div className="flex items-start gap-4">
                                        <StatusIcon status={reg.status} />
                                        <div>
                                            <p className="font-bold text-white">{reg.title}</p>
                                            <div className="mt-1 flex items-center gap-3 text-xs text-[#556677]">
                                                <span className="rounded bg-[#1A2A3A] px-2 py-0.5 text-white">
                                                    {reg.entity}
                                                </span>
                                                <span>•</span>
                                                <span>{reg.due}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex shrink-0 items-center gap-3">
                                        <Badge variant={STATUS_BADGE[reg.status]}>{reg.status}</Badge>
                                        {reg.status !== "success" ? (
                                            <Button size="sm" variant="ghost">
                                                Generate File
                                            </Button>
                                        ) : (
                                            <Button size="sm" variant="secondary" icon={<Download size={12} />}>
                                                Download
                                            </Button>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>

                {/* Risk score sidebar */}
                <div className="space-y-6">
                    <Card padding="lg">
                        <h2 className="border-b border-[#1A2A3A] pb-3 text-sm font-bold text-white">
                            Group Risk Score
                        </h2>

                        <RiskDonut score={RISK_SCORE} />

                        <div className="mt-4 rounded-xl border border-amber-500/20 bg-amber-500/10 p-4">
                            <p className="mb-2 flex items-center gap-2 text-xs font-bold text-amber-400">
                                <AlertTriangle size={14} aria-hidden="true" /> Action Required
                            </p>
                            <p className="text-xs leading-relaxed text-[#AABBCC]">
                                You have 1 overdue filing (Form T) for Acme Tech which risks a penalty. Generating
                                files will automatically update compliance score.
                            </p>
                        </div>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
