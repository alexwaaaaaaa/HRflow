"use client";

import {
    FileBarChart,
    Download,
    FileSpreadsheet,
    Filter,
    Calendar,
} from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// ─── Data ─────────────────────────────────────────────────────────────────────
interface ReportCard {
    id: string;
    title: string;
    desc: string;
    icon: typeof FileBarChart;
    hasPdf: boolean;
}

const REPORTS: ReportCard[] = [
    {
        id: "r1",
        title: "PF & ESIC Consolidated Statement",
        desc: "Combined view of employee and employer EPF, EPS, EDLI, and ESIC contributions across all branches.",
        icon: FileSpreadsheet,
        hasPdf: true,
    },
    {
        id: "r2",
        title: "PT & LWF State-wise Liability",
        desc: "Detailed breakdown of Professional Tax and Labour Welfare Fund deductions categorized by state.",
        icon: FileBarChart,
        hasPdf: true,
    },
    {
        id: "r3",
        title: "Notice Period & Settlement Report",
        desc: "FnF settlement statuses, pending gratuity payments, and recovery of notice period buyouts.",
        icon: Calendar,
        hasPdf: false,
    },
    {
        id: "r4",
        title: "TDS Deduction & Remittance Summary",
        desc: "Monthly tax deducted at source versus TRACES challan remittance verification logs.",
        icon: FileBarChart,
        hasPdf: true,
    },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function StatutoryReports() {
    return (
        <Page
            title="Statutory Reports"
            subtitle="Generate and export consolidated compliance reports for PF, ESIC, Tax and Labour limits."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Compliance", href: "/compliance/dashboard" },
                { label: "Statutory Reports" },
            ]}
            maxWidth="1280px"
            actions={
                <Button
                    variant="primary"
                    icon={<Download size={14} aria-hidden="true" />}
                >
                    Download Bulk Archive
                </Button>
            }
        >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                {/* Filter panel */}
                <Card padding="md" className="space-y-6 lg:col-span-1">
                    <h3 className="flex items-center gap-2 border-b border-[#1A2A3A] pb-4 text-xs font-black uppercase tracking-[0.2em] text-white">
                        <Filter size={14} className="text-indigo-500" aria-hidden="true" /> Report Filters
                    </h3>
                    <div className="space-y-4">
                        {[
                            { label: "Financial Year", options: ["FY 2023-24", "FY 2022-23"] },
                            { label: "Month", options: ["All Months", "March 2024", "February 2024"] },
                            { label: "Establishment State", options: ["Pan India (All)", "Karnataka", "Maharashtra"] },
                        ].map((f) => (
                            <div key={f.label} className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">{f.label}</label>
                                <select
                                    className="w-full appearance-none rounded-xl border border-[#1A2A3A] bg-[#060B14] px-4 py-3 text-xs font-bold text-white outline-none focus:border-indigo-500"
                                    aria-label={f.label}
                                >
                                    {f.options.map((o) => <option key={o}>{o}</option>)}
                                </select>
                            </div>
                        ))}
                    </div>
                    <Button variant="secondary" className="w-full">Apply Filters</Button>
                </Card>

                {/* Report cards */}
                <div className="space-y-6 lg:col-span-3">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {REPORTS.map((report) => {
                            const Icon = report.icon;
                            return (
                                <Card
                                    key={report.id}
                                    padding="lg"
                                    className="group relative overflow-hidden transition-all hover:border-indigo-500/50"
                                >
                                    <div className="pointer-events-none absolute right-0 top-0 p-6 opacity-5 transition-opacity group-hover:opacity-10">
                                        <Icon size={80} className="text-indigo-500" aria-hidden="true" />
                                    </div>
                                    <div className="relative z-10 flex h-full flex-col">
                                        <h3 className="mb-2 text-sm font-black uppercase tracking-widest text-white">{report.title}</h3>
                                        <p className="mb-6 text-xs font-medium leading-relaxed text-slate-400">{report.desc}</p>
                                        <div className="mt-auto flex items-center gap-4">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex-1"
                                                icon={<FileSpreadsheet size={14} aria-hidden="true" />}
                                            >
                                                CSV
                                            </Button>
                                            {report.hasPdf && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="flex-1"
                                                    icon={<Download size={14} aria-hidden="true" />}
                                                >
                                                    PDF
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Page>
    );
}
