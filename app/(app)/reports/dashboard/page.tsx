"use client";

import Link from "next/link";
import {
    BarChart3,
    FileSpreadsheet,
    PieChart,
    Clock,
    Star,
    Download,
    ChevronRight,
    Search,
    FileText,
} from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─────────────────────────────────────────────────────────────────────────────
// Static config (module scope — keeps the page render fn pure)
// ─────────────────────────────────────────────────────────────────────────────

type TileColor = "indigo" | "emerald" | "amber" | "pink";

/**
 * Tailwind v4 JIT requires literal class strings — DO NOT replace
 * with template literals like `border-${color}-500/20`.
 */
const tileAccent: Record<TileColor, { ring: string; icon: string; link: string }> = {
    indigo: {
        ring: "hover:border-indigo-500/50",
        icon: "bg-indigo-500/10 text-indigo-400",
        link: "text-indigo-400",
    },
    emerald: {
        ring: "hover:border-emerald-500/50",
        icon: "bg-emerald-500/10 text-emerald-400",
        link: "text-emerald-400",
    },
    amber: {
        ring: "hover:border-amber-500/50",
        icon: "bg-amber-500/10 text-amber-500",
        link: "text-amber-500",
    },
    pink: {
        ring: "hover:border-pink-500/50",
        icon: "bg-pink-500/10 text-pink-400",
        link: "text-pink-400",
    },
};

interface CategoryTile {
    id: string;
    title: string;
    description: string;
    color: TileColor;
    icon: typeof FileSpreadsheet;
    href: string;
    cta: string;
}

const CATEGORY_TILES: CategoryTile[] = [
    {
        id: "standard",
        title: "Standard reports",
        description: "40+ pre-built templates for headcount, leave, and attendance.",
        color: "indigo",
        icon: FileSpreadsheet,
        href: "#standard",
        cta: "Browse library",
    },
    {
        id: "advanced",
        title: "Advanced analytics",
        description: "Deep dive into payroll costs, attrition risk, and cohort behaviours.",
        color: "emerald",
        icon: PieChart,
        href: "/reports/hr-analytics",
        cta: "View dashboards",
    },
    {
        id: "saved",
        title: "Saved reports",
        description: "Access your customised and frequently used report configurations.",
        color: "amber",
        icon: Star,
        href: "/reports/saved",
        cta: "View saved",
    },
    {
        id: "scheduled",
        title: "Scheduled deliveries",
        description: "Manage automated report emails to stakeholders and yourself.",
        color: "pink",
        icon: Clock,
        href: "/reports/scheduler",
        cta: "Manage schedules",
    },
];

interface RecentReport {
    id: string;
    name: string;
    subtitle: string;
    type: string;
    href: string;
}

const RECENT_REPORTS: RecentReport[] = [
    {
        id: "payroll-cost",
        name: "Monthly payroll cost centre",
        subtitle: "Generated today at 10:45 AM",
        type: "Financial",
        href: "/reports/payroll-cost",
    },
    {
        id: "attrition",
        name: "Q3 attrition predictor",
        subtitle: "Generated yesterday",
        type: "Analytics",
        href: "/reports/attrition",
    },
    {
        id: "audit",
        name: "Q2 compliance audit",
        subtitle: "Generated 3 days ago",
        type: "Compliance",
        href: "/reports/audit",
    },
];

const POPULAR_TEMPLATES = [
    { name: "Headcount report", category: "HR core", href: "/reports/headcount" },
    { name: "Leave utilisation", category: "Time & attendance", href: "/reports/leave" },
    { name: "Payroll MIS screen", category: "Finance", href: "/reports/payroll-mis" },
    { name: "Statutory reports", category: "Compliance", href: "/reports/statutory" },
    { name: "Training completion", category: "L&D", href: "/reports/training" },
    { name: "Recruitment funnel", category: "ATS", href: "/reports/recruitment" },
];

const RECENT_COLUMNS: Column<RecentReport>[] = [
    {
        key: "name",
        label: "Report",
        render: (r) => (
            <div className="flex items-center gap-3">
                <div
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#2A3A4A] bg-[#0B1221] text-[#8899AA]"
                >
                    <FileText size={16} aria-hidden="true" />
                </div>
                <div className="min-w-0">
                    <Link
                        href={r.href}
                        className="block truncate text-sm font-semibold text-white transition-colors hover:text-[#00e5a0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5a0]"
                    >
                        {r.name}
                    </Link>
                    <p className="truncate text-xs text-[#8899AA]">{r.subtitle}</p>
                </div>
            </div>
        ),
        sortable: true,
        sortValue: (r) => r.name,
    },
    {
        key: "type",
        label: "Type",
        render: (r) => <Badge variant="info">{r.type}</Badge>,
        sortable: true,
        sortValue: (r) => r.type,
    },
    {
        key: "actions",
        label: "",
        align: "right",
        width: "w-16",
        render: (r) => (
            <Button
                variant="ghost"
                size="sm"
                aria-label={`Download last run of ${r.name}`}
            >
                <Download size={14} aria-hidden="true" />
            </Button>
        ),
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function ReportsDashboardScreen() {
    return (
        <Page
            title="Reports & analytics"
            subtitle="Central hub for all your HR, payroll, and compliance analytics."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Reports" },
            ]}
            maxWidth="1280px"
            actions={
                <Button href="/reports/builder">+ Build custom report</Button>
            }
        >
            <div className="space-y-6">
                {/* Page-level icon header */}
                <div className="flex items-center gap-3 text-[#8899AA]">
                    <BarChart3
                        size={20}
                        className="text-indigo-400"
                        aria-hidden="true"
                    />
                    <span className="text-sm">
                        Search and explore reports across every module.
                    </span>
                </div>

                {/* Search bar */}
                <Card padding="sm">
                    <label htmlFor="report-search" className="sr-only">
                        Search reports
                    </label>
                    <div className="relative">
                        <Search
                            size={18}
                            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8899AA]"
                            aria-hidden="true"
                        />
                        <input
                            id="report-search"
                            type="search"
                            placeholder="Search for any report (e.g., 'Headcount', 'Attrition', 'Payroll Cost')…"
                            className="h-11 w-full rounded-xl border border-transparent bg-transparent pl-10 pr-3 text-sm text-white outline-none placeholder:text-[#8899AA] transition-colors focus:border-[#00e5a0]"
                        />
                    </div>
                </Card>

                {/* Category tiles */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {CATEGORY_TILES.map((tile) => {
                        const accent = tileAccent[tile.color];
                        const Icon = tile.icon;
                        return (
                            <Link
                                key={tile.id}
                                href={tile.href}
                                className={`group rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5a0] ${accent.ring}`}
                            >
                                <Card
                                    padding="lg"
                                    className={`h-full transition-colors ${accent.ring}`}
                                >
                                    <div
                                        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110 ${accent.icon}`}
                                    >
                                        <Icon size={22} aria-hidden="true" />
                                    </div>
                                    <h3 className="mb-2 text-lg font-bold text-white">
                                        {tile.title}
                                    </h3>
                                    <p className="mb-4 text-xs text-[#8899AA]">
                                        {tile.description}
                                    </p>
                                    <span
                                        className={`inline-flex items-center gap-1 text-sm font-medium ${accent.link}`}
                                    >
                                        {tile.cta}
                                        <ChevronRight
                                            size={14}
                                            aria-hidden="true"
                                        />
                                    </span>
                                </Card>
                            </Link>
                        );
                    })}
                </div>

                {/* Recently generated + popular templates */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Recently generated */}
                    <Card padding="lg">
                        <h2 className="mb-6 text-lg font-bold text-white">
                            Recently generated
                        </h2>
                        <DataTable<RecentReport>
                            data={RECENT_REPORTS}
                            columns={RECENT_COLUMNS}
                            rowKey={(r) => r.id}
                            emptyTitle="No reports yet"
                            emptyDescription="Generate or save a report to see it here."
                            aria-label="Recently generated reports"
                        />
                    </Card>

                    {/* Popular templates */}
                    <Card padding="lg">
                        <div id="standard" className="-mt-1 mb-6 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-white">
                                Popular templates
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {POPULAR_TEMPLATES.map((tmpl) => (
                                <Link
                                    key={tmpl.href}
                                    href={tmpl.href}
                                    className="rounded-xl border border-[#2A3A4A] bg-[#1A2A3A]/40 p-4 transition-colors hover:bg-[#1A2A3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5a0]"
                                >
                                    <h3 className="mb-1 text-sm font-bold text-white">
                                        {tmpl.name}
                                    </h3>
                                    <p className="text-xs text-[#8899AA]">
                                        {tmpl.category}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
