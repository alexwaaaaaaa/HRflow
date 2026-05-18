"use client";
import React, { useState } from "react";
import { Download, Filter, Search, ChevronDown, PieChart, TrendingUp, Users, ShieldAlert, Clock,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface Report {
    id: number;
    name: string;
    category: string;
    desc: string;
}

const REPORTS: Report[] = [
    { id: 1, name: "Course Completion Rates", category: "General", desc: "Detailed breakdown of completion rates by department, role, and specific course." },
    { id: 2, name: "Compliance Status", category: "Compliance", desc: "Track mandatory training completions, expiring certificates, and non-compliant employees." },
    { id: 3, name: "Learner Engagement", category: "Engagement", desc: "Active users, average time spent learning, and most popular courses." },
    { id: 4, name: "Skill Gap Matrix", category: "Skills", desc: "Current vs required skill levels across the organization to inform hiring/training." },
    { id: 5, name: "External Training Logs", category: "General", desc: "List of all user-submitted external certifications and courses pending/approved." },
    { id: 6, name: "Webinar Attendance", category: "Live Training", desc: "Attendance records, drop-off rates, and QA participation for live sessions." },
    { id: 7, name: "Assessment Scores", category: "Performance", desc: "Average test scores per course, highlighting modules with high failure rates." },
];

const CATEGORIES = ["All", "General", "Compliance", "Engagement", "Skills", "Performance", "Live Training"] as const;
type ReportCategory = (typeof CATEGORIES)[number];

interface QuickReport {
    icon: React.ElementType;
    title: string;
    sub: string;
    colorClass: string;
    hoverBorderClass: string;
}

const QUICK_REPORTS: QuickReport[] = [
    { icon: ShieldAlert, title: "Compliance Alerts", sub: "42 employees non-compliant", colorClass: "text-[#FF4444]", hoverBorderClass: "hover:border-[#FF4444]/50" },
    { icon: Users, title: "Onboarding Status", sub: "15 new hires in progress", colorClass: "text-[#33E6FF]", hoverBorderClass: "hover:border-[#33E6FF]/50" },
    { icon: TrendingUp, title: "Course Completions", sub: "+12% vs last month", colorClass: "text-[#00E5A0]", hoverBorderClass: "hover:border-[#00E5A0]/50" },
    { icon: PieChart, title: "Skill Distribution", sub: "Latest matrix updates", colorClass: "text-[#FFB020]", hoverBorderClass: "hover:border-[#FFB020]/50" },
];

export default function LMSReportsScreen() {
    const [activeCategory, setActiveCategory] = useState<ReportCategory>("All");

    const filteredReports = activeCategory === "All" ? REPORTS : REPORTS.filter((r) => r.category === activeCategory);

    return (
        <Page
            title="Reporting Center"
            subtitle="Generate, schedule, and export detailed reports on learning activity and compliance"
            breadcrumbs={[{ label: "LMS", href: "/lms/dashboard" }, { label: "Reports" }]}
            maxWidth="1400px"
            actions={
                <>
                    <Button variant="secondary" icon={<Clock size={16} />}>Schedule Reports</Button>
                    <Button variant="secondary" icon={<Download size={16} className="text-[#00E5A0]" />}>Export All</Button>
                </>
            }
        >
            {/* Quick Reports KPI */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {QUICK_REPORTS.map((qr) => {
                    const Icon = qr.icon;
                    return (
                        <Card
                            key={qr.title}
                            padding="lg"
                            className={`cursor-pointer ${qr.hoverBorderClass} transition-colors group`}
                        >
                            <Icon size={24} className={`${qr.colorClass} mb-3`} aria-hidden="true" />
                            <h3 className="text-white font-bold text-lg mb-1">{qr.title}</h3>
                            <p className="text-sm text-[#8899AA] mb-4">{qr.sub}</p>
                            <span className={`text-xs font-bold ${qr.colorClass} uppercase tracking-wider flex items-center gap-1`}>
                                Run Report <ChevronDown size={14} className="-rotate-90" aria-hidden="true" />
                            </span>
                        </Card>
                    );
                })}
            </div>

            <Card padding="none" className="min-h-[500px] flex flex-col">
                <div className="p-6 border-b border-[#1A2A3A] flex flex-col md:flex-row justify-between md:items-center gap-4 bg-[#0A1420]">
                    <div
                        className="flex flex-wrap gap-2"
                        role="tablist"
                        aria-label="Filter reports by category"
                    >
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                role="tab"
                                aria-selected={activeCategory === cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors border ${activeCategory === cat ? "bg-[#33E6FF]/10 text-[#33E6FF] border-[#33E6FF]/30" : "bg-[#1A2A3A] text-[#8899AA] border-[#2A3A4A] hover:bg-[#2A3A4A] hover:text-white"}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="flex gap-3">
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" aria-hidden="true" />
                            <input
                                type="search"
                                placeholder="Search reports…"
                                aria-label="Search reports"
                                className="bg-[#1A2A3A] border border-[#2A3A4A] rounded-lg pl-9 pr-4 py-1.5 text-white text-sm focus:outline-none focus:border-[#33E6FF]"
                            />
                        </div>
                        <Button variant="secondary" size="sm" aria-label="Filter reports">
                            <Filter size={16} aria-hidden="true" />
                        </Button>
                    </div>
                </div>

                <div className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredReports.map((report) => (
                        <div
                            key={report.id}
                            className="bg-[#152336] border border-[#2A3A4A] rounded-xl p-5 hover:border-[#33E6FF] transition-colors group flex flex-col h-full"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="font-bold text-white text-lg group-hover:text-[#33E6FF] transition-colors">{report.name}</h3>
                                <Badge variant="neutral">{report.category}</Badge>
                            </div>
                            <p className="text-sm text-[#8899AA] mb-6 flex-1">{report.desc}</p>
                            <div className="flex items-center gap-2 mt-auto">
                                <Button variant="ghost" size="sm" className="flex-1 justify-center">View Report</Button>
                                <Button variant="secondary" size="sm" aria-label={`Download ${report.name}`}>
                                    <Download size={14} aria-hidden="true" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </Page>
    );
}
