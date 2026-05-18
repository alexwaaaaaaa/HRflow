"use client";

import { useState } from "react";
import type { ElementType } from "react";
import { Target, Plus, ChevronDown, RefreshCw, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ─────────────────────────────────────────────────────────────────────────────
// Types & static data
// ─────────────────────────────────────────────────────────────────────────────

type OkrStatus = "on-track" | "at-risk" | "behind";

interface KeyResult {
    title: string;
    current: number;
    target: number;
    progress: number;
}

interface MyOkr {
    id: string;
    objective: string;
    aligned: string;
    quarter: string;
    progress: number;
    status: OkrStatus;
    lastCheckin: string;
    keyResults: KeyResult[];
}

const MY_OKRS: MyOkr[] = [
    {
        id: "o1",
        objective: "Drive 40% growth in my product segment",
        aligned: "Company OKR: ₹100 Cr ARR",
        quarter: "Q1 2025",
        progress: 60,
        status: "on-track",
        lastCheckin: "3 days ago",
        keyResults: [
            { title: "Onboard 15 new accounts", current: 9, target: 15, progress: 60 },
            { title: "Reduce deal cycle to <30 days", current: 34, target: 30, progress: 55 },
            { title: "ARPU increase by ₹5000", current: 3200, target: 5000, progress: 64 },
        ],
    },
    {
        id: "o2",
        objective: "Complete leadership training & certifications",
        aligned: "Dept OKR: L&D Completions",
        quarter: "Q1 2025",
        progress: 85,
        status: "on-track",
        lastCheckin: "1 day ago",
        keyResults: [
            { title: "Finish 3 online courses", current: 3, target: 3, progress: 100 },
            { title: "Mentor 2 junior team members", current: 1, target: 2, progress: 50 },
            { title: "Get PMP certification", current: 75, target: 100, progress: 75 },
        ],
    },
    {
        id: "o3",
        objective: "Improve feature delivery speed",
        aligned: "Dept OKR: Engineering Velocity",
        quarter: "Q1 2025",
        progress: 30,
        status: "behind",
        lastCheckin: "8 days ago",
        keyResults: [
            { title: "Deploy 5 features to prod", current: 1, target: 5, progress: 20 },
            { title: "P1 bug resolution < 2 hrs", current: 5.4, target: 2, progress: 37 },
            { title: "Code review turnaround < 24h", current: 36, target: 24, progress: 33 },
        ],
    },
];

const STATUS_VARIANT: Record<OkrStatus, "success" | "warning" | "danger"> = {
    "on-track": "success",
    "at-risk": "warning",
    "behind": "danger",
};

const STATUS_LABEL: Record<OkrStatus, string> = {
    "on-track": "On Track",
    "at-risk": "At Risk",
    "behind": "Behind",
};

// Static color maps — no template literals
const STATUS_PROGRESS_BAR: Record<OkrStatus, string> = {
    "on-track": "bg-[#00E5A0]",
    "at-risk": "bg-[#FFB800]",
    "behind": "bg-[#FF4444]",
};

const KR_PROGRESS_BAR: Record<"high" | "mid" | "low", string> = {
    high: "bg-[#00E5A0]",
    mid: "bg-[#FFB800]",
    low: "bg-[#FF4444]",
};

const KR_PROGRESS_TEXT: Record<"high" | "mid" | "low", string> = {
    high: "text-[#00E5A0]",
    mid: "text-[#FFB800]",
    low: "text-[#FF4444]",
};

const STATUS_ICON: Record<OkrStatus, ElementType> = {
    "on-track": CheckCircle2,
    "at-risk": AlertTriangle,
    "behind": Clock,
};

function krProgressLevel(progress: number): "high" | "mid" | "low" {
    if (progress >= 70) return "high";
    if (progress >= 40) return "mid";
    return "low";
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components (module scope)
// ─────────────────────────────────────────────────────────────────────────────

function KeyResultItem({ kr, index }: { kr: KeyResult; index: number }) {
    const level = krProgressLevel(kr.progress);
    return (
        <li className="px-6 py-4">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-[#445566] uppercase">KR {index + 1}</span>
                    <p className="text-sm text-white">{kr.title}</p>
                </div>
                <span className={`text-xs font-bold ${KR_PROGRESS_TEXT[level]}`}>{kr.progress}%</span>
            </div>
            <div className="flex items-center gap-3">
                <div
                    className="flex-1 h-1.5 bg-[#1A2A3A] rounded-full overflow-hidden"
                    role="progressbar"
                    aria-valuenow={kr.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${kr.title}: ${kr.progress}%`}
                >
                    <div className={`h-full rounded-full ${KR_PROGRESS_BAR[level]}`} style={{ width: `${kr.progress}%` }} />
                </div>
                <span className="text-[11px] text-[#8899AA] shrink-0">{kr.current} / {kr.target}</span>
            </div>
        </li>
    );
}

function OkrCard({ okr }: { okr: MyOkr }) {
    const [isOpen, setIsOpen] = useState(okr.id === "o1");
    const StatusIcon = STATUS_ICON[okr.status];

    return (
        <li className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
            <button
                type="button"
                onClick={() => setIsOpen((v) => !v)}
                aria-expanded={isOpen}
                aria-controls={`my-kr-${okr.id}`}
                className="w-full text-left px-6 py-5 hover:bg-[#152336] transition-colors"
            >
                <div className="flex items-start justify-between gap-3 mb-1">
                    <h2 className="text-base font-semibold text-white">{okr.objective}</h2>
                    <div className="flex items-center gap-2 shrink-0">
                        <Badge variant={STATUS_VARIANT[okr.status]}>
                            <StatusIcon size={10} aria-hidden="true" className="inline mr-1" />
                            {STATUS_LABEL[okr.status]}
                        </Badge>
                        <ChevronDown
                            size={16}
                            className={`text-[#445566] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                            aria-hidden="true"
                        />
                    </div>
                </div>
                <p className="text-xs text-[#8899AA] mb-3">↳ Aligned to: {okr.aligned} · Last check-in: {okr.lastCheckin}</p>
                <div className="flex items-center gap-3">
                    <div
                        className="flex-1 h-2 bg-[#1A2A3A] rounded-full overflow-hidden"
                        role="progressbar"
                        aria-valuenow={okr.progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${okr.objective}: ${okr.progress}% complete`}
                    >
                        <div className={`h-full rounded-full ${STATUS_PROGRESS_BAR[okr.status]}`} style={{ width: `${okr.progress}%` }} />
                    </div>
                    <span className="text-sm font-bold text-white shrink-0">{okr.progress}%</span>
                </div>
            </button>

            {isOpen && (
                <ul id={`my-kr-${okr.id}`} role="list" className="border-t border-[#1A2A3A] divide-y divide-[#1A2A3A]">
                    {okr.keyResults.map((kr, i) => (
                        <KeyResultItem key={i} kr={kr} index={i} />
                    ))}
                    <li className="px-6 py-3 flex items-center justify-between bg-[#0A1420]">
                        <Link
                            href={`/okr/progress?id=${okr.id}`}
                            className="text-xs text-[#00E5A0] hover:underline font-medium flex items-center gap-1"
                        >
                            <Target size={11} aria-hidden="true" /> Update Progress
                        </Link>
                        <Link
                            href={`/okr/check-in?id=${okr.id}`}
                            className="text-xs text-[#0066FF] hover:underline font-medium flex items-center gap-1"
                        >
                            <RefreshCw size={11} aria-hidden="true" /> Add Check-in
                        </Link>
                    </li>
                </ul>
            )}
        </li>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function MyOKRsPage() {
    const avgProgress = Math.round(MY_OKRS.reduce((s, o) => s + o.progress, 0) / MY_OKRS.length);
    const behindCount = MY_OKRS.filter((o) => o.status === "behind").length;

    return (
        <Page
            title="My OKRs"
            subtitle="Your personal objectives and key results · Q1 2025"
            breadcrumbs={[
                { label: "OKRs", href: "/okr/dashboard" },
                { label: "My OKRs" },
            ]}
            maxWidth="900px"
            actions={
                <div className="flex items-center gap-2">






                    <Button variant="secondary" icon={<RefreshCw size={14} />} href="/okr/check-in">Check-in</Button>
                    <Button icon={<Plus size={16} />} href="/okr/create">Add OKR</Button>
                </div>
            }
        >
            <div className="space-y-6">
                {/* Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card padding="md">
                        <p className="text-xs text-[#8899AA] mb-1">Total Objectives</p>
                        <p className="text-3xl font-bold text-[#0066FF]">{MY_OKRS.length}</p>
                    </Card>
                    <Card padding="md">
                        <p className="text-xs text-[#8899AA] mb-1">Avg Progress</p>
                        <p className="text-3xl font-bold text-[#00E5A0]">{avgProgress}%</p>
                    </Card>
                    <Card padding="md">
                        <p className="text-xs text-[#8899AA] mb-1">Behind Schedule</p>
                        <p className="text-3xl font-bold text-[#FF4444]">{behindCount}</p>
                    </Card>
                </div>

                {/* OKR List */}
                <ul role="list" className="space-y-4">
                    {MY_OKRS.map((okr) => (
                        <OkrCard key={okr.id} okr={okr} />
                    ))}
                </ul>
            </div>
        

        

        

        </Page>
    );
}
