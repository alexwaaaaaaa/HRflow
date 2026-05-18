"use client";

import { Download, FileText, Calendar, Filter, Search, BarChart3, Database, Clock, Plus } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// ─────────────────────────────────────────────────────────────────────────────
// Types & data
// ─────────────────────────────────────────────────────────────────────────────

interface ReportItem {
    title: string;
    desc: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    colorClass: string;
}

const REPORTS: ReportItem[] = [
    { title: "Time-to-Hire Analysis", desc: "Average days taken from requisition approval to offer acceptance per department.", icon: Clock, colorClass: "text-[#0066FF]" },
    { title: "Sourcing Channel ROI", desc: "Conversion rates and cost-per-hire breakdown by sourcing platforms (LinkedIn, Indeed, Referrals).", icon: Database, colorClass: "text-[#00E5A0]" },
    { title: "Diversity & Inclusion Report", desc: "Demographic breakdown of applicants vs hires to track D&I initiatives.", icon: BarChart3, colorClass: "text-[#FFB800]" },
    { title: "Interviewer Workload", desc: "Total hours spent on interviews per employee/team over the selected period.", icon: Calendar, colorClass: "text-[#9B59B6]" },
    { title: "Offer Decline Reasons", desc: "Aggregate analysis of reasons cited by candidates for rejecting offers.", icon: FileText, colorClass: "text-[#FF4444]" },
    { title: "Pipeline Bottlenecks", desc: "Stage-by-stage analysis identifying where candidates spend the most time.", icon: Filter, colorClass: "text-[#0066FF]" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components (module scope)
// ─────────────────────────────────────────────────────────────────────────────

function ReportCard({ report }: { report: ReportItem }) {
    return (
        <Card padding="lg" className="group flex h-[200px] flex-col justify-between transition-colors hover:border-[#2A3A4A]">
            <div>
                <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#1A2A3A] ${report.colorClass}`}>
                    <report.icon size={20} aria-hidden="true" />
                </div>
                <h3 className="mb-2 font-bold text-white">{report.title}</h3>
                <p className="line-clamp-2 text-xs leading-relaxed text-[#8899AA]">{report.desc}</p>
            </div>
            <div className="flex items-center justify-between border-t border-[#1A2A3A] pt-4">
                <span className="text-[10px] font-medium text-[#445566]">Updated 2h ago</span>
                <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button variant="ghost" size="sm">Preview</Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        icon={<Download size={14} aria-hidden="true" />}
                        aria-label={`Download ${report.title}`}
                    />
                </div>
            </div>
        </Card>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function ATSReports() {
    return (
        <Page
            title="ATS Reports Library"
            subtitle="Pre-configured reports covering all recruitment lifecycle metrics"
            breadcrumbs={[
                { label: "Recruitment", href: "/recruitment/dashboard" },
                { label: "Reports" },
            ]}
            maxWidth="1200px"
            actions={
                <>
                    <Button
                        variant="secondary"
                        icon={<Calendar size={14} aria-hidden="true" />}
                    >
                        Schedule Report
                    </Button>
                    <Button icon={<Plus size={14} aria-hidden="true" />}>Custom Builder</Button>
                </>
            }
        >
            {/* Quick Filters */}
            <Card padding="md" className="mb-8">
                <div className="flex flex-wrap gap-4">
                    <div className="relative w-[300px]">
                        <Search
                            size={14}
                            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]"
                            aria-hidden="true"
                        />
                        <input
                            type="search"
                            placeholder="Search reports…"
                            aria-label="Search reports"
                            className="h-10 w-full rounded-xl border border-[#1A2A3A] bg-[#060B14] pl-9 pr-3 text-sm text-white focus:border-[#0066FF] focus:outline-none"
                        />
                    </div>
                    <select
                        aria-label="Date range"
                        className="h-10 rounded-xl border border-[#1A2A3A] bg-[#060B14] px-4 text-sm text-white focus:outline-none"
                    >
                        <option>Date Range: Last 30 Days</option>
                        <option>This Quarter</option>
                        <option>This Year (YTD)</option>
                    </select>
                    <select
                        aria-label="Department filter"
                        className="h-10 rounded-xl border border-[#1A2A3A] bg-[#060B14] px-4 text-sm text-white focus:outline-none"
                    >
                        <option>All Departments</option>
                        <option>Engineering</option>
                        <option>Sales</option>
                    </select>
                    <select
                        aria-label="Export format"
                        className="h-10 rounded-xl border border-[#1A2A3A] bg-[#060B14] px-4 text-sm text-white focus:outline-none"
                    >
                        <option>Format: CSV</option>
                        <option>Format: PDF</option>
                        <option>Format: Excel</option>
                    </select>
                </div>
            </Card>

            {/* Reports Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {REPORTS.map((r) => (
                    <ReportCard key={r.title} report={r} />
                ))}
            </div>

            <div className="mt-8 text-center">
                <p className="text-sm text-[#8899AA]">
                    Need a different cut of data?{" "}
                    <a href="/reports/builder" className="text-[#00E5A0] hover:underline">
                        Request a custom report
                    </a>
                </p>
            </div>
        </Page>
    );
}
