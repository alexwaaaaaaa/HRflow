"use client";

import {
  Plus,
  AlertCircle,
  Clock,
  CheckCircle2,
  FileText,
  ChevronRight,
  Activity,
} from "lucide-react";
import Link from "next/link";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";
import ChartWrapper from "@/components/ui/ChartWrapper";

const TREND_DATA = [
  { name: "Jan", initiated: 45, completed: 38 },
  { name: "Feb", initiated: 52, completed: 45 },
  { name: "Mar", initiated: 68, completed: 60 },
  { name: "Apr", initiated: 74, completed: 65 },
  { name: "May", initiated: 85, completed: 78 },
  { name: "Jun", initiated: 92, completed: 88 },
];

type BgcStatus = "In Progress" | "Clear" | "Discrepancy";

interface RecentBgc {
  id: string;
  name: string;
  role: string;
  status: BgcStatus;
  progress: number;
}

const STATUS_VARIANT: Record<BgcStatus, "warning" | "success" | "danger"> = {
  "In Progress": "warning",
  Clear: "success",
  Discrepancy: "danger",
};

const RECENT_BGC: RecentBgc[] = [
  { id: "BGC-2024-089", name: "Rahul Sharma", role: "SDE II", status: "In Progress", progress: 65 },
  { id: "BGC-2024-088", name: "Priya Patel", role: "Product Manager", status: "Clear", progress: 100 },
  { id: "BGC-2024-087", name: "Amit Singh", role: "Sales Exec", status: "Discrepancy", progress: 80 },
  { id: "BGC-2024-086", name: "Sneha Gupta", role: "HR Associate", status: "Clear", progress: 100 },
];

const CHECK_TYPES = [
  { label: "Identity Check (ID, PAN, Aadhaar)", value: 94, color: "bg-[#00E5A0]" },
  { label: "Address Check (Current & Perm)", value: 82, color: "bg-[#0066FF]" },
  { label: "Education Verification", value: 65, color: "bg-amber-500" },
  { label: "Employment Verification", value: 76, color: "bg-indigo-500" },
  { label: "Criminal & Court Checks", value: 45, color: "bg-rose-500" },
];

type ActionType = "danger" | "warning" | "info" | "success";

const ACTION_PALETTE: Record<ActionType, { icon: React.ElementType; border: string; bg: string; iconColor: string }> = {
  danger: { icon: AlertCircle, border: "border-rose-500/20", bg: "bg-rose-500/10", iconColor: "text-rose-500" },
  warning: { icon: Clock, border: "border-amber-500/20", bg: "bg-amber-500/10", iconColor: "text-amber-500" },
  info: { icon: FileText, border: "border-[#0066FF]/20", bg: "bg-[#0066FF]/10", iconColor: "text-[#60a5fa]" },
  success: { icon: CheckCircle2, border: "border-[#00E5A0]/20", bg: "bg-[#00E5A0]/10", iconColor: "text-[#00E5A0]" },
};

interface ActionItemProps {
  title: string;
  desc: string;
  time: string;
  type: ActionType;
}

function ActionItem({ title, desc, time, type }: ActionItemProps) {
  const st = ACTION_PALETTE[type];
  const Icon = st.icon;
  return (
    <div
      className={`flex cursor-pointer gap-3 rounded-xl border p-3 transition-colors hover:bg-[#1A2A3A]/40 ${st.border} bg-[#060B14]`}
    >
      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${st.bg}`}>
        <Icon className={st.iconColor} size={16} aria-hidden="true" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <h4 className="text-sm font-semibold text-white">{title}</h4>
          <span className="text-[10px] text-[#7a8fa6]">{time}</span>
        </div>
        <p className="mt-1 line-clamp-1 text-xs text-[#8899AA]">{desc}</p>
      </div>
    </div>
  );
}

const BGC_COLUMNS: Column<RecentBgc>[] = [
  {
    key: "candidate",
    label: "Candidate / ID",
    render: (r) => (
      <div>
        <p className="text-sm font-medium text-slate-200">{r.name}</p>
        <p className="text-xs text-[#8899AA]">{r.id}</p>
      </div>
    ),
    sortable: true,
    sortValue: (r) => r.name,
  },
  {
    key: "status",
    label: "Status",
    render: (r) => (
      <div className="flex items-center gap-2">
        <Badge variant={STATUS_VARIANT[r.status]}>{r.status}</Badge>
        {r.progress < 100 && <span className="text-[10px] text-[#8899AA]">{r.progress}%</span>}
      </div>
    ),
  },
  {
    key: "actions",
    label: "",
    align: "right",
    render: (r) => (
      <Link
        href={`/bgv/status/${r.id}`}
        className="inline-flex items-center justify-center rounded p-1.5 text-[#60a5fa] transition-colors hover:bg-[#0066FF]/10"
        aria-label={`View BGV details for ${r.name}`}
      >
        <ChevronRight size={16} aria-hidden="true" />
      </Link>
    ),
  },
];

export default function BGVDashboardPage() {
  return (
    <Page
      title="BGV Dashboard"
      subtitle="Monitor background verification progress, discrepancies, and vendor performance."
      breadcrumbs={[
        { label: "BGV", href: "/bgv/dashboard" },
        { label: "Dashboard" },
      ]}
      maxWidth="1300px"
      actions={
        <Link href="/bgv/initiate">
          <Button icon={<Plus size={16} aria-hidden="true" />}>
            Initiate BGV
          </Button>
        </Link>
      }
    >
      <div className="space-y-6">
        {/* KPI strip */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Verifications in Progress", value: "124", trend: "+12% this month", icon: <Activity size={24} aria-hidden="true" />, color: "text-amber-500", border: "border-amber-500/30", bg: "bg-amber-500/5" },
            { title: "Cleared (MTD)", value: "88", trend: "+5% vs last month", icon: <CheckCircle2 size={24} aria-hidden="true" />, color: "text-[#00E5A0]", border: "border-[#00E5A0]/30", bg: "bg-[#00E5A0]/5" },
            { title: "Open Discrepancies", value: "12", trend: "-3% vs last month", icon: <AlertCircle size={24} aria-hidden="true" />, color: "text-rose-500", border: "border-rose-500/30", bg: "bg-rose-500/5" },
            { title: "Avg Turnaround Time", value: "4.2 Days", trend: "-0.5 days vs Target", icon: <Clock size={24} aria-hidden="true" />, color: "text-[#60a5fa]", border: "border-[#0066FF]/30", bg: "bg-[#0066FF]/5" },
          ].map((m) => (
            <Card key={m.title} padding="md">
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl border ${m.border} ${m.bg} ${m.color}`}>
                {m.icon}
              </div>
              <p className="mb-1 text-sm font-medium text-[#8899AA]">{m.title}</p>
              <p className="text-2xl font-bold text-white">{m.value}</p>
              <p className="mt-2 text-xs text-[#7a8fa6]">{m.trend}</p>
            </Card>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card padding="lg" className="lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Verification Volume Trend</h3>
                <p className="text-xs text-[#8899AA]">Initiated vs Completed (Last 6 Months)</p>
              </div>
              <select
                className="rounded-lg border border-[#1A2A3A] bg-[#060B14] px-3 py-1.5 text-xs text-white outline-none transition-colors focus:border-[#0066FF]"
                aria-label="Select time range"
              >
                <option>Last 6 Months</option>
                <option>This Year</option>
              </select>
            </div>
            <div className="h-64">
              <ChartWrapper height="h-full">
                <AreaChart data={TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="bgvColorInit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0066FF" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#0066FF" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="bgvColorComp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00E5A0" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#00E5A0" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                  <XAxis dataKey="name" stroke="#556677" tick={{ fill: "#8899AA", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis stroke="#556677" tick={{ fill: "#8899AA", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#0A1420", borderColor: "#1A2A3A", borderRadius: "8px" }}
                    itemStyle={{ color: "#fff" }}
                  />
                  <Area type="monotone" dataKey="initiated" stroke="#0066FF" fillOpacity={1} fill="url(#bgvColorInit)" name="Initiated" />
                  <Area type="monotone" dataKey="completed" stroke="#00E5A0" fillOpacity={1} fill="url(#bgvColorComp)" name="Completed" />
                </AreaChart>
              </ChartWrapper>
            </div>
          </Card>

          <Card padding="lg">
            <h3 className="mb-1 text-lg font-bold text-white">Check Type Breakdown</h3>
            <p className="mb-6 text-xs text-[#8899AA]">Current active verifications</p>
            <div className="space-y-5">
              {CHECK_TYPES.map((ct) => (
                <div key={ct.label}>
                  <div className="mb-1.5 flex justify-between text-xs">
                    <span className="text-slate-300">{ct.label}</span>
                    <span className="font-bold text-white">{ct.value}%</span>
                  </div>
                  <div
                    className="h-2 w-full overflow-hidden rounded-full bg-[#1A2A3A]"
                    role="progressbar"
                    aria-valuenow={ct.value}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={ct.label}
                  >
                    <div className={`h-full rounded-full transition-all ${ct.color}`} style={{ width: `${ct.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card padding="none">
            <div className="flex items-center justify-between border-b border-[#1A2A3A] bg-[#0D1928] px-5 py-4">
              <h3 className="font-bold text-white">Recent Initiations</h3>
              <Link href="/bgv/status" className="text-xs font-medium text-[#60a5fa] hover:underline">
                View All
              </Link>
            </div>
            <div className="p-4">
              <DataTable<RecentBgc>
                data={RECENT_BGC}
                columns={BGC_COLUMNS}
                rowKey={(r) => r.id}
                aria-label="Recent BGV initiations"
              />
            </div>
          </Card>

          <Card padding="lg">
            <div className="mb-6">
              <h3 className="mb-1 font-bold text-white">Action Items</h3>
              <p className="text-xs text-[#8899AA]">Tasks requiring HR attention</p>
            </div>
            <div className="space-y-3">
              <ActionItem
                title="Review Discrepancy: Amit Singh"
                desc="Education verification mismatch with provided records."
                time="2 hours ago"
                type="danger"
              />
              <ActionItem
                title="Insufficient Information"
                desc="Need updated ID proof for Sneha Gupta. Previous upload illegible."
                time="4 hours ago"
                type="warning"
              />
              <ActionItem
                title="Vendor SLA Breach Warning"
                desc="FirstAdvantage TAT exceeding 7 days for 3 candidates."
                time="1 day ago"
                type="info"
              />
              <ActionItem
                title="Clearance Approval Required"
                desc="Background checks completed for 5 individuals. Pending final HR approval."
                time="1 day ago"
                type="success"
              />
            </div>
          </Card>
        </div>
      </div>
    </Page>
  );
}
