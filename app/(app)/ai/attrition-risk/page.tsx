"use client";

import { AlertTriangle, TrendingUp, ShieldAlert, Activity, Download } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";
import ChartWrapper from "@/components/ui/ChartWrapper";
import ClientOnly from "@/components/ui/ClientOnly";
import { seededFloats } from "@/lib/random";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  BarChart,
  Bar,
  Cell,
} from "recharts";

// ─── Static data ────────────────────────────────────────────────────────────

const RISK_TREND = [
  { month: "Jul", high: 12, medium: 45 },
  { month: "Aug", high: 15, medium: 42 },
  { month: "Sep", high: 18, medium: 50 },
  { month: "Oct", high: 24, medium: 55 },
  { month: "Nov", high: 32, medium: 60 },
  { month: "Dec", high: 28, medium: 58 },
];

const DEPT_RISK = [
  { name: "Engineering", risk: 85, count: 14, color: "#FF4444" },
  { name: "Sales", risk: 65, count: 8, color: "#FFB800" },
  { name: "Product", risk: 45, count: 3, color: "#FFB800" },
  { name: "Marketing", risk: 25, count: 1, color: "#00E5A0" },
];

interface EmpRow {
  id: number;
  name: string;
  role: string;
  score: number;
  factor: string;
}

const EMPLOYEES: EmpRow[] = [
  { id: 1, name: "Neha Reddy", role: "SDE II", score: 95, factor: "External Offer Identified" },
  { id: 2, name: "Aisha Gupta", role: "SDE II", score: 92, factor: "No promotion (2.5 yrs)" },
  { id: 3, name: "Rahul Sharma", role: "SDE II", score: 88, factor: "Comp below 50th percentile" },
];

// Seeded decorative risk bar widths
const RISK_BARS = seededFloats(7002, EMPLOYEES.length);

const EMP_COLUMNS: Column<EmpRow>[] = [
  {
    key: "employee",
    label: "Employee",
    render: (e) => (
      <div className="flex items-center gap-3">
        <div
          aria-hidden="true"
          className="w-8 h-8 rounded-full bg-[#1A2A3A] flex items-center justify-center text-xs font-medium text-white"
        >
          {e.name.split(" ").map((n) => n[0]).join("")}
        </div>
        <span className="font-medium text-white text-sm">{e.name}</span>
      </div>
    ),
    sortable: true,
    sortValue: (e) => e.name,
  },
  {
    key: "role",
    label: "Role",
    render: (e) => <span className="text-sm text-[#8899AA]">{e.role}</span>,
  },
  {
    key: "score",
    label: "Risk Score",
    align: "center",
    render: (e) => <Badge variant="danger">{e.score}%</Badge>,
    sortable: true,
    sortValue: (e) => e.score,
  },
  {
    key: "factor",
    label: "Primary Factor",
    render: (e) => <span className="text-sm text-[#8899AA]">{e.factor}</span>,
  },
  {
    key: "action",
    label: "",
    align: "right",
    render: (e) => (
      <Button variant="secondary" size="sm" href={`/ai/attrition-risk/${e.id}`}>View Details</Button>
    ),
  },
];

// ─── KPI cards ───────────────────────────────────────────────────────────────

const KPI_CARDS = [
  {
    label: "Critical Risk",
    value: "32",
    unit: "Emp",
    trend: "+4 this week",
    trendVariant: "danger" as const,
    icon: AlertTriangle,
    iconClass: "text-red-400",
    borderClass: "border-red-500/30",
  },
  {
    label: "Estimated Cost",
    value: "₹4.2",
    unit: "Cr",
    trend: "Potential replacement cost",
    trendVariant: "neutral" as const,
    icon: Activity,
    iconClass: "text-amber-400",
    borderClass: "border-[#1A2A3A]",
  },
  {
    label: "Primary Driver",
    value: "Below Market Comp",
    unit: "",
    trend: "Affects 65% of high risks",
    trendVariant: "neutral" as const,
    icon: TrendingUp,
    iconClass: "text-indigo-400",
    borderClass: "border-[#1A2A3A]",
  },
  {
    label: "Model Confidence",
    value: "92%",
    unit: "",
    trend: "Based on historical accuracy",
    trendVariant: "success" as const,
    icon: ShieldAlert,
    iconClass: "text-emerald-400",
    borderClass: "border-[#1A2A3A]",
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function AttritionRiskPage() {
  return (
        <Page
      title="Attrition Risk Intelligence"
      subtitle="Kaarya AI analyzes compensation, tenure, engagement scores, and market trends to predict flight risks before they happen."
      breadcrumbs={[
        { label: "AI", href: "/ai/smart-onboarding" },
        { label: "Attrition Risk" },
      ]}
      maxWidth="1300px"
      actions={
        <>






          <Button variant="secondary" icon={<Download size={14} />}>Export Data</Button>
          <Button variant="danger">View Critical Risks (32)</Button>
        </>
      }
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {KPI_CARDS.map((k) => (
          <Card key={k.label} padding="lg" className={k.borderClass}>
            <div className="flex justify-between items-start mb-4">
              <span className="text-[#8899AA] text-xs font-medium uppercase tracking-wider">{k.label}</span>
              <k.icon size={16} className={k.iconClass} aria-hidden="true" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {k.value}
              {k.unit && <span className="text-lg text-[#8899AA] font-normal ml-1">{k.unit}</span>}
            </div>
            <div className={`text-sm ${k.trendVariant === "danger" ? "text-red-400" : k.trendVariant === "success" ? "text-emerald-400" : "text-[#8899AA]"}`}>
              {k.trendVariant === "danger" && <TrendingUp size={14} className="inline mr-1" aria-hidden="true" />}
              {k.trend}
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Trend Chart */}
        <Card padding="lg" className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-white font-semibold">Predicted Risk Timeline</h3>
              <p className="text-[#8899AA] text-xs mt-1">6-month forecast of employees entering high/medium risk bands</p>
            </div>
          </div>
          <div className="h-[280px] w-full">
            <ClientOnly>
              <ChartWrapper height="h-full">
                <AreaChart data={RISK_TREND} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorMedium" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1A2A3A" />
                  <XAxis dataKey="month" stroke="#445566" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#445566" fontSize={12} tickLine={false} axisLine={false} />
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: "#131B2B", borderColor: "#2A3A4A", borderRadius: "8px", color: "#fff" }}
                  />
                  <Area type="monotone" dataKey="high" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorHigh)" name="High Risk" />
                  <Area type="monotone" dataKey="medium" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorMedium)" name="Medium Risk" />
                </AreaChart>
              </ChartWrapper>
            </ClientOnly>
          </div>
        </Card>

        {/* Risk by Department */}
        <Card padding="lg">
          <div className="mb-6">
            <h3 className="text-white font-semibold">Risk by Department</h3>
            <p className="text-[#8899AA] text-xs mt-1">Concentration of high-risk individuals</p>
          </div>
          <div className="h-[200px]">
            <ClientOnly>
              <ChartWrapper height="h-full">
                <BarChart layout="vertical" data={DEPT_RISK} margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#1A2A3A" />
                  <XAxis type="number" stroke="#445566" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" stroke="#8899AA" fontSize={12} tickLine={false} axisLine={false} width={80} />
                  <RechartsTooltip
                    cursor={{ fill: "#1A2A3A" }}
                    contentStyle={{ backgroundColor: "#131B2B", borderColor: "#2A3A4A", borderRadius: "8px" }}
                  />
                  <Bar dataKey="risk" barSize={12} radius={[0, 4, 4, 0]} name="Risk Index">
                    {DEPT_RISK.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ChartWrapper>
            </ClientOnly>
          </div>
        </Card>
      </div>

      {/* Critical Risk Employees */}
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <AlertTriangle size={18} className="text-red-400" aria-hidden="true" /> Action Required: Critical Risk Employees
      </h3>
      <Card padding="none">
        <DataTable<EmpRow>
          data={EMPLOYEES}
          columns={EMP_COLUMNS}
          rowKey={(e) => e.id}
          aria-label="Critical risk employees"
        />
      </Card>

      {/* Decorative seeded bars (hidden) */}
      <div className="sr-only" aria-hidden="true">
        {RISK_BARS.map((w, i) => <span key={i} style={{ width: `${w * 100}%` }} />)}
      </div>
    

        

        

        </Page>
    );
}
