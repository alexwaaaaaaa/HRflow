"use client";

import { useState } from "react";
import { Plus, TrendingUp, BarChart2, Search, ChevronRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from "recharts";
import ChartWrapper from "@/components/ui/ChartWrapper";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ─────────────────────────────────────────────────────────────────────────────
// Types & static data
// ─────────────────────────────────────────────────────────────────────────────

type OkrStatus = "on-track" | "at-risk" | "behind";

interface Department {
    name: string;
    head: string;
    okrs: number;
    progress: number;
    status: OkrStatus;
}

const DEPARTMENTS: Department[] = [
    { name: "Engineering", head: "Ravi Kumar", okrs: 6, progress: 74, status: "on-track" },
    { name: "Sales", head: "Priya Mehta", okrs: 5, progress: 58, status: "at-risk" },
    { name: "Marketing", head: "Arjun Singh", okrs: 4, progress: 82, status: "on-track" },
    { name: "Product", head: "Sneha Rao", okrs: 3, progress: 40, status: "behind" },
    { name: "HR & Admin", head: "Kavita Joshi", okrs: 4, progress: 91, status: "on-track" },
    { name: "Operations", head: "Rahul Gupta", okrs: 5, progress: 67, status: "on-track" },
];

const CHART_DATA = DEPARTMENTS.map((d) => ({ dept: d.name.split(" ")[0], progress: d.progress }));

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
const STATUS_PROGRESS_BAR: Record<OkrStatus, string> = {
    "on-track": "bg-[#00E5A0]",
    "at-risk": "bg-[#FFB800]",
    "behind": "bg-[#FF4444]",
};

// Static chart bar fill — used with Cell (Recharts Cell is still the supported API for Pie/Bar slices)
function chartBarFill(progress: number): string {
    if (progress >= 70) return "#00E5A0";
    if (progress >= 50) return "#FFB800";
    return "#FF4444";
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components (module scope)
// ─────────────────────────────────────────────────────────────────────────────

function DeptCard({ dept }: { dept: Department }) {
    const [selected, setSelected] = useState(false);

    return (
        <li>
            <button
                type="button"
                onClick={() => setSelected((v) => !v)}
                aria-expanded={selected}
                aria-label={`${dept.name} department OKRs`}
                className="w-full text-left bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5 hover:border-[#2A3A4A] transition-all"
            >
                <div className="flex items-start justify-between mb-3">
                    <div>
                        <h2 className="text-base font-semibold text-white">{dept.name}</h2>
                        <p className="text-xs text-[#8899AA]">Head: {dept.head}</p>
                    </div>
                    <Badge variant={STATUS_VARIANT[dept.status]}>{STATUS_LABEL[dept.status]}</Badge>
                </div>
                <div className="flex items-center gap-2 mb-3">
                    <BarChart2 size={12} className="text-[#445566]" aria-hidden="true" />
                    <span className="text-xs text-[#8899AA]">{dept.okrs} OKRs</span>
                </div>
                <div className="flex items-center gap-2">
                    <div
                        className="flex-1 h-2 bg-[#1A2A3A] rounded-full overflow-hidden"
                        role="progressbar"
                        aria-valuenow={dept.progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${dept.name} progress: ${dept.progress}%`}
                    >
                        <div className={`h-full rounded-full ${STATUS_PROGRESS_BAR[dept.status]}`} style={{ width: `${dept.progress}%` }} />
                    </div>
                    <span className="text-xs font-bold text-white">{dept.progress}%</span>
                </div>
                <div className="mt-3 flex items-center justify-end gap-1 text-xs text-[#00E5A0]">
                    <TrendingUp size={11} aria-hidden="true" /> View OKRs
                    <ChevronRight size={11} aria-hidden="true" />
                </div>
            </button>
        </li>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function DepartmentOKRPage() {
    const [search, setSearch] = useState("");

    const filtered = DEPARTMENTS.filter((d) =>
        d.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Page
            title="Department OKRs"
            subtitle="OKR progress by department · Q1 2025"
            breadcrumbs={[
                { label: "OKRs", href: "/okr/dashboard" },
                { label: "Department OKRs" },
            ]}
            maxWidth="1200px"
            actions={
                <Button icon={<Plus size={16} />} href="/okr/create">Add OKR</Button>
            }
        >
            <div className="space-y-6">
                {/* Department Progress Chart */}
                <section aria-labelledby="dept-chart-heading">
                    <Card padding="lg">
                        <h2 id="dept-chart-heading" className="text-sm font-semibold text-white mb-4">Department Progress Overview</h2>
                        <div className="h-48">
                            <ChartWrapper height="h-full">
                                <BarChart data={CHART_DATA} barSize={32}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                    <XAxis dataKey="dept" axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 11 }} />
                                    <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 11 }} />
                                    <Tooltip
                                        contentStyle={{ background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8 }}
                                        itemStyle={{ color: "#fff", fontSize: 12 }}
                                        formatter={(v: unknown) => [`${v}%`, "Progress"]}
                                    />
                                    <Bar dataKey="progress" radius={[6, 6, 0, 0]}>
                                        {CHART_DATA.map((d, i) => (
                                            <Cell key={i} fill={chartBarFill(d.progress)} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ChartWrapper>
                        </div>
                    </Card>
                </section>

                {/* Search */}
                <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" aria-hidden="true" />
                    <label htmlFor="dept-search" className="sr-only">Search departments</label>
                    <input
                        id="dept-search"
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search department…"
                        className="w-full bg-[#0D1928] border border-[#1A2A3A] rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00e5a0]"
                    />
                </div>

                {/* Department Cards */}
                <ul role="list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map((dept) => (
                        <DeptCard key={dept.name} dept={dept} />
                    ))}
                </ul>
            </div>
        

        

        

            
        </Page>
    );
}
