"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from "recharts";
import { FileText } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import ChartWrapper from "@/components/ui/ChartWrapper";

// ─────────────────────────────────────────────────────────────────────────────
// Static data
// ─────────────────────────────────────────────────────────────────────────────

const METRICS = [
    { title: "Average Time to Fill", value: "32 Days", change: "-4 Days", positive: true },
    { title: "Average Time to Hire", value: "24 Days", change: "-2 Days", positive: true },
    { title: "Candidate Quality Score", value: "9.2/10", change: "+0.4", positive: true },
    { title: "Cost Per Hire", value: "₹21,000", change: "+₹1.5k", positive: false },
];

const FUNNEL_DATA = [
    { stage: "Applied", candidates: 1240 },
    { stage: "Screening", candidates: 850 },
    { stage: "First Round", candidates: 320 },
    { stage: "Final Round", candidates: 85 },
    { stage: "Offered", candidates: 32 },
    { stage: "Hired", candidates: 28 },
];

const TIME_IN_STAGE = [
    { name: "Sourcing", engineering: 8, sales: 5, marketing: 6 },
    { name: "Screening", engineering: 3, sales: 2, marketing: 2 },
    { name: "Interviews", engineering: 14, sales: 8, marketing: 10 },
    { name: "Offer", engineering: 5, sales: 3, marketing: 4 },
];

const SOURCING_MIX = [
    { name: "Employee Referrals", vol: "15%", qual: 9.5, color: "#9B59B6" },
    { name: "LinkedIn Promoted", vol: "42%", qual: 8.2, color: "#0066FF" },
    { name: "Direct Careers Page", vol: "28%", qual: 7.8, color: "#00E5A0" },
    { name: "External Agencies", vol: "10%", qual: 8.5, color: "#FFB800" },
    { name: "Others (Job Boards)", vol: "5%", qual: 6.5, color: "#445566" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function ATSAnalyticsDeepDive() {
    return (
        <Page
            title="Recruitment Analytics"
            subtitle="Interactive visual analysis of the hiring pipeline, bottlenecks, and costs"
            breadcrumbs={[
                { label: "Recruitment", href: "/recruitment/dashboard" },
                { label: "Analytics" },
            ]}
            maxWidth="1400px"
            actions={
                <select
                    aria-label="Select quarter"
                    className="h-10 rounded-xl border border-[#1A2A3A] bg-[#0D1928] px-4 text-sm font-medium text-white focus:outline-none"
                >
                    <option>Q1 2025</option>
                    <option>Q4 2024</option>
                    <option>YTD</option>
                </select>
            }
        >
            {/* KPI Row */}
            <dl className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {METRICS.map((m) => (
                    <Card key={m.title} padding="md">
                        <dt className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#8899AA]">
                            {m.title}
                        </dt>
                        <div className="flex items-end justify-between">
                            <dd className="text-3xl font-bold text-white">{m.value}</dd>
                            <span
                                className={`rounded px-2 py-1 text-xs font-bold ${
                                    m.positive
                                        ? "bg-[#00E5A0]/10 text-[#00E5A0]"
                                        : "bg-[#FF4444]/10 text-[#FF4444]"
                                }`}
                            >
                                {m.change}
                            </span>
                        </div>
                    </Card>
                ))}
            </dl>

            <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Funnel Chart */}
                <Card padding="lg" className="lg:col-span-2">
                    <div className="mb-6 flex items-center justify-between">
                        <h3 className="font-bold text-lg text-white">
                            Recruitment Funnel (Drop-off Analysis)
                        </h3>
                        <Button variant="secondary" size="sm">By Department</Button>
                    </div>
                    <div className="h-[300px]">
                        <ChartWrapper height="h-full">
                            <BarChart
                                data={FUNNEL_DATA}
                                layout="vertical"
                                margin={{ top: 0, right: 0, left: 20, bottom: 0 }}
                            >
                                <XAxis type="number" hide />
                                <YAxis
                                    dataKey="stage"
                                    type="category"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#8899AA", fontSize: 12, fontWeight: 500 }}
                                    width={90}
                                />
                                <Tooltip
                                    cursor={{ fill: "#1A2A3A", opacity: 0.4 }}
                                    contentStyle={{
                                        backgroundColor: "#060B14",
                                        borderColor: "#1A2A3A",
                                        borderRadius: "12px",
                                        fontSize: "12px",
                                    }}
                                />
                                <Bar dataKey="candidates" fill="#0066FF" radius={[0, 4, 4, 0]} barSize={24} minPointSize={2}>
                                    {FUNNEL_DATA.map((_, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={index === 5 ? "#00E5A0" : "#0066FF"}
                                            fillOpacity={1 - index * 0.1}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ChartWrapper>
                    </div>
                    <div className="mt-4 flex gap-4 text-xs">
                        <div className="flex-1 rounded-xl border border-[#2A3A4A] bg-[#1A2A3A]/50 p-3">
                            <p className="mb-1 text-[#8899AA]">Screening to Interview Ratio</p>
                            <p className="text-lg font-bold text-white">
                                37.6%{" "}
                                <span className="ml-1 text-[10px] text-[#FF4444]">↓ Warning</span>
                            </p>
                        </div>
                        <div className="flex-1 rounded-xl border border-[#2A3A4A] bg-[#1A2A3A]/50 p-3">
                            <p className="mb-1 text-[#8899AA]">Offer Acceptance Rate</p>
                            <p className="text-lg font-bold text-[#00E5A0]">87.5%</p>
                        </div>
                    </div>
                </Card>

                {/* Sourcing Effectiveness */}
                <Card padding="lg">
                    <h3 className="mb-6 font-bold text-lg text-white">Sourcing Mix vs Quality</h3>
                    <div className="space-y-5">
                        {SOURCING_MIX.map((s) => (
                            <div key={s.name}>
                                <div className="mb-1.5 flex justify-between text-xs font-medium">
                                    <span className="text-white">
                                        {s.name}{" "}
                                        <span className="text-[#8899AA]">({s.vol} volume)</span>
                                    </span>
                                    <span style={{ color: s.color }}>Avg Quality: {s.qual}</span>
                                </div>
                                <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#1A2A3A]">
                                    <div
                                        className="h-full rounded-full"
                                        style={{ width: `${s.qual * 10}%`, backgroundColor: s.color }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 flex gap-3 rounded-xl border border-[#FFB800]/20 bg-[#0A1420] p-4">
                        <FileText size={20} className="shrink-0 text-[#FFB800]" aria-hidden="true" />
                        <p className="text-xs leading-relaxed text-[#8899AA]">
                            <strong className="text-white">Insight:</strong> Referrals generate lower
                            volume but highest candidate quality. Consider increasing the referral bonus
                            to boost volume in this channel.
                        </p>
                    </div>
                </Card>
            </div>

            {/* Time in Stage Bar Chart */}
            <Card padding="lg">
                <h3 className="mb-6 font-bold text-lg text-white">
                    Average Time in Stage (Days) by Dept
                </h3>
                <div className="h-[250px]">
                    <ChartWrapper height="h-full">
                        <BarChart
                            data={TIME_IN_STAGE}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                            <XAxis
                                dataKey="name"
                                stroke="#8899AA"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis stroke="#8899AA" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip
                                cursor={{ fill: "#1A2A3A", opacity: 0.1 }}
                                contentStyle={{
                                    backgroundColor: "#060B14",
                                    borderColor: "#1A2A3A",
                                    borderRadius: "12px",
                                    fontSize: "12px",
                                }}
                            />
                            <Bar dataKey="engineering" name="Engineering" fill="#0066FF" radius={[4, 4, 0, 0]} barSize={20} />
                            <Bar dataKey="sales" name="Sales" fill="#00E5A0" radius={[4, 4, 0, 0]} barSize={20} />
                            <Bar dataKey="marketing" name="Marketing" fill="#9B59B6" radius={[4, 4, 0, 0]} barSize={20} />
                        </BarChart>
                    </ChartWrapper>
                </div>
            </Card>
        </Page>
    );
}
