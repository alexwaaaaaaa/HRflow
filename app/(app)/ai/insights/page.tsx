"use client";

import { Sparkles, TrendingUp, AlertTriangle, Users, Zap, ArrowRight, ShieldCheck, Activity } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
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

const ATTRITION_TREND = [
  { month: "Jan", rate: 4.2 }, { month: "Feb", rate: 4.5 }, { month: "Mar", rate: 3.8 },
  { month: "Apr", rate: 4.9 }, { month: "May", rate: 5.2 }, { month: "Jun", rate: 5.8 },
  { month: "Jul", rate: 6.1 },
];

const ANOMALY_DATA = [
  { category: "Payroll", value: 3, color: "#FF4444" },
  { category: "Compliance", value: 1, color: "#FFB800" },
  { category: "Attendance", value: 8, color: "#00E5A0" },
  { category: "Expense", value: 2, color: "#0066FF" },
];

// Seeded decorative sparkline values
const SPARKLINES = seededFloats(7007, 12);

const KPI_CARDS = [
  { label: "AI Model Accuracy", value: "94.2%", trend: "+1.2%", positive: true, icon: Activity, color: "text-emerald-400" },
  { label: "Predicted Time-to-Hire", value: "18 Days", trend: "-4 Days", positive: true, icon: TrendingUp, color: "text-blue-400" },
  { label: "Payroll Anomalies", value: "3", trend: "0", positive: true, icon: AlertTriangle, color: "text-amber-400" },
  { label: "Flight Risk Employees", value: "12", trend: "+2", positive: false, icon: Users, color: "text-red-400" },
];

const SUGGESTIONS = [
  { title: "Optimize Shift Rosters", desc: "AI found overlapping shifts in Ops causing 12% unused capacity. Adjusting can save ₹45k this month.", icon: Activity },
  { title: "Review Comp Bands", desc: "3 recent offer rejections correlate with our L4 Engineering bands being 8% below market median.", icon: TrendingUp },
  { title: "Update Remote Policy", desc: "Based on sentiment analysis of recent pulse surveys, ambiguity in remote working is causing stress.", icon: ShieldCheck },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function AIInsightsDashboard() {
  return (
    <Page
      title="AI Insights Overview"
      subtitle={`Kaarya AI is currently monitoring 12,408 data points across your organization. Here are the top anomalies and prescriptive actions for today.`}
      breadcrumbs={[
        { label: "AI", href: "/ai/smart-onboarding" },
        { label: "Insights" },
      ]}
      maxWidth="1300px"
      actions={
        <>
          <Button variant="secondary" icon={<Zap size={14} />}>Train Model</Button>
          <Button icon={<Sparkles size={14} />}>Ask HR Copilot</Button>
        </>
      }
    >
      {/* Critical Alert Banner */}
      <Card padding="lg" className="mb-6 border-red-500/20">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-4 items-start">
            <div className="mt-1 bg-red-500/20 p-2 rounded-full">
              <AlertTriangle size={20} className="text-red-400" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-red-400 font-semibold mb-1">Critical Attrition Risk Detected</h3>
              <p className="text-[#8899AA] text-sm">
                The AI predicts a <span className="text-white font-medium">85% probability</span> that 4 key engineers in the Payment Gateway team might leave within 30 days due to compensation disparity.
              </p>
            </div>
          </div>
          <Button variant="secondary" size="sm">View Prescriptive Actions</Button>
        </div>
      </Card>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {KPI_CARDS.map((stat, i) => (
          <Card key={stat.label} padding="lg">
            <div className="flex justify-between items-start mb-4">
              <div className="text-[#8899AA] text-xs font-medium uppercase tracking-wider">{stat.label}</div>
              <stat.icon size={16} className={stat.color} aria-hidden="true" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
            <div className={`text-sm ${stat.positive ? "text-emerald-400" : "text-red-400"}`}>
              {stat.trend} vs last month
            </div>
            {/* Decorative sparkline (seeded) */}
            <div className="sr-only" aria-hidden="true">{SPARKLINES[i]}</div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Attrition Trend Chart */}
        <Card padding="lg" className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-white font-semibold">Predicted Attrition Trend</h3>
              <p className="text-[#8899AA] text-xs mt-1">AI forecast for the next quarter based on market factors & internal data</p>
            </div>
            <label htmlFor="attrition-dept" className="sr-only">Filter by department</label>
            <select
              id="attrition-dept"
              className="bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-lg px-3 py-1.5 outline-none"
            >
              <option>Company Wide</option>
              <option>Engineering</option>
              <option>Sales</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ClientOnly>
              <ChartWrapper height="h-full">
                <AreaChart data={ATTRITION_TREND} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1A2A3A" />
                  <XAxis dataKey="month" stroke="#445566" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#445566" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}%`} />
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: "#131B2B", borderColor: "#2A3A4A", borderRadius: "8px", color: "#fff" }}
                    itemStyle={{ color: "#818cf8" }}
                  />
                  <Area type="monotone" dataKey="rate" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#colorRate)" />
                </AreaChart>
              </ChartWrapper>
            </ClientOnly>
          </div>
        </Card>

        {/* Anomalies Breakdown */}
        <Card padding="lg" className="flex flex-col">
          <div className="mb-6">
            <h3 className="text-white font-semibold">Active Anomalies</h3>
            <p className="text-[#8899AA] text-xs mt-1">Issues flagged by the variance detection model</p>
          </div>
          <div className="flex-1 min-h-[200px]">
            <ClientOnly>
              <ChartWrapper height="h-full">
                <BarChart layout="vertical" data={ANOMALY_DATA} margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#1A2A3A" />
                  <XAxis type="number" stroke="#445566" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis dataKey="category" type="category" stroke="#8899AA" fontSize={12} tickLine={false} axisLine={false} width={80} />
                  <RechartsTooltip cursor={{ fill: "#1A2A3A" }} contentStyle={{ backgroundColor: "#131B2B", borderColor: "#2A3A4A", borderRadius: "8px" }} />
                  <Bar dataKey="value" barSize={12} radius={[0, 4, 4, 0]}>
                    {ANOMALY_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ChartWrapper>
            </ClientOnly>
          </div>
          <div className="mt-6">
            <Button variant="secondary" size="sm" className="w-full" iconRight={<ArrowRight size={16} />}>
              Review All Anomalies
            </Button>
          </div>
        </Card>
      </div>

      {/* AI Suggestions */}
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Sparkles size={18} className="text-indigo-400" aria-hidden="true" /> AI Suggestions for You
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {SUGGESTIONS.map((item) => (
          <Card key={item.title} padding="md" className="hover:border-indigo-500/30 transition-colors cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-[#1A2A3A] p-2 rounded-lg text-indigo-400">
                <item.icon size={18} aria-hidden="true" />
              </div>
              <h4 className="text-white font-medium text-sm">{item.title}</h4>
            </div>
            <p className="text-[#8899AA] text-xs leading-relaxed">{item.desc}</p>
          </Card>
        ))}
      </div>
    </Page>
  );
}
