"use client";
import React from "react";
import Link from "next/link";
import {
    ChevronDown, TrendingUp, AlertCircle, FileText, CheckCircle2,
    ChevronRight, Calculator, IndianRupee, ShieldAlert, Award
} from "lucide-react";
import { ComposedChart, Line, Bar, XAxis, YAxis, Tooltip, BarChart as RechartsBarChart } from 'recharts';
import ClientOnly from "@/components/ui/ClientOnly";
import ChartWrapper from '@/components/ui/ChartWrapper';

// ─── Types ────────────────────────────────────────────────────────────────────
type PayrollRunStep = { label: string; state: "done" | "active" | "pending" };
type HistoryRow = { month: string; emp: number; gross: string; net: string; status: string; statusColor: string };
type StatutoryItem = { label: string; status: string; color: string; icon: React.ReactNode };
type QuickAction = { icon: React.ReactNode; label: string; href: string };

// ─── Mock Data ────────────────────────────────────────────────────────────────
const TREND_DATA = [
    { name: "Dec", net: 3.2, pf: 0.15, tds: 0.8, total: 4.15 },
    { name: "Jan", net: 3.3, pf: 0.16, tds: 0.82, total: 4.28 },
    { name: "Feb", net: 3.3, pf: 0.16, tds: 0.85, total: 4.31 },
    { name: "Mar", net: 3.4, pf: 0.17, tds: 0.9, total: 4.47 },
    { name: "Apr", net: 3.6, pf: 0.18, tds: 1.0, total: 4.78 },
    { name: "May", net: 3.6, pf: 0.18, tds: 1.0, total: 4.78 },
    { name: "Jun", net: 3.52, pf: 0.17, tds: 0.95, total: 4.64 },
    { name: "Jul", net: 3.58, pf: 0.17, tds: 0.96, total: 4.71 },
    { name: "Aug", net: 3.64, pf: 0.18, tds: 1.0, total: 4.82 },
    { name: "Sep", net: 3.71, pf: 0.18, tds: 1.1, total: 4.99 },
    { name: "Oct", net: 3.74, pf: 0.18, tds: 1.2, total: 5.12 },
    { name: "Nov", net: 3.82, pf: 0.18, tds: 1.22, total: 5.22 },
];

const DEPT_DATA = [
    { name: "Engineering", value: 1.8 },
    { name: "Sales", value: 0.9 },
    { name: "Operations", value: 0.72 },
    { name: "Marketing", value: 0.42 },
    { name: "HR", value: 0.18 },
    { name: "Finance", value: 0.16 },
];

const HISTORY: HistoryRow[] = [
    { month: "Nov 2024", emp: 847, gross: "₹4.24 Cr", net: "—", status: "In Progress", statusColor: "#FFB800" },
    { month: "Oct 2024", emp: 839, gross: "₹4.12 Cr", net: "₹3.74 Cr", status: "Disbursed", statusColor: "#00E5A0" },
    { month: "Sep 2024", emp: 836, gross: "₹4.08 Cr", net: "₹3.71 Cr", status: "Disbursed", statusColor: "#00E5A0" },
    { month: "Aug 2024", emp: 830, gross: "₹4.01 Cr", net: "₹3.64 Cr", status: "Disbursed", statusColor: "#00E5A0" },
    { month: "Jul 2024", emp: 824, gross: "₹3.95 Cr", net: "₹3.58 Cr", status: "Disbursed", statusColor: "#00E5A0" },
    { month: "Jun 2024", emp: 820, gross: "₹3.89 Cr", net: "₹3.52 Cr", status: "Disbursed", statusColor: "#00E5A0" },
];

const PAYROLL_STEPS: PayrollRunStep[] = [
    { label: "Select Month", state: "done" },
    { label: "Attendance Lock", state: "done" },
    { label: "Employee Summary", state: "done" },
    { label: "Review Gross", state: "done" },
    { label: "Review Deductions", state: "active" },
    { label: "Review Net", state: "pending" },
    { label: "Approve", state: "pending" },
    { label: "Disburse", state: "pending" },
];

const KPI_CARDS = [
    { label: "November Gross", value: "₹4,24,50,000", sub1: "847 employees", sub2: "+₹12L vs Oct", sub2Color: "#00E5A0" },
    { label: "Net Payout", value: "₹3,82,05,000", sub1: "After all deductions", sub2: "⏳ Not yet disbursed", sub2Color: "#FFB800" },
    { label: "Deductions", value: "₹42,45,000", sub1: "PF ₹18.4L | TDS ₹12.2L", sub2: "PT ₹1.6L", sub2Color: "#8899AA" },
    { label: "Employer Cost", value: "₹68,20,000", sub1: "PF + ESI + Gratuity", sub2: "Not deducted from emp", sub2Color: "#8899AA" },
    { label: "Anomalies Detected", value: "3", valueColor: "#FF4444", sub1: "Require attention", sub2: "Resolve →", sub2Color: "#0066FF" },
];

const STATUTORY_ITEMS: StatutoryItem[] = [
    { label: "PF Challan", status: "Due 15 Nov", color: "#FFB800", icon: <AlertCircle size={14} aria-hidden="true" /> },
    { label: "ESI Challan", status: "Due 15 Nov", color: "#FFB800", icon: <AlertCircle size={14} aria-hidden="true" /> },
    { label: "PT Payment", status: "Oct Filed", color: "#00E5A0", icon: <CheckCircle2 size={14} aria-hidden="true" /> },
    { label: "TDS Challan", status: "Oct Filed", color: "#00E5A0", icon: <CheckCircle2 size={14} aria-hidden="true" /> },
];

const QUICK_ACTIONS: QuickAction[] = [
    { icon: <Calculator size={18} aria-hidden="true" />, label: "Run Payroll", href: "/payroll/run/select-month" },
    { icon: <CheckCircle2 size={18} aria-hidden="true" />, label: "Approve Payroll", href: "/payroll/run/approve" },
    { icon: <FileText size={18} aria-hidden="true" />, label: "Generate Payslips", href: "/payroll/payslips/bulk" },
    { icon: <IndianRupee size={18} aria-hidden="true" />, label: "Disburse Salary", href: "/payroll/run/disburse" },
    { icon: <ShieldAlert size={18} aria-hidden="true" />, label: "Run FnF", href: "/payroll/fnf" },
    { icon: <Award size={18} aria-hidden="true" />, label: "Off-cycle Payroll", href: "/off-cycle-payroll" },
];

const LEGEND_ITEMS = [
    { color: "#0066FF", label: "Net Salary" },
    { color: "#FFB800", label: "Employer PF" },
    { color: "#FF4444", label: "TDS" },
    { color: "#00E5A0", label: "Total Cost", isLine: true },
];

const CALENDAR_EVENTS = [
    { color: "#445566", date: "1 Nov", desc: "Payroll month start" },
    { color: "#00E5A0", date: "8 Nov", desc: "Attendance locked", done: true },
    { color: "#FFB800", date: "25 Nov", desc: "Payroll run deadline" },
    { color: "#FF4444", date: "30 Nov", desc: "Salary disbursement day" },
];

// ─── Chart Tooltip Style ──────────────────────────────────────────────────────
const tooltipStyle = { background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8 };
const tooltipItemStyle = { color: "#FFFFFF" };

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function PayrollDashboard() {
    return (
        <main className="max-w-[1200px] mx-auto px-8 py-6 pb-20 animate-fade-in">

            {/* ── Page Header ─────────────────────────────────────────── */}
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-1 tracking-tight">Payroll</h1>
                    <p className="text-sm text-[#8899AA]">TechCorp Solutions · FY 2024-25</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-[#0D1928] border border-[#1A2A3A] rounded-lg px-4 h-11 text-white text-sm cursor-pointer hover:border-[#334455] transition-colors">
                        November 2024 <ChevronDown size={16} className="text-[#8899AA]" aria-hidden="true" />
                    </div>
                    <Link href="/payroll/run/select-month">
                        <button className="h-11 px-6 bg-[#00E5A0] text-[#060B14] text-sm font-bold rounded-lg hover:bg-[#00c890] transition-colors flex items-center gap-2">
                            Run Payroll
                        </button>
                    </Link>
                </div>
            </header>

            {/* ── Payroll Run Status Banner ────────────────────────────── */}
            <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5 md:p-6 mb-6 shadow-sm" aria-labelledby="run-status-heading">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
                    <h2 id="run-status-heading" className="text-base font-semibold text-white m-0">November 2024 Payroll Run</h2>
                    <Link href="/payroll/run/review-deductions">
                        <button className="h-9 px-4 bg-[#00E5A0] text-[#060B14] text-sm font-semibold rounded-lg hover:bg-[#00c890] transition-colors flex items-center gap-1.5 flex-shrink-0">
                            Continue from where you left off <ChevronRight size={14} aria-hidden="true" />
                        </button>
                    </Link>
                </div>

                <ol className="flex items-center justify-between" aria-label="Payroll run progress">
                    {PAYROLL_STEPS.map((step, i, arr) => (
                        <li key={i} className="flex items-center flex-1">
                            <div className="flex flex-col gap-2 items-center relative">
                                <div
                                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold z-10 flex-shrink-0"
                                    style={{
                                        background: step.state === "done" ? "#00E5A0" : step.state === "active" ? "rgba(255,184,0,0.2)" : "#1A2A3A",
                                        color: step.state === "done" ? "#060B14" : step.state === "active" ? "#FFB800" : "#445566",
                                        border: step.state === "active" ? "1px solid #FFB800" : "none",
                                        boxShadow: step.state === "active" ? "0 0 10px rgba(255,184,0,0.5)" : "none",
                                    }}
                                    aria-label={`Step ${i + 1}: ${step.label} — ${step.state}`}
                                >
                                    {step.state === "done" ? <CheckCircle2 size={14} aria-hidden="true" /> : i + 1}
                                </div>
                                <span className="absolute top-8 text-[10px] text-center w-20 leading-tight"
                                    style={{ color: step.state === "pending" ? "#445566" : "#FFFFFF", fontWeight: step.state === "active" ? 600 : 400 }}>
                                    {step.label}
                                </span>
                            </div>
                            {i < arr.length - 1 && (
                                <div className="h-0.5 flex-1 mx-2 mb-4 rounded-full"
                                    style={{ background: step.state === "done" ? "#00E5A0" : "#1A2A3A" }}
                                    aria-hidden="true"
                                />
                            )}
                        </li>
                    ))}
                </ol>
            </section>

            {/* ── KPI Cards ────────────────────────────────────────────── */}
            <dl className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                {KPI_CARDS.map((c, i) => (
                    <div key={i} className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-5 flex flex-col gap-2 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(0,229,160,0.1)] transition-all">
                        <dt className="text-xs text-[#8899AA] font-medium">{c.label}</dt>
                        <dd className="text-2xl font-bold tracking-tight" style={{ color: c.valueColor ?? "#FFFFFF" }}>{c.value}</dd>
                        <p className="text-sm m-0" style={{ color: c.valueColor ? "#8899AA" : "#8899AA" }}>{c.sub1}</p>
                        <p className="text-xs m-0 flex items-center gap-1" style={{ color: c.sub2Color }}>
                            {i === 0 && <TrendingUp size={12} aria-hidden="true" />}
                            {c.sub2}
                        </p>
                    </div>
                ))}
            </dl>

            {/* ── Two-column Layout ────────────────────────────────────── */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6 xl:gap-8">

                {/* Left Column */}
                <div className="flex flex-col gap-6">

                    {/* Payroll Cost Trend Chart */}
                    <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 shadow-sm" aria-labelledby="trend-chart-heading">
                        <div className="flex justify-between items-center mb-5">
                            <h2 id="trend-chart-heading" className="text-base font-semibold text-white m-0">Payroll Cost — Last 12 Months</h2>
                            <Link href="/payroll-comparison" className="text-sm text-[#0066FF] hover:underline">View Details →</Link>
                        </div>
                        <ClientOnly>
                            <ChartWrapper height="h-[220px]">
                                <ComposedChart data={TREND_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                    <XAxis dataKey="name" stroke="#445566" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#445566" fontSize={12} tickLine={false} axisLine={false} tickFormatter={v => `₹${v}Cr`} />
                                    <Tooltip contentStyle={tooltipStyle} itemStyle={tooltipItemStyle} />
                                    <Bar dataKey="net" stackId="a" fill="#0066FF" maxBarSize={30} radius={[0, 0, 4, 4]} name="Net Salary" />
                                    <Bar dataKey="pf" stackId="a" fill="#FFB800" name="Employer PF" />
                                    <Bar dataKey="tds" stackId="a" fill="#FF4444" radius={[4, 4, 0, 0]} name="TDS" />
                                    <Line type="monotone" dataKey="total" stroke="#00E5A0" strokeWidth={3} dot={{ r: 4, fill: "#0D1928", stroke: "#00E5A0", strokeWidth: 2 }} name="Total CTC Cost" />
                                </ComposedChart>
                            </ChartWrapper>
                        </ClientOnly>
                        <div className="flex flex-wrap gap-4 justify-center mt-4 text-xs text-[#8899AA]" aria-label="Chart legend">
                            {LEGEND_ITEMS.map(l => (
                                <div key={l.label} className="flex items-center gap-1.5">
                                    {l.isLine
                                        ? <div className="w-5 h-0.5 rounded-full" style={{ background: l.color }} aria-hidden="true" />
                                        : <div className="w-2 h-2 rounded-full" style={{ background: l.color }} aria-hidden="true" />
                                    }
                                    {l.label}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Department + Statutory */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 shadow-sm" aria-labelledby="dept-chart-heading">
                            <h2 id="dept-chart-heading" className="text-base font-semibold text-white mb-4 m-0">Department-wise (₹ Cr)</h2>
                            <ClientOnly>
                                <ChartWrapper height="h-[180px]">
                                    <RechartsBarChart data={DEPT_DATA} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                                        <XAxis type="number" hide />
                                        <YAxis dataKey="name" type="category" stroke="#8899AA" fontSize={11} width={80} tickLine={false} axisLine={false} />
                                        <Tooltip cursor={{ fill: "rgba(255,255,255,0.05)" }} contentStyle={tooltipStyle} itemStyle={tooltipItemStyle} formatter={(v: unknown) => `₹${(v as number) ?? 0} Cr`} />
                                        <Bar dataKey="value" fill="#00E5A0" radius={[0, 4, 4, 0]} barSize={16} />
                                    </RechartsBarChart>
                                </ChartWrapper>
                            </ClientOnly>
                        </section>

                        <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 shadow-sm" aria-labelledby="statutory-heading">
                            <h2 id="statutory-heading" className="text-base font-semibold text-white mb-4 m-0">Statutory Compliance</h2>
                            <ul className="flex flex-col gap-3 m-0 p-0 list-none">
                                {STATUTORY_ITEMS.map(item => (
                                    <li key={item.label} className="flex justify-between items-center px-3.5 py-2.5 bg-[#060B14] rounded-lg border border-[#1A2A3A]">
                                        <span className="text-sm text-white">{item.label}</span>
                                        <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: item.color }}>
                                            {item.icon} {item.status}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <Link href="/payroll/audit" className="text-sm text-[#0066FF] text-center block mt-4 hover:underline">
                                Go to Compliance →
                            </Link>
                        </section>
                    </div>

                    {/* Payroll History Table */}
                    <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-sm" aria-labelledby="history-heading">
                        <div className="flex justify-between items-center px-6 py-4 border-b border-[#1A2A3A]">
                            <h2 id="history-heading" className="text-base font-semibold text-white m-0">Payroll History</h2>
                            <Link href="/payroll/history" className="text-sm text-[#0066FF] hover:underline">View All →</Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse min-w-[540px]">
                                <thead>
                                    <tr className="border-b border-[#1A2A3A] text-left">
                                        {["Month", "Employees", "Gross", "Net", "Status", "Action"].map(col => (
                                            <th key={col} scope="col" className="px-6 py-3 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">{col}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#1A2A3A]">
                                    {HISTORY.map((row, i) => (
                                        <tr key={i} className="text-sm hover:bg-[#1A2A3A]/30 transition-colors">
                                            <td className="px-6 py-3.5 text-white font-medium">{row.month}</td>
                                            <td className="px-6 py-3.5 text-[#8899AA]">{row.emp}</td>
                                            <td className="px-6 py-3.5 text-white">{row.gross}</td>
                                            <td className="px-6 py-3.5 text-white">{row.net}</td>
                                            <td className="px-6 py-3.5">
                                                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold" style={{ color: row.statusColor, background: `${row.statusColor}1A` }}>
                                                    {row.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-3.5">
                                                <Link href={row.net === "—" ? "/payroll/run/review-deductions" : "/payroll/history"}
                                                    className="text-[#0066FF] font-medium hover:underline">
                                                    {row.net === "—" ? "Continue" : "View"}
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>

                {/* Right Column */}
                <aside className="flex flex-col gap-6">
                    {/* Quick Actions */}
                    <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 shadow-sm" aria-labelledby="quick-actions-heading">
                        <h2 id="quick-actions-heading" className="text-base font-semibold text-white mb-4 m-0">Quick Actions</h2>
                        <div className="grid grid-cols-2 gap-3">
                            {QUICK_ACTIONS.map(action => (
                                <Link key={action.label} href={action.href} className="no-underline">
                                    <div className="p-3 bg-[#060B14] border border-[#1A2A3A] rounded-xl flex flex-col gap-3 text-white cursor-pointer hover:border-[#334455] hover:bg-[#0D1928] transition-all group">
                                        <div className="text-[#00E5A0] group-hover:scale-110 transition-transform">{action.icon}</div>
                                        <div className="text-xs font-medium leading-tight">{action.label}</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>

                    {/* Payroll Calendar */}
                    <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 shadow-sm" aria-labelledby="calendar-heading">
                        <h2 id="calendar-heading" className="text-base font-semibold text-white mb-4 m-0">Payroll Calendar</h2>
                        <div className="bg-[#060B14] border border-[#1A2A3A] rounded-xl p-4 mb-4">
                            <div className="text-sm font-semibold text-white mb-4">November 2024</div>
                            <ul className="flex flex-col gap-3 m-0 p-0 list-none">
                                {CALENDAR_EVENTS.map(ev => (
                                    <li key={ev.date} className="flex gap-3 items-start text-sm">
                                        <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: ev.color }} aria-hidden="true" />
                                        <div>
                                            <span className="text-white">{ev.date}:</span>
                                            <span className="text-[#8899AA] ml-1.5">{ev.desc}</span>
                                            {ev.done && <CheckCircle2 size={12} className="inline ml-1.5 mb-0.5" style={{ color: "#00E5A0" }} aria-label="Completed" />}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button className="w-full h-9 bg-transparent border border-[#1A2A3A] hover:border-[#334455] rounded-lg text-sm text-[#8899AA] hover:text-white transition-all">
                            Add to Google Calendar
                        </button>
                    </section>
                </aside>
            </div>
        </main>
    );
}
