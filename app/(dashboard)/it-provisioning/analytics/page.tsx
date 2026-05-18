"use client";

import { TrendingUp, Cpu, Monitor, ShieldCheck, Download, ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";

// --- Mock Data ---
const HARDWARE_RELIABILITY = [
    { brand: "Apple MacBooks", rate: "1.2%", value: 1.2, color: "bg-[#00E5A0]", text: "text-[#00E5A0]" },
    { brand: "Dell Precision", rate: "4.5%", value: 4.5, color: "bg-[#FFB800]", text: "text-[#FFB800]" },
    { brand: "Lenovo ThinkPads", rate: "8.1%", value: 8.1, color: "bg-[#FF4444]", text: "text-[#FF4444]" },
];

const SPEND_TREND_DATA = [40, 65, 30, 80, 50, 95, 45, 60, 85, 40, 55, 75];

const SOFTWARE_ROI = [
    { name: "Adobe Creative Cloud", roi: "High (96% active)", cost: "₹ 4.2 L/yr", status: "success" },
    { name: "Salesforce CRM", roi: "Medium (75% active)", cost: "₹ 12 L/yr", status: "warning" },
    { name: "Zoom Pro", roi: "Low (30% active)", cost: "₹ 2.5 L/yr", status: "danger" },
];

export default function ITAssetAnalyticsScreen() {
    return (
        <main className="px-8 py-6 pb-16 animate-fade-in relative max-w-7xl mx-auto min-h-screen">
            {/* Page Header */}
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 border-b border-[#1A2A3A] pb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white m-0 tracking-tight">IT Analytics & Insights</h1>
                    <p className="text-sm text-[#8899AA] mt-1.5">Data-driven insights into hardware performance, costs, and lifecycle management</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <div className="relative">
                        <label htmlFor="time-range" className="sr-only">Select time range</label>
                        <select
                            id="time-range"
                            className="h-10 bg-[#0D1928] border border-[#1A2A3A] rounded-xl pl-4 pr-10 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#0066FF] focus:border-[#0066FF] transition-all appearance-none cursor-pointer shadow-sm hover:border-[#334455]"
                        >
                            <option value="12m">Last 12 Months</option>
                            <option value="ytd">Year to Date</option>
                            <option value="30d">Last 30 Days</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8899AA] pointer-events-none" aria-hidden="true" />
                    </div>
                    <Button variant="secondary" icon={<Download size={16} aria-hidden="true" />} className="h-10 hover:border-[#334455] bg-[#0A1420] shadow-sm">
                        Export PDF
                    </Button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Hardware Reliability Section */}
                <section className="col-span-1 lg:col-span-1 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 md:p-8 flex flex-col shadow-sm" aria-labelledby="hardware-reliability-heading">
                    <header className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-lg bg-[#0066FF]/10 flex items-center justify-center text-[#0066FF] flex-shrink-0" aria-hidden="true">
                            <Cpu size={20} />
                        </div>
                        <h2 id="hardware-reliability-heading" className="text-lg font-bold text-white m-0">Hardware Reliability</h2>
                    </header>

                    <div className="space-y-7 flex-grow flex flex-col justify-center">
                        {HARDWARE_RELIABILITY.map((hw, i) => (
                            <div key={i} className="group cursor-default">
                                <div className="flex justify-between items-end mb-2.5">
                                    <span className="text-sm font-medium text-[#8899AA] group-hover:text-white transition-colors">{hw.brand}</span>
                                    <span className={`text-sm font-bold ${hw.text}`}>{hw.rate} Failures</span>
                                </div>
                                <div className="w-full h-2.5 bg-[#060B14] rounded-full overflow-hidden border border-[#1A2A3A]">
                                    <div
                                        className={`h-full ${hw.color} rounded-r-full transition-all duration-1000 ease-out`}
                                        style={{ width: `${100 - hw.value}%` }}
                                        role="progressbar"
                                        aria-valuenow={100 - hw.value}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                        aria-label={`${hw.brand} reliability score`}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Spending Trends Section */}
                <section className="col-span-1 lg:col-span-2 bg-[#0066FF]/5 border border-[#0066FF]/20 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden" aria-labelledby="spend-trend-heading">
                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#0066FF]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" aria-hidden="true"></div>

                    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 relative z-10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-[#00E5A0]/10 flex items-center justify-center text-[#00E5A0] flex-shrink-0 shadow-inner" aria-hidden="true">
                                <TrendingUp size={20} />
                            </div>
                            <h2 id="spend-trend-heading" className="text-lg font-bold text-white m-0">Procurement Spend Trend</h2>
                        </div>
                        <div className="text-sm font-semibold text-[#8899AA] bg-[#0A1420] border border-[#1A2A3A] px-4 py-2 rounded-xl shadow-sm">
                            Total YTD: <span className="text-white text-base font-bold ml-1">₹ 2.8 Cr</span>
                        </div>
                    </header>

                    {/* Simulated Bar Chart */}
                    <div className="h-56 mt-4 relative z-10 w-full">
                        {/* Chart Grid Lines */}
                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20" aria-hidden="true">
                            <div className="w-full border-t border-[#8899AA] h-0"></div>
                            <div className="w-full border-t border-[#8899AA] h-0"></div>
                            <div className="w-full border-t border-[#8899AA] h-0"></div>
                            <div className="w-full border-t border-[#8899AA] h-0"></div>
                        </div>

                        <ul role="list" className="h-full flex items-end justify-between gap-1 sm:gap-2 m-0 p-0 pl-2 lg:pl-4" aria-label="Monthly spend trend bar chart">
                            {SPEND_TREND_DATA.map((val, i) => (
                                <li key={i} className="flex-1 h-full flex flex-col justify-end group pt-6">
                                    <div
                                        className="w-full bg-[#0066FF]/30 hover:bg-[#0066FF] rounded-t-sm transition-all relative border-x border-t border-[#0066FF]/20 cursor-crosshair hover:shadow-[0_0_15px_rgba(0,102,255,0.4)]"
                                        style={{ height: `${val}%` }}
                                        role="img"
                                        aria-label={`Month ${i + 1} spend: ₹${val}k`}
                                    >
                                        <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-[#060B14] border border-[#334455] text-white font-bold text-xs px-2.5 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none whitespace-nowrap shadow-xl">
                                            ₹ {val}k
                                        </div>
                                    </div>
                                    <div className="text-[10px] font-bold text-[#8899AA] text-center mt-3 uppercase tracking-wider group-hover:text-white transition-colors" aria-hidden="true">M{i + 1}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Software Utilization section */}
                <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 md:p-8 flex flex-col shadow-sm" aria-labelledby="software-roi-heading">
                    <header className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-[#FFB800]/10 flex items-center justify-center text-[#FFB800] flex-shrink-0" aria-hidden="true">
                            <ShieldCheck size={20} />
                        </div>
                        <h2 id="software-roi-heading" className="text-lg font-bold text-white m-0">Software ROI Analytics</h2>
                    </header>
                    <ul role="list" className="space-y-4 m-0 p-0 flex-grow flex flex-col justify-center">
                        {SOFTWARE_ROI.map((sw, i) => (
                            <li key={i} className="p-4 rounded-xl border border-[#1A2A3A] bg-[#0A1420] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-[#334455] transition-colors shadow-sm group">
                                <div className="min-w-0">
                                    <div className="text-sm font-bold text-white mb-1.5 truncate group-hover:text-[#0066FF] transition-colors">{sw.name}</div>
                                    <div className={`inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${sw.status === "success" ? "bg-[#00E5A0]/10 text-[#00E5A0] border-[#00E5A0]/20" :
                                            sw.status === "warning" ? "bg-[#FFB800]/10 text-[#FFB800] border-[#FFB800]/20" :
                                                "bg-[#FF4444]/10 text-[#FF4444] border-[#FF4444]/20"
                                        }`}>
                                        ROI: {sw.roi}
                                    </div>
                                </div>
                                <div className="text-sm font-bold text-[#8899AA] sm:text-right flex-shrink-0 bg-[#060B14] px-3 py-1.5 rounded-lg border border-[#1A2A3A]">
                                    {sw.cost}
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* IT Support Metrics section */}
                <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 md:p-8 flex flex-col shadow-sm" aria-labelledby="it-ticketing-heading">
                    <header className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-[#FF4444]/10 flex items-center justify-center text-[#FF4444] flex-shrink-0" aria-hidden="true">
                            <Monitor size={20} />
                        </div>
                        <h2 id="it-ticketing-heading" className="text-lg font-bold text-white m-0">IT Ticketing Trends</h2>
                    </header>

                    <div className="grid grid-cols-2 gap-4 flex-grow">
                        <div className="p-5 rounded-xl border border-[#1A2A3A] bg-[#0A1420] text-center flex flex-col justify-center shadow-inner hover:border-[#334455] transition-colors group">
                            <h3 className="text-xs font-semibold text-[#8899AA] uppercase tracking-wider mb-2 group-hover:text-white transition-colors">Avg Resolution Time</h3>
                            <div className="text-3xl font-black text-white tracking-tight">4.2 <span className="text-lg font-bold text-[#8899AA]">hrs</span></div>
                        </div>
                        <div className="p-5 rounded-xl border border-[#1A2A3A] bg-[#0A1420] text-center flex flex-col justify-center shadow-inner hover:border-[#334455] transition-colors group">
                            <h3 className="text-xs font-semibold text-[#8899AA] uppercase tracking-wider mb-2 group-hover:text-white transition-colors">Hardware Issues</h3>
                            <div className="text-3xl font-black text-white tracking-tight">35<span className="text-[#FF4444]">%</span></div>
                        </div>
                        <div className="col-span-2 p-6 rounded-xl border border-[#1A2A3A] bg-[#0A1420] text-center flex flex-col items-center justify-center shadow-inner hover:border-[#FFB800]/30 transition-colors">
                            <h3 className="text-xs font-semibold text-[#8899AA] uppercase tracking-wider mb-2">Most Common Issue:</h3>
                            <div className="text-lg md:text-xl font-bold text-[#FFB800] bg-[#FFB800]/10 px-4 py-2 mt-1 rounded-xl border border-[#FFB800]/20">
                                Password Resets & Access Requests
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
