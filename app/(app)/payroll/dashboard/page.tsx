"use client";

import Link from "next/link";
import {
    PlayCircle, FileText, CheckCircle2, TrendingUp, Users,
    DollarSign, Calendar, ArrowRight, AlertTriangle
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────
interface PendingItem {
    color: string;
    title: string;
    desc: string;
    href: string;
    linkLabel: string;
}

interface ActivityItem {
    color: string;
    text: string;
    time: string;
}

// ── Constants ─────────────────────────────────────────────────────────────────
const PENDING_ITEMS: PendingItem[] = [
    { color: "#FFB800", title: "14 CTC Revisions", desc: "Require approval before next run.", href: "/payroll/ctc-revision", linkLabel: "Review" },
    { color: "#0066FF", title: "Bank Account Verification", desc: "13 Pending Penny Drops.", href: "/payroll-settings/bank-verify", linkLabel: "Execute" },
    { color: "#FF4444", title: "5 F&F Settlements", desc: "Exited employees awaiting payout.", href: "/payroll/fnf", linkLabel: "Process" },
];

const ACTIVITY_LOG: ActivityItem[] = [
    { color: "#00E5A0", text: "System auto-locked attendance.", time: "Today, 02:00 PM" },
    { color: "#FFB800", text: "Arrears computation requested.", time: "Yesterday, 04:15 PM" },
    { color: "#0066FF", text: "October Payroll finalized & disbursed.", time: "28 Oct, 06:10 PM" },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function PayrollMasterDashboard() {
    return (
        <main className="max-w-[1200px] mx-auto px-8 py-8 pb-20 text-white">

            {/* Header */}
            <header className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-2">Payroll Dashboard</h1>
                    <p className="text-sm text-[#8899AA]">Overview of upcoming runs, recent distributions, and compliance alerts.</p>
                </div>
                <Link href="/payroll/run/select-month">
                    <button type="button" className="flex items-center gap-2 h-10 px-5 bg-[#00E5A0] border-none rounded-lg text-[#060B14] text-sm font-semibold cursor-pointer hover:bg-[#00c98d] transition-colors">
                        <PlayCircle size={18} aria-hidden="true" /> Run Payroll
                    </button>
                </Link>
            </header>

            {/* KPI Cards */}
            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-2">
                        <DollarSign size={16} className="text-[#8899AA]" aria-hidden="true" />
                        <dt className="text-[13px] text-[#8899AA]">Oct 2024 Payout (Last)</dt>
                    </div>
                    <dd className="text-2xl font-bold text-white mb-2">&#8377;3.75 Cr</dd>
                    <div className="text-xs text-[#00E5A0] flex items-center gap-1">
                        <TrendingUp size={12} aria-hidden="true" /> +2.4% MoM
                    </div>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-2">
                        <Users size={16} className="text-[#8899AA]" aria-hidden="true" />
                        <dt className="text-[13px] text-[#8899AA]">Employees Paid</dt>
                    </div>
                    <dd className="text-2xl font-bold text-white mb-2">840</dd>
                    <div className="text-xs text-[#8899AA]">Active headcount: 842</div>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-2">
                        <FileText size={16} className="text-[#0066FF]" aria-hidden="true" />
                        <dt className="text-[13px] text-[#8899AA]">Statutory Dues (Due 15th)</dt>
                    </div>
                    <dd className="text-2xl font-bold text-white mb-2">&#8377;42.5 L</dd>
                    <div className="text-xs text-[#FFB800] flex items-center gap-1">
                        <AlertTriangle size={12} aria-hidden="true" /> Pending Challan Gen
                    </div>
                </div>

                <div className="bg-[#FFB800]/5 border border-[#FFB800]/30 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-2">
                        <Calendar size={16} className="text-[#FFB800]" aria-hidden="true" />
                        <dt className="text-[13px] text-[#8899AA]">Next Run Date</dt>
                    </div>
                    <dd className="text-2xl font-bold text-white mb-2">28 Nov</dd>
                    <div className="text-xs text-[#00E5A0] flex items-center gap-1">
                        <CheckCircle2 size={12} aria-hidden="true" /> Attendance Locked
                    </div>
                </div>
            </dl>

            <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6">
                {/* Left Column */}
                <div className="flex flex-col gap-6">
                    {/* Pending Inputs */}
                    <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6" aria-labelledby="pending-inputs-heading">
                        <h2 id="pending-inputs-heading" className="text-base font-semibold text-white mb-4">Pending Inputs (Nov 2024)</h2>
                        <ul role="list" className="flex flex-col gap-3">
                            {PENDING_ITEMS.map((item) => (
                                <li
                                    key={item.href}
                                    className="flex justify-between items-center bg-[#060B14] border border-[#1A2A3A] rounded-lg px-4 py-3"
                                >
                                    <div className="flex items-center gap-3">
                                        <span
                                            className="w-2 h-2 rounded-full shrink-0"
                                            style={{ background: item.color }}
                                            aria-hidden="true"
                                        />
                                        <div>
                                            <div className="text-sm font-medium text-white">{item.title}</div>
                                            <div className="text-xs text-[#8899AA]">{item.desc}</div>
                                        </div>
                                    </div>
                                    <Link href={item.href} className="text-[13px] text-[#00E5A0] hover:underline font-medium">
                                        {item.linkLabel}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Quick Reports */}
                    <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6" aria-labelledby="quick-reports-heading">
                        <div className="flex justify-between items-center mb-4">
                            <h2 id="quick-reports-heading" className="text-base font-semibold text-white">Quick Reports</h2>
                            <Link href="/payroll/reports/variance" className="text-[13px] text-[#8899AA] hover:text-white flex items-center gap-1 transition-colors">
                                View All <ArrowRight size={14} aria-hidden="true" />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { href: "/payroll/reports/variance", title: "Variance Report", desc: "Component MoM comparison." },
                                { href: "/payroll/reports/lop", title: "LOP Detailed Report", desc: "Absenteeism deduction impact." },
                                { href: "/payroll/reports/joiners", title: "Mid-Month Joiners", desc: "Pro-rated salary breakdown." },
                                { href: "/payroll/history", title: "Payroll Registers", desc: "Download historical master files." },
                            ].map((report) => (
                                <Link
                                    key={report.href}
                                    href={report.href}
                                    className="block bg-[#060B14] border border-[#1A2A3A] rounded-lg p-4 hover:border-[#00E5A0]/50 transition-colors group"
                                >
                                    <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-[#00E5A0] transition-colors">{report.title}</h3>
                                    <p className="text-xs text-[#8899AA]">{report.desc}</p>
                                </Link>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-6">
                    {/* Payroll Controls */}
                    <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6" aria-labelledby="controls-heading">
                        <h2 id="controls-heading" className="text-base font-semibold text-white mb-4">Payroll Controls</h2>
                        <nav aria-label="Payroll settings">
                            <ul role="list" className="flex flex-col gap-3">
                                {[
                                    { href: "/payroll-settings/lock", label: "Lock/Unlock Engine" },
                                    { href: "/payroll-settings/cycle", label: "Cycle Settings" },
                                    { href: "/payroll-settings/components", label: "Salary Components" },
                                ].map((control) => (
                                    <li key={control.href}>
                                        <Link
                                            href={control.href}
                                            className="flex justify-between items-center p-3 bg-[#060B14] border border-[#1A2A3A] rounded-lg hover:bg-[#1A2A3A]/30 transition-colors"
                                        >
                                            <span className="text-sm text-[#E5E7EB]">{control.label}</span>
                                            <ArrowRight size={14} className="text-[#8899AA]" aria-hidden="true" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </section>

                    {/* Recent Activity */}
                    <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6" aria-labelledby="activity-heading">
                        <div className="flex justify-between items-center mb-4">
                            <h2 id="activity-heading" className="text-base font-semibold text-white">Recent Activity</h2>
                            <Link href="/payroll/audit" className="text-[13px] text-[#8899AA] hover:text-white transition-colors">
                                Logs
                            </Link>
                        </div>
                        <ol role="list" className="flex flex-col gap-4">
                            {ACTIVITY_LOG.map((item, i) => (
                                <li key={i} className="flex gap-3">
                                    <span
                                        className="w-2 h-2 rounded-full mt-1 shrink-0"
                                        style={{ background: item.color }}
                                        aria-hidden="true"
                                    />
                                    <div>
                                        <div className="text-[13px] text-white mb-0.5">{item.text}</div>
                                        <div className="text-[11px] text-[#8899AA]">{item.time}</div>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </section>
                </div>
            </div>
        </main>
    );
}
