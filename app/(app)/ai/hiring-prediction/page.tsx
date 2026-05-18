"use client";

import { Sparkles, TrendingUp, Target, Filter, PlusCircle } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";
import ChartWrapper from "@/components/ui/ChartWrapper";
import ClientOnly from "@/components/ui/ClientOnly";
import { seededFloats } from "@/lib/random";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip } from "recharts";

// ─── Static data ────────────────────────────────────────────────────────────

const TIMELINE_DATA = [
  { month: "Jul", actual: 45, predicted: 42 },
  { month: "Aug", actual: 52, predicted: 48 },
  { month: "Sep", actual: 48, predicted: 50 },
  { month: "Oct", actual: 0, predicted: 55 },
  { month: "Nov", actual: 0, predicted: 62 },
  { month: "Dec", actual: 0, predicted: 45 },
];

interface ReqRow {
  id: string;
  role: string;
  ttf: number;
  risk: "High" | "Medium" | "Low";
  ch: string;
}

const REQS: ReqRow[] = [
  { id: "REQ-102", role: "Staff Backend Engineer", ttf: 58, risk: "High", ch: "Referrals (65%)" },
  { id: "REQ-105", role: "Product Marketing Manager", ttf: 32, risk: "Low", ch: "LinkedIn (82%)" },
  { id: "REQ-108", role: "Enterprise Account Exec", ttf: 45, risk: "Medium", ch: "Agency / Headhunter (55%)" },
];

const RISK_VARIANT: Record<string, "danger" | "warning" | "success"> = {
  High: "danger",
  Medium: "warning",
  Low: "success",
};

// Seeded decorative confidence values
const CONF_SEEDS = seededFloats(7006, REQS.length);

const REQ_COLUMNS: Column<ReqRow>[] = [
  {
    key: "role",
    label: "Role / Req ID",
    render: (r) => (
      <div>
        <div className="text-sm font-medium text-white">{r.role}</div>
        <div className="text-xs text-[#8899AA]">{r.id}</div>
      </div>
    ),
    sortable: true,
    sortValue: (r) => r.role,
  },
  {
    key: "ttf",
    label: "Predicted TTF",
    render: (r) => (
      <span className="text-sm text-white font-medium">
        {r.ttf} <span className="text-[#8899AA] font-normal">days</span>
      </span>
    ),
    sortable: true,
    sortValue: (r) => r.ttf,
  },
  {
    key: "risk",
    label: "Bottleneck Risk",
    align: "center",
    render: (r) => <Badge variant={RISK_VARIANT[r.risk]}>{r.risk}</Badge>,
  },
  {
    key: "ch",
    label: "Best Sourcing Channel",
    render: (r) => <span className="text-sm text-[#8899AA]">{r.ch}</span>,
  },
  {
    key: "action",
    label: "",
    align: "right",
    render: (r) => (
      <Button variant="secondary" size="sm" href={`/ai/hiring-prediction/${r.id}`}>Forecast Details</Button>
    ),
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HiringPredictionPage() {
  return (
    <Page
      title="Hiring Velocity Prediction"
      subtitle="AI-driven forecasting for time-to-fill, candidate drop-off probabilities, and optimal sourcing channels based on historical ATS data."
      breadcrumbs={[
        { label: "AI", href: "/ai/smart-onboarding" },
        { label: "Hiring Prediction" },
      ]}
      maxWidth="1300px"
      actions={
        <>
          <Button variant="secondary" icon={<Filter size={14} />}>Adjust Model Parameters</Button>
          <Button icon={<PlusCircle size={14} />}>New Req Forecast</Button>
        </>
      }
    >
      {/* Smart Summary */}
      <Card padding="lg" className="mb-6 border-blue-500/20">
        <div className="flex items-start gap-4">
          <div className="bg-blue-500/20 p-3 rounded-xl border border-blue-500/30 shrink-0">
            <Sparkles size={24} className="text-blue-400" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Kaarya Talent Synthesis</h3>
            <p className="text-[#8899AA] text-sm leading-relaxed mb-4 max-w-3xl">
              Predicted Time-to-Fill for <strong className="text-white">Senior Engineering roles</strong> has increased by 14 days over the next quarter due to market supply constraints. Shifting sourcing budget (+20%) to GitHub/StackOverflow outreach is forecasted to offset this delay.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="warning"><TrendingUp size={12} aria-hidden="true" className="inline mr-1" />Eng TTF +14 Days</Badge>
              <Badge variant="success"><Target size={12} aria-hidden="true" className="inline mr-1" />Optimal: Tech Communities</Badge>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Trend Chart */}
        <Card padding="lg" className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-white font-semibold">Requirement Fulfillment Forecast</h3>
              <p className="text-[#8899AA] text-xs mt-1">Expected vs Actual hiring volume</p>
            </div>
            <div className="flex gap-4">
              <span className="flex items-center gap-2 text-xs text-[#8899AA]">
                <span className="w-3 h-3 rounded-full bg-blue-500" aria-hidden="true" /> Predicted
              </span>
              <span className="flex items-center gap-2 text-xs text-[#8899AA]">
                <span className="w-3 h-3 rounded-full bg-[#1A2A3A] border border-[#2A3A4A]" aria-hidden="true" /> Actual
              </span>
            </div>
          </div>
          <div className="h-[280px] w-full">
            <ClientOnly>
              <ChartWrapper height="h-full">
                <AreaChart data={TIMELINE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPred" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1A2A3A" />
                  <XAxis dataKey="month" stroke="#445566" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#445566" fontSize={12} tickLine={false} axisLine={false} />
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: "#131B2B", borderColor: "#2A3A4A", borderRadius: "8px", color: "#fff" }}
                  />
                  <Area type="monotone" dataKey="predicted" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorPred)" name="AI Forecast" />
                  <Area type="monotone" dataKey="actual" stroke="#445566" strokeWidth={2} fillOpacity={0} name="Actual Hires" />
                </AreaChart>
              </ChartWrapper>
            </ClientOnly>
          </div>
        </Card>

        {/* KPI Breakdown */}
        <Card padding="lg" className="flex flex-col gap-4">
          <h3 className="text-white font-semibold mb-2">Quarterly Outlook Metrics</h3>

          <Card padding="md">
            <div className="text-[#8899AA] text-xs font-medium uppercase tracking-wider mb-1">Avg Time-to-Fill</div>
            <div className="flex items-end gap-3">
              <span className="text-3xl font-bold text-white">42 <span className="text-sm font-normal text-[#8899AA]">Days</span></span>
              <Badge variant="danger">+4 Days</Badge>
            </div>
          </Card>

          <Card padding="md">
            <div className="text-[#8899AA] text-xs font-medium uppercase tracking-wider mb-1">Offer Acceptance Rate</div>
            <div className="flex items-end gap-3">
              <span className="text-3xl font-bold text-emerald-400">78%</span>
              <Badge variant="success">+2%</Badge>
            </div>
            <p className="text-[10px] text-[#445566] mt-2">Predicted for Q4 based on compensation bands</p>
          </Card>

          <Card padding="md">
            <div className="text-[#8899AA] text-xs font-medium uppercase tracking-wider mb-1">Pipeline Health</div>
            <Badge variant="warning" className="mt-2">Strained (Eng / Product)</Badge>
          </Card>
        </Card>
      </div>

      {/* Requisitions Table */}
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Target size={18} className="text-blue-400" aria-hidden="true" /> Active Requisitions Model
      </h3>
      <Card padding="none">
        <DataTable<ReqRow>
          data={REQS}
          columns={REQ_COLUMNS}
          rowKey={(r) => r.id}
          aria-label="Active requisitions forecast"
        />
      </Card>

      {/* Decorative seeded values (hidden) */}
      <div className="sr-only" aria-hidden="true">
        {CONF_SEEDS.map((v, i) => <span key={i}>{v}</span>)}
      </div>
    </Page>
  );
}
