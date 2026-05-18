"use client";

import React, { useState } from "react";
import { TrendingUp, Users, FileText, Shield, FileCheck, Upload, Search, Bell, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from "recharts";
import Link from "next/link";
import ChartWrapper from "@/components/ui/ChartWrapper";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// ── Constants ─────────────────────────────────────────────────────────────────
const COLLECTION_DATA = [
    { month: "Apr", actual: 582000, projected: null },
    { month: "May", actual: 590000, projected: null },
    { month: "Jun", actual: 605000, projected: null },
    { month: "Jul", actual: 612000, projected: null },
    { month: "Aug", actual: 628000, projected: null },
    { month: "Sep", actual: 635000, projected: null },
    { month: "Oct", actual: 582000, projected: null },
    { month: "Nov", actual: 645000, projected: null },
    { month: "Dec", actual: null, projected: 650000 },
    { month: "Jan", actual: null, projected: 660000 },
    { month: "Feb", actual: null, projected: 670000 },
    { month: "Mar", actual: null, projected: 700000 },
];

const PIE_DATA = [
    { name: "Old Regime", value: 218, color: "#0066FF" },
    { name: "New Regime", value: 126, color: "#00E5A0" },
];

const DASHBOARD_STATS = [
    { title: "Total TDS Deducted (FY)", value: "₹68,42,800", subtext: "₹6,45,800 this month (Nov)", icon: TrendingUp, iconColor: "text-[#00E5A0]", progress: 58, progressColor: "bg-[#00E5A0]" },
    { title: "Employees Covered", value: "344", subtext: "Old Regime: 218 | New Regime: 126", icon: Users, iconColor: "text-[#0066FF]", progress: 100, progressColor: "bg-[#0066FF]", split: { val1: 63.4, val2: 36.6 } },
    { title: "Declarations Received", value: "291/344", subtext: "53 employees yet to declare", icon: FileText, iconColor: "text-[#FFB800]", progress: 84.6, progressColor: "bg-[#FFB800]" },
    { title: "Challan Status", value: "Q2 Filed", valueColor: "text-[#00E5A0]", subtext: "Q3 due: 15/01/2025 (47 days)", icon: Shield, iconColor: "text-[#00E5A0]", progress: 100, progressColor: "bg-[#00E5A0]" },
];

export default function TDSDashboard() {
    const [selectedFY, setSelectedFY] = useState("2024-25");

    return (
        <Page
            title="Tax & TDS Dashboard"
            subtitle={`Manage FY ${selectedFY} TDS deductions, declarations, and compliance`}
            breadcrumbs={[{ label: "Tax", href: "/tax" }, { label: "Dashboard" }]}
            maxWidth="1200px"
            actions={
                <select
                    value={selectedFY}
                    onChange={(e) => setSelectedFY(e.target.value)}
                    aria-label="Select financial year"
                    className="bg-[#0D1928] border border-[#1A2A3A] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#00E5A0]"
                >
                    <option value="2024-25">FY 2024-25</option>
                    <option value="2023-24">FY 2023-24</option>
                </select>
            }
        >
            <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {DASHBOARD_STATS.map((stat, idx) => (
                        <Card key={idx} padding="md" className="hover:scale-[1.02] hover:border-[#2A3A4A] transition-all duration-200">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-2 rounded-lg bg-[#0D1928] ${stat.iconColor}`}>
                                    <stat.icon size={20} aria-hidden="true" />
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-[#8899AA] mb-1">{stat.title}</p>
                                <h3 className={`text-2xl font-bold ${stat.valueColor ?? "text-white"}`}>
                                    {stat.value}
                                    {stat.title === "Challan Status" && <CheckCircle2 className="inline ml-2 text-[#00E5A0]" size={20} aria-hidden="true" />}
                                </h3>
                                <p className={`text-xs mt-2 ${stat.title === "Challan Status" || stat.title === "Employees Covered" ? "text-[#8899AA]" : stat.iconColor}`}>
                                    {stat.subtext}
                                </p>
                            </div>
                            <div className="mt-4 h-1.5 w-full bg-[#1A2A3A] rounded-full overflow-hidden flex" role="progressbar" aria-valuenow={stat.progress} aria-valuemin={0} aria-valuemax={100} aria-label={`${stat.title} progress`}>
                                {stat.split ? (
                                    <>
                                        <div className="bg-[#0066FF] h-full" style={{ width: `${stat.split.val1}%` }} />
                                        <div className="bg-[#00E5A0] h-full" style={{ width: `${stat.split.val2}%` }} />
                                    </>
                                ) : (
                                    <div className={`${stat.progressColor} h-full rounded-full`} style={{ width: `${stat.progress}%` }} />
                                )}
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Monthly Trend */}
                    <Card padding="lg" className="lg:col-span-8">
                        <h3 className="text-base font-semibold text-white mb-6">Monthly TDS Deducted — FY {selectedFY}</h3>
                        <div className="h-[240px]">
                            <ChartWrapper height="h-[300px]">
                                <AreaChart data={COLLECTION_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#0066FF" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#0066FF" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8899AA" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#8899AA" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                    <XAxis dataKey="month" stroke="#8899AA" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#8899AA" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val / 100000}L`} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: "#0D1928", borderColor: "#1A2A3A", borderRadius: "8px" }}
                                        itemStyle={{ color: "#E2E8F0" }}
                                        formatter={(value: unknown) => [`₹${(value as number).toLocaleString()}`, "Amount"]}
                                    />
                                    <Area type="monotone" dataKey="actual" stroke="#0066FF" strokeWidth={2} fillOpacity={1} fill="url(#colorActual)" />
                                    <Area type="monotone" dataKey="projected" stroke="#8899AA" strokeWidth={2} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorProjected)" />
                                </AreaChart>
                            </ChartWrapper>
                        </div>
                        <div className="flex justify-center mt-4 gap-6 text-sm text-[#8899AA]">
                            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#0066FF] rounded-sm" /> Actual TDS</div>
                            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#8899AA] rounded-sm border border-dashed border-[#8899AA]" /> Projected TDS</div>
                        </div>
                    </Card>

                    {/* Liability Clock */}
                    <Card padding="lg" className="lg:col-span-4 flex flex-col justify-between">
                        <h3 className="text-base font-semibold text-white">Annual Tax Liability Coverage</h3>
                        <div className="flex-grow flex items-center justify-center relative">
                            <div className="relative w-48 h-48">
                                <svg className="w-full h-full -rotate-90" aria-hidden="true">
                                    <circle cx="96" cy="96" r="80" fill="none" stroke="#1A2A3A" strokeWidth="16" />
                                    <circle cx="96" cy="96" r="80" fill="none" stroke="#00E5A0" strokeWidth="16" strokeDasharray="502" strokeDashoffset="85" className="transition-all duration-1000 ease-out" />
                                </svg>
                                <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center" aria-label="83% covered">
                                    <span className="text-3xl font-bold text-white">83%</span>
                                    <span className="text-xs text-[#00E5A0] font-medium mt-1">Covered</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-center mb-4">
                            <p className="text-sm text-[#c8d8e8]">₹1,36,800 remaining</p>
                            <p className="text-xs text-[#00E5A0]">4 months left</p>
                        </div>
                        <div className="space-y-2 pt-4 border-t border-[#1A2A3A]">
                            <div className="flex justify-between items-center text-xs">
                                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500" /><span className="text-[#c8d8e8]">Under-deducted</span></div>
                                <span className="font-medium text-white">22 emp</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#FFB800]" /><span className="text-[#c8d8e8]">Over-deducted</span></div>
                                <span className="font-medium text-white">8 emp</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#00E5A0]" /><span className="text-[#c8d8e8]">On track</span></div>
                                <span className="font-medium text-white">314 emp</span>
                            </div>
                            <Link href="/tax/computation-detail" className="block text-xs text-[#0066FF] hover:text-blue-400 text-center mt-3 font-medium">
                                View Details →
                            </Link>
                        </div>
                    </Card>
                </div>

                {/* Status & Timeline */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Declaration Status */}
                    <Card padding="lg">
                        <h3 className="text-base font-semibold text-white mb-4">Declaration Status</h3>
                        <div className="space-y-1">
                            {[
                                { icon: CheckCircle2, iconClass: "text-[#00E5A0]", label: "Declarations Submitted", count: "291 emp", countClass: "bg-[#00E5A0]/10 text-[#00E5A0]", href: "/tax/declarations", linkText: "View →" },
                                { icon: Clock, iconClass: "text-[#FFB800]", label: "Declarations Pending", count: "53 emp", countClass: "bg-[#FFB800]/10 text-[#FFB800]", href: null, linkText: "Remind →" },
                                { icon: Upload, iconClass: "text-[#0066FF]", label: "Proofs Uploaded", count: "218 emp", countClass: "bg-[#0066FF]/10 text-[#0066FF]", href: "/tax/proofs/upload", linkText: "Review →" },
                                { icon: Search, iconClass: "text-indigo-400", label: "Proofs Under Review", count: "34 emp", countClass: "bg-indigo-400/10 text-indigo-400", href: "/tax/verification", linkText: "Process →" },
                                { icon: AlertCircle, iconClass: "text-red-500", label: "Proofs Rejected", count: "12 emp", countClass: "bg-red-500/10 text-red-500", href: null, linkText: "Notify →" },
                            ].map((item, i) => (
                                <div key={i} className="flex justify-between items-center p-3 hover:bg-[#0D1928] rounded-lg transition-colors border-b border-[#1A2A3A] last:border-b-0">
                                    <div className="flex items-center gap-3">
                                        <item.icon size={18} className={item.iconClass} aria-hidden="true" />
                                        <span className="text-[#c8d8e8] text-sm">{item.label}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className={`${item.countClass} px-2 py-0.5 rounded text-xs font-medium`}>{item.count}</span>
                                        {item.href ? (
                                            <Link href={item.href} className="text-[#0066FF] text-xs hover:underline w-16 text-right">{item.linkText}</Link>
                                        ) : (
                                            <Button variant="ghost" size="sm" className="text-xs w-16 text-right">{item.linkText}</Button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button variant="ghost" className="mt-4 w-full border border-[#00E5A0]/20 text-[#00E5A0]" icon={<Bell size={16} />}>
                            Send Bulk Reminder to 53 employees
                        </Button>
                    </Card>

                    {/* Compliance Timeline */}
                    <Card padding="lg">
                        <h3 className="text-base font-semibold text-white mb-4">Upcoming TDS Deadlines</h3>
                        <div className="relative pl-6 space-y-6">
                            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[#1A2A3A]" aria-hidden="true" />
                            {[
                                { date: "Oct 15", label: "Q2 TDS Challan filed", status: "Completed", statusClass: "text-[#00E5A0]", dotClass: "bg-[#00E5A0]", opacity: "" },
                                { date: "Oct 31", label: "Q2 24Q Return filed", status: "Completed", statusClass: "text-[#00E5A0]", dotClass: "bg-[#00E5A0]", opacity: "" },
                                { date: "Nov 30", label: "Nov TDS Challan", status: "5 days left", statusClass: "text-[#FFB800] font-bold animate-pulse", dotClass: "bg-[#FFB800] animate-pulse", opacity: "" },
                                { date: "Jan 15", label: "Q3 TDS Challan", status: "Upcoming", statusClass: "text-[#8899AA]", dotClass: "bg-[#445566]", opacity: "opacity-60" },
                                { date: "Jan 31", label: "Q3 24Q Return", status: "Upcoming", statusClass: "text-[#8899AA]", dotClass: "bg-[#445566]", opacity: "opacity-60" },
                                { date: "May 31", label: "Form 16 Issuance", status: "Upcoming", statusClass: "text-[#8899AA]", dotClass: "bg-[#445566]", opacity: "opacity-60" },
                            ].map((item, i) => (
                                <div key={i} className={`relative ${item.opacity}`}>
                                    <div className={`absolute -left-[28px] top-0.5 w-4 h-4 rounded-full ${item.dotClass} border-4 border-[#0A1420]`} aria-hidden="true" />
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-medium bg-[#0D1928] text-[#c8d8e8] px-2 py-1 rounded">{item.date}</span>
                                            <span className="text-sm font-medium text-white">{item.label}</span>
                                        </div>
                                        <span className={`text-xs font-medium ${item.statusClass}`}>{item.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Regime & Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Regime Split */}
                    <Card padding="lg" className="lg:col-span-7 flex items-center gap-6">
                        <div className="w-1/3 flex flex-col items-center">
                            <h3 className="text-base font-semibold text-white mb-2 self-start">Tax Regime Split</h3>
                            <div className="h-[160px] w-full relative">
                                <ChartWrapper height="h-[300px]">
                                    <PieChart>
                                        <Pie data={PIE_DATA} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={2} dataKey="value" stroke="none">
                                            {PIE_DATA.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip contentStyle={{ backgroundColor: "#0D1928", borderColor: "#1A2A3A", borderRadius: "8px", color: "#fff" }} itemStyle={{ color: "#fff" }} />
                                    </PieChart>
                                </ChartWrapper>
                                <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center pointer-events-none pb-2" aria-label="344 total employees">
                                    <span className="text-xl font-bold text-white">344</span>
                                    <span className="text-[10px] text-[#8899AA]">Total</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 pl-6 border-l border-[#1A2A3A]">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-[#1A2A3A]">
                                        <th className="text-left font-medium text-[#8899AA] pb-2">Metric</th>
                                        <th className="text-right font-medium text-[#0066FF] pb-2">Old Regime <span className="text-xs font-normal text-[#445566]">(218)</span></th>
                                        <th className="text-right font-medium text-[#00E5A0] pb-2">New Regime <span className="text-xs font-normal text-[#445566]">(126)</span></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#1A2A3A]/50">
                                    <tr>
                                        <td className="py-3 text-[#c8d8e8]">Avg Annual Tax</td>
                                        <td className="py-3 text-right text-white font-medium">₹1,42,400</td>
                                        <td className="py-3 text-right text-white font-medium">₹98,600</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 text-[#c8d8e8]">Avg Monthly TDS</td>
                                        <td className="py-3 text-right text-white font-medium">₹11,867</td>
                                        <td className="py-3 text-right text-white font-medium">₹8,217</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 text-[#c8d8e8]">Proof Required</td>
                                        <td className="py-3 text-right text-[#FFB800] font-medium">Yes</td>
                                        <td className="py-3 text-right text-[#8899AA] font-medium">No</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="mt-4 text-right">
                                <Link href="/tax/regime-comparison" className="text-sm text-[#0066FF] hover:underline font-medium">
                                    Regime Comparison Report →
                                </Link>
                            </div>
                        </div>
                    </Card>

                    {/* Quick Actions */}
                    <Card padding="lg" className="lg:col-span-5">
                        <h3 className="text-base font-semibold text-white mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { href: "/tax/computation-detail", icon: FileCheck, iconClass: "text-blue-400 bg-blue-500/10", label: "Run TDS Computation" },
                                { href: "/tax/form-16/bulk", icon: FileText, iconClass: "text-indigo-400 bg-indigo-500/10", label: "Generate Form 16" },
                                { href: "/tax/challan", icon: Shield, iconClass: "text-[#00E5A0] bg-[#00E5A0]/10", label: "Pay TDS Challan" },
                                { href: "/tax/form24q", icon: FileText, iconClass: "text-[#FFB800] bg-[#FFB800]/10", label: "File 24Q Return" },
                            ].map((action, i) => (
                                <Link key={i} href={action.href} className="flex items-center p-3 rounded-lg bg-[#0D1928] border border-[#1A2A3A] hover:bg-[#1A2A3A] hover:border-[#2A3A4A] transition-all group cursor-pointer">
                                    <div className={`p-2 rounded-md mr-3 ${action.iconClass}`}>
                                        <action.icon size={18} aria-hidden="true" />
                                    </div>
                                    <span className="text-sm font-medium text-[#c8d8e8] group-hover:text-white">{action.label}</span>
                                </Link>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
