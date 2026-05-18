"use client";

import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Tooltip as RechartsTooltip } from "recharts";
import ChartWrapper from "@/components/ui/ChartWrapper";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const DEPT_RATINGS = [
  { dept: "Engineering", avg: 3.8, e: 12, ee: 45, me: 60, ni: 8, u: 2 },
  { dept: "Sales", avg: 4.1, e: 18, ee: 32, me: 40, ni: 5, u: 1 },
  { dept: "HR", avg: 3.5, e: 5, ee: 12, me: 20, ni: 3, u: 0 },
  { dept: "Finance", avg: 3.7, e: 4, ee: 18, me: 28, ni: 4, u: 2 },
  { dept: "Marketing", avg: 3.9, e: 6, ee: 14, me: 22, ni: 2, u: 0 },
];

const TREND = [
  { year: "FY21", avg: 3.4 },
  { year: "FY22", avg: 3.6 },
  { year: "FY23", avg: 3.5 },
  { year: "FY24", avg: 3.75 },
  { year: "FY25", avg: 3.85 },
];

const PIE_DATA = [
  { name: "Exceptional", value: 95, color: "#00E5A0" },
  { name: "Exceeds Exp.", value: 187, color: "#0066FF" },
  { name: "Meets Exp.", value: 198, color: "#FFB800" },
  { name: "Needs Improvement", value: 24, color: "#FF8C00" },
  { name: "Unsatisfactory", value: 8, color: "#FF4444" },
];

const KPI_ITEMS = [
  { label: "Avg Org Rating", value: "3.85", sub: "+0.1 YoY", variant: "success" as const, trend: "↑" },
  { label: "Top Performers (E+EE)", value: "282", sub: "55% of org", variant: "info" as const, trend: "↑" },
  { label: "PIP Cases", value: "4", sub: "0.8% of org", variant: "danger" as const, trend: "↓" },
  { label: "Promotions Approved", value: "18", sub: "3.5% rate", variant: "purple" as const, trend: "→" },
];

export default function PMSAnalytics() {
  const [period, setPeriod] = useState("FY 2024–25");

  return (
    <Page
      title="Performance Analytics"
      subtitle="Deep insights into organisation performance trends"
      breadcrumbs={[
        { label: "Performance", href: "/performance/dashboard" },
        { label: "Analytics" },
      ]}
      maxWidth="1300px"
      actions={
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          aria-label="Select financial year"
          className="h-10 bg-[#0D1928] border border-[#1A2A3A] rounded-xl px-3 text-sm text-white focus:outline-none focus:border-[#00E5A0]"
        >
          <option>FY 2024–25</option>
          <option>FY 2023–24</option>
          <option>FY 2022–23</option>
        </select>
      }
    >
      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {KPI_ITEMS.map((k) => (
          <Card key={k.label} padding="md">
            <p className="text-xs text-[#8899AA] mb-2">{k.label}</p>
            <p className="text-2xl font-bold text-white mb-0.5">{k.value}</p>
            <p className="text-[11px]">
              <Badge variant={k.variant}>{k.trend} {k.sub}</Badge>
            </p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Department avg ratings */}
        <Card padding="lg">
          <h3 className="font-semibold mb-4 text-white">Department Avg Ratings</h3>
          <div className="h-[220px]">
            <ChartWrapper height="h-[220px]">
              <BarChart data={DEPT_RATINGS} barSize={30}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                <XAxis dataKey="dept" axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 10 }} />
                <YAxis domain={[0, 5]} axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 10 }} />
                <RechartsTooltip contentStyle={{ background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8 }} />
                <Bar dataKey="avg" radius={[6, 6, 0, 0]}>
                  {DEPT_RATINGS.map((d) => (
                    <Cell key={d.dept} fill={d.avg >= 4 ? "#00E5A0" : "#0066FF"} />
                  ))}
                </Bar>
              </BarChart>
            </ChartWrapper>
          </div>
        </Card>

        {/* Trend over years */}
        <Card padding="lg">
          <h3 className="font-semibold mb-4 text-white">Rating Trend (5-Year)</h3>
          <div className="h-[220px]">
            <ChartWrapper height="h-[220px]">
              <LineChart data={TREND}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 10 }} />
                <YAxis domain={[3, 4.5]} axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 10 }} />
                <RechartsTooltip contentStyle={{ background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8 }} />
                <Line type="monotone" dataKey="avg" stroke="#00E5A0" strokeWidth={2} dot={{ fill: "#00E5A0", r: 4 }} />
              </LineChart>
            </ChartWrapper>
          </div>
        </Card>
      </div>

      {/* Distribution pie */}
      <Card padding="lg">
        <h3 className="font-semibold mb-4 text-white">Rating Distribution Breakdown</h3>
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="w-[240px] h-[240px] shrink-0">
            <ChartWrapper height="h-[240px]">
              <PieChart>
                <Pie data={PIE_DATA} cx="50%" cy="50%" outerRadius={100} innerRadius={55} dataKey="value">
                  {PIE_DATA.map((d) => (
                    <Cell key={d.name} fill={d.color} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8 }} />
              </PieChart>
            </ChartWrapper>
          </div>
          <div className="flex-1 space-y-3">
            {PIE_DATA.map((d) => {
              const total = PIE_DATA.reduce((s, p) => s + p.value, 0);
              const pct = ((d.value / total) * 100).toFixed(1);
              return (
                <div key={d.name} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ background: d.color }} />
                  <span className="text-sm text-white flex-1">{d.name}</span>
                  <span className="text-sm font-bold text-white min-w-[2.5rem] text-right">{d.value}</span>
                  <div className="w-32 h-2 bg-[#1A2A3A] rounded-full">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: d.color }} />
                  </div>
                  <span className="text-xs text-[#8899AA] min-w-[3rem] text-right">{pct}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    </Page>
  );
}
