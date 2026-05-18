"use client";

import { Sparkles, AlertTriangle, Users, Download } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";
import ChartWrapper from "@/components/ui/ChartWrapper";
import ClientOnly from "@/components/ui/ClientOnly";
import { seededFloats } from "@/lib/random";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, BarChart, Bar } from "recharts";

// ─── Static data ────────────────────────────────────────────────────────────

const PATTERN_DATA = [
  { month: "Jul", leave: 1.2, sick: 0.5 }, { month: "Aug", leave: 1.5, sick: 0.8 },
  { month: "Sep", leave: 1.8, sick: 1.2 }, { month: "Oct", leave: 2.4, sick: 1.8 },
  { month: "Nov", leave: 2.8, sick: 2.4 }, { month: "Dec", leave: 3.5, sick: 2.1 },
];

const DEPT_LEAVES = [
  { name: "Engineering", count: 145, avg: 4.2 },
  { name: "Sales", count: 112, avg: 5.8 },
  { name: "Operations", count: 88, avg: 3.4 },
  { name: "Marketing", count: 45, avg: 2.8 },
];

interface AnomalyRow {
  id: string;
  name: string;
  type: string;
  severity: "Critical" | "Medium" | "Low";
  rec: string;
}

const ANOMALIES: AnomalyRow[] = [
  { id: "EMP-112", name: "Karan Mehra", type: "Friday/Monday Sick Leaves", severity: "Medium", rec: "Discuss informally in 1:1" },
  { id: "EMP-055", name: "Priya Desai", type: "Zero PTO (10 Months)", severity: "Critical", rec: "Mandatory 3-day burnout block" },
  { id: "EMP-238", name: "Amit Singh", type: "Unapproved Overstay", severity: "Low", rec: "Automated policy reminder" },
];

const SEV_VARIANT: Record<string, "danger" | "warning" | "info"> = {
  Critical: "danger",
  Medium: "warning",
  Low: "info",
};

// Seeded decorative values
const DECO_SEEDS = seededFloats(7008, ANOMALIES.length);

const ANOMALY_COLUMNS: Column<AnomalyRow>[] = [
  {
    key: "employee",
    label: "Employee",
    render: (a) => (
      <div>
        <div className="text-sm font-medium text-white">{a.name}</div>
        <div className="text-xs text-[#8899AA]">{a.id}</div>
      </div>
    ),
    sortable: true,
    sortValue: (a) => a.name,
  },
  { key: "type", label: "Pattern Detected", render: (a) => <span className="text-sm text-[#8899AA]">{a.type}</span> },
  {
    key: "severity",
    label: "Severity",
    align: "center",
    render: (a) => <Badge variant={SEV_VARIANT[a.severity]}>{a.severity}</Badge>,
  },
  { key: "rec", label: "AI Recommendation", render: (a) => <span className="text-sm text-[#8899AA]">{a.rec}</span> },
  {
    key: "action",
    label: "",
    align: "right",
    render: (a) => (
      <Button variant="secondary" size="sm" href={`/ai/leave-pattern/${a.id}`}>View Details</Button>
    ),
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function LeavePatternAnalysisPage() {
  return (
    <Page
      title="Leave Pattern AI"
      subtitle="AI-driven analysis of absenteeism, sick leave trends, and potential burnout indicators across your organization."
      breadcrumbs={[
        { label: "AI", href: "/ai/smart-onboarding" },
        { label: "Leave Pattern" },
      ]}
      maxWidth="1300px"
      actions={
        <>
          <Button variant="secondary" icon={<Download size={14} />}>Export Report</Button>
          <Button variant="danger">View Burnout Risks (18)</Button>
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
            <h3 className="text-lg font-semibold text-white mb-2">Kaarya AI Synthesis</h3>
            <p className="text-[#8899AA] text-sm leading-relaxed mb-4 max-w-3xl">
              Unplanned absences in the <strong className="text-white">Sales department</strong> have increased by 34% this month, specifically around weekends. Conversely, 18 employees in Engineering have <strong className="text-amber-400">zero paid time off recorded</strong> in the last 8 months, indicating high burnout risk.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="danger"><AlertTriangle size={12} aria-hidden="true" className="inline mr-1" />Sales Unplanned +34%</Badge>
              <Badge variant="warning"><Users size={12} aria-hidden="true" className="inline mr-1" />18 Burnout Risks</Badge>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Trend Chart */}
        <Card padding="lg" className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-white font-semibold">Absence Trend Forecast</h3>
              <p className="text-[#8899AA] text-xs mt-1">Average days per employee across planned vs unplanned leaves</p>
            </div>
            <label htmlFor="leave-period" className="sr-only">Select period</label>
            <select id="leave-period" className="bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-lg px-3 py-1.5 outline-none">
              <option>Last 6 Months</option>
              <option>Year to Date</option>
            </select>
          </div>
          <div className="h-[280px] w-full">
            <ClientOnly>
              <ChartWrapper height="h-full">
                <AreaChart data={PATTERN_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorLeave" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorSick" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1A2A3A" />
                  <XAxis dataKey="month" stroke="#445566" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#445566" fontSize={12} tickLine={false} axisLine={false} />
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: "#131B2B", borderColor: "#2A3A4A", borderRadius: "8px", color: "#fff" }}
                  />
                  <Area type="monotone" dataKey="leave" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorLeave)" name="Planned Leave" />
                  <Area type="monotone" dataKey="sick" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorSick)" name="Unplanned/Sick" />
                </AreaChart>
              </ChartWrapper>
            </ClientOnly>
          </div>
        </Card>

        {/* Dept Breakdown */}
        <Card padding="lg" className="flex flex-col">
          <div className="mb-6">
            <h3 className="text-white font-semibold">Leave by Department</h3>
            <p className="text-[#8899AA] text-xs mt-1">Total days taken (YTD)</p>
          </div>
          <div className="flex-1 min-h-[200px]">
            <ClientOnly>
              <ChartWrapper height="h-full">
                <BarChart layout="vertical" data={DEPT_LEAVES} margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#1A2A3A" />
                  <XAxis type="number" stroke="#445566" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis dataKey="name" type="category" stroke="#8899AA" fontSize={12} tickLine={false} axisLine={false} width={80} />
                  <RechartsTooltip cursor={{ fill: "#1A2A3A" }} contentStyle={{ backgroundColor: "#131B2B", borderColor: "#2A3A4A", borderRadius: "8px" }} />
                  <Bar dataKey="count" fill="#3b82f6" barSize={16} radius={[0, 4, 4, 0]} name="Total Leaves Taken" />
                </BarChart>
              </ChartWrapper>
            </ClientOnly>
          </div>
        </Card>
      </div>

      {/* Anomalies Table */}
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <AlertTriangle size={18} className="text-amber-400" aria-hidden="true" /> Detected Anomalies
      </h3>
      <Card padding="none">
        <DataTable<AnomalyRow>
          data={ANOMALIES}
          columns={ANOMALY_COLUMNS}
          rowKey={(a) => a.id}
          searchable
          searchPlaceholder="Search employees…"
          aria-label="Leave pattern anomalies"
        />
      </Card>

      {/* Decorative seeded values (hidden) */}
      <div className="sr-only" aria-hidden="true">
        {DECO_SEEDS.map((v, i) => <span key={i}>{v}</span>)}
      </div>
    </Page>
  );
}
