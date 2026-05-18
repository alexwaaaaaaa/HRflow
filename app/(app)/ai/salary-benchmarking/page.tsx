"use client";

import { Sparkles, TrendingUp, Target, Search, Filter, TrendingDown, BarChart3 } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import ChartWrapper from "@/components/ui/ChartWrapper";
import ClientOnly from "@/components/ui/ClientOnly";
import { seededFloats } from "@/lib/random";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip } from "recharts";

// ─── Static data ────────────────────────────────────────────────────────────

const BAND_DATA = [
  { percentile: "10th", val: 18 },
  { percentile: "25th", val: 24 },
  { percentile: "50th (Median)", val: 32 },
  { percentile: "75th", val: 45 },
  { percentile: "90th", val: 56 },
];

const AT_RISK_EMPLOYEES = [
  { name: "Kavya Singh", current: "₹22L", diff: "-31%" },
  { name: "Rohan Mehta", current: "₹23.5L", diff: "-26%" },
  { name: "Aditi Sharma", current: "₹24L", diff: "-25%" },
];

// Seeded decorative sparkline values
const SPARKLINES = seededFloats(7010, 8);

// ─── Page ────────────────────────────────────────────────────────────────────

export default function SalaryBenchmarkingPage() {
  return (
    <Page
      title="AI Salary Benchmarking"
      subtitle="Real-time market compensation analysis powered by external APIs and Kaarya's proprietary offer-acceptance data model."
      breadcrumbs={[
        { label: "AI", href: "/ai/smart-onboarding" },
        { label: "Salary Benchmarking" },
      ]}
      maxWidth="1300px"
      actions={
        <>
          <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl flex items-center px-3 py-1.5 focus-within:border-green-500/50 transition-colors w-64">
            <Search size={16} className="text-[#8899AA]" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search titles (e.g. SDE II)…"
              className="bg-transparent border-none outline-none text-white text-sm ml-2 w-full"
              defaultValue="Senior Product Manager"
              aria-label="Search job titles"
            />
          </div>
          <Button variant="secondary" icon={<Filter size={14} />}>Tier-1 Cities</Button>
        </>
      }
    >
      {/* Smart Summary */}
      <Card padding="lg" className="mb-6 border-green-500/20">
        <div className="flex items-start gap-4">
          <div className="bg-green-500/20 p-3 rounded-xl border border-green-500/30 shrink-0">
            <Sparkles size={24} className="text-green-400" aria-hidden="true" />
          </div>
          <div className="flex-1 flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-2">Compensation Insight: Senior Product Manager</h3>
              <p className="text-[#8899AA] text-sm leading-relaxed mb-4">
                The current market median (50th percentile) for <strong className="text-white">Senior Product Managers</strong> in Tier-1 Indian tech hubs has shifted to <strong className="text-green-400">₹32L</strong> base salary (+12% YoY). Your company average for this role is currently <strong className="text-red-400">₹27.5L</strong>, placing you in the 35th percentile.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="success"><TrendingUp size={12} aria-hidden="true" className="inline mr-1" />Market +12% YoY</Badge>
                <Badge variant="danger"><TrendingDown size={12} aria-hidden="true" className="inline mr-1" />Internal Gap -14%</Badge>
              </div>
            </div>
            {/* Comp-Ratio Dial */}
            <Card padding="md" className="md:w-64 flex flex-col justify-center shrink-0">
              <div className="text-xs text-[#8899AA] uppercase tracking-wider mb-2 font-semibold text-center">Your Comp-Ratio</div>
              <div className="text-4xl font-black text-center text-red-400 mb-1">0.86</div>
              <div className="text-xs text-[#445566] text-center mb-3">Target: 1.0 (Median)</div>
              <div
                role="progressbar"
                aria-valuenow={43}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Comp-ratio vs median"
                className="w-full h-2 bg-[#1A2A3A] rounded-full relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 bg-red-500 w-[43%] rounded-full" />
                <div className="absolute left-[50%] top-0 bottom-0 w-0.5 bg-[#445566]" aria-hidden="true" />
              </div>
            </Card>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Distribution Chart */}
        <Card padding="lg" className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-white font-semibold">Compensation Distribution Bands</h3>
              <p className="text-[#8899AA] text-xs mt-1">Base Salary in ₹ Lakhs (excluding ESOP/Bonus)</p>
            </div>
            <div className="flex gap-4">
              <span className="flex items-center gap-2 text-xs text-[#8899AA]">
                <span className="w-3 h-3 rounded-full bg-green-500" aria-hidden="true" /> Market Data
              </span>
            </div>
          </div>
          <div className="h-[280px] w-full relative">
            {/* Internal average marker */}
            <div className="absolute left-[35%] top-0 bottom-6 w-0.5 bg-red-500/50 border-r border-dashed border-red-500 z-10 flex flex-col items-center" aria-hidden="true">
              <div className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow mt-2 whitespace-nowrap">Your Avg: ₹27.5L</div>
            </div>
            <ClientOnly>
              <ChartWrapper height="h-full">
                <AreaChart data={BAND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1A2A3A" />
                  <XAxis dataKey="percentile" stroke="#445566" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#445566" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val}L`} />
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: "#131B2B", borderColor: "#2A3A4A", borderRadius: "8px", color: "#fff" }}
                    formatter={(val: unknown) => [`₹${val}L`, "Base Salary"]}
                  />
                  <Area type="monotone" dataKey="val" stroke="#22c55e" strokeWidth={3} fillOpacity={1} fill="url(#colorGreen)" />
                </AreaChart>
              </ChartWrapper>
            </ClientOnly>
          </div>
        </Card>

        {/* Flight Risk Detection */}
        <Card padding="lg" className="flex flex-col gap-4">
          <h3 className="text-white font-semibold mb-2 flex items-center gap-2">Flight Risk Detection</h3>
          <p className="text-[#8899AA] text-xs">Employees in this role whose compensation falls below the 25th percentile market threshold.</p>
          <div className="flex-1 space-y-3 border-t border-[#1A2A3A] pt-4">
            {AT_RISK_EMPLOYEES.map((emp, i) => (
              <Card key={emp.name} padding="sm" className="border-red-500/20 hover:border-red-500/50 transition-colors cursor-pointer">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-white text-sm font-medium block">{emp.name}</span>
                    <span className="text-[#8899AA] text-xs font-mono">{emp.current}</span>
                  </div>
                  <div className="text-right">
                    <Badge variant="danger">{emp.diff}</Badge>
                    <span className="text-[10px] text-[#445566] block mt-1">vs Median</span>
                  </div>
                </div>
                {/* Decorative seeded value (hidden) */}
                <div className="sr-only" aria-hidden="true">{SPARKLINES[i]}</div>
              </Card>
            ))}
          </div>
          <Button variant="secondary" size="sm" className="w-full mt-2">View All 8 At-Risk Employees</Button>
        </Card>
      </div>

      {/* Correction Strategies */}
      <h3 className="text-lg font-semibold text-white mb-4">Correction Strategies</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card padding="md" className="border-green-500/30 hover:bg-[#131B2B] transition-colors">
          <div className="flex items-start gap-4">
            <div className="bg-green-500/20 p-2.5 rounded-xl text-green-400 shrink-0">
              <Target size={20} aria-hidden="true" />
            </div>
            <div>
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-white font-medium text-sm">Targeted Mid-Cycle Correction</h4>
                <Badge variant="success">Optimal ROI</Badge>
              </div>
              <p className="text-xs text-[#8899AA] leading-relaxed mb-4">
                Allocate a budget of <strong className="text-white">₹38L</strong> to correct the poorest 8 salaries up to the 25th percentile. Kaarya predicts this will reduce turnover risk in this cohort by 64%.
              </p>
              <Button size="sm">Generate Payroll Draft</Button>
            </div>
          </div>
        </Card>

        <Card padding="md" className="hover:bg-[#131B2B] transition-colors">
          <div className="flex items-start gap-4">
            <div className="bg-[#1A2A3A] p-2.5 rounded-xl text-[#8899AA] shrink-0 border border-[#2A3A4A]">
              <BarChart3 size={20} aria-hidden="true" />
            </div>
            <div>
              <h4 className="text-white font-medium text-sm mb-2">Adjust Offer Bands</h4>
              <p className="text-xs text-[#8899AA] leading-relaxed mb-4">
                For the 3 open requisitions for Senior PM, Kaarya recommends adjusting the approval band from [₹25L-₹32L] to <strong className="text-white">[₹28L-₹35L]</strong> to improve offer acceptance rate to ~80%.
              </p>
              <Button variant="secondary" size="sm">Update ATS Settings</Button>
            </div>
          </div>
        </Card>
      </div>
    </Page>
  );
}
