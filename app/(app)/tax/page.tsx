"use client";

import React from "react";
import Link from "next/link";
import { TrendingUp, CheckCircle2 } from "lucide-react";
import { ComposedChart, Line, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, BarChart } from "recharts";
import { ChartWrapper } from "@/components/ui/ChartMountGate";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ── Types ────────────────────────────────────────────────────────────────────
type ChallanStatus = "Paid" | "Overdue";
type EventStatus = "overdue" | "urgent" | "pending" | "info";
type TaxRegime = "Old" | "New";

interface MonthlyTds { month: string; oldRegime: number; newRegime: number; total: number; cumulative: number; }
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

const PROOF_SUBMISSION_DATA = [
    { name: "80C", submitted: 280, pending: 20, na: 58 },
    { name: "80D", submitted: 150, pending: 45, na: 163 },
    { name: "HRA", submitted: 210, pending: 30, na: 118 },
    { name: "Home Loan", submitted: 85, pending: 15, na: 258 },
    { name: "NPS", submitted: 40, pending: 5, na: 313 },
];

const TOP_EMPLOYEES: EmployeeTds[] = [
    { name: "Priya Mehta", ctc: "₹14,40,000", regime: "Old", taxable: "₹10,92,000", tdsa: "₹1,47,600", tdsm: "₹12,300", id: "EMP-0428" },
    { name: "Rohan Desai", ctc: "₹18,00,000", regime: "New", taxable: "₹14,50,000", tdsa: "₹1,89,500", tdsm: "₹15,792", id: "EMP-0193" },
    { name: "Kavya Reddy", ctc: "₹24,00,000", regime: "New", taxable: "₹20,50,000", tdsa: "₹3,07,500", tdsm: "₹25,625", id: "EMP-0056" },
    { name: "Rahul Sharma", ctc: "₹12,00,000", regime: "New", taxable: "₹9,50,000", tdsa: "₹49,200", tdsm: "₹4,100", id: "EMP-0848" },
    { name: "Arjun Nair", ctc: "₹36,00,000", regime: "New", taxable: "₹31,50,000", tdsa: "₹5,85,000", tdsm: "₹48,750", id: "EMP-0012" },
];

const REGIME_DONUT = [
    { name: "New Regime", value: 489, fill: "#00E5A0" },
    { name: "Old Regime", value: 358, fill: "#0066FF" },
];

const CHALLAN_DATA: ChallanRow[] = [
    { quarter: "Q1 (Apr-Jun)", amount: "₹33.3L", due: "07 Jul", status: "Paid", challanNo: "CHALLAN-001" },
    { quarter: "Q2 (Jul-Sep)", amount: "₹35.4L", due: "07 Oct", status: "Paid", challanNo: "CHALLAN-002" },
    { quarter: "Q3 (Oct)", amount: "₹12.0L", due: "07 Nov", status: "Overdue", challanNo: "—" },
];

const EVENT_STATUS_CLASSES: Record<EventStatus, { border: string; text: string }> = {
    overdue: { border: "border-l-[#FF4444]", text: "text-[#FF4444]" },
    urgent: { border: "border-l-[#FFB800]", text: "text-[#FFB800]" },
    pending: { border: "border-l-[#00E5A0]", text: "text-[#00E5A0]" },
    info: { border: "border-l-[#0066FF]", text: "text-[#0066FF]" },
};

const CALENDAR_EVENTS: { status: EventStatus; title: string; due: string; link: string; href: string }[] = [
    { status: "overdue", title: "TDS Challan (Oct 2024)", due: "Due 07 Nov → OVERDUE by 5 days", link: "Pay Now", href: "/tax/challan" },
    { status: "urgent", title: "TDS Challan (Nov 2024)", due: "Due 07 Dec → 25 days remaining", link: "View Options", href: "/tax/challan" },
    { status: "pending", title: "Form 24Q Q3", due: "Due 31 Jan 2025 → 80 days left", link: "Prepare 24Q", href: "/tax/form24q" },
    { status: "info", title: "TDS Return 24Q Q4", due: "Due 31 May 2025", link: "View Schedule", href: "/tax/form24q" },
    { status: "info", title: "Form 16 Issuance", due: "Due 15 Jun 2025 → After FY close", link: "View Prerequisites", href: "/tax/form-16" },
];

const REGIME_VARIANT: Record<TaxRegime, string> = {
    New: "bg-[#00E5A0]/10 text-[#00E5A0]",
    Old: "bg-[#0066FF]/10 text-[#0066FF]",
};

const EMP_COLUMNS: Column<EmployeeTds>[] = [
    {
        key: "employee",
        label: "Employee",
        render: (emp) => (
            <div>
                <p className="text-sm font-medium text-white">{emp.name}</p>
                <p className="text-xs text-[#8899AA]">{emp.id}</p>
            </div>
        ),
        sortable: true,
        sortValue: (emp) => emp.name,
    },
    { key: "ctc", label: "Annual CTC", render: (emp) => <span className="text-sm text-white">{emp.ctc}</span> },
    {
        key: "regime",
        label: "Regime",
        render: (emp) => (
            <span className={`px-2 py-1 rounded text-[11px] font-semibold ${REGIME_VARIANT[emp.regime]}`}>{emp.regime}</span>
        ),
    },
    { key: "taxable", label: "Taxable Inc.", render: (emp) => <span className="text-sm text-white">{emp.taxable}</span> },
    { key: "tdsa", label: "Annual TDS", render: (emp) => <span className="text-sm text-white">{emp.tdsa}</span> },
    { key: "tdsm", label: "Monthly TDS", render: (emp) => <span className="text-sm font-semibold text-[#00E5A0]">{emp.tdsm}</span> },
];

const CHALLAN_COLUMNS: Column<ChallanRow>[] = [
    {
        key: "quarter",
        label: "Quarter / Period",
        render: (row) => (
            <div>
                <p className="text-sm text-white">{row.quarter}</p>
                <p className="text-xs text-[#8899AA]">Due: {row.due}</p>
            </div>
        ),
    },
    { key: "amount", label: "Amount", render: (row) => <span className="text-sm text-white">{row.amount}</span> },
    {
        key: "status",
        label: "Status",
        render: (row) =>
            row.status === "Paid" ? (
                <div className="flex items-center gap-1 text-xs text-[#00E5A0]">
                    <CheckCircle2 size={14} aria-hidden="true" /> Paid
                </div>
            ) : (
                <Button variant="danger" size="sm" href="/tax/challan">Pay Now</Button>
            ),
    },
];

export default function TDSDashboard() {
    return (
        <Page
            title="TDS & Tax Management"
            subtitle="FY 2024-25 (AY 2025-26) · TechCorp Solutions Pvt. Ltd."
            breadcrumbs={[{ label: "Tax", href: "/tax/dashboard" }, { label: "TDS Dashboard" }]}
            maxWidth="1200px"
            actions={
                <Button href="/tax/form16-generator">Generate Form 16</Button>
            }
        >
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                <Card padding="md" className="flex flex-col gap-2 hover:-translate-y-0.5 hover:shadow-lg transition-all cursor-pointer">
                    <p className="text-xs text-[#8899AA]">TDS Deducted (YTD)</p>
                    <p className="text-[28px] font-bold text-white leading-none">₹98,24,000</p>
                    <p className="text-xs text-[#8899AA]">Apr–Nov 2024 (8 months)</p>
                    <div className="w-full h-1 bg-[#1A2A3A] rounded-full overflow-hidden" role="progressbar" aria-valuenow={67} aria-valuemin={0} aria-valuemax={100} aria-label="67% of FY complete">
                        <div className="h-full bg-[#00E5A0] w-[67%]" />
                    </div>
                    <p className="text-xs text-[#00E5A0] flex items-center gap-1 mt-0.5"><TrendingUp size={14} aria-hidden="true" /> On track</p>
                </Card>
                <Card padding="md" className="flex flex-col gap-2">
                    <p className="text-xs text-[#8899AA]">November 2024 TDS</p>
                    <p className="text-[28px] font-bold text-white leading-none">₹12,24,000</p>
                    <p className="text-xs text-[#8899AA]">612 employees taxable</p>
                    <p className="text-xs text-[#00E5A0]">+₹24K vs Oct</p>
                </Card>
                <Card padding="md" className="flex flex-col gap-2 hover:border-[#FFB800] transition-colors cursor-pointer">
                    <p className="text-xs text-[#8899AA]">Proof Submissions</p>
                    <p className="text-[28px] font-bold text-[#FFB800] leading-none">47 pending</p>
                    <p className="text-xs text-[#FF4444]">Deadline: 31 Jan 2025</p>
                    <Link href="/tax/proof-review" className="text-[13px] text-[#0066FF] hover:underline mt-1">Review Now →</Link>
                </Card>
                <Card padding="md" className="flex flex-col gap-2">
                    <p className="text-xs text-[#8899AA]">Tax Regime</p>
                    <p className="sr-only">489 New Regime, 358 Old Regime</p>
                    <div className="flex items-center gap-4 mt-1" aria-hidden="true">
                        <div className="w-[60px] h-[60px] shrink-0">
                            <ChartWrapper height={60} width={60}>
                                <PieChart>
                                    <Pie data={REGIME_DONUT} dataKey="value" innerRadius={22} outerRadius={30} stroke="none">
                                        {REGIME_DONUT.map((entry) => <Cell key={entry.name} fill={entry.fill} />)}
                                    </Pie>
                                </PieChart>
                            </ChartWrapper>
                        </div>
                        <div className="flex flex-col gap-2 text-xs text-white">
                            <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#00E5A0] inline-block" /> 489 New</div>
                            <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#0066FF] inline-block" /> 358 Old</div>
                        </div>
                    </div>
                </Card>
                <Card padding="md" className="flex flex-col gap-2">
                    <p className="text-xs text-[#8899AA]">Form 16 — FY 2024-25</p>
                    <p className="text-lg font-semibold text-[#FFB800] mt-1">⏳ Not yet generated</p>
                    <p className="text-xs text-[#8899AA]">Available after March 2025</p>
                </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-[760px_1fr] gap-8">
                {/* Left Column */}
                <div className="flex flex-col gap-6">
                    <Card padding="lg">
                        <div className="flex justify-between items-center mb-5">
                            <h2 className="text-base font-semibold text-white">TDS Deduction Trend — FY 2024-25</h2>
                            <Link href="/tax/computation-detail" className="text-[13px] text-[#0066FF] hover:underline">View Details →</Link>
                        </div>
                        <div className="h-[220px] w-full">
                            <ChartWrapper height={220}>
                                <ComposedChart data={MONTHLY_TDS_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                    <XAxis dataKey="month" stroke="#445566" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis yAxisId="left" stroke="#445566" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v: unknown) => `₹${v as number}L`} />
                                    <YAxis yAxisId="right" orientation="right" stroke="#445566" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v: unknown) => `₹${v as number}Cr`} />
                                    <Tooltip contentStyle={{ background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8, color: "#FFFFFF" }} itemStyle={{ fontSize: 13 }} cursor={{ fill: "rgba(255,255,255,0.02)" }} />
                                    <Bar yAxisId="left" dataKey="oldRegime" stackId="a" fill="#0066FF" name="Old Regime TDS" maxBarSize={30} radius={[0, 0, 4, 4]} />
                                    <Bar yAxisId="left" dataKey="newRegime" stackId="a" fill="#00E5A0" name="New Regime TDS" radius={[4, 4, 0, 0]} />
                                    <Line yAxisId="right" type="monotone" dataKey="cumulative" stroke="#FFFFFF" strokeWidth={2} dot={{ r: 4, fill: "#0D1928", stroke: "#FFFFFF", strokeWidth: 2 }} name="Cumulative (Cr)" />
                                </ComposedChart>
                            </ChartWrapper>
                        </div>
                    </Card>

                    <Card padding="none">
                        <div className="flex justify-between items-center px-6 py-4 border-b border-[#1A2A3A]">
                            <h2 className="text-base font-semibold text-white">Employee-wise TDS Summary (Top 5)</h2>
                            <Link href="/tax/form-16" className="text-[13px] text-[#0066FF] hover:underline">View All 612 →</Link>
                        </div>
                        <DataTable<EmployeeTds>
                            data={TOP_EMPLOYEES}
                            columns={EMP_COLUMNS}
                            rowKey={(emp) => emp.id}
                            aria-label="Employee TDS Summary"
                            emptyTitle="No employees found"
                        />
                    </Card>

                    <Card padding="lg">
                        <h2 className="text-base font-semibold text-white mb-4">Tax & TDS Filing Calendar</h2>
                        <ul className="flex flex-col gap-3" role="list">
                            {CALENDAR_EVENTS.map((event, i) => {
                                const cls = EVENT_STATUS_CLASSES[event.status];
                                return (
                                    <li key={i} className={`flex justify-between items-center px-4 py-3 bg-[#060B14] border border-[#1A2A3A] border-l-4 rounded-lg ${cls.border}`}>
                                        <div>
                                            <div className="text-sm font-semibold text-white mb-1">{event.title}</div>
                                            <div className={`text-xs ${cls.text}`}>{event.due}</div>
                                        </div>
                                        <Link href={event.href} className="text-[13px] text-[#0066FF] font-medium px-3 py-1.5 border border-[#1A2A3A] rounded-md hover:border-[#0066FF] transition-colors">
                                            {event.link}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </Card>
                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-6">
                    <Card padding="lg">
                        <h2 className="text-base font-semibold text-white mb-4">Investment Proof Status</h2>
                        <div className="h-[180px] w-full mb-4">
                            <ChartWrapper height={180}>
                                <BarChart data={PROOF_SUBMISSION_DATA} layout="vertical" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="name" type="category" stroke="#8899AA" fontSize={11} tickLine={false} axisLine={false} />
                                    <Tooltip contentStyle={{ background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8 }} />
                                    <Bar dataKey="submitted" stackId="a" fill="#00E5A0" name="Submitted" barSize={12} />
                                    <Bar dataKey="pending" stackId="a" fill="#FFB800" name="Pending" />
                                    <Bar dataKey="na" stackId="a" fill="#1A2A3A" name="N/A" radius={[0, 4, 4, 0]} />
                                </BarChart>
                            </ChartWrapper>
                        </div>
                        <dl className="bg-[#060B14] border border-[#1A2A3A] rounded-xl p-4 text-[13px] text-[#8899AA] mb-4 flex flex-col gap-2">
                            <div className="flex justify-between"><dt>Total declarations (old regime):</dt><dd className="text-white font-medium">358</dd></div>
                            <div className="flex justify-between"><dt>Proofs submitted:</dt><dd className="text-[#00E5A0] font-medium">311 (87%)</dd></div>
                            <div className="flex justify-between"><dt>Pending review:</dt><dd className="text-[#FFB800] font-medium">47</dd></div>
                            <hr className="border-[#1A2A3A] my-1" />
                            <div className="flex justify-between text-[#FF4444]"><dt>Deadline:</dt><dd className="font-medium">31 Jan 2025</dd></div>
                        </dl>
                        <Button className="w-full" href="/tax/proof-review">Review Proofs →</Button>
                    </Card>

                    <Card padding="lg">
                        <h2 className="text-base font-semibold text-white mb-4">New vs Old Regime Stats</h2>
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="bg-[#00E5A0]/5 border border-[#00E5A0]/20 rounded-xl p-4">
                                <div className="text-xs font-semibold text-[#00E5A0] mb-2">New Regime (489)</div>
                                <ul className="text-xs text-[#8899AA] flex flex-col gap-1.5">
                                    <li className="text-white">Avg TDS: ₹1.42L/yr</li>
                                    <li>No declarations</li>
                                    <li>Simpler filing</li>
                                </ul>
                            </div>
                            <div className="bg-[#0066FF]/5 border border-[#0066FF]/20 rounded-xl p-4">
                                <div className="text-xs font-semibold text-[#0066FF] mb-2">Old Regime (358)</div>
                                <ul className="text-xs text-[#8899AA] flex flex-col gap-1.5">
                                    <li className="text-white">Avg TDS: ₹98K/yr</li>
                                    <li>Avg claims: ₹3.2L</li>
                                    <li>Proofs required</li>
                                </ul>
                            </div>
                        </div>
                        <div className="text-xs text-[#8899AA] text-center bg-[#060B14] py-2 px-3 rounded-lg border border-dashed border-[#1A2A3A]">
                            Regime Switch Deadline: <span className="text-white font-medium">31 Mar 2025</span>
                        </div>
                    </Card>

                    <Card padding="none">
                        <div className="flex justify-between items-center px-6 py-4 border-b border-[#1A2A3A]">
                            <h2 className="text-base font-semibold text-white">Challan Payment Status</h2>
                            <Link href="/tax/challan" className="text-[13px] text-[#0066FF] hover:underline">All Challans →</Link>
                        </div>
                        <DataTable<ChallanRow>
                            data={CHALLAN_DATA}
                            columns={CHALLAN_COLUMNS}
                            rowKey={(row) => row.quarter}
                            aria-label="Challan Payment Status"
                            emptyTitle="No challans found"
                        />
                    </Card>
                </div>
            </div>
        </Page>
    );
}
