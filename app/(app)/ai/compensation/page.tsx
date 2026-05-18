"use client";

import { Sparkles, Target, Activity, Filter, ArrowRight, Zap } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";
import ChartWrapper from "@/components/ui/ChartWrapper";
import ClientOnly from "@/components/ui/ClientOnly";
import { seededFloats } from "@/lib/random";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";

// ─── Static data ────────────────────────────────────────────────────────────

const COMP_DATA = [
  { name: "Kavya S.", current: 22, optimal: 28, risk: 85, performance: 4.8 },
  { name: "Rohan M.", current: 28, optimal: 32, risk: 60, performance: 3.9 },
  { name: "Aditi S.", current: 35, optimal: 36, risk: 20, performance: 4.2 },
  { name: "Vikram K.", current: 18, optimal: 25, risk: 95, performance: 4.5 },
  { name: "Sneha R.", current: 42, optimal: 45, risk: 15, performance: 4.9 },
  { name: "Arif N.", current: 25, optimal: 27, risk: 30, performance: 3.5 },
];

interface DeptRow {
  dept: string;
  compaRatio: string;
  genderGap: string;
  budget: string;
  compaVariant: "danger" | "success";
  gapVariant: "success" | "danger";
}

const DEPT_ROWS: DeptRow[] = [
  { dept: "Engineering", compaRatio: "0.82", genderGap: "-0.5%", budget: "₹1.4 Cr", compaVariant: "danger", gapVariant: "success" },
  { dept: "Sales", compaRatio: "1.05", genderGap: "+4.2%", budget: "₹12 L (Equity fix only)", compaVariant: "success", gapVariant: "danger" },
];

const DEPT_COLUMNS: Column<DeptRow>[] = [
  { key: "dept", label: "Department", render: (d) => <span className="text-sm font-medium text-white">{d.dept}</span> },
  {
    key: "compaRatio",
    label: "Avg Compa-Ratio",
    render: (d) => <Badge variant={d.compaVariant}>{d.compaRatio}</Badge>,
  },
  {
    key: "genderGap",
    label: "Gender Pay Gap (Adjusted)",
    align: "center",
    render: (d) => <Badge variant={d.gapVariant}>{d.genderGap}</Badge>,
  },
  { key: "budget", label: "Budget Required to Target", render: (d) => <span className="text-sm text-white">{d.budget}</span> },
];

// Seeded decorative sparkline values
const SPARKLINE = seededFloats(7004, 8);

// ─── Page ────────────────────────────────────────────────────────────────────

export default function CompensationIntelligencePage() {
  return (
    <Page
      title="Compensation Intelligence"
      subtitle="AI-optimized total rewards structuring. Predicts the ideal mix of base, bonus, and ESOPs to maximize retention while minimizing cash burn."
      breadcrumbs={[
        { label: "AI", href: "/ai/smart-onboarding" },
        { label: "Compensation" },
      ]}
      maxWidth="1300px"
      actions={
        <>
          <Button variant="secondary" icon={<Filter size={14} />}>Global Market Sync</Button>
          <Button icon={<Zap size={14} />}>Run Appraisals Bot</Button>
        </>
      }
    >
      {/* Smart Summary */}
      <Card padding="lg" className="mb-6 border-indigo-500/20">
        <div className="flex items-start gap-4">
          <div className="bg-indigo-500/20 p-3 rounded-xl border border-indigo-500/30 shrink-0">
            <Sparkles size={24} className="text-indigo-400" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Total Rewards Optimization (Q4 Cycle)</h3>
            <p className="text-[#8899AA] text-sm leading-relaxed mb-4 max-w-3xl">
              The AI model recommends shifting <strong className="text-white">12% of the upcoming cash bonus pool to RSUs</strong> for top-quartile engineers. This reduces immediate cash outlays by ₹1.2Cr while maintaining a 94% retention probability.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="info"><Activity size={12} aria-hidden="true" className="inline mr-1" />Cash Conservation: ₹1.2Cr</Badge>
              <Badge variant="success"><Target size={12} aria-hidden="true" className="inline mr-1" />Retention Prob: 94%</Badge>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Scatter Plot */}
        <Card padding="lg" className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-white font-semibold">Pay vs. Performance Matrix</h3>
              <p className="text-[#8899AA] text-xs mt-1">Bubble size = Attrition Risk. Target: Top-Right, small bubbles.</p>
            </div>
            <div className="flex gap-4">
              <span className="flex items-center gap-2 text-xs text-[#8899AA]">
                <span className="w-3 h-3 rounded-full bg-red-400" aria-hidden="true" /> High Risk
              </span>
              <span className="flex items-center gap-2 text-xs text-[#8899AA]">
                <span className="w-3 h-3 rounded-full bg-indigo-500" aria-hidden="true" /> Low Risk
              </span>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ClientOnly>
              <ChartWrapper height="h-full">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" />
                  <XAxis type="number" dataKey="performance" name="Performance Score" domain={[0, 5]} stroke="#445566" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis type="number" dataKey="current" name="Current Comp (LPA)" domain={[0, 60]} stroke="#445566" fontSize={12} tickLine={false} axisLine={false} />
                  <ZAxis type="number" dataKey="risk" range={[50, 400]} name="Attrition Risk" />
                  <RechartsTooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    contentStyle={{ backgroundColor: "#131B2B", borderColor: "#2A3A4A", borderRadius: "8px", color: "#fff" }}
                    formatter={(val: unknown) => [`₹${val}L`, "Comp (LPA)"]}
                  />
                  <Scatter name="Employees" data={COMP_DATA}>
                    {COMP_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.risk > 70 ? "#ef4444" : "#6366f1"} fillOpacity={0.7} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ChartWrapper>
            </ClientOnly>
          </div>
        </Card>

        {/* AI Pay Structuring */}
        <Card padding="none" className="flex flex-col">
          <div className="px-6 py-5 border-b border-[#1A2A3A] bg-[#0A1420]">
            <h3 className="text-white font-semibold">AI Pay Structuring</h3>
            <p className="text-xs text-[#8899AA] mt-1">Recommended specific adjustments</p>
          </div>
          <div className="p-6 space-y-4 flex-1">
            <Card padding="md" className="border-red-500/30">
              <h4 className="text-white font-medium text-sm mb-1">Flight Risk: Vikram K.</h4>
              <p className="text-xs text-[#8899AA] mb-3">High performer (4.5) significantly underpaid vs market median. 95% attrition risk within 60 days.</p>
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="text-white">Current: ₹18L</span>
                <ArrowRight size={14} className="text-[#445566]" aria-hidden="true" />
                <span className="text-emerald-400 font-bold">Optimal: ₹25L</span>
              </div>
              <Button variant="danger" size="sm" className="w-full">Propose Mid-Cycle Hike</Button>
            </Card>

            <Card padding="md" className="border-indigo-500/30">
              <h4 className="text-white font-medium text-sm mb-1">ESOP structuring: L4 Engineering</h4>
              <p className="text-xs text-[#8899AA] mb-3">Instead of standard 10% cash bonus, model suggests offering $10k RSUs vesting over 2 years for top 20%.</p>
              <Button variant="secondary" size="sm" className="w-full">View RSU Impact Model</Button>
            </Card>
          </div>
        </Card>
      </div>

      {/* Departmental Pay Equity */}
      <Card padding="none">
        <div className="px-6 py-4 border-b border-[#1A2A3A] bg-[#0A1420] flex justify-between items-center">
          <h3 className="text-sm font-semibold text-white">Departmental Pay Equity Model</h3>
          <Button variant="secondary" size="sm">Export Analysis</Button>
        </div>
        <DataTable<DeptRow>
          data={DEPT_ROWS}
          columns={DEPT_COLUMNS}
          rowKey={(d) => d.dept}
          aria-label="Departmental pay equity model"
        />
      </Card>

      {/* Decorative seeded sparkline (hidden) */}
      <div className="sr-only" aria-hidden="true">
        {SPARKLINE.map((v, i) => <span key={i}>{v}</span>)}
      </div>
    </Page>
  );
}
