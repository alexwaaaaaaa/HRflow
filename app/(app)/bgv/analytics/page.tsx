"use client";

import { Target, Users, AlertTriangle, ChevronDown } from "lucide-react";
import { Bar, XAxis, YAxis, CartesianGrid, Tooltip, ComposedChart, Line } from "recharts";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import ChartWrapper from "@/components/ui/ChartWrapper";
import { seededFloats } from "@/lib/random";

const SLA_DATA = [
  { name: "Identity", target: 95, actual: 98 },
  { name: "Address", target: 90, actual: 85 },
  { name: "Education", target: 85, actual: 88 },
  { name: "Employment", target: 80, actual: 75 },
  { name: "Criminal", target: 99, actual: 100 },
];

const DISCREPANCY_REASONS = [
  { name: "Fake University/Course", count: 45 },
  { name: "Tenure Mismatch > 3 Months", count: 32 },
  { name: "Address Untraceable", count: 28 },
  { name: "Designation Mismatch", count: 18 },
  { name: "Fake Experience Letter", count: 12 },
];

const METRIC_PALETTE = {
  green: { border: "border-l-[#00E5A0]", text: "text-[#00E5A0]" },
  amber: { border: "border-l-amber-500", text: "text-amber-500" },
  blue: { border: "border-l-[#0066FF]", text: "text-[#0066FF]" },
  rose: { border: "border-l-rose-500", text: "text-rose-500" },
} as const;

const _barWidths = seededFloats(42, 5);

interface MetricCardProps {
  title: string;
  value: string;
  target: string;
  icon: React.ReactNode;
  palette: keyof typeof METRIC_PALETTE;
}

function MetricCard({ title, value, target, icon, palette }: MetricCardProps) {
  const p = METRIC_PALETTE[palette];
  return (
    <div
      className={`rounded-r-xl rounded-l-sm border-y border-r border-y-[#1A2A3A] border-r-[#1A2A3A] border-l-4 bg-[#0A1420] p-5 shadow-lg ${p.border}`}
    >
      <div className="mb-2 flex items-start justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#8899AA]">{title}</h3>
        <span className={p.text} aria-hidden="true">{icon}</span>
      </div>
      <div className="mb-1 text-3xl font-black text-white">{value}</div>
      <div className="text-xs text-[#556677]">
        Target: <span className="font-semibold">{target}</span>
      </div>
    </div>
  );
}

export default function BGVAnalyticsPage() {
  return (
    <Page
      title="BGV Analytics"
      subtitle="Insights into verification turnarounds, pass rates, and vendor SLAs."
      breadcrumbs={[
        { label: "BGV", href: "/bgv/dashboard" },
        { label: "Analytics" },
      ]}
      maxWidth="1300px"
      actions={
        <Button variant="secondary" icon={<ChevronDown size={14} aria-hidden="true" />}>
          Last 90 Days
        </Button>
      }
    >
      <div className="space-y-6">
        {/* KPI strip */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Overall Pass Rate"
            value="92.4%"
            target="95%"
            icon={<Users size={24} />}
            palette="green"
          />
          <MetricCard
            title="Avg Discrepancy Rate"
            value="6.8%"
            target="< 5%"
            icon={<AlertTriangle size={24} />}
            palette="amber"
          />
          <MetricCard
            title="Global SLA Adherence"
            value="88.2%"
            target="90%"
            icon={<Target size={24} />}
            palette="blue"
          />
          <MetricCard
            title="Candidate Drop-off"
            value="3.1%"
            target="< 5%"
            icon={<Users size={24} />}
            palette="rose"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card padding="lg">
            <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">
              SLA Adherence by Check Type
            </h3>
            <div className="h-64">
              <ChartWrapper height="h-full">
                <ComposedChart data={SLA_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                  <XAxis
                    dataKey="name"
                    stroke="#556677"
                    tick={{ fill: "#8899AA", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="#556677"
                    tick={{ fill: "#8899AA", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    domain={[0, 100]}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#0D1928", borderColor: "#1A2A3A", borderRadius: "8px" }}
                    itemStyle={{ color: "#fff" }}
                    cursor={{ fill: "#1A2A3A", opacity: 0.4 }}
                  />
                  <Bar dataKey="actual" fill="#0066FF" radius={[4, 4, 0, 0]} name="Actual %" barSize={40} />
                  <Line
                    type="stepAfter"
                    dataKey="target"
                    stroke="#00E5A0"
                    strokeWidth={3}
                    dot={false}
                    name="Target %"
                  />
                </ComposedChart>
              </ChartWrapper>
            </div>
          </Card>

          <Card padding="lg">
            <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">
              Top Discrepancy Reasons
            </h3>
            <div className="flex-1 space-y-4">
              {DISCREPANCY_REASONS.map((reason) => (
                <div key={reason.name}>
                  <div className="mb-1.5 flex justify-between text-xs">
                    <span className="font-medium text-slate-300">{reason.name}</span>
                    <span className="font-bold text-white">{reason.count} cases</span>
                  </div>
                  <div
                    className="h-2.5 w-full overflow-hidden rounded-full bg-[#1A2A3A]"
                    role="progressbar"
                    aria-valuenow={reason.count}
                    aria-valuemin={0}
                    aria-valuemax={45}
                    aria-label={reason.name}
                  >
                    <div
                      className="h-full rounded-full bg-amber-500"
                      style={{ width: `${(reason.count / 45) * 100}%` }}
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
