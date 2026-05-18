"use client";

import Link from "next/link";
import {
  Target,
  Users,
  Clock,
  Star,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  BarChart3,
  Calendar,
  ArrowUp,
  ArrowDown,
  Minus,
} from "lucide-react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell } from "recharts";
import { Tooltip as RechartsTooltip } from "recharts";
import ChartWrapper from "@/components/ui/ChartWrapper";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const CYCLE_STATUS = [
  { phase: "Goal Setting", done: 487, total: 512, pct: 95, status: "completed" },
  { phase: "Mid-Year Review", done: 430, total: 487, pct: 88, status: "active" },
  { phase: "Self Appraisal", done: 0, total: 487, pct: 0, status: "upcoming" },
  { phase: "Manager Review", done: 0, total: 487, pct: 0, status: "upcoming" },
  { phase: "Calibration", done: 0, total: 487, pct: 0, status: "upcoming" },
  { phase: "Final Rating", done: 0, total: 487, pct: 0, status: "upcoming" },
];

const DEPT_DIST = [
  { dept: "Engineering", avg: 3.8 },
  { dept: "Sales", avg: 4.1 },
  { dept: "HR", avg: 3.5 },
  { dept: "Finance", avg: 3.7 },
  { dept: "Marketing", avg: 3.9 },
  { dept: "Operations", avg: 3.4 },
];

const RADAR_DATA = [
  { metric: "Goal Achievement", A: 88 },
  { metric: "Collaboration", A: 76 },
  { metric: "Innovation", A: 65 },
  { metric: "Leadership", A: 72 },
  { metric: "Communication", A: 83 },
  { metric: "Delivery", A: 91 },
];

const ACTIONS = [
  { label: "Goal Approvals Pending", count: 23, icon: Target, href: "/performance/goals/approve", variant: "warning" as const, urgent: true },
  { label: "Self Appraisals Due", count: 57, icon: Star, href: "/performance/reviews/self", variant: "info" as const, urgent: false },
  { label: "Manager Reviews Pending", count: 18, icon: Users, href: "/performance/reviews/manager", variant: "purple" as const, urgent: false },
  { label: "PIP Active Cases", count: 4, icon: AlertTriangle, href: "/performance/pip/initiate", variant: "danger" as const, urgent: true },
];

const TOP_EMPLOYEES = [
  { name: "Anjali Singh", dept: "Sales", rating: 4.9, trend: "up", avatar: "AS" },
  { name: "Rahul Sharma", dept: "Eng", rating: 4.8, trend: "up", avatar: "RS" },
  { name: "Priya Kapoor", dept: "Mktg", rating: 4.7, trend: "same", avatar: "PK" },
  { name: "Vikram Nair", dept: "Ops", rating: 4.6, trend: "down", avatar: "VN" },
];

const KPI_ITEMS = [
  { label: "Employees in Cycle", value: "512", sub: "FY 2024–25 cohort", icon: Users },
  { label: "Reviews Completed", value: "430", sub: "88% participation rate", icon: CheckCircle2 },
  { label: "Avg Rating (Mid-Year)", value: "3.76", sub: "Out of 5.0", icon: Star },
  { label: "Pending Actions", value: "102", sub: "Requires HR attention", icon: Clock },
];

export default function PMSDashboard() {
  return (
    <Page
      title="Performance Management"
      subtitle="FY 2024–25 Annual Appraisal Cycle · Q4"
      breadcrumbs={[{ label: "Performance" }]}
      maxWidth="1400px"
      actions={
        <>
          <Button
            variant="secondary"
            icon={<Calendar size={14} aria-hidden="true" />}
            href="/performance/cycle-setup"
          >
            Configure Cycle
          </Button>
          <Button icon={<BarChart3 size={14} aria-hidden="true" />} href="/performance/analytics">Analytics</Button>
        </>
      }
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {KPI_ITEMS.map((k) => (
          <Card key={k.label} padding="md">
            <div className="flex items-start justify-between mb-3">
              <p className="text-xs text-[#8899AA]">{k.label}</p>
              <div className="w-8 h-8 rounded-lg bg-[#1A2A3A] flex items-center justify-center">
                <k.icon size={15} className="text-[#8899AA]" aria-hidden="true" />
              </div>
            </div>
            <p className="text-3xl font-bold text-white mb-0.5">{k.value}</p>
            <p className="text-[11px] text-[#8899AA]">{k.sub}</p>
          </Card>
        ))}
      </div>

      {/* Cycle Progress */}
      <Card padding="lg" className="mb-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-white">Appraisal Cycle Progress</h2>
          <span className="text-xs text-[#8899AA]">Apr 2025 deadline</span>
        </div>
        <ol className="relative flex items-start" aria-label="Appraisal cycle phases">
          {CYCLE_STATUS.map((phase, i) => (
            <li key={phase.phase} className="flex-1 relative">
              {i < CYCLE_STATUS.length - 1 && (
                <div
                  className="absolute top-3 left-1/2 w-full h-0.5 z-0"
                  style={{ background: phase.status === "completed" ? "#00E5A0" : "#1A2A3A" }}
                  aria-hidden="true"
                />
              )}
              <div className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold mb-2 ${
                    phase.status === "completed"
                      ? "bg-[#00E5A0] text-[#060B14]"
                      : phase.status === "active"
                      ? "bg-[#0066FF] text-white"
                      : "bg-[#1A2A3A] text-[#7a8fa6]"
                  }`}
                  aria-current={phase.status === "active" ? "step" : undefined}
                >
                  {phase.status === "completed" ? "✓" : i + 1}
                </div>
                <p className="text-[10px] text-center font-medium text-white leading-tight">{phase.phase}</p>
                {phase.pct > 0 && <p className="text-[9px] text-[#00E5A0] mt-0.5">{phase.pct}%</p>}
                {phase.status === "upcoming" && <p className="text-[9px] text-[#7a8fa6] mt-0.5">Not started</p>}
              </div>
            </li>
          ))}
        </ol>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 mb-6">
        {/* Dept Average Ratings */}
        <Card padding="lg">
          <h2 className="text-base font-semibold mb-4 text-white">Department Average Ratings</h2>
          <div className="h-[210px]">
            <ChartWrapper height="h-[220px]">
              <BarChart data={DEPT_DIST} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                <XAxis dataKey="dept" axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 11 }} />
                <YAxis domain={[0, 5]} axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 11 }} />
                <RechartsTooltip
                  contentStyle={{ background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8 }}
                  formatter={(v) => [`${v}`, "Avg Rating"]}
                />
                <Bar dataKey="avg" radius={[6, 6, 0, 0]}>
                  {DEPT_DIST.map((d) => (
                    <Cell
                      key={d.dept}
                      fill={d.avg >= 4 ? "#00E5A0" : d.avg >= 3.6 ? "#FFB800" : "#FF4444"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ChartWrapper>
          </div>
        </Card>

        {/* Top Performers */}
        <Card padding="lg">
          <h2 className="text-base font-semibold mb-4 text-white">Top Performers</h2>
          <div className="space-y-3">
            {TOP_EMPLOYEES.map((e, i) => (
              <div key={e.name} className="flex items-center gap-3 p-3 bg-[#0A1420] rounded-xl">
                <span className="text-xs text-[#7a8fa6] w-5 shrink-0">#{i + 1}</span>
                <div className="w-8 h-8 rounded-full bg-[#1A2A3A] flex items-center justify-center text-[10px] font-bold text-[#8899AA]">
                  {e.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">{e.name}</p>
                  <p className="text-[11px] text-[#7a8fa6]">{e.dept}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star size={12} className="text-[#FFB800] fill-[#FFB800]" aria-hidden="true" />
                  <span className="text-sm font-bold text-white">{e.rating}</span>
                  {e.trend === "up" && (
                    <ArrowUp size={12} className="text-[#00E5A0]" aria-label="Rating improved" />
                  )}
                  {e.trend === "down" && (
                    <ArrowDown size={12} className="text-[#FF4444]" aria-label="Rating declined" />
                  )}
                  {e.trend === "same" && (
                    <Minus size={12} className="text-[#8899AA]" aria-label="Rating unchanged" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Pending Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {ACTIONS.map((a) => (
          <Link
            key={a.label}
            href={a.href}
            className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-4 flex items-start gap-3 hover:border-[#2A3A4A] transition-all group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#1A2A3A] flex items-center justify-center shrink-0">
              <a.icon size={15} className="text-[#8899AA]" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">{a.count}</p>
              <p className="text-[11px] text-[#8899AA] leading-tight">{a.label}</p>
            </div>
            <ChevronRight
              size={14}
              className="text-[#7a8fa6] group-hover:text-white ml-auto self-center transition-colors"
              aria-hidden="true"
            />
          </Link>
        ))}
      </div>

      {/* Radar chart - competencies */}
      <Card padding="lg">
        <h2 className="text-base font-semibold mb-1 text-white">Org-wide Competency Scores</h2>
        <p className="text-[11px] text-[#8899AA] mb-4">Average across all departments · Mid-year snapshot</p>
        <ChartWrapper height="h-[260px]">
          <RadarChart data={RADAR_DATA}>
            <PolarGrid stroke="#1A2A3A" />
            <PolarAngleAxis dataKey="metric" tick={{ fill: "#8899AA", fontSize: 11 }} />
            <Radar
              dataKey="A"
              stroke="#00E5A0"
              fill="#00E5A0"
              fillOpacity={0.15}
              dot={{ fill: "#00E5A0", r: 3 }}
            />
            <RechartsTooltip
              contentStyle={{ background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8 }}
              formatter={(v) => [`${v}%`, "Score"]}
            />
          </RadarChart>
        </ChartWrapper>
      </Card>
    </Page>
  );
}
