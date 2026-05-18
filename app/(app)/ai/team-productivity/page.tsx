"use client";

import { Sparkles, TrendingUp, TrendingDown, Users, Filter } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";
import ChartWrapper from "@/components/ui/ChartWrapper";
import ClientOnly from "@/components/ui/ClientOnly";
import { seededFloats } from "@/lib/random";
import { XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, LineChart, Line } from "recharts";

// ─── Static data ────────────────────────────────────────────────────────────

const PRODUCTIVITY_TREND = [
  { week: "W40", eng: 88, sales: 92, ops: 78 },
  { week: "W41", eng: 92, sales: 88, ops: 82 },
  { week: "W42", eng: 85, sales: 95, ops: 85 },
  { week: "W43", eng: 90, sales: 91, ops: 88 },
  { week: "W44", eng: 95, sales: 87, ops: 86 },
  { week: "W45", eng: 82, sales: 85, ops: 80 },
];

interface TeamRow {
  id: string;
  dept: string;
  nvi: number;
  trend: number;
  friction: string;
}

const TEAMS: TeamRow[] = [
  { id: "eng", dept: "Engineering", nvi: 82, trend: -13, friction: "High meeting load (18hrs/wk)" },
  { id: "sales", dept: "Sales", nvi: 85, trend: -2, friction: "CRM update lag" },
  { id: "ops", dept: "Operations", nvi: 80, trend: -6, friction: "Cross-timezone blocker" },
];

// Seeded decorative NVI bar widths
const NVI_SEEDS = seededFloats(7012, TEAMS.length);

const TEAM_COLUMNS: Column<TeamRow>[] = [
  {
    key: "dept",
    label: "Department",
    render: (t) => <div className="text-sm font-medium text-white">{t.dept}</div>,
    sortable: true,
    sortValue: (t) => t.dept,
  },
  {
    key: "nvi",
    label: "Current NVI",
    render: (t, i) => (
      <div className="flex items-center gap-2">
        <div
          role="progressbar"
          aria-valuenow={t.nvi}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${t.dept} NVI`}
          className="w-16 bg-[#1A2A3A] h-1.5 rounded-full overflow-hidden"
        >
          <div
            className="bg-emerald-500 h-full"
            style={{ width: `${NVI_SEEDS[i] !== undefined ? t.nvi : t.nvi}%` }}
          />
        </div>
        <span className="text-sm text-white font-medium">{t.nvi}</span>
      </div>
    ),
    sortable: true,
    sortValue: (t) => t.nvi,
  },
  {
    key: "trend",
    label: "WoW Change",
    render: (t) => (
      <span className={`flex items-center gap-1.5 text-xs font-medium ${t.trend > 0 ? "text-emerald-400" : "text-red-400"}`}>
        {t.trend > 0 ? <TrendingUp size={14} aria-hidden="true" /> : <TrendingDown size={14} aria-hidden="true" />}
        {Math.abs(t.trend)}%
      </span>
    ),
  },
  {
    key: "friction",
    label: "Friction Point identified by AI",
    render: (t) => <span className="text-sm text-[#8899AA]">{t.friction}</span>,
  },
  {
    key: "action",
    label: "",
    align: "right",
    render: (t) => (
      <Button variant="secondary" size="sm" href={`/ai/team-productivity/${t.id}`}>Analyze</Button>
    ),
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function TeamProductivityPage() {
  return (
    <Page
      title="AI Productivity Analytics"
      subtitle="Correlates OKR completion, collaboration metadata, and commit frequency to provide non-invasive team velocity insights."
      breadcrumbs={[
        { label: "AI", href: "/ai/smart-onboarding" },
        { label: "Team Productivity" },
      ]}
      maxWidth="1300px"
      actions={
        <Button variant="secondary" icon={<Filter size={14} />}>Adjust AI Weights</Button>
      }
    >
      {/* Smart Summary */}
      <Card padding="lg" className="mb-6 border-emerald-500/20">
        <div className="flex items-start gap-4">
          <div className="bg-emerald-500/20 p-3 rounded-xl border border-emerald-500/30 shrink-0">
            <Sparkles size={24} className="text-emerald-400" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Kaarya Velocity Synthesis</h3>
            <p className="text-[#8899AA] text-sm leading-relaxed mb-4 max-w-3xl">
              Overall company velocity dropped by <strong className="text-red-400">8%</strong> in W45. This correlates strongly with a <strong className="text-amber-400">42% increase in cross-departmental meetings</strong> involving Engineering and Product. Reducing sync meetings by 2 hrs/week could restore velocity targets.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="danger"><TrendingDown size={12} aria-hidden="true" className="inline mr-1" />Eng Velocity -14%</Badge>
              <Badge variant="success"><TrendingUp size={12} aria-hidden="true" className="inline mr-1" />Ops Efficiency +5%</Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Main Trend Chart */}
      <Card padding="lg" className="mb-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-white font-semibold">Normalized Velocity Index (NVI)</h3>
            <p className="text-[#8899AA] text-xs mt-1">Multi-variate index tracking output vs historical baselines</p>
          </div>
          <div className="flex gap-4">
            <span className="flex items-center gap-2 text-xs text-[#8899AA]">
              <span className="w-3 h-3 rounded-full bg-blue-500" aria-hidden="true" /> Eng
            </span>
            <span className="flex items-center gap-2 text-xs text-[#8899AA]">
              <span className="w-3 h-3 rounded-full bg-emerald-500" aria-hidden="true" /> Sales
            </span>
            <span className="flex items-center gap-2 text-xs text-[#8899AA]">
              <span className="w-3 h-3 rounded-full bg-amber-500" aria-hidden="true" /> Ops
            </span>
          </div>
        </div>
        <div className="h-[300px] w-full">
          <ClientOnly>
            <ChartWrapper height="h-full">
              <LineChart data={PRODUCTIVITY_TREND} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1A2A3A" />
                <XAxis dataKey="week" stroke="#445566" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#445566" fontSize={12} tickLine={false} axisLine={false} domain={[60, 100]} />
                <RechartsTooltip
                  contentStyle={{ backgroundColor: "#131B2B", borderColor: "#2A3A4A", borderRadius: "8px", color: "#fff" }}
                />
                <Line type="monotone" dataKey="eng" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: "#0D1928", strokeWidth: 2 }} name="Engineering" />
                <Line type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: "#0D1928", strokeWidth: 2 }} name="Sales" />
                <Line type="monotone" dataKey="ops" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, fill: "#0D1928", strokeWidth: 2 }} name="Operations" />
              </LineChart>
            </ChartWrapper>
          </ClientOnly>
        </div>
      </Card>

      {/* Team Breakdown */}
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Users size={18} className="text-[#8899AA]" aria-hidden="true" /> Department Deep Dive
      </h3>
      <Card padding="none">
        <DataTable<TeamRow>
          data={TEAMS}
          columns={TEAM_COLUMNS}
          rowKey={(t) => t.id}
          aria-label="Team productivity breakdown"
        />
      </Card>

      {/* Decorative seeded values (hidden) */}
      <div className="sr-only" aria-hidden="true">
        {NVI_SEEDS.map((v, i) => <span key={i}>{v}</span>)}
      </div>
    </Page>
  );
}
