"use client";

import Link from "next/link";
import { Download, Eye, Calculator, FileSpreadsheet, AlertCircle, TableProperties } from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// ─── Static data ──────────────────────────────────────────────────────────────

interface QuickLink {
    id: string;
    title: string;
    desc: string;
    href: string;
    iconColor: string;
    borderHover: string;
}

const QUICK_LINKS: QuickLink[] = [
    {
        id: "deep-dive",
        title: "MIS Deep Dive",
        desc: "Component level variance analysis",
        href: "/reports/payroll-mis/deep-dive",
        iconColor: "bg-amber-500/10 text-amber-500",
        borderHover: "hover:border-amber-500/50",
    },
    {
        id: "bank",
        title: "Bank Upload Format",
        desc: "Generate HDFC/ICICI CSV format",
        href: "#",
        iconColor: "bg-indigo-500/10 text-indigo-400",
        borderHover: "hover:border-indigo-500/50",
    },
    {
        id: "jv",
        title: "JV Export",
        desc: "Journal Vouchers for Accounting",
        href: "#",
        iconColor: "bg-emerald-500/10 text-emerald-400",
        borderHover: "hover:border-emerald-500/50",
    },
    {
        id: "exceptions",
        title: "Exceptions Report",
        desc: "Negative salaries, hold payouts",
        href: "#",
        iconColor: "bg-pink-500/10 text-pink-400",
        borderHover: "hover:border-pink-500/50",
    },
];

interface SalaryRow {
    id: string;
    empId: string;
    name: string;
    acc: string;
    basic: string;
    hra: string;
    spl: string;
    gross: string;
    epf: string;
    tds: string;
    pt: string;
    totDed: string;
    net: string;
}

const SALARY_ROWS: SalaryRow[] = [
    {
        id: "r1",
        empId: "EMP-001",
        name: "Amit Kumar",
        acc: "XXXX-1234",
        basic: "80,000",
        hra: "40,000",
        spl: "25,000",
        gross: "1,45,000",
        epf: "1,800",
        tds: "12,500",
        pt: "200",
        totDed: "14,500",
        net: "1,30,500",
    },
    {
        id: "r2",
        empId: "EMP-002",
        name: "Priya Singh",
        acc: "XXXX-8821",
        basic: "60,000",
        hra: "30,000",
        spl: "15,000",
        gross: "1,05,000",
        epf: "1,800",
        tds: "8,500",
        pt: "200",
        totDed: "10,500",
        net: "94,500",
    },
    {
        id: "r3",
        empId: "EMP-003",
        name: "Neha Sharma",
        acc: "XXXX-9912",
        basic: "50,000",
        hra: "25,000",
        spl: "10,000",
        gross: "85,000",
        epf: "1,800",
        tds: "5,500",
        pt: "200",
        totDed: "7,500",
        net: "77,500",
    },
    {
        id: "r4",
        empId: "EMP-004",
        name: "Rohan Gupta",
        acc: "XXXX-4432",
        basic: "45,000",
        hra: "22,500",
        spl: "8,000",
        gross: "75,500",
        epf: "1,800",
        tds: "3,500",
        pt: "200",
        totDed: "5,500",
        net: "70,000",
    },
    {
        id: "r5",
        empId: "EMP-005",
        name: "Rahul Verma",
        acc: "XXXX-1122",
        basic: "75,000",
        hra: "37,500",
        spl: "20,000",
        gross: "1,32,500",
        epf: "1,800",
        tds: "11,500",
        pt: "200",
        totDed: "13,500",
        net: "1,19,000",
    },
];

// ─── Sub-component (module scope) ─────────────────────────────────────────────

function QuickLinkCard({ link }: { link: QuickLink }) {
    return (
        <Link
            href={link.href}
            className={`bg-gradient-to-br from-[#1A2A3A] to-[#0D1928] border border-[#2A3A4A] rounded-2xl p-6 transition-all cursor-pointer group ${link.borderHover} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5a0]`}
        >
            <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${link.iconColor}`}
                aria-hidden="true"
            >
                {link.id === "deep-dive" ? (
                    <Calculator size={20} />
                ) : link.id === "exceptions" ? (
                    <AlertCircle size={20} />
                ) : (
                    <FileSpreadsheet size={20} />
                )}
            </div>
            <h3 className="text-base font-bold text-white mb-1">{link.title}</h3>
            <p className="text-xs text-[#8899AA]">{link.desc}</p>
        </Link>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PayrollMISPage() {
    return (
        <Page
            title="Management Info System (MIS)"
            subtitle="Bank-format ready payroll register and comprehensive MIS summaries."
            breadcrumbs={[
                { label: "Reports", href: "/reports/dashboard" },
                { label: "Payroll MIS" },
            ]}
            maxWidth="1400px"
            actions={
                <>
                    <div>
                        <label htmlFor="mis-month" className="sr-only">
                            Select month
                        </label>
                        <select
                            id="mis-month"
                            className="bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm font-medium rounded-lg px-4 py-2 focus:outline-none focus:border-amber-500"
                        >
                            <option>March 2026</option>
                            <option>February 2026</option>
                            <option>January 2026</option>
                        </select>
                    </div>
                    <Button icon={<Download size={14} aria-hidden="true" />}>Download Full MIS</Button>
                </>
            }
        >
            <div className="space-y-6">
                {/* Quick links */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {QUICK_LINKS.map((link) => (
                        <QuickLinkCard key={link.id} link={link} />
                    ))}
                </div>

                {/* Salary register */}
                <Card padding="none">
                    <div className="p-4 border-b border-[#1A2A3A] flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                        <h2 className="text-sm font-bold text-white flex items-center gap-2">
                            <TableProperties size={16} className="text-amber-500" aria-hidden="true" />
                            Consolidated Salary Register (March 2026)
                        </h2>
                        <div className="flex gap-2">
                            <Button variant="secondary" size="sm">Columns</Button>
                            <Button variant="secondary" size="sm">Density</Button>
                        </div>
                    </div>

                    <div className="overflow-x-auto w-full">
                        <table
                            className="w-full text-left whitespace-nowrap text-[13px] font-mono border-collapse"
                            aria-label="Consolidated salary register"
                        >
                            <thead className="bg-[#1A2A3A]/80 text-[#8899AA] tracking-wider uppercase">
                                <tr>
                                    <th scope="col" className="px-4 py-3 font-medium border-b border-r border-[#2A3A4A] sticky left-0 bg-[#1A2A3A] z-20">
                                        Emp ID
                                    </th>
                                    <th scope="col" className="px-4 py-3 font-medium border-b border-r border-[#2A3A4A] sticky left-[85px] bg-[#1A2A3A] z-20">
                                        Name
                                    </th>
                                    <th scope="col" className="px-4 py-3 font-medium border-b border-r border-[#2A3A4A] sticky left-[200px] bg-[#1A2A3A] z-20">
                                        Bank A/c
                                    </th>
                                    <th scope="col" className="px-4 py-3 font-medium border-b border-r border-[#2A3A4A] text-right">Basic Pay</th>
                                    <th scope="col" className="px-4 py-3 font-medium border-b border-r border-[#2A3A4A] text-right">HRA</th>
                                    <th scope="col" className="px-4 py-3 font-medium border-b border-r border-[#2A3A4A] text-right">Special All.</th>
                                    <th scope="col" className="px-4 py-3 font-medium border-b border-r border-[#2A3A4A] text-right text-emerald-400 bg-emerald-500/5">Gross Earnings</th>
                                    <th scope="col" className="px-4 py-3 font-medium border-b border-r border-[#2A3A4A] text-right text-pink-400">EPF Ded.</th>
                                    <th scope="col" className="px-4 py-3 font-medium border-b border-r border-[#2A3A4A] text-right text-pink-400">TDS Ded.</th>
                                    <th scope="col" className="px-4 py-3 font-medium border-b border-r border-[#2A3A4A] text-right text-pink-400">PT Deduct</th>
                                    <th scope="col" className="px-4 py-3 font-medium border-b border-r border-[#2A3A4A] text-right text-amber-500 bg-amber-500/5">Total Deduct</th>
                                    <th scope="col" className="px-4 py-3 font-medium border-b border-r border-[#2A3A4A] text-right text-indigo-400 font-bold bg-indigo-500/10">Net Payable</th>
                                    <th scope="col" className="px-4 py-3 font-medium border-b border-[#2A3A4A] text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A2A3A]">
                                {SALARY_ROWS.map((row) => (
                                    <tr key={row.id} className="hover:bg-[#1A2A3A]/30">
                                        <td className="px-4 py-3 border-r border-[#1A2A3A] sticky left-0 bg-[#0D1928] z-10 text-[#8899AA]">{row.empId}</td>
                                        <td className="px-4 py-3 border-r border-[#1A2A3A] sticky left-[85px] bg-[#0D1928] z-10 font-sans font-medium text-white">{row.name}</td>
                                        <td className="px-4 py-3 border-r border-[#1A2A3A] sticky left-[200px] bg-[#0D1928] z-10 text-[#8899AA]">{row.acc}</td>
                                        <td className="px-4 py-3 border-r border-[#1A2A3A] text-right text-gray-300">₹{row.basic}</td>
                                        <td className="px-4 py-3 border-r border-[#1A2A3A] text-right text-gray-300">₹{row.hra}</td>
                                        <td className="px-4 py-3 border-r border-[#1A2A3A] text-right text-gray-300">₹{row.spl}</td>
                                        <td className="px-4 py-3 border-r border-[#1A2A3A] text-right text-emerald-400 font-medium bg-emerald-500/5">₹{row.gross}</td>
                                        <td className="px-4 py-3 border-r border-[#1A2A3A] text-right text-pink-400">₹{row.epf}</td>
                                        <td className="px-4 py-3 border-r border-[#1A2A3A] text-right text-pink-400">₹{row.tds}</td>
                                        <td className="px-4 py-3 border-r border-[#1A2A3A] text-right text-pink-400">₹{row.pt}</td>
                                        <td className="px-4 py-3 border-r border-[#1A2A3A] text-right text-amber-500 font-medium bg-amber-500/5">₹{row.totDed}</td>
                                        <td className="px-4 py-3 border-r border-[#1A2A3A] text-right text-indigo-400 font-black bg-indigo-500/10 text-base">₹{row.net}</td>
                                        <td className="px-4 py-3 text-center">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                aria-label={`View payslip for ${row.name}`}
                                            >
                                                <Eye size={16} aria-hidden="true" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot className="bg-[#1A2A3A] font-bold text-white border-t-2 border-[#2A3A4A]">
                                <tr>
                                    <td colSpan={3} className="px-4 py-4 text-right sticky left-0 z-10 bg-[#1A2A3A] font-sans">
                                        Grand Totals
                                    </td>
                                    <td className="px-4 py-4 text-right">₹3,10,000</td>
                                    <td className="px-4 py-4 text-right">₹1,55,000</td>
                                    <td className="px-4 py-4 text-right">₹78,000</td>
                                    <td className="px-4 py-4 text-right text-emerald-400 bg-emerald-500/5">₹5,43,000</td>
                                    <td className="px-4 py-4 text-right text-pink-400">₹9,000</td>
                                    <td className="px-4 py-4 text-right text-pink-400">₹41,500</td>
                                    <td className="px-4 py-4 text-right text-pink-400">₹1,000</td>
                                    <td className="px-4 py-4 text-right text-amber-500 bg-amber-500/5">₹51,500</td>
                                    <td className="px-4 py-4 text-right text-indigo-400 text-lg bg-indigo-500/10">₹4,91,500</td>
                                    <td />
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </Card>
            </div>
        </Page>
    );
}
