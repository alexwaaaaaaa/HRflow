"use client";

import { Users, TrendingUp, HelpCircle, Download } from "lucide-react";
import Button from "@/components/ui/Button";

// --- Types ---
type DeptRow = {
    dept: string;
    hc: number;
    sw: string;
    hw: string;
    total: string;
    highCost: boolean;
};

// --- Mock Data ---
const DEPT_DATA: DeptRow[] = [
    { dept: "Engineering", hc: 145, sw: "₹ 45k", hw: "₹ 110k", total: "₹ 1,55,000", highCost: false },
    { dept: "Design", hc: 32, sw: "₹ 85k", hw: "₹ 150k", total: "₹ 2,35,000", highCost: true },
    { dept: "Marketing", hc: 48, sw: "₹ 35k", hw: "₹ 65k", total: "₹ 1,00,000", highCost: false },
    { dept: "Customer Support", hc: 110, sw: "₹ 15k", hw: "₹ 45k", total: "₹ 60,000", highCost: false },
    { dept: "Sales", hc: 85, sw: "₹ 45k", hw: "₹ 65k", total: "₹ 1,10,000", highCost: false },
];

const COST_BREAKDOWN = [
    { label: "Hardware", amount: "₹ 73k", pct: 65, color: "bg-[#0066FF]", dot: "bg-[#0066FF]" },
    { label: "SaaS / Software", amount: "₹ 28k", pct: 25, color: "bg-[#FFB800]", dot: "bg-[#FFB800]" },
    { label: "Peripherals", amount: "₹ 11k", pct: 10, color: "bg-[#00E5A0]", dot: "bg-[#00E5A0]" },
];

export default function ITCostPerEmployeeScreen() {
    return (
        <main className="px-8 py-6 pb-16 animate-fade-in relative max-w-6xl mx-auto min-h-screen">
            {/* Page Header */}
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 border-b border-[#1A2A3A] pb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white m-0 tracking-tight">IT Cost per Employee</h1>
                    <p className="text-sm text-[#8899AA] mt-1.5">Analyze IT overhead metrics by individual, role, or department</p>
                </div>
                <Button variant="secondary" icon={<Download size={16} aria-hidden="true" />} className="h-10 hover:border-[#334455] bg-[#0A1420] shadow-sm">
                    Export Report
                </Button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Avg Cost Metric Card */}
                <section className="col-span-1 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden" aria-labelledby="avg-cost-heading">
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-[#0066FF]/10 flex items-center justify-center" aria-hidden="true">
                        <Users size={20} className="text-[#0066FF]" />
                    </div>
                    <div>
                        <div className="flex items-center gap-1.5 mb-3 pr-12">
                            <h2 id="avg-cost-heading" className="text-xs font-bold text-[#8899AA] uppercase tracking-wider m-0">Avg. Cost / Employee (Yearly)</h2>
                            <HelpCircle size={12} className="text-[#445566] flex-shrink-0" aria-label="Based on total IT spending divided by headcount" />
                        </div>
                        <div className="text-4xl font-black text-white mb-3 tracking-tight">₹ 1,12,400</div>
                        <div className="text-sm text-[#FF4444] flex items-center gap-1.5 font-semibold">
                            <TrendingUp size={14} aria-hidden="true" /> +4.2% vs last year
                        </div>
                    </div>
                </section>

                {/* Cost Breakdown Visual */}
                <section className="col-span-1 lg:col-span-2 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-sm" aria-labelledby="breakdown-heading">
                    <h2 id="breakdown-heading" className="text-sm font-bold text-[#8899AA] uppercase tracking-wider mb-5 m-0">Cost Breakdown (Average per Employee)</h2>

                    {/* Stacked Bar */}
                    <div className="flex h-9 w-full rounded-xl overflow-hidden mb-5 shadow-inner border border-[#1A2A3A]" role="img" aria-label="IT cost breakdown bar chart">
                        {COST_BREAKDOWN.map((c) => (
                            <div key={c.label} className={`${c.color} h-full first:rounded-l-xl last:rounded-r-xl hover:brightness-110 transition-all cursor-default`} style={{ width: `${c.pct}%` }} aria-label={`${c.label}: ${c.pct}%`}></div>
                        ))}
                    </div>

                    {/* Legend */}
                    <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm" aria-label="Cost breakdown legend">
                        {COST_BREAKDOWN.map((c) => (
                            <div key={c.label} className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full ${c.dot} flex-shrink-0`} aria-hidden="true"></div>
                                <span className="text-white font-medium">{c.label}</span>
                                <span className="text-[#8899AA] font-medium">({c.amount})</span>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Departmental Analysis Table */}
            <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-sm" aria-labelledby="dept-analysis-heading">
                <div className="p-5 md:p-6 border-b border-[#1A2A3A] bg-[#0A1420]/50">
                    <h2 id="dept-analysis-heading" className="text-lg font-bold text-white m-0">Departmental Analysis</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[640px]">
                        <thead>
                            <tr className="border-b border-[#1A2A3A] bg-[#060B14]/30">
                                <th scope="col" className="p-4 text-xs font-bold text-[#8899AA] uppercase tracking-wider">Department</th>
                                <th scope="col" className="p-4 text-xs font-bold text-[#8899AA] uppercase tracking-wider">Headcount</th>
                                <th scope="col" className="p-4 text-xs font-bold text-[#8899AA] uppercase tracking-wider">Avg Software Cost</th>
                                <th scope="col" className="p-4 text-xs font-bold text-[#8899AA] uppercase tracking-wider">Avg Hardware Cost</th>
                                <th scope="col" className="p-4 text-xs font-bold text-[#8899AA] uppercase tracking-wider text-right">Total Avg / Employee</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {DEPT_DATA.map((row) => (
                                <tr key={row.dept} className="hover:bg-[#1A2A3A]/30 transition-colors group cursor-default">
                                    <td className="p-4 text-sm font-bold text-white group-hover:text-[#0066FF] transition-colors">{row.dept}</td>
                                    <td className="p-4 text-sm text-[#8899AA]">
                                        <span className="flex items-center gap-1.5">
                                            <Users size={13} aria-hidden="true" /> {row.hc}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm text-[#8899AA] font-medium">{row.sw}</td>
                                    <td className="p-4 text-sm text-[#8899AA] font-medium">{row.hw}</td>
                                    <td className="p-4 text-right">
                                        <span className={`text-sm font-bold ${row.highCost ? 'text-[#FFB800]' : 'text-white'}`}>{row.total}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}
