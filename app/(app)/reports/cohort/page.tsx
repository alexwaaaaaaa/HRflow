"use client";

import { Download, Filter } from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// ─── Static data ──────────────────────────────────────────────────────────────

interface CohortRow {
    cohort: string;
    size: number;
    m0: number | null;
    m1: number | null;
    m2: number | null;
    m3: number | null;
    m4: number | null;
    m5: number | null;
    m6: number | null;
}

const COHORT_DATA: CohortRow[] = [
    { cohort: "2025-Q1", size: 45, m0: 100, m1: 98, m2: 95, m3: 92, m4: 89, m5: 88, m6: 85 },
    { cohort: "2025-Q2", size: 45, m0: 100, m1: 99, m2: 97, m3: 94, m4: 88, m5: 86, m6: null },
    { cohort: "2025-Q3", size: 45, m0: 100, m1: 95, m2: 90, m3: 85, m4: 84, m5: null, m6: null },
    { cohort: "2025-Q4", size: 45, m0: 100, m1: 98, m2: 96, m3: 95, m4: null, m5: null, m6: null },
    { cohort: "2026-Q1", size: 45, m0: 100, m1: 99, m2: 98, m3: null, m4: null, m5: null, m6: null },
];

// Static class map — no template literals (Tailwind v4 JIT requirement)
const CELL_CLASS: Record<string, string> = {
    high: "bg-indigo-500/80 text-white font-bold",
    mid: "bg-indigo-500/50 text-white font-medium",
    low: "bg-indigo-500/30 text-white",
    warn: "bg-amber-500/40 text-white",
    danger: "bg-pink-500/40 text-white",
    empty: "bg-[#0B1221]",
};

function getCellClass(val: number | null): string {
    if (val === null) return CELL_CLASS.empty;
    if (val >= 95) return CELL_CLASS.high;
    if (val >= 90) return CELL_CLASS.mid;
    if (val >= 85) return CELL_CLASS.low;
    if (val >= 80) return CELL_CLASS.warn;
    return CELL_CLASS.danger;
}

const MONTH_KEYS: Array<keyof CohortRow> = ["m0", "m1", "m2", "m3", "m4", "m5", "m6"];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CohortAnalysisPage() {
    return (
        <Page
            title="Employee Retention Cohorts"
            subtitle="Track long-term retention trends by grouping employees based on their joining date."
            breadcrumbs={[
                { label: "Reports", href: "/reports/dashboard" },
                { label: "Cohort Analysis" },
            ]}
            maxWidth="1280px"
            actions={
                <>
                    <Button variant="secondary" icon={<Filter size={14} aria-hidden="true" />}>
                        Filter by Dept
                    </Button>
                    <Button icon={<Download size={14} aria-hidden="true" />}>Export Grid</Button>
                </>
            }
        >
            <div className="space-y-6">
                <Card padding="none">
                    <div className="p-4 border-b border-[#1A2A3A] flex flex-col md:flex-row justify-between items-start md:items-center gap-3 bg-[#1A2A3A]/20">
                        <h2 className="text-sm font-bold text-white">
                            Retention by Joining Quarter (Months Elapsed)
                        </h2>
                        <div className="flex flex-wrap gap-3" aria-label="Legend">
                            <span className="flex items-center gap-1.5 text-xs text-[#8899AA]">
                                <span className="w-3 h-3 rounded bg-indigo-500/80" aria-hidden="true" />
                                &gt;95%
                            </span>
                            <span className="flex items-center gap-1.5 text-xs text-[#8899AA]">
                                <span className="w-3 h-3 rounded bg-indigo-500/40" aria-hidden="true" />
                                85–94%
                            </span>
                            <span className="flex items-center gap-1.5 text-xs text-[#8899AA]">
                                <span className="w-3 h-3 rounded bg-amber-500/40" aria-hidden="true" />
                                80–84%
                            </span>
                            <span className="flex items-center gap-1.5 text-xs text-[#8899AA]">
                                <span className="w-3 h-3 rounded bg-pink-500/40" aria-hidden="true" />
                                &lt;80%
                            </span>
                        </div>
                    </div>

                    <div className="overflow-x-auto p-6">
                        <table
                            className="w-full text-center border-collapse"
                            aria-label="Employee retention cohort grid"
                        >
                            <thead>
                                <tr>
                                    <th
                                        scope="col"
                                        className="p-3 text-left font-semibold text-[#8899AA] text-sm border-b border-[#2A3A4A] w-32"
                                    >
                                        Cohort
                                    </th>
                                    <th
                                        scope="col"
                                        className="p-3 font-semibold text-[#8899AA] text-xs border-b border-[#2A3A4A] w-16"
                                    >
                                        Size
                                    </th>
                                    {["M0", "M1", "M2", "M3", "M4", "M5", "M6"].map((m) => (
                                        <th
                                            key={m}
                                            scope="col"
                                            className="p-3 font-semibold text-[#8899AA] text-sm border-b border-[#2A3A4A] w-20"
                                        >
                                            {m}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {COHORT_DATA.map((row) => (
                                    <tr key={row.cohort}>
                                        <td className="p-3 text-left font-bold text-white border-b border-[#1A2A3A] bg-[#0D1928]">
                                            {row.cohort}
                                        </td>
                                        <td className="p-3 text-sm text-[#8899AA] border-b border-[#1A2A3A] bg-[#0D1928]">
                                            {row.size}
                                        </td>
                                        {MONTH_KEYS.map((key) => {
                                            const val = row[key] as number | null;
                                            return (
                                                <td
                                                    key={key}
                                                    className={`p-3 text-sm border-b border-[#1A2A3A] ${getCellClass(val)}`}
                                                >
                                                    {val !== null ? `${val}%` : ""}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>

                <Card padding="lg">
                    <h3 className="text-white font-bold mb-2">Insight: Q3-2025 Anomaly</h3>
                    <p className="text-sm text-[#8899AA]">
                        The cohort joining in Q3-2025 experienced a sharper drop-off by Month 3 (85% retention)
                        compared to historical averages. Investigating exit interviews from this cohort indicates
                        dissatisfaction with the restructured onboarding program rolled out during that period.
                    </p>
                </Card>
            </div>
        </Page>
    );
}
