"use client";

import { Star, Search, FileSpreadsheet, Clock, Play, Filter } from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─── Static data (module scope) ───────────────────────────────────────────────

type ReportCategory = "Payroll" | "Analytics" | "HR Core" | "Time & Attendance";

const CATEGORY_VARIANT: Record<ReportCategory, "info" | "purple" | "success" | "neutral"> = {
    Payroll: "info",
    Analytics: "purple",
    "HR Core": "success",
    "Time & Attendance": "neutral",
};

interface SavedReport {
    id: string;
    name: string;
    desc: string;
    category: ReportCategory;
    lastRun: string;
    author: string;
    isOwner: boolean;
}

const SAVED_REPORTS: SavedReport[] = [
    {
        id: "SR-01",
        name: "Monthly Payroll Cost Center Breakup",
        desc: "Detailed breakdown of payroll components cross-tabulated by department and location.",
        category: "Payroll",
        lastRun: "10 Oct 2025",
        author: "Sneha Rao",
        isOwner: true,
    },
    {
        id: "SR-02",
        name: "Q3 Attrition Predictor Data",
        desc: "List of employees identified as high-flight risk based on performance and tenure.",
        category: "Analytics",
        lastRun: "05 Oct 2025",
        author: "Rajiv M",
        isOwner: false,
    },
    {
        id: "SR-03",
        name: "Diversity & Inclusion (D&I) Tracker",
        desc: "Gender and regional diversity metrics across senior leadership roles.",
        category: "HR Core",
        lastRun: "01 Oct 2025",
        author: "Sneha Rao",
        isOwner: true,
    },
    {
        id: "SR-04",
        name: "Overtime Variance - Factory Staff",
        desc: "Comparing budgeted overtime vs actuals for Blue-collar staff in manufacturing unit.",
        category: "Time & Attendance",
        lastRun: "15 Sep 2025",
        author: "Amit S",
        isOwner: false,
    },
];

const COLUMNS: Column<SavedReport>[] = [
    {
        key: "name",
        label: "Report Name",
        render: (r) => (
            <div className="flex items-start gap-3">
                <FileSpreadsheet size={16} className="text-emerald-400 mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                    <p className="font-bold text-white">{r.name}</p>
                    <p className="text-xs text-[#8899AA] mt-0.5 leading-relaxed">{r.desc}</p>
                </div>
            </div>
        ),
        sortable: true,
        sortValue: (r) => r.name,
    },
    {
        key: "category",
        label: "Category",
        render: (r) => <Badge variant={CATEGORY_VARIANT[r.category]}>{r.category}</Badge>,
    },
    {
        key: "author",
        label: "Author",
        render: (r) => (
            <span className="text-white">
                {r.author}
                {r.isOwner && (
                    <span className="ml-2 text-[10px] bg-indigo-500/10 text-indigo-400 px-1.5 py-0.5 rounded">
                        You
                    </span>
                )}
            </span>
        ),
        hideOnMobile: true,
    },
    {
        key: "lastRun",
        label: "Last Run",
        render: (r) => (
            <span className="flex items-center gap-2 text-[#8899AA]">
                <Clock size={12} aria-hidden="true" />
                {r.lastRun}
            </span>
        ),
        hideOnMobile: true,
    },
    {
        key: "actions",
        label: "",
        align: "right",
        render: (r) => (
            <Button
                variant="ghost"
                size="sm"
                icon={<Play size={12} className="fill-current" aria-hidden="true" />}
                aria-label={`Run ${r.name}`}
            >
                Run
            </Button>
        ),
    },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SavedReportsPage() {
    return (
        <Page
            title="Saved Reports"
            subtitle="Manage, run, and duplicate your favourite custom report configurations."
            breadcrumbs={[
                { label: "Reports", href: "/reports/dashboard" },
                { label: "Saved Reports" },
            ]}
            maxWidth="1280px"
            actions={
                <>
                    <Button variant="secondary" icon={<Filter size={14} aria-hidden="true" />}>
                        Filter by Category
                    </Button>
                    <Button icon={<Star size={14} aria-hidden="true" />} href="/reports/builder">Build New</Button>
                </>
            }
        >
            <Card padding="none">
                <div className="p-4 border-b border-[#1A2A3A]">
                    <label htmlFor="saved-search" className="sr-only">
                        Search saved reports
                    </label>
                    <div className="relative w-full md:w-96">
                        <Search
                            size={14}
                            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8899AA]"
                            aria-hidden="true"
                        />
                        <input
                            id="saved-search"
                            type="search"
                            placeholder="Search saved reports by name or author…"
                            className="h-10 w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] pl-9 pr-3 text-sm text-white outline-none placeholder:text-[#7a8fa6] transition-colors focus:border-[#00e5a0]"
                        />
                    </div>
                </div>
                <DataTable<SavedReport>
                    data={SAVED_REPORTS}
                    columns={COLUMNS}
                    rowKey={(r) => r.id}
                    emptyTitle="No saved reports"
                    emptyDescription="Save a report configuration to see it here."
                    aria-label="Saved reports"
                />
            </Card>
        </Page>
    );
}
