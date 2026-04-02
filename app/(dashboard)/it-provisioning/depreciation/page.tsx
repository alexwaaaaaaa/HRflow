"use client";

import { Calculator, TrendingDown, Search, Download } from "lucide-react";
import Button from "@/components/ui/Button";

// --- Types ---
type DepreciationRow = {
    name: string;
    date: string;
    life: string;
    cost: string;
    nbv: string;
    pct: number;
};

// --- Mock Data ---
const DEPRECIATION_SCHEDULE: DepreciationRow[] = [
    { name: "MacBook Pro 16\" (AST-001)", date: "15 Jan 2024", life: "3 Years", cost: "₹ 2,49,900", nbv: "₹ 1,94,366", pct: 77 },
    { name: "Dell XPS 15 (AST-089)", date: "10 Mar 2022", life: "3 Years", cost: "₹ 1,85,000", nbv: "₹ 15,417", pct: 8 },
    { name: "LG 4K Monitor (AST-142)", date: "01 Jun 2021", life: "5 Years", cost: "₹ 45,000", nbv: "₹ 18,000", pct: 40 },
    { name: "Lenovo ThinkPad (AST-022)", date: "12 Dec 2020", life: "3 Years", cost: "₹ 1,20,000", nbv: "₹ 0", pct: 0 },
];

const SUMMARY_STATS = [
    { label: "Total Purchase Value", value: "₹ 4.2 Cr", color: "text-white", accent: "text-[#8899AA]", Icon: Calculator, bg: "bg-[#0066FF]/10", iconColor: "text-[#0066FF]" },
    { label: "Accumulated Depreciation", value: "₹ 1.8 Cr", color: "text-[#FF4444]", accent: "text-[#FF4444]", Icon: TrendingDown, bg: "bg-[#FF4444]/10", iconColor: "text-[#FF4444]" },
    { label: "Net Book Value", value: "₹ 2.4 Cr", color: "text-white", accent: "text-[#0066FF]", Icon: Calculator, bg: "bg-[#0066FF]/10", iconColor: "text-[#0066FF]" },
    { label: "Fully Depreciated Assets", value: "142 units", color: "text-white", accent: "text-[#FFB800]", Icon: TrendingDown, bg: "bg-[#FFB800]/10", iconColor: "text-[#FFB800]" },
];

export default function AssetDepreciationScreen() {
    return (
        <main className="px-8 py-6 pb-16 animate-fade-in relative max-w-7xl mx-auto min-h-screen">
            {/* Page Header */}
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 border-b border-[#1A2A3A] pb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white m-0 tracking-tight">Asset Depreciation</h1>
                    <p className="text-sm text-[#8899AA] mt-1.5">Track hardware value decay and forecast replacement cycles (Straight-line method)</p>
                </div>
                <Button variant="secondary" icon={<Download size={16} aria-hidden="true" />} className="h-10 hover:border-[#334455] bg-[#0A1420] shadow-sm">
                    Export Schedule
                </Button>
            </header>

            {/* Summary Stat Cards */}
            <dl className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                {SUMMARY_STATS.map((stat) => (
                    <div key={stat.label} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden hover:border-[#334455] transition-all shadow-sm group">
                        <div className={`absolute top-4 right-4 w-9 h-9 rounded-lg ${stat.bg} flex items-center justify-center flex-shrink-0`} aria-hidden="true">
                            <stat.Icon size={18} className={stat.iconColor} />
                        </div>
                        <dt className={`text-xs font-bold ${stat.accent} uppercase tracking-wider mb-3 pr-10 leading-tight`}>{stat.label}</dt>
                        <dd className={`text-3xl font-black tracking-tight ${stat.color}`}>{stat.value}</dd>
                    </div>
                ))}
            </dl>

            {/* Depreciation Schedule Table */}
            <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-sm" aria-labelledby="depreciation-schedule-heading">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 md:p-6 border-b border-[#1A2A3A] bg-[#0A1420]/50 gap-4">
                    <h2 id="depreciation-schedule-heading" className="text-lg font-bold text-white m-0">Depreciation Schedule <span className="text-[#8899AA] font-normal text-sm">(Top Assets)</span></h2>
                    <div className="relative w-full sm:w-auto">
                        <label htmlFor="depreciation-search" className="sr-only">Search by Asset ID or Model</label>
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#445566]" size={14} aria-hidden="true" />
                        <input
                            id="depreciation-search"
                            type="search"
                            placeholder="Search by Asset ID or Model..."
                            className="w-full sm:w-72 h-10 bg-[#060B14] border border-[#1A2A3A] rounded-xl pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#0066FF] focus:border-[#0066FF] transition-all placeholder-[#445566] shadow-sm"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[640px]">
                        <thead>
                            <tr className="border-b border-[#1A2A3A] bg-[#060B14]/30">
                                <th scope="col" className="p-4 text-xs font-bold text-[#8899AA] uppercase tracking-wider">Asset Details</th>
                                <th scope="col" className="p-4 text-xs font-bold text-[#8899AA] uppercase tracking-wider">Purchase Date</th>
                                <th scope="col" className="p-4 text-xs font-bold text-[#8899AA] uppercase tracking-wider">Useful Life</th>
                                <th scope="col" className="p-4 text-xs font-bold text-[#8899AA] uppercase tracking-wider">Purchase Cost</th>
                                <th scope="col" className="p-4 text-xs font-bold text-[#8899AA] uppercase tracking-wider text-right">Net Book Value</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {DEPRECIATION_SCHEDULE.map((row, i) => (
                                <tr key={i} className="hover:bg-[#1A2A3A]/30 transition-colors group cursor-default">
                                    <td className="p-4 text-sm font-bold text-white group-hover:text-[#0066FF] transition-colors">{row.name}</td>
                                    <td className="p-4 text-sm text-[#8899AA]">{row.date}</td>
                                    <td className="p-4 text-sm text-[#8899AA]">{row.life}</td>
                                    <td className="p-4 text-sm font-medium text-white">{row.cost}</td>
                                    <td className="p-4">
                                        <div className="flex items-center justify-end gap-4 text-sm font-bold">
                                            <span className={row.pct === 0 ? "text-[#FF4444]" : "text-[#00E5A0]"}>{row.nbv}</span>
                                            <div className="w-20 h-2 bg-[#060B14] border border-[#1A2A3A] rounded-full overflow-hidden flex-shrink-0">
                                                <div
                                                    className={`h-full rounded-full ${row.pct === 0 ? 'bg-[#FF4444]' : 'bg-[#00E5A0]'}`}
                                                    style={{ width: `${row.pct}%` }}
                                                    role="progressbar"
                                                    aria-valuenow={row.pct}
                                                    aria-valuemin={0}
                                                    aria-valuemax={100}
                                                    aria-label={`Book value: ${row.pct}% of original`}
                                                ></div>
                                            </div>
                                        </div>
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
