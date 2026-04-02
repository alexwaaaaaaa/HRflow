"use client";

import React from "react";
import Link from "next/link";
import { ChevronDown, TrendingUp, CheckCircle2 } from "lucide-react";
import { ComposedChart, Line, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, BarChart } from 'recharts';
import { ChartWrapper } from "@/components/ui/chart-wrapper";

// ── Types ────────────────────────────────────────────────────────────────────
type ChallanStatus = "Paid" | "Overdue";
type EventStatus = "overdue" | "urgent" | "pending" | "info";
type TaxRegime = "Old" | "New";

interface MonthlyTds { month: string; oldRegime: number; newRegime: number; total: number; cumulative: number; }
interface ProofEntry { name: string; submitted: number; pending: number; na: number; }
interface EmployeeTds { name: string; ctc: string; regime: TaxRegime; taxable: string; tdsa: string; tdsm: string; id: string; }
interface ChallanRow { quarter: string; amount: string; due: string; status: ChallanStatus; challanNo: string; }

// ── Constants ─────────────────────────────────────────────────────────────────
const MONTHLY_TDS_DATA: MonthlyTds[] = [
    { month: "Apr", oldRegime: 4.8, newRegime: 6.0, total: 10.8, cumulative: 0.108 },
    { month: "May", oldRegime: 4.9, newRegime: 6.2, total: 11.1, cumulative: 0.219 },
    { month: "Jun", oldRegime: 5.0, newRegime: 6.4, total: 11.4, cumulative: 0.333 },
    { month: "Jul", oldRegime: 5.1, newRegime: 6.5, total: 11.6, cumulative: 0.449 },
    { month: "Aug", oldRegime: 5.2, newRegime: 6.6, total: 11.8, cumulative: 0.567 },
    { month: "Sep", oldRegime: 5.3, newRegime: 6.7, total: 12.0, cumulative: 0.687 },
    { month: "Oct", oldRegime: 5.2, newRegime: 6.8, total: 12.0, cumulative: 0.807 },
    { month: "Nov", oldRegime: 5.3, newRegime: 6.9, total: 12.2, cumulative: 0.929 },
];

const PROOF_SUBMISSION_DATA: ProofEntry[] = [
    { name: "80C", submitted: 280, pending: 20, na: 58 },
    { name: "80D", submitted: 150, pending: 45, na: 163 },
    { name: "HRA", submitted: 210, pending: 30, na: 118 },
    { name: "Home Loan", submitted: 85, pending: 15, na: 258 },
    { name: "NPS", submitted: 40, pending: 5, na: 313 },
];

const TOP_EMPLOYEES: EmployeeTds[] = [
    { name: "Priya Mehta", ctc: "\u20b914,40,000", regime: "Old", taxable: "\u20b910,92,000", tdsa: "\u20b91,47,600", tdsm: "\u20b912,300", id: "EMP-0428" },
    { name: "Rohan Desai", ctc: "\u20b918,00,000", regime: "New", taxable: "\u20b914,50,000", tdsa: "\u20b91,89,500", tdsm: "\u20b915,792", id: "EMP-0193" },
    { name: "Kavya Reddy", ctc: "\u20b924,00,000", regime: "New", taxable: "\u20b920,50,000", tdsa: "\u20b93,07,500", tdsm: "\u20b925,625", id: "EMP-0056" },
    { name: "Rahul Sharma", ctc: "\u20b912,00,000", regime: "New", taxable: "\u20b99,50,000", tdsa: "\u20b949,200", tdsm: "\u20b94,100", id: "EMP-0848" },
    { name: "Arjun Nair", ctc: "\u20b936,00,000", regime: "New", taxable: "\u20b931,50,000", tdsa: "\u20b95,85,000", tdsm: "\u20b948,750", id: "EMP-0012" },
];

const REGIME_DONUT = [
    { name: "New Regime", value: 489, fill: "#00E5A0" },
    { name: "Old Regime", value: 358, fill: "#0066FF" },
];

const CHALLAN_DATA: ChallanRow[] = [
    { quarter: "Q1 (Apr-Jun)", amount: "\u20b933.3L", due: "07 Jul", status: "Paid", challanNo: "CHALLAN-001" },
    { quarter: "Q2 (Jul-Sep)", amount: "\u20b935.4L", due: "07 Oct", status: "Paid", challanNo: "CHALLAN-002" },
    { quarter: "Q3 (Oct)", amount: "\u20b912.0L", due: "07 Nov", status: "Overdue", challanNo: "\u2014" },
];

const EVENT_STATUS_COLORS: Record<EventStatus, string> = {
    overdue: "#FF4444", urgent: "#FFB800", pending: "#00E5A0", info: "#0066FF",
};

const CALENDAR_EVENTS: { status: EventStatus; title: string; due: string; link: string; href: string }[] = [
    { status: "overdue", title: "TDS Challan (Oct 2024)", due: "Due 07 Nov \u2192 OVERDUE by 5 days", link: "Pay Now", href: "/tax/challan" },
    { status: "urgent", title: "TDS Challan (Nov 2024)", due: "Due 07 Dec \u2192 25 days remaining", link: "View Options", href: "/tax/challan" },
    { status: "pending", title: "Form 24Q Q3", due: "Due 31 Jan 2025 \u2192 80 days left", link: "Prepare 24Q", href: "/tax/form24q" },
    { status: "info", title: "TDS Return 24Q Q4", due: "Due 31 May 2025", link: "View Schedule", href: "/tax/form24q" },
    { status: "info", title: "Form 16 Issuance", due: "Due 15 Jun 2025 \u2192 After FY close", link: "View Prerequisites", href: "/tax/form-16" },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function TDSDashboard() {
    return (
        <main className="px-8 py-6 max-w-[1200px] mx-auto text-white">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-1 tracking-tight">TDS &amp; Tax Management</h1>
                    <p className="text-sm text-[#8899AA]">FY 2024-25 (AY 2025-26) \u00b7 TechCorp Solutions Pvt. Ltd.</p>
                </div>
                <div className="flex gap-4 items-center">
                    <label htmlFor="fy-select" className="sr-only">Select financial year</label>
                    <button id="fy-select" aria-haspopup="listbox" className="flex items-center gap-2 bg-[#0D1928] border border-[#1A2A3A] rounded-lg px-4 h-11 text-white text-sm cursor-pointer hover:border-[#2A3A4A] transition-colors">
                        FY 2024-25 <ChevronDown size={16} className="text-[#8899AA]" aria-hidden="true" />
                    </button>
                    <Link href="/tax/form16/generate">
                        <button className="h-11 px-6 bg-[#00E5A0] text-[#060B14] text-sm font-bold rounded-lg cursor-pointer flex items-center gap-2 hover:bg-[#00c98d] transition-colors">
                            Generate Form 16
                        </button>
                    </Link>
                </div>
            </header>

            {/* KPI Cards */}
            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5 flex flex-col gap-2 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#00E5A0]/5 transition-all cursor-pointer">
                    <dt className="text-xs text-[#8899AA]">TDS Deducted (YTD)</dt>
                    <dd className="text-[28px] font-bold text-white leading-none">\u20b998,24,000</dd>
                    <p className="text-xs text-[#8899AA]">Apr\u2013Nov 2024 (8 months)</p>
                    <div className="w-full h-1 bg-[#1A2A3A] rounded-full overflow-hidden" role="progressbar" aria-valuenow={67} aria-valuemin={0} aria-valuemax={100} aria-label="67% of FY complete">
                        <div className="h-full bg-[#00E5A0] w-[67%]" />
                    </div>
                    <p className="text-xs text-[#00E5A0] flex items-center gap-1 mt-0.5"><TrendingUp size={14} aria-hidden="true" /> On track</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5 flex flex-col gap-2">
                    <dt className="text-xs text-[#8899AA]">November 2024 TDS</dt>
                    <dd className="text-[28px] font-bold text-white leading-none">\u20b912,24,000</dd>
                    <p className="text-xs text-[#8899AA]">612 employees taxable</p>
                    <p className="text-xs text-[#00E5A0]">+\u20b924K vs Oct</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5 flex flex-col gap-2 hover:border-[#FFB800] transition-colors cursor-pointer">
                    <dt className="text-xs text-[#8899AA]">Proof Submissions</dt>
                    <dd className="text-[28px] font-bold text-[#FFB800] leading-none">47 pending</dd>
                    <p className="text-xs text-[#FF4444]">Deadline: 31 Jan 2025</p>
                    <Link href="/tax/proof-review" className="text-[13px] text-[#0066FF] hover:underline mt-1">Review Now \u2192</Link>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5 flex flex-col gap-2">
                    <dt className="text-xs text-[#8899AA]">Tax Regime</dt>
                    <dd className="sr-only">489 New Regime, 358 Old Regime</dd>
                    <div className="flex items-center gap-4 mt-1" aria-hidden="true">
                        <div className="w-[60px] h-[60px] shrink-0">
                            <ChartWrapper height={60} width={60}>
                                <ChartWrapper height="h-[300px]">
                                    <PieChart>
                                        <Pie data={REGIME_DONUT} dataKey="value" innerRadius={22} outerRadius={30} stroke="none">
                                            {REGIME_DONUT.map((entry) => <Cell key={entry.name} fill={entry.fill} />)}
                                        </Pie>
                                    </PieChart>
                                </ChartWrapper>
                            </ChartWrapper>
                        </div>
                        <div className="flex flex-col gap-2 text-xs text-white">
                            <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#00E5A0] inline-block" /> 489 New</div>
                            <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#0066FF] inline-block" /> 358 Old</div>
                        </div>
                    </div>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5 flex flex-col gap-2">
                    <dt className="text-xs text-[#8899AA]">Form 16 \u2014 FY 2024-25</dt>
                    <dd className="text-lg font-semibold text-[#FFB800] mt-1">\u23f3 Not yet generated</dd>
                    <p className="text-xs text-[#8899AA]">Available after March 2025</p>
                </div>
            </dl>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-[760px_1fr] gap-8">
                {/* Left Column */}
                <div className="flex flex-col gap-6">
                    <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6" aria-labelledby="tds-trend-heading">
                        <div className="flex justify-between items-center mb-5">
                            <h2 id="tds-trend-heading" className="text-base font-semibold text-white m-0">TDS Deduction Trend \u2014 FY 2024-25</h2>
                            <Link href="/tax/computation-detail" className="text-[13px] text-[#0066FF] hover:underline">View Details \u2192</Link>
                        </div>
                        <div className="h-[220px] w-full">
                            <ChartWrapper height={220}>
                                <ChartWrapper height="h-[300px]">
                                    <ComposedChart data={MONTHLY_TDS_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                        <XAxis dataKey="month" stroke="#445566" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis yAxisId="left" stroke="#445566" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v: unknown) => `\u20b9${v as number}L`} />
                                        <YAxis yAxisId="right" orientation="right" stroke="#445566" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v: unknown) => `\u20b9${v as number}Cr`} />
                                        <Tooltip contentStyle={{ background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF" }} itemStyle={{ fontSize: 13 }} cursor={{ fill: "rgba(255,255,255,0.02)" }} />
                                        <Bar yAxisId="left" dataKey="oldRegime" stackId="a" fill="#0066FF" name="Old Regime TDS" maxBarSize={30} radius={[0, 0, 4, 4]} />
                                        <Bar yAxisId="left" dataKey="newRegime" stackId="a" fill="#00E5A0" name="New Regime TDS" radius={[4, 4, 0, 0]} />
                                        <Line yAxisId="right" type="monotone" dataKey="cumulative" stroke="#FFFFFF" strokeWidth={2} dot={{ r: 4, fill: "#0D1928", stroke: "#FFFFFF", strokeWidth: 2 }} name="Cumulative (Cr)" />
                                    </ComposedChart>
                                </ChartWrapper>
                            </ChartWrapper>
                        </div>
                    </section>

                    <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden" aria-labelledby="emp-tds-heading">
                        <div className="flex justify-between items-center px-6 py-4 border-b border-[#1A2A3A]">
                            <h2 id="emp-tds-heading" className="text-base font-semibold text-white m-0">Employee-wise TDS Summary (Top 5)</h2>
                            <Link href="/tax/form-16" className="text-[13px] text-[#0066FF] hover:underline">View All 612 \u2192</Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-[#0A1420] text-[#8899AA] text-xs border-b border-[#1A2A3A]">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left font-semibold uppercase tracking-wider">Employee</th>
                                        <th scope="col" className="px-4 py-3 text-left font-semibold uppercase tracking-wider">Annual CTC</th>
                                        <th scope="col" className="px-4 py-3 text-left font-semibold uppercase tracking-wider">Regime</th>
                                        <th scope="col" className="px-4 py-3 text-left font-semibold uppercase tracking-wider">Taxable Inc.</th>
                                        <th scope="col" className="px-4 py-3 text-left font-semibold uppercase tracking-wider">Annual TDS</th>
                                        <th scope="col" className="px-6 py-3 text-left font-semibold uppercase tracking-wider">Monthly TDS</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#1A2A3A]">
                                    {TOP_EMPLOYEES.map((emp) => (
                                        <Link href={`/tax/computation/${emp.id}`} key={emp.id} legacyBehavior>
                                            <tr className="hover:bg-[#1A2A3A] transition-colors cursor-pointer">
                                                <td className="px-6 py-3 text-white">
                                                    <div className="font-medium">{emp.name}</div>
                                                    <div className="text-xs text-[#8899AA]">{emp.id}</div>
                                                </td>
                                                <td className="px-4 py-3 text-white text-[13px]">{emp.ctc}</td>
                                                <td className="px-4 py-3 text-[13px]">
                                                    <span className={`px-2 py-1 rounded text-[11px] font-semibold ${emp.regime === "New" ? "bg-[#00E5A0]/10 text-[#00E5A0]" : "bg-[#0066FF]/10 text-[#0066FF]"}`}>{emp.regime}</span>
                                                </td>
                                                <td className="px-4 py-3 text-white text-[13px]">{emp.taxable}</td>
                                                <td className="px-4 py-3 text-white text-[13px]">{emp.tdsa}</td>
                                                <td className="px-6 py-3 text-[#00E5A0] text-[13px] font-semibold">{emp.tdsm}</td>
                                            </tr>
                                        </Link>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6" aria-labelledby="tax-calendar-heading">
                        <h2 id="tax-calendar-heading" className="text-base font-semibold text-white mb-4 m-0">Tax &amp; TDS Filing Calendar</h2>
                        <ul className="flex flex-col gap-3" role="list">
                            {CALENDAR_EVENTS.map((event, i) => {
                                const cColor = EVENT_STATUS_COLORS[event.status];
                                return (
                                    <li key={i} className="flex justify-between items-center px-4 py-3 bg-[#060B14] border border-[#1A2A3A] rounded-lg" style={{ borderLeftWidth: 4, borderLeftColor: cColor }}>
                                        <div>
                                            <div className="text-sm font-semibold text-white mb-1">{event.title}</div>
                                            <div className="text-xs" style={{ color: cColor }}>{event.due}</div>
                                        </div>
                                        <Link href={event.href} className="text-[13px] text-[#0066FF] font-medium px-3 py-1.5 border border-[#1A2A3A] rounded-md hover:border-[#0066FF] transition-colors">
                                            {event.link}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-6">
                    <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6" aria-labelledby="proof-heading">
                        <h2 id="proof-heading" className="text-base font-semibold text-white mb-4 m-0">Investment Proof Status</h2>
                        <div className="h-[180px] w-full mb-4">
                            <ChartWrapper height={180}>
                                <ChartWrapper height="h-[300px]">
                                    <BarChart data={PROOF_SUBMISSION_DATA} layout="vertical" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                        <XAxis type="number" hide />
                                        <YAxis dataKey="name" type="category" stroke="#8899AA" fontSize={11} tickLine={false} axisLine={false} />
                                        <Tooltip contentStyle={{ background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8 }} />
                                        <Bar dataKey="submitted" stackId="a" fill="#00E5A0" name="Submitted" barSize={12} radius={[0, 0, 0, 0]} />
                                        <Bar dataKey="pending" stackId="a" fill="#FFB800" name="Pending" />
                                        <Bar dataKey="na" stackId="a" fill="#1A2A3A" name="N/A" radius={[0, 4, 4, 0]} />
                                    </BarChart>
                                </ChartWrapper>
                            </ChartWrapper>
                        </div>
                        <dl className="bg-[#060B14] border border-[#1A2A3A] rounded-xl p-4 text-[13px] text-[#8899AA] mb-4 flex flex-col gap-2">
                            <div className="flex justify-between"><dt>Total declarations (old regime):</dt><dd className="text-white font-medium m-0">358</dd></div>
                            <div className="flex justify-between"><dt>Proofs submitted:</dt><dd className="text-[#00E5A0] font-medium m-0">311 (87%)</dd></div>
                            <div className="flex justify-between"><dt>Pending review:</dt><dd className="text-[#FFB800] font-medium m-0">47</dd></div>
                            <hr className="border-[#1A2A3A] my-1" />
                            <div className="flex justify-between text-[#FF4444]"><dt>Deadline:</dt><dd className="font-medium m-0">31 Jan 2025</dd></div>
                        </dl>
                        <Link href="/tax/proof-review" className="block">
                            <button className="w-full h-10 bg-[#00E5A0] text-[#060B14] text-sm font-semibold rounded-lg hover:bg-[#00c98d] transition-colors cursor-pointer">
                                Review Proofs \u2192
                            </button>
                        </Link>
                    </section>

                    <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6" aria-labelledby="regime-heading">
                        <h2 id="regime-heading" className="text-base font-semibold text-white mb-4 m-0">New vs Old Regime Stats</h2>
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="bg-[#00E5A0]/5 border border-[#00E5A0]/20 rounded-xl p-4">
                                <div className="text-xs font-semibold text-[#00E5A0] mb-2">New Regime (489)</div>
                                <ul className="text-xs text-[#8899AA] flex flex-col gap-1.5">
                                    <li className="text-white">Avg TDS: \u20b91.42L/yr</li>
                                    <li>No declarations</li>
                                    <li>Simpler filing</li>
                                </ul>
                            </div>
                            <div className="bg-[#0066FF]/5 border border-[#0066FF]/20 rounded-xl p-4">
                                <div className="text-xs font-semibold text-[#0066FF] mb-2">Old Regime (358)</div>
                                <ul className="text-xs text-[#8899AA] flex flex-col gap-1.5">
                                    <li className="text-white">Avg TDS: \u20b998K/yr</li>
                                    <li>Avg claims: \u20b93.2L</li>
                                    <li>Proofs required</li>
                                </ul>
                            </div>
                        </div>
                        <div className="text-xs text-[#8899AA] text-center bg-[#060B14] py-2 px-3 rounded-lg border border-dashed border-[#1A2A3A]">
                            Regime Switch Deadline: <span className="text-white font-medium">31 Mar 2025</span>
                        </div>
                    </section>

                    <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden" aria-labelledby="challan-heading">
                        <div className="flex justify-between items-center px-6 py-4 border-b border-[#1A2A3A]">
                            <h2 id="challan-heading" className="text-base font-semibold text-white m-0">Challan Payment Status</h2>
                            <Link href="/tax/challan" className="text-[13px] text-[#0066FF] hover:underline">All Challans \u2192</Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-[#0A1420] border-b border-[#1A2A3A] text-[#8899AA] text-xs">
                                    <tr>
                                        <th scope="col" className="px-6 py-2 text-left font-semibold uppercase tracking-wider">Quarter / Period</th>
                                        <th scope="col" className="px-4 py-2 text-left font-semibold uppercase tracking-wider">Amount</th>
                                        <th scope="col" className="px-4 py-2 text-left font-semibold uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#1A2A3A]">
                                    {CHALLAN_DATA.map((row, i) => (
                                        <tr key={i} className={`transition-colors ${row.status === "Overdue" ? "bg-[#FF4444]/5" : ""}`}>
                                            <td className="px-6 py-3 text-white text-[13px]">
                                                <div>{row.quarter}</div>
                                                <div className="text-xs text-[#8899AA] mt-0.5">Due: {row.due}</div>
                                            </td>
                                            <td className="px-4 py-3 text-white text-[13px]">{row.amount}</td>
                                            <td className="px-4 py-3">
                                                {row.status === "Paid" ? (
                                                    <div className="text-xs text-[#00E5A0] flex items-center gap-1">
                                                        <CheckCircle2 size={14} aria-hidden="true" /> Paid
                                                    </div>
                                                ) : (
                                                    <Link href="/tax/challan">
                                                        <button className="h-7 px-3 bg-transparent border border-[#FF4444] rounded-md text-[#FF4444] text-xs font-semibold cursor-pointer hover:bg-[#FF4444]/10 transition-colors">
                                                            Pay Now
                                                        </button>
                                                    </Link>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
