"use client";

import { useState } from "react";
import { Plus, TrendingUp, Search, Filter, ChevronDown } from "lucide-react";
import Link from "next/link";
import Page from "@/components/ui/Page";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ─────────────────────────────────────────────────────────────────────────────
// Types & static data
// ─────────────────────────────────────────────────────────────────────────────

type OkrStatus = "on-track" | "at-risk" | "behind";

interface KeyResult {
    title: string;
    progress: number;
    unit: string;
    current: number;
    target: number;
}

interface Objective {
    id: string;
    title: string;
    owner: string;
    quarter: string;
    progress: number;
    status: OkrStatus;
    keyResults: KeyResult[];
}

const OBJECTIVES: Objective[] = [
    {
        id: "obj-1",
        title: "Achieve ₹100 Cr ARR",
        owner: "CEO Office",
        quarter: "Q1 2025",
        progress: 72,
        status: "on-track",
        keyResults: [
            { title: "Close 50 enterprise deals", progress: 78, unit: "deals", current: 39, target: 50 },
            { title: "Expand SMB base by 30%", progress: 68, unit: "%", current: 20, target: 30 },
            { title: "Upsell revenue ₹20 Cr", progress: 65, unit: "₹Cr", current: 13, target: 20 },
        ],
    },
    {
        id: "obj-2",
        title: "Achieve 95% Customer Retention",
        owner: "CX Team",
        quarter: "Q1 2025",
        progress: 88,
        status: "on-track",
        keyResults: [
            { title: "Reduce churn to <5%", progress: 90, unit: "%", current: 4.5, target: 5 },
            { title: "NPS > 60", progress: 88, unit: "score", current: 53, target: 60 },
            { title: "SLA breach rate: 0%", progress: 85, unit: "%", current: 0.3, target: 0 },
        ],
    },
    {
        id: "obj-3",
        title: "Expand to 3 New Cities",
        owner: "Expansion",
        quarter: "Q1 2025",
        progress: 33,
        status: "at-risk",
        keyResults: [
            { title: "Open Hyderabad office", progress: 80, unit: "complete", current: 80, target: 100 },
            { title: "Open Pune office", progress: 20, unit: "complete", current: 20, target: 100 },
            { title: "Open Ahmedabad office", progress: 0, unit: "complete", current: 0, target: 100 },
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

// Static progress bar color map — no template literals
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

const OBJ_PROGRESS_BAR: Record<OkrStatus, string> = {
    "on-track": "bg-[#00E5A0]",
    "at-risk": "bg-[#FFB800]",
    "behind": "bg-[#FF4444]",
};

function krProgressLevel(progress: number): "high" | "mid" | "low" {
    if (progress >= 70) return "high";
    if (progress >= 40) return "mid";
    return "low";
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components (module scope)
// ─────────────────────────────────────────────────────────────────────────────

function KeyResultRow({ kr, index }: { kr: KeyResult; index: number }) {
    const level = krProgressLevel(kr.progress);
    return (
        <li className="px-6 py-4 hover:bg-[#0A1420] transition-colors">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-[#445566] uppercase tracking-wider">KR {index + 1}</span>
                    <p className="text-sm text-white font-medium">{kr.title}</p>
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
                <span className="text-[11px] text-[#8899AA] shrink-0">
                    {kr.current} / {kr.target} {kr.unit}
                </span>
            </div>
        </li>
    );
}

function ObjectiveCard({ obj }: { obj: Objective }) {
    const [isOpen, setIsOpen] = useState(obj.id === "obj-1");

    return (
        <li className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
            <button
                type="button"
                onClick={() => setIsOpen((v) => !v)}
                aria-expanded={isOpen}
                aria-controls={`kr-${obj.id}`}
                className="w-full text-left px-6 py-5 hover:bg-[#152336] transition-colors"
            >
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <h2 className="text-base font-semibold text-white truncate">{obj.title}</h2>
                            <Badge variant={STATUS_VARIANT[obj.status]}>{STATUS_LABEL[obj.status]}</Badge>
                        </div>
                        <p className="text-xs text-[#8899AA]">Owner: {obj.owner} · {obj.quarter}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                        <span className="text-lg font-bold text-white">{obj.progress}%</span>
                        <ChevronDown
                            size={16}
                            className={`text-[#445566] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                            aria-hidden="true"
                        />
                    </div>
                </div>
                <div
                    className="mt-3 h-2 bg-[#1A2A3A] rounded-full overflow-hidden"
                    role="progressbar"
                    aria-valuenow={obj.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${obj.title}: ${obj.progress}% complete`}
                >
                    <div className={`h-full rounded-full ${OBJ_PROGRESS_BAR[obj.status]}`} style={{ width: `${obj.progress}%` }} />
                </div>
            </button>

            {isOpen && (
                <ul id={`kr-${obj.id}`} role="list" className="border-t border-[#1A2A3A] divide-y divide-[#1A2A3A]">
                    {obj.keyResults.map((kr, i) => (
                        <KeyResultRow key={i} kr={kr} index={i} />
                    ))}
                    <li className="px-6 py-3 flex justify-end">
                        <Link
                            href={`/okr/progress?id=${obj.id}`}
                            className="flex items-center gap-1 text-xs text-[#00E5A0] hover:underline font-medium"
                        >
                            <TrendingUp size={12} aria-hidden="true" /> Update Progress
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

export default function CompanyOKRPage() {
    const [search, setSearch] = useState("");

    const filtered = OBJECTIVES.filter((o) =>
        o.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Page
            title="Company OKRs"
            subtitle="Top-level objectives driving company strategy · Q1 2025"
            breadcrumbs={[
                { label: "OKRs", href: "/okr/dashboard" },
                { label: "Company OKRs" },
            ]}
            maxWidth="1100px"
            actions={
                <Button icon={<Plus size={16} />} href="/okr/create">Add Objective</Button>
            }
        >
            <div className="space-y-6">
                {/* Search + Filter */}
                <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" aria-hidden="true" />
                        <label htmlFor="obj-search" className="sr-only">Search objectives</label>
                        <input
                            id="obj-search"
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search objectives…"
                            className="w-full bg-[#0D1928] border border-[#1A2A3A] rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00e5a0]"
                        />
                    </div>
                    <Button variant="secondary" icon={<Filter size={16} />} aria-label="Filter objectives">Filter</Button>
                </div>

                {/* Objectives Accordion */}
                <ul role="list" className="space-y-4">
                    {filtered.map((obj) => (
                        <ObjectiveCard key={obj.id} obj={obj} />
                    ))}
                </ul>
            </div>
        

        

        

        </Page>
    );
}
