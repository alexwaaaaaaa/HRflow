"use client";

import { Download } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import ChartWrapper from "@/components/ui/ChartWrapper";

// ─── Static data ──────────────────────────────────────────────────────────────

const FUNNEL_DATA = [
    { stage: "Sourced", count: 1200 },
    { stage: "Screened", count: 850 },
    { stage: "Interviewed", count: 320 },
    { stage: "Offered", count: 45 },
    { stage: "Hired", count: 38 },
];

interface SourceRow {
    name: string;
    percent: number;
    barClass: string;
}

// Static class map — no template literals
const SOURCE_ROWS: SourceRow[] = [
    { name: "Employee Referrals", percent: 45, barClass: "bg-emerald-400" },
    { name: "LinkedIn", percent: 30, barClass: "bg-blue-500" },
    { name: "Job Portals (Naukri, etc.)", percent: 15, barClass: "bg-indigo-400" },
    { name: "Agencies", percent: 10, barClass: "bg-pink-400" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RecruitmentReportPage() {
    return (
        <Page
            title="Recruitment Funnel"
            subtitle="Track candidate pipeline, conversion rates, and time-to-hire."
            breadcrumbs={[
                { label: "Reports", href: "/reports/dashboard" },
                { label: "Recruitment Funnel" },
            ]}
            maxWidth="1280px"
            actions={
                <Button icon={<Download size={14} aria-hidden="true" />}>Export Report</Button>
            }
        >
            <div className="space-y-6">
                {/* KPI cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card padding="lg">
                        <p className="text-[#8899AA] text-sm font-medium mb-2">Time to Fill (Avg)</p>
                        <p className="text-3xl font-bold text-white">42 Days</p>
                    </Card>
                    <Card padding="lg">
                        <p className="text-[#8899AA] text-sm font-medium mb-2">Offer Acceptance</p>
                        <p className="text-3xl font-bold text-emerald-400">84.4%</p>
                    </Card>
                    <Card padding="lg">
                        <p className="text-[#8899AA] text-sm font-medium mb-2">Cost Per Hire</p>
                        <p className="text-3xl font-bold text-pink-400">₹45k</p>
                    </Card>
                    <Card padding="lg">
                        <p className="text-[#8899AA] text-sm font-medium mb-2">Open Reqs</p>
                        <p className="text-3xl font-bold text-amber-500">12</p>
                    </Card>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card padding="lg">
                        <h2 className="text-lg font-bold text-white mb-6">Pipeline Conversion</h2>
                        <div className="h-[300px] w-full">
                            <ChartWrapper height="h-full">
                                <BarChart
                                    data={FUNNEL_DATA}
                                    layout="vertical"
                                    margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" horizontal={false} />
                                    <XAxis type="number" stroke="#8899AA" fontSize={12} />
                                    <YAxis
                                        dataKey="stage"
                                        type="category"
                                        stroke="#8899AA"
                                        fontSize={12}
                                        width={100}
                                    />
                                    <Tooltip
                                        cursor={{ fill: "#1A2A3A" }}
                                        contentStyle={{
                                            backgroundColor: "#0B1221",
                                            border: "1px solid #2A3A4A",
                                            borderRadius: "8px",
                                        }}
                                    />
                                    <Bar dataKey="count" fill="#ec4899" radius={[0, 4, 4, 0]} barSize={30} />
                                </BarChart>
                            </ChartWrapper>
                        </div>
                    </Card>

                    <Card padding="lg">
                        <h2 className="text-lg font-bold text-white mb-6">Source of Hire</h2>
                        <div className="space-y-4" role="list" aria-label="Hiring sources">
                            {SOURCE_ROWS.map((source) => (
                                <div key={source.name} role="listitem">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-[#8899AA]">{source.name}</span>
                                        <span className="text-white font-medium">{source.percent}%</span>
                                    </div>
                                    <div
                                        className="w-full bg-[#1A2A3A] rounded-full h-2"
                                        role="progressbar"
                                        aria-valuenow={source.percent}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                        aria-label={`${source.name}: ${source.percent}%`}
                                    >
                                        <div
                                            className={`${source.barClass} h-2 rounded-full`}
                                            style={{ width: `${source.percent}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
