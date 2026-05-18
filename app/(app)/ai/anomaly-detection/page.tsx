"use client";

import { useState } from "react";
import { Sparkles, AlertTriangle, ShieldCheck, RefreshCcw, Bell } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";
import ChartWrapper from "@/components/ui/ChartWrapper";
import ClientOnly from "@/components/ui/ClientOnly";
import { seededFloats } from "@/lib/random";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  ZAxis,
  Tooltip as RechartsTooltip,
  Cell,
} from "recharts";

// ─── Static data ────────────────────────────────────────────────────────────

const SCATTER_DATA = [
  { x: 20, y: 30, z: 200, category: "Payroll", severity: "Medium", label: "Overtime Spike" },
  { x: 80, y: 75, z: 400, category: "Compliance", severity: "Critical", label: "Missing KYC" },
  { x: 45, y: 85, z: 300, category: "Expense", severity: "High", label: "Duplicate Claim" },
  { x: 15, y: 65, z: 150, category: "Attendance", severity: "Low", label: "Proxy Login" },
  { x: 60, y: 20, z: 250, category: "Expense", severity: "Medium", label: "Off-policy Flight" },
  { x: 75, y: 40, z: 350, category: "Payroll", severity: "High", label: "Tax Calculation Error" },
  { x: 30, y: 90, z: 500, category: "Compliance", severity: "Critical", label: "Expired Visa" },
];

const SEVERITY_COLORS: Record<string, string> = {
  Critical: "#FF4444",
  High: "#FFB800",
  Medium: "#3b82f6",
  Low: "#8899AA",
};

const SEVERITY_VARIANT: Record<string, "danger" | "warning" | "info" | "neutral"> = {
  Critical: "danger",
  High: "warning",
  Medium: "info",
  Low: "neutral",
};

interface AlertRow {
  id: string;
  cat: string;
  desc: string;
  sev: "Critical" | "High" | "Medium";
  conf: number;
}

const ALERTS: AlertRow[] = [
  { id: "ANM-902", cat: "Compliance", desc: "Expired Visas for 3 active contractors", sev: "Critical", conf: 99 },
  { id: "ANM-891", cat: "Payroll", desc: "Tax calculation standard deviation > 3σ vs historical", sev: "High", conf: 94 },
  { id: "ANM-870", cat: "Expense", desc: "Duplicate claims submitted across consecutive months", sev: "Medium", conf: 88 },
];

// Stable confidence bar widths derived from seededFloats
const CONF_WIDTHS = seededFloats(7001, ALERTS.length);

const ALERT_COLUMNS: Column<AlertRow>[] = [
  {
    key: "id",
    label: "Alert ID",
    render: (a) => <span className="font-mono text-sm text-white">{a.id}</span>,
    sortable: true,
    sortValue: (a) => a.id,
  },
  {
    key: "cat",
    label: "Category",
    render: (a) => <span className="text-sm text-[#8899AA]">{a.cat}</span>,
  },
  {
    key: "desc",
    label: "Description",
    render: (a) => <span className="text-sm text-[#8899AA]">{a.desc}</span>,
  },
  {
    key: "sev",
    label: "Severity",
    align: "center",
    render: (a) => <Badge variant={SEVERITY_VARIANT[a.sev]}>{a.sev}</Badge>,
  },
  {
    key: "conf",
    label: "Confidence",
    align: "center",
    render: (a) => <span className="text-sm font-mono text-emerald-400">{a.conf}%</span>,
  },
  {
    key: "action",
    label: "",
    align: "right",
    render: (a) => (
      <Button variant="secondary" size="sm" href={`/ai/anomaly-detection/${a.id}`}>Investigate</Button>
    ),
  },
];

// ─── Category status cards ───────────────────────────────────────────────────

const CATEGORY_CARDS = [
  { label: "Compliance", count: 3, variant: "danger" as const, borderClass: "border-red-500/20" },
  { label: "Payroll", count: 8, variant: "warning" as const, borderClass: "border-amber-500/20" },
  { label: "Expenses", count: 14, variant: "info" as const, borderClass: "border-blue-500/20" },
  { label: "Time & Attendance", count: 5, variant: "neutral" as const, borderClass: "border-[#2A3A4A]" },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function AnomalyDetectionPage() {
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  const filteredData = filterCategory
    ? SCATTER_DATA.filter((d) => d.category === filterCategory)
    : SCATTER_DATA;

  return (
    <Page
      title="Variance & Anomaly Detection"
      subtitle="Real-time AI monitoring of continuous HR operations to flag statistical variances across payroll, expenses, and compliance."
      breadcrumbs={[
        { label: "AI", href: "/ai/smart-onboarding" },
        { label: "Anomaly Detection" },
      ]}
      maxWidth="1300px"
      actions={
        <>
          <Button variant="secondary" icon={<RefreshCcw size={14} />}>Refresh Model</Button>
          <Button variant="danger" icon={<Bell size={14} />}>Alert Settings</Button>
        </>
      }
    >
      {/* Smart Summary */}
      <Card padding="lg" className="mb-6 border-red-500/20">
        <div className="flex items-start gap-4">
          <div className="bg-red-500/20 p-3 rounded-xl border border-red-500/30 shrink-0">
            <Sparkles size={24} className="text-red-400" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Kaarya Security Context</h3>
            <p className="text-[#8899AA] text-sm leading-relaxed mb-4 max-w-3xl">
              Detected <strong className="text-red-400">2 Critical anomalies</strong> in the last 24 hours requiring immediate intervention. The primary issue concerns expired Right-to-Work documentation for 3 active contractors.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="danger" dot><AlertTriangle size={12} aria-hidden="true" className="inline mr-1" />2 Critical</Badge>
              <Badge variant="warning" dot><ShieldCheck size={12} aria-hidden="true" className="inline mr-1" />12 High Risk</Badge>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Scatter Plot */}
        <Card padding="lg" className="lg:col-span-2">
          <div className="flex flex-wrap justify-between items-center mb-6 gap-3">
            <div>
              <h3 className="text-white font-semibold">Anomaly Topography</h3>
              <p className="text-[#8899AA] text-xs mt-1">Variance clustering by volume and financial impact</p>
            </div>
            <div className="flex gap-2" role="group" aria-label="Filter by category">
              {["All", "Compliance", "Payroll", "Expense"].map((cat) => {
                const active = filterCategory === cat || (cat === "All" && !filterCategory);
                return (
                  <Button
                    key={cat}
                    variant={active ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setFilterCategory(cat === "All" ? null : cat)}
                    aria-pressed={active}
                  >
                    {cat}
                  </Button>
                );
              })}
            </div>
          </div>
          <div className="h-[320px] w-full">
            <ClientOnly>
              <ChartWrapper height="h-full">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" />
                  <XAxis type="number" dataKey="x" name="Frequency" hide />
                  <YAxis type="number" dataKey="y" name="Impact" hide />
                  <ZAxis type="number" dataKey="z" range={[50, 400]} name="Volume" />
                  <RechartsTooltip
                    cursor={{ strokeDasharray: "3 3", stroke: "#2A3A4A" }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0]?.payload as (typeof SCATTER_DATA)[0];
                        return (
                          <div className="bg-[#131B2B] border border-[#2A3A4A] p-3 rounded-lg shadow-xl">
                            <p className="text-white text-sm font-semibold mb-1">{data.label}</p>
                            <p className="text-[#8899AA] text-xs mb-1">Type: {data.category}</p>
                            <p className="text-xs" style={{ color: SEVERITY_COLORS[data.severity] }}>
                              Risk: {data.severity}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Scatter name="Anomalies" data={filteredData}>
                    {filteredData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={SEVERITY_COLORS[entry.severity] ?? "#8899AA"}
                        fillOpacity={0.6}
                      />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ChartWrapper>
            </ClientOnly>
          </div>
        </Card>

        {/* Category Status */}
        <Card padding="lg">
          <h3 className="text-white font-semibold mb-4">Category Status</h3>
          <div className="space-y-3">
            {CATEGORY_CARDS.map((c) => (
              <div key={c.label} className={`bg-[#131B2B] p-4 rounded-xl border ${c.borderClass}`}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-white text-sm font-medium">{c.label}</span>
                  <Badge variant={c.variant}>{c.count} active</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Alert Queue */}
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <AlertTriangle size={18} className="text-red-400" aria-hidden="true" /> Active Alert Queue
      </h3>
      <Card padding="none">
        <DataTable<AlertRow>
          data={ALERTS}
          columns={ALERT_COLUMNS}
          rowKey={(a) => a.id}
          searchable
          searchPlaceholder="Search ID or description…"
          aria-label="Active anomaly alerts"
        />
      </Card>

      {/* Decorative confidence bars (seeded) */}
      <div className="sr-only" aria-hidden="true">
        {CONF_WIDTHS.map((w, i) => (
          <span key={i} style={{ width: `${w * 100}%` }} />
        ))}
      </div>
    </Page>
  );
}
