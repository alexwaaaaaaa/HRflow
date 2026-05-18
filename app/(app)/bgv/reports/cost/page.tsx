"use client";

import { Download, Building, PieChart as PieChartIcon, ArrowUpRight } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import ChartWrapper from "@/components/ui/ChartWrapper";

const MONTHLY_COST = [
  { name: "Jan", FirstAdvantage: 45000, Checkr: 20000 },
  { name: "Feb", FirstAdvantage: 52000, Checkr: 25000 },
  { name: "Mar", FirstAdvantage: 68000, Checkr: 30000 },
  { name: "Apr", FirstAdvantage: 74000, Checkr: 35000 },
  { name: "May", FirstAdvantage: 85000, Checkr: 45000 },
  { name: "Jun", FirstAdvantage: 92000, Checkr: 42000 },
];

const PACKAGES_COST = [
  { name: "Standard", value: 340000, color: "#0066FF" },
  { name: "Comprehensive", value: 210000, color: "#00E5A0" },
  { name: "Executive", value: 65000, color: "#8899AA" },
];

export default function BGVCostReportPage() {
  return (
    <Page
      title="BGV Cost Analysis"
      subtitle="Track background verification spending across vendors and packages."
      breadcrumbs={[
        { label: "BGV", href: "/bgv/dashboard" },
        { label: "Reports", href: "/bgv/reports" },
        { label: "Cost" },
      ]}
      maxWidth="1200px"
      actions={
        <Button variant="secondary" icon={<Download size={16} aria-hidden="true" />}>
          Export Financial Report
        </Button>
      }
    >
      <div className="space-y-8">
        {/* Summary metrics */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card padding="lg">
            <div className="mb-2 text-xs font-bold uppercase tracking-wider text-[#8899AA]">
              Total Spend (YTD)
            </div>
            <div className="mb-2 text-3xl font-black text-white">₹6,15,000</div>
            <div className="flex items-center gap-1 text-sm text-rose-500">
              <ArrowUpRight size={16} aria-hidden="true" /> 15% higher than last year
            </div>
          </Card>
          <Card padding="lg">
            <div className="mb-2 text-xs font-bold uppercase tracking-wider text-[#8899AA]">
              Avg Cost / Hire
            </div>
            <div className="mb-2 text-3xl font-black text-white">₹2,840</div>
            <div className="text-sm text-[#00E5A0]">Optimized within budget</div>
          </Card>
          <Card padding="lg">
            <div className="mb-2 text-xs font-bold uppercase tracking-wider text-[#8899AA]">
              Primary Vendor Share
            </div>
            <div className="mb-2 text-3xl font-black text-white">68%</div>
            <div className="text-sm text-[#556677]">FirstAdvantage</div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card padding="lg" className="lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white">
                <Building size={16} className="text-[#0066FF]" aria-hidden="true" /> Monthly Spend by Vendor
              </h3>
              <select
                className="rounded-lg border border-[#1A2A3A] bg-[#060B14] px-3 py-1.5 text-xs text-white outline-none focus:border-[#0066FF]"
                aria-label="Select year"
              >
                <option>2024</option>
                <option>2023</option>
              </select>
            </div>
            <div className="h-64">
              <ChartWrapper height="h-full">
                <BarChart data={MONTHLY_COST} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                  <XAxis dataKey="name" stroke="#556677" tick={{ fill: "#8899AA", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis
                    stroke="#556677"
                    tick={{ fill: "#8899AA", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(val) => `₹${val / 1000}k`}
                  />
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: "#0D1928", borderColor: "#1A2A3A", borderRadius: "8px" }}
                    itemStyle={{ color: "#fff" }}
                    cursor={{ fill: "#1A2A3A", opacity: 0.4 }}
                    formatter={(value: any) => `₹${Number(value).toLocaleString()}`}
                  />
                  <Legend wrapperStyle={{ fontSize: 12, color: "#8899AA" }} />
                  <Bar dataKey="FirstAdvantage" stackId="a" fill="#0066FF" radius={[0, 0, 4, 4]} />
                  <Bar dataKey="Checkr" stackId="a" fill="#00E5A0" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartWrapper>
            </div>
          </Card>

          <Card padding="lg" className="flex flex-col">
            <h3 className="mb-6 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white">
              <PieChartIcon size={16} className="text-[#00E5A0]" aria-hidden="true" /> Spend by Package Type
            </h3>
            <div className="relative mt-2 min-h-[200px] flex-1">
              <ChartWrapper height="h-full">
                <PieChart>
                  <Pie
                    data={PACKAGES_COST}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {PACKAGES_COST.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: "#0D1928", borderColor: "#1A2A3A", borderRadius: "8px", color: "#fff" }}
                    itemStyle={{ color: "#fff" }}
                    formatter={(value: any) => `₹${Number(value).toLocaleString()}`}
                  />
                </PieChart>
              </ChartWrapper>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-white">YTD</span>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {PACKAGES_COST.map((pkg) => (
                <div key={pkg.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: pkg.color }} aria-hidden="true" />
                    <span className="text-[#8899AA]">{pkg.name}</span>
                  </div>
                  <span className="font-bold text-white">₹{pkg.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Page>
  );
}
