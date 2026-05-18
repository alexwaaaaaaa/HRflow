"use client";

import { Wallet, CreditCard, Banknote, ShieldCheck, ArrowUpRight, Activity, Download, Calendar } from "lucide-react";
import Link from "next/link";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Cell } from "recharts";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import ChartWrapper from "@/components/ui/ChartWrapper";

const MONTHLY_TREND = [
    { month: "Jan", ewa: 120000, loans: 450000 },
    { month: "Feb", ewa: 150000, loans: 520000 },
    { month: "Mar", ewa: 180000, loans: 480000 },
    { month: "Apr", ewa: 210000, loans: 610000 },
    { month: "May", ewa: 260000, loans: 590000 },
    { month: "Jun", ewa: 310000, loans: 750000 },
];

const CATEGORY_DISTRIBUTION = [
    { name: "Earned Wage Access", value: 310000, color: "#3B82F6" },
    { name: "Personal Loans", value: 550000, color: "#10B981" },
    { name: "Salary Advances", value: 200000, color: "#F59E0B" },
];

const KPI_CARDS = [
    { label: "Total EWA Disbursed", value: "₹3,10,000", delta: "12.5%", icon: Wallet, iconColor: "text-[#00E5FF]", iconBg: "bg-[#00E5FF]/10" },
    { label: "Active Loans Volume", value: "₹7,50,000", delta: "8.2%", icon: Banknote, iconColor: "text-purple-400", iconBg: "bg-purple-500/10" },
    { label: "Insured Employees", value: "458", delta: "4.1%", icon: ShieldCheck, iconColor: "text-pink-400", iconBg: "bg-pink-500/10" },
    { label: "Company Credit Score", value: "745", delta: "Fair", icon: Activity, iconColor: "text-emerald-400", iconBg: "bg-emerald-500/10" },
] as const;

const QUICK_LINKS = [
    { href: "/finance/ewa", label: "EWA Hub", desc: "Manage earned wage limits", icon: Wallet, iconColor: "text-[#00E5FF]", iconBg: "bg-[#00E5FF]/10", hoverBorder: "hover:border-[#00E5FF]/50" },
    { href: "/finance/loans", label: "Loan Management", desc: "Approve and track loans", icon: Banknote, iconColor: "text-purple-400", iconBg: "bg-purple-500/10", hoverBorder: "hover:border-purple-500/50" },
    { href: "/finance/insurance/marketplace", label: "Insurance Portal", desc: "Manage group insurance", icon: ShieldCheck, iconColor: "text-pink-400", iconBg: "bg-pink-500/10", hoverBorder: "hover:border-pink-500/50" },
    { href: "/finance/score", label: "Credit Score", desc: "View company wellness", icon: CreditCard, iconColor: "text-emerald-400", iconBg: "bg-emerald-500/10", hoverBorder: "hover:border-emerald-500/50" },
] as const;

export default function FinanceDashboard() {
    return (
        <Page
            title="Finance Dashboard"
            subtitle="Overview of embedded finance operations across the organization"
            breadcrumbs={[{ label: "Finance" }]}
            maxWidth="1300px"
            actions={
                <>
                    <Button variant="secondary" icon={<Calendar size={14} />}>This Month</Button>
                    <Button icon={<Download size={14} />}>Export Report</Button>
                </>
            }
        >
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {KPI_CARDS.map(({ label, value, delta, icon: Icon, iconColor, iconBg }) => (
                    <Card key={label} padding="lg">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center ${iconColor}`}>
                                <Icon size={20} aria-hidden="true" />
                            </div>
                            <span className="flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
                                <ArrowUpRight size={12} aria-hidden="true" /> {delta}
                            </span>
                        </div>
                        <p className="text-[#8899AA] text-sm font-medium mb-1">{label}</p>
                        <h3 className="text-2xl font-bold text-white">{value}</h3>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Trend Chart */}
                <Card padding="lg" className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-white">Disbursement Trends</h2>
                        <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#00E5FF]" aria-hidden="true" />
                                <span className="text-[#8899AA]">EWA</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#7C3AED]" aria-hidden="true" />
                                <span className="text-[#8899AA]">Loans</span>
                            </div>
                        </div>
                    </div>
                    <div className="h-72">
                        <ChartWrapper height="h-full">
                            <AreaChart data={MONTHLY_TREND} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorEwa" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#00E5FF" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorLoans" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 12 }} tickFormatter={(val) => `₹${val / 1000}k`} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: "#1A2A3A", border: "none", borderRadius: "8px", color: "#fff" }}
                                    formatter={(value: any) => [`₹${value?.toLocaleString?.() ?? value}`, ""]}
                                />
                                <Area type="monotone" dataKey="ewa" stroke="#00E5FF" strokeWidth={2} fillOpacity={1} fill="url(#colorEwa)" />
                                <Area type="monotone" dataKey="loans" stroke="#7C3AED" strokeWidth={2} fillOpacity={1} fill="url(#colorLoans)" />
                            </AreaChart>
                        </ChartWrapper>
                    </div>
                </Card>

                {/* Distribution Chart */}
                <Card padding="lg">
                    <h2 className="text-lg font-bold text-white mb-6">Financial Products</h2>
                    <div className="h-60 mb-4">
                        <ChartWrapper height="h-full">
                            <BarChart data={CATEGORY_DISTRIBUTION} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" horizontal={true} vertical={false} />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: "#8899AA", fontSize: 11 }} width={110} />
                                <Tooltip
                                    cursor={{ fill: "transparent" }}
                                    contentStyle={{ backgroundColor: "#1A2A3A", border: "none", borderRadius: "8px", color: "#fff" }}
                                    formatter={(value: any) => [`₹${value?.toLocaleString?.() ?? value}`, "Amount"]}
                                />
                                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                                    {CATEGORY_DISTRIBUTION.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ChartWrapper>
                    </div>
                </Card>
            </div>

            {/* Quick Links */}
            <div>
                <h2 className="text-lg font-bold text-white mb-4">Quick Links &amp; Hubs</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {QUICK_LINKS.map(({ href, label, desc, icon: Icon, iconColor, iconBg, hoverBorder }) => (
                        <Link
                            key={href}
                            href={href}
                            className={`flex items-center gap-4 bg-[#0D1928] border border-[#1A2A3A] p-4 rounded-xl ${hoverBorder} transition-colors group`}
                        >
                            <div className={`w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center ${iconColor}`}>
                                <Icon size={20} aria-hidden="true" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-white">{label}</h3>
                                <p className="text-xs text-[#8899AA]">{desc}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </Page>
    );
}
