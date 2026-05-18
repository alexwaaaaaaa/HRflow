"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell, ResponsiveContainer } from "recharts";
import { Tooltip as RechartsTooltip } from "recharts";
import ChartWrapper from "@/components/ui/ChartWrapper";
import ClientOnly from "@/components/ui/ClientOnly";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const BELL_DATA = [
  { band: "U (1)", count: 8, pct: 1.6, target: 10, color: "#FF4444" },
  { band: "NI (2)", count: 24, pct: 4.7, target: 20, color: "#FF8C00" },
  { band: "ME (3)", count: 198, pct: 38.7, target: 40, color: "#FFB800" },
  { band: "EE (4)", count: 187, pct: 36.5, target: 20, color: "#0066FF" },
  { band: "E (5)", count: 95, pct: 18.6, target: 10, color: "#00E5A0" },
];

const DEPT_DIST = [
  { dept: "Engineering", E: 12, EE: 45, ME: 60, NI: 8, U: 2 },
  { dept: "Sales", E: 18, EE: 32, ME: 40, NI: 5, U: 1 },
  { dept: "HR", E: 5, EE: 12, ME: 20, NI: 3, U: 0 },
  { dept: "Finance", E: 4, EE: 18, ME: 28, NI: 4, U: 2 },
  { dept: "Marketing", E: 6, EE: 14, ME: 22, NI: 2, U: 0 },
];

const BAND_VARIANT_MAP = {
  "U (1)": "danger",
  "NI (2)": "warning",
  "ME (3)": "warning",
  "EE (4)": "info",
  "E (5)": "success",
} as const;

export default function BellCurve() {
  const total = BELL_DATA.reduce((s, b) => s + b.count, 0);

  return (
    <Page
      title="Bell Curve Visualization"
      subtitle={`Rating distribution across ${total} employees · FY 2024–25`}
      breadcrumbs={[
        { label: "Performance", href: "/performance/dashboard" },
        { label: "Bell Curve" },
      ]}
      maxWidth="1300px"
    >
      {/* Summary KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
        {BELL_DATA.map((b) => {
          const variance = b.pct - b.target;
          return (
            <Card key={b.band} padding="md">
              <div className="text-2xl font-bold mb-0.5" style={{ color: b.color }}>
                {b.count}
              </div>
              <div className="text-xs text-white font-medium mb-0.5">{b.band.split(" ")[0]}</div>
              <div className="text-[10px] text-[#8899AA]">{b.pct.toFixed(1)}% of org</div>
              <div
                className={`text-[10px] mt-0.5 ${variance > 0 ? "text-[#FF4444]" : variance < 0 ? "text-[#00E5A0]" : "text-[#445566]"}`}
              >
                Target: {b.target}% ({variance > 0 ? `+${variance.toFixed(1)}%` : `${variance.toFixed(1)}%`})
              </div>
            </Card>
          );
        })}
      </div>

      {/* Main Bell Curve */}
      <Card padding="lg" className="mb-6">
        <h2 className="font-semibold mb-4 text-white">Organisation-wide Distribution</h2>
        <div className="h-[300px]">
          <ClientOnly>
            <ChartWrapper height="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={BELL_DATA} barSize={60}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                  <XAxis dataKey="band" axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 11 }} />
                  <RechartsTooltip
                    contentStyle={{ background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8 }}
                    formatter={(v, n) => [v, n === "count" ? "Employees" : "Target %"]}
                  />
                  <Bar
                    dataKey="count"
                    radius={[8, 8, 0, 0]}
                    label={{
                      position: "top",
                      fill: "#8899AA",
                      fontSize: 11,
                      formatter: (v: unknown) => `${((Number(v) / total) * 100).toFixed(1)}%`,
                    }}
                  >
                    {BELL_DATA.map((b) => (
                      <Cell key={b.band} fill={b.color} fillOpacity={0.8} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartWrapper>
          </ClientOnly>
        </div>
        {/* Alerts for outliers */}
        <div className="mt-4 flex flex-wrap gap-3">
          {BELL_DATA.filter((b) => Math.abs(b.pct - b.target) > 8).map((b) => (
            <Badge key={b.band} variant={BAND_VARIANT_MAP[b.band as keyof typeof BAND_VARIANT_MAP]}>
              ⚠ {b.band.split(" ")[0]} — {b.pct.toFixed(1)}% vs {b.target}% target (deviation: +
              {(b.pct - b.target).toFixed(1)}%)
            </Badge>
          ))}
        </div>
      </Card>

      {/* Dept stacked breakdown */}
      <Card padding="lg">
        <h2 className="font-semibold mb-4 text-white">Department Breakdown</h2>
        <div className="h-[220px]">
          <ClientOnly>
            <ChartWrapper height="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DEPT_DIST} barSize={28}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                  <XAxis dataKey="dept" axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 11 }} />
                  <RechartsTooltip contentStyle={{ background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8 }} />
                  <Bar dataKey="E" stackId="a" fill="#00E5A0" />
                  <Bar dataKey="EE" stackId="a" fill="#0066FF" />
                  <Bar dataKey="ME" stackId="a" fill="#FFB800" />
                  <Bar dataKey="NI" stackId="a" fill="#FF8C00" />
                  <Bar dataKey="U" stackId="a" fill="#FF4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartWrapper>
          </ClientOnly>
        </div>
      </Card>
    </Page>
  );
}
