"use client";

import React from "react";
import Link from "next/link";
import {
  IndianRupee, UserPlus, TrendingUp, Clock,
  FileText, Download, Upload, Calculator, Send,
  AlertTriangle, Zap, ArrowUpRight, ArrowRight,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, RadialBarChart, RadialBar,
  XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import ClientOnly from "@/components/ui/ClientOnly";

// ── Chart data ────────────────────────────────────────────────────────────────
const headcountData = [
  { m: "Jun", v: 780 }, { m: "Jul", v: 785 }, { m: "Aug", v: 790 },
  { m: "Sep", v: 810 }, { m: "Oct", v: 835 }, { m: "Nov", v: 847 },
];
const deptData = [
  { d: "Eng",   v: 320 }, { d: "Sales", v: 180 }, { d: "Ops",  v: 172 },
  { d: "Mkt",   v: 95  }, { d: "HR",    v: 42  }, { d: "Fin",  v: 38  },
];
const riskData = [
  { name: "High",   value: 8,  fill: "#ef4444" },
  { name: "Medium", value: 22, fill: "#f59e0b" },
  { name: "Low",    value: 70, fill: "#00e5a0" },
];

// ── KPI Card ──────────────────────────────────────────────────────────────────
function KPICard({
  label, value, sub, subColor = "#00e5a0", href, accent = "#00e5a0",
  children,
}: {
  label: string; value: string; sub?: React.ReactNode; subColor?: string;
  href?: string; accent?: string; children?: React.ReactNode;
}) {
  const inner = (
    <div
      className="rounded-[18px] p-5 flex flex-col gap-3 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer group"
      style={{
        background: "#0b1422",
        border: "1px solid #162030",
        boxShadow: `0 1px 3px rgba(0,0,0,0.4), 0 0 0 0 ${accent}00`,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          `0 8px 24px rgba(0,0,0,0.4), 0 0 0 1px ${accent}20`;
        (e.currentTarget as HTMLDivElement).style.borderColor = `${accent}25`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 1px 3px rgba(0,0,0,0.4)";
        (e.currentTarget as HTMLDivElement).style.borderColor = "#162030";
      }}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-600 text-[#3d5166] uppercase tracking-[0.06em]">{label}</span>
        {href && <ArrowUpRight size={13} className="text-[#2a3a4a] group-hover:text-[#7a8fa6] transition-colors" />}
      </div>
      <div className="text-[2rem] font-700 text-[#f0f4f8] leading-none tracking-[-0.03em]">{value}</div>
      {sub && (
        <div className="flex items-center gap-1.5 text-[12px]" style={{ color: subColor }}>
          {sub}
        </div>
      )}
      {children}
    </div>
  );
  return href ? <Link href={href} className="block">{inner}</Link> : inner;
}

// ── Section header ────────────────────────────────────────────────────────────
function SectionCard({ title, action, actionHref, children, className = "" }: {
  title: string; action?: string; actionHref?: string;
  children: React.ReactNode; className?: string;
}) {
  return (
    <div className={`rounded-[18px] p-6 ${className}`}
      style={{ background: "#0b1422", border: "1px solid #162030" }}>
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-[15px] font-600 text-[#f0f4f8] m-0">{title}</h3>
        {action && actionHref && (
          <Link href={actionHref}
            className="text-[12px] text-[#3b82f6] hover:text-[#60a5fa] transition-colors flex items-center gap-1">
            {action} <ArrowRight size={11} />
          </Link>
        )}
      </div>
      {children}
    </div>
  );
}

// ── Custom tooltip ────────────────────────────────────────────────────────────
function ChartTooltip({ active, payload, label }: {
  active?: boolean; payload?: { value: number }[]; label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-[10px] px-3 py-2 text-[12px]"
      style={{ background: "#0f1c2e", border: "1px solid #162030", color: "#c8d8e8" }}>
      <div className="text-[#7a8fa6] mb-0.5">{label}</div>
      <div className="font-600 text-[#f0f4f8]">{payload[0]?.value}</div>
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const now = new Date();
  const greeting = now.getHours() < 12 ? "Good morning" : now.getHours() < 17 ? "Good afternoon" : "Good evening";
  const todayStr = now.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const monthYear = now.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
  const dueDate = new Date(now.getFullYear(), now.getMonth() + 1, 0)
    .toLocaleDateString("en-IN", { day: "numeric", month: "short" });

  return (
    <div className="px-8 py-6 animate-fade-in" style={{ minHeight: "100vh" }}>

      {/* ── Page header ── */}
      <div className="flex items-start justify-between mb-7">
        <div>
          <h1 className="text-[28px] font-700 text-[#f0f4f8] m-0 tracking-[-0.025em]">
            {greeting}, Priya 👋
          </h1>
          <p className="text-[13px] text-[#3d5166] mt-1.5">{todayStr} · TechCorp Solutions</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/employees/add">
            <Button variant="secondary" size="md" icon={<UserPlus size={14} />}>Add Employee</Button>
          </Link>
          <Link href="/payroll/run/select-month">
            <Button variant="primary" size="md" icon={<IndianRupee size={14} />}>Run Payroll</Button>
          </Link>
        </div>
      </div>

      {/* ── Smart alert banner ── */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-[12px] mb-6"
        style={{ background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.18)" }}>
        <AlertTriangle size={14} className="text-[#f59e0b] shrink-0" />
        <span className="text-[12px] text-[#fbbf24]">
          <strong>Payroll due in 3 days</strong> — PF Challan overdue · ESI Challan due today · 23 approvals pending
        </span>
        <Link href="/compliance/calendar" className="ml-auto text-[11px] text-[#f59e0b] hover:underline shrink-0">
          View all →
        </Link>
      </div>

      {/* ── KPI strip ── */}
      <div className="grid grid-cols-5 gap-4 mb-6 stagger-children">
        <KPICard
          label="Total Employees" value="847" href="/employees" accent="#00e5a0"
          sub={<><TrendingUp size={11} /> +12 this month</>}
        />
        <KPICard
          label="Active Today" value="731" href="/attendance/live" accent="#3b82f6"
          sub={<><div className="w-1.5 h-1.5 rounded-full bg-[#00e5a0] animate-pulse" /> 86.3% present</>}
        />
        <KPICard
          label={`${monthYear} Payroll`} value="₹4.2 Cr" accent="#f59e0b"
          sub={<><Clock size={11} /> Due: {dueDate}</>} subColor="#f59e0b"
        >
          <div className="h-1 rounded-full overflow-hidden" style={{ background: "#162030" }}>
            <div className="h-full rounded-full" style={{ width: "20%", background: "#f59e0b" }} />
          </div>
        </KPICard>
        <KPICard
          label="Pending Approvals" value="23" href="/leave/approvals" accent="#f59e0b"
          sub="14 leaves · 6 OT · 3 reg." subColor="#7a8fa6"
        />
        <KPICard
          label="Compliance Score" value="94%" href="/compliance/dashboard" accent="#00e5a0"
          sub={<><AlertTriangle size={11} /> 2 items need attention</>} subColor="#f59e0b"
        />
      </div>

      {/* ── Main grid ── */}
      <div className="flex gap-6">

        {/* Left column */}
        <div className="flex flex-col gap-5" style={{ width: 720, flexShrink: 0 }}>

          {/* Payroll status */}
          <SectionCard title={`${monthYear} Payroll`} action="View Details" actionHref="/payroll/dashboard">
            {/* Stepper */}
            <div className="relative flex items-center justify-between mb-6">
              <div className="absolute top-[11px] left-6 right-6 h-[2px]" style={{ background: "#162030" }} />
              <div className="absolute top-[11px] left-6 h-[2px]" style={{ width: "35%", background: "#00e5a0" }} />
              {[
                { label: "Attendance Locked", st: "done" },
                { label: "Salary Computed",   st: "done" },
                { label: "Under Review",      st: "active" },
                { label: "Approved",          st: "pending" },
                { label: "Disbursed",         st: "pending" },
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center gap-2 relative z-10 w-24">
                  <div className="w-[22px] h-[22px] rounded-full flex items-center justify-center text-[11px] font-600 transition-all"
                    style={{
                      background: step.st === "done" ? "#00e5a0" : step.st === "active" ? "#0b1422" : "#0b1422",
                      border: `2px solid ${step.st === "done" ? "#00e5a0" : step.st === "active" ? "#00e5a0" : "#162030"}`,
                      color: step.st === "done" ? "#04080f" : step.st === "active" ? "#00e5a0" : "#3d5166",
                      boxShadow: step.st === "active" ? "0 0 12px rgba(0,229,160,0.4)" : "none",
                    }}>
                    {step.st === "done" ? "✓" : i + 1}
                  </div>
                  <div className="text-[11px] text-center leading-tight"
                    style={{ color: step.st === "pending" ? "#2a3a4a" : step.st === "active" ? "#f0f4f8" : "#7a8fa6", fontWeight: step.st === "active" ? 600 : 400 }}>
                    {step.label}
                  </div>
                </div>
              ))}
            </div>
            {/* Summary row */}
            <div className="flex items-center justify-between px-4 py-3.5 rounded-[12px]"
              style={{ background: "#070d18", border: "1px solid #162030" }}>
              <div className="flex gap-8">
                {[
                  { l: "Employees", v: "847", c: "#f0f4f8" },
                  { l: "Gross Amount", v: "₹4.2 Cr", c: "#f0f4f8" },
                  { l: "Net Payable", v: "₹3.8 Cr", c: "#00e5a0" },
                ].map(s => (
                  <div key={s.l}>
                    <div className="text-[11px] text-[#3d5166] mb-1">{s.l}</div>
                    <div className="text-[15px] font-600" style={{ color: s.c }}>{s.v}</div>
                  </div>
                ))}
              </div>
              <Link href="/payroll/run/approve">
                <Button variant="primary" size="md">Approve Payroll</Button>
              </Link>
            </div>
          </SectionCard>

          {/* Headcount trend */}
          <SectionCard title="Headcount Trend">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4 text-[12px]">
                <span className="text-[#7a8fa6]">Joined: <strong className="text-[#00e5a0]">+24</strong></span>
                <span className="text-[#7a8fa6]">Left: <strong className="text-[#ef4444]">-12</strong></span>
                <span className="text-[#7a8fa6]">Net: <strong className="text-[#00e5a0]">+12</strong></span>
              </div>
              <div className="flex rounded-[8px] overflow-hidden" style={{ border: "1px solid #162030" }}>
                {["3M", "6M", "1Y"].map((p, i) => (
                  <button key={p} className="px-3 py-1 text-[11px] font-500 transition-colors"
                    style={{ background: i === 1 ? "#162030" : "transparent", color: i === 1 ? "#f0f4f8" : "#3d5166" }}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <ClientOnly>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={headcountData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="hcGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%"   stopColor="#00e5a0" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="#00e5a0" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="m" stroke="#2a3a4a" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis domain={["dataMin - 10", "dataMax + 10"]} stroke="#2a3a4a" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip content={<ChartTooltip />} />
                  <Area type="monotone" dataKey="v" stroke="#00e5a0" strokeWidth={2} fill="url(#hcGrad)" dot={false} activeDot={{ r: 4, fill: "#00e5a0", strokeWidth: 0 }} />
                </AreaChart>
              </ResponsiveContainer>
            </ClientOnly>
          </SectionCard>

          {/* Pending approvals table */}
          <div className="rounded-[18px] overflow-hidden" style={{ background: "#0b1422", border: "1px solid #162030" }}>
            <div className="px-6 pt-5 pb-3 flex items-center justify-between">
              <h3 className="text-[15px] font-600 text-[#f0f4f8] m-0">Pending Approvals (23)</h3>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">Approve All</Button>
                <Link href="/leave/approvals" className="text-[12px] text-[#3b82f6] hover:text-[#60a5fa] flex items-center gap-1">
                  View All <ArrowRight size={11} />
                </Link>
              </div>
            </div>
            <table className="w-full">
              <thead>
                <tr style={{ background: "#070d18", borderTop: "1px solid #162030", borderBottom: "1px solid #162030" }}>
                  {["Employee", "Type", "Date", "Details", "Action"].map(h => (
                    <th key={h} className="px-6 py-2.5 text-left text-[10px] font-600 text-[#2a3a4a] uppercase tracking-[0.06em]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { n: "Amit Kumar",   t: "Leave",          d: "11/11/2024", det: "3 days CL",       type: "info" as const },
                  { n: "Sneha Rao",    t: "Regularization", d: "12/11/2024", det: "08/11 punch miss", type: "warning" as const },
                  { n: "Vikram Singh", t: "Overtime",        d: "10/11/2024", det: "4 hrs OT",         type: "neutral" as const },
                  { n: "Pooja Nair",   t: "WFH",            d: "13/11/2024", det: "1 day",            type: "neutral" as const },
                  { n: "Ravi Sharma",  t: "Comp-off",        d: "09/11/2024", det: "1 day",            type: "neutral" as const },
                ].map((r, i) => (
                  <tr key={i} className="transition-colors" style={{ borderBottom: "1px solid #0e1a28" }}
                    onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = "rgba(255,255,255,0.015)"}
                    onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = "transparent"}>
                    <td className="px-6 py-3 text-[13px] font-500 text-[#c8d8e8]">
                      <Link href={`/employees/${r.n.toLowerCase().replace(" ", "-")}`} className="hover:text-[#00e5a0] transition-colors">{r.n}</Link>
                    </td>
                    <td className="px-6 py-3"><Badge variant={r.type}>{r.t}</Badge></td>
                    <td className="px-6 py-3 text-[12px] text-[#3d5166]">{r.d}</td>
                    <td className="px-6 py-3 text-[13px] text-[#7a8fa6]">{r.det}</td>
                    <td className="px-6 py-3">
                      <div className="flex gap-2">
                        <button className="h-7 px-3 rounded-[7px] text-[11px] font-600 bg-[#00e5a0] text-[#04080f] hover:bg-[#00cc8e] transition-colors">Approve</button>
                        <button className="h-7 px-3 rounded-[7px] text-[11px] font-600 text-[#ef4444] transition-colors hover:bg-[rgba(239,68,68,0.1)]"
                          style={{ border: "1px solid rgba(239,68,68,0.25)" }}>Reject</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-5 flex-1 min-w-0">

          {/* Compliance calendar */}
          <SectionCard title="Upcoming Compliance" action="Full Calendar" actionHref="/compliance/calendar">
            <div className="flex flex-col gap-2">
              {[
                { color: "#ef4444", title: "PF Challan Due",   sub: "15 Nov · 3 days left", badge: "OVERDUE", bv: "danger" as const },
                { color: "#f59e0b", title: "ESI Challan Due",  sub: "15 Nov · 3 days left", badge: "URGENT",  bv: "warning" as const },
                { color: "#f59e0b", title: "PT Payment (MH)",  sub: "30 Nov · 18 days",     badge: "DUE SOON",bv: "warning" as const },
                { color: "#00e5a0", title: "TDS Challan",      sub: "07 Dec · 25 days",     badge: "OK",      bv: "success" as const },
                { color: "#3b82f6", title: "24Q Filing",       sub: "31 Jan · 80 days",     badge: "INFO",    bv: "info" as const },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between px-3 py-2.5 rounded-[10px] transition-colors cursor-pointer"
                  style={{ background: "#070d18", borderLeft: `3px solid ${item.color}` }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = "#0f1c2e"}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = "#070d18"}>
                  <div>
                    <div className="text-[13px] font-500 text-[#c8d8e8]">{item.title}</div>
                    <div className="text-[11px] text-[#3d5166] mt-0.5">{item.sub}</div>
                  </div>
                  <Badge variant={item.bv}>{item.badge}</Badge>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Attrition risk */}
          <SectionCard title="Attrition Risk">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[15px] font-600 text-[#f0f4f8]">Attrition Risk</span>
              <Badge variant="ai"><Zap size={9} /> AI</Badge>
            </div>
            <div className="flex gap-4 items-center">
              <div style={{ width: 120, height: 120, flexShrink: 0 }}>
                <ClientOnly>
                  <RadialBarChart width={120} height={120} cx="50%" cy="50%" innerRadius="35%" outerRadius="95%" barSize={7} data={riskData}>
                    <RadialBar background={{ fill: "#162030" }} dataKey="value" cornerRadius={4} />
                  </RadialBarChart>
                </ClientOnly>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                {[
                  { n: "Pradeep Kumar", d: "Eng L3",  r: "87%", c: "#ef4444", v: "danger" as const },
                  { n: "Anjali Desai",  d: "Mktg",    r: "64%", c: "#f59e0b", v: "warning" as const },
                  { n: "Suresh Nair",   d: "Sales",   r: "58%", c: "#00e5a0", v: "success" as const },
                ].map((emp, i) => (
                  <div key={i} className="flex items-center justify-between text-[12px] pb-2 last:pb-0"
                    style={{ borderBottom: i < 2 ? "1px solid #0e1a28" : "none" }}>
                    <div>
                      <span className="font-500 text-[#c8d8e8]">{emp.n}</span>
                      <span className="text-[#3d5166] ml-2">{emp.d}</span>
                    </div>
                    <Badge variant={emp.v}>{emp.r}</Badge>
                  </div>
                ))}
              </div>
            </div>
            <Link href="/ai/attrition-risk" className="text-[12px] text-[#3b82f6] hover:text-[#60a5fa] flex items-center gap-1 mt-3">
              View Full Report <ArrowRight size={11} />
            </Link>
          </SectionCard>

          {/* Quick actions */}
          <SectionCard title="Quick Actions">
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { icon: UserPlus,    label: "Add Employee",     href: "/employees/add" },
                { icon: FileText,    label: "Generate Payslip", href: "/payroll/payslips/bulk" },
                { icon: Download,    label: "Download Form 16", href: "/tax/form-16" },
                { icon: Upload,      label: "Bulk Import",      href: "/employees/import" },
                { icon: Calculator,  label: "Run FnF",          href: "/fnf/dashboard" },
                { icon: Send,        label: "Send Announcement",href: "/notice-board/alert" },
              ].map((qa, i) => {
                const Icon = qa.icon;
                return (
                  <Link key={i} href={qa.href}
                    className="flex items-center gap-3 px-3 py-3 rounded-[10px] transition-all duration-150 group"
                    style={{ background: "#070d18", border: "1px solid #162030" }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLAnchorElement).style.background = "rgba(0,229,160,0.05)";
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(0,229,160,0.2)";
                      (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLAnchorElement).style.background = "#070d18";
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "#162030";
                      (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                    }}>
                    <div className="w-7 h-7 rounded-[8px] flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(0,229,160,0.1)" }}>
                      <Icon size={13} className="text-[#00e5a0]" />
                    </div>
                    <span className="text-[12px] font-500 text-[#7a8fa6] group-hover:text-[#c8d8e8] transition-colors">{qa.label}</span>
                  </Link>
                );
              })}
            </div>
          </SectionCard>
        </div>
      </div>

      {/* ── Bottom strip ── */}
      <div className="grid grid-cols-3 gap-5 mt-5">

        {/* Activity feed */}
        <SectionCard title="Recent Activity">
          <div className="flex flex-col">
            {[
              { t: "Priya added employee Rahul Sharma", time: "10 min ago", c: "#00e5a0" },
              { t: "Payroll for October locked",        time: "1 hr ago",   c: "#3b82f6" },
              { t: "3 leave requests pending",          time: "2 hrs ago",  c: "#f59e0b" },
              { t: "PF challan generated",              time: "Yesterday",  c: "#00e5a0" },
              { t: "Bulk import: 12 employees added",   time: "2 days ago", c: "#7a8fa6" },
            ].map((feed, i) => (
              <div key={i} className="flex gap-3 py-2.5 transition-colors cursor-default"
                style={{ borderBottom: i < 4 ? "1px solid #0e1a28" : "none" }}>
                <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: feed.c }} />
                <div>
                  <div className="text-[12px] text-[#c8d8e8] leading-snug">{feed.t}</div>
                  <div className="text-[10px] text-[#2a3a4a] mt-0.5">{feed.time}</div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Dept headcount */}
        <SectionCard title="Headcount by Dept">
          <ClientOnly>
            <ResponsiveContainer width="100%" height={190}>
              <BarChart data={deptData} layout="vertical" margin={{ top: 0, right: 32, left: -10, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="d" type="category" axisLine={false} tickLine={false}
                  tick={{ fill: "#3d5166", fontSize: 11 }} width={40} />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(255,255,255,0.02)" }} />
                <Bar dataKey="v" fill="#00e5a0" barSize={12} radius={[0, 4, 4, 0]}
                  label={{ position: "right", fill: "#7a8fa6", fontSize: 11 }} />
              </BarChart>
            </ResponsiveContainer>
          </ClientOnly>
        </SectionCard>

        {/* Birthdays & anniversaries */}
        <SectionCard title="Today & This Week 🎂">
          <div className="flex flex-col gap-3">
            {[
              { init: "R", name: "Rahul Sharma",  ev: "Birthday today!",        c: "#f59e0b", emoji: "🎂" },
              { init: "A", name: "Ananya Patel",  ev: "Birthday tomorrow",      c: "#7a8fa6", emoji: "🎂" },
              { init: "V", name: "Vikram Singh",  ev: "5 year work anniversary", c: "#00e5a0", emoji: "🎊" },
              { init: "P", name: "Pooja Nair",    ev: "2 year work anniversary", c: "#3b82f6", emoji: "🎊" },
            ].map((bd, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-700 flex-shrink-0"
                  style={{ background: `${bd.c}18`, color: bd.c, border: `1px solid ${bd.c}30` }}>
                  {bd.init}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-500 text-[#c8d8e8] truncate">{bd.name} {bd.emoji}</div>
                  <div className="text-[11px] text-[#3d5166]">{bd.ev}</div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
